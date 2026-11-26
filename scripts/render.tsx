import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { formatDiagnostics, render } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import BorrowerEmail from "../templates/borrower-email";
import LibraryPage from "../templates/library-page";
import LoanSlipsDocument from "../templates/loan-slips-document";
import ToolCanvas from "../templates/tool-canvas";

/**
 * Render the four committed examples into out/ :
 *   borrower-email.html + .txt | library-page.html
 *   loan-slips.html + loan-slips.pdf
 *   tool-card.html (+ tool-card.png when font files are present)
 *
 * renderPdf() and renderImage() fetch nothing: fonts go in as bytes.
 * Drop Inter WOFF files into assets/fonts/ (see assets/fonts/README.md)
 * to enable the PNG; without them the script says so, plainly.
 */
await mkdir("out", { recursive: true });

const email = await render(<BorrowerEmail />);
await writeFile("out/borrower-email.html", email.html);
await writeFile("out/borrower-email.txt", email.text);
console.log("borrower-email:", formatDiagnostics(email.diagnostics) || "clean");

const page = await render(<LibraryPage />);
await writeFile("out/library-page.html", page.html);
console.log("library-page:", formatDiagnostics(page.diagnostics) || "clean");

const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
const hasFonts = existsSync(bold) && existsSync(regular);
const fontFiles = hasFonts
  ? [
      { family: "Inter", src: await readFile(regular), weight: 400 as const },
      { family: "Inter", src: await readFile(bold), weight: 700 as const },
    ]
  : undefined;

const doc = <LoanSlipsDocument />;
const printed = await render(doc);
await writeFile("out/loan-slips.html", printed.html);
// With no font files given, renderPdf() draws in the standard PDF fonts
// (Helvetica/Times) and warns about it in diagnostics, it never fetches.
const pdf = await renderPdf(doc, fontFiles ? { fonts: fontFiles } : undefined);
await writeFile("out/loan-slips.pdf", pdf.pdf);
console.log(
  "loan-slips: print HTML + PDF written",
  formatDiagnostics(pdf.diagnostics) || "",
);

const card = <ToolCanvas />;
const cardHtml = await render(card);
await writeFile("out/tool-card.html", cardHtml.html);

if (hasFonts && fontFiles) {
  const { image, diagnostics } = await renderImage(card, {
    fonts: fontFiles,
  });
  await writeFile("out/tool-card.png", image);
  console.log("tool-card PNG:", formatDiagnostics(diagnostics) || "clean");
} else {
  console.log(
    "tool-card: HTML written. PNG skipped, add Inter WOFF files to assets/fonts/ (they are passed to renderImage() as bytes; nothing is fetched).",
  );
}
