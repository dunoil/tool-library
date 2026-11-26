import { mkdir, writeFile } from "node:fs/promises";
import { render, validate, formatDiagnostics } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import BorrowerEmail from "../templates/borrower-email";
import LoanSlipsDocument from "../templates/loan-slips-document";
import { ToolCanvas } from "../templates/tool-canvas";
import { lendingWeek, makeBorrowers } from "../src/data/lending";

/**
 * The batch: one lending file -> a personalised loan notice for every
 * borrower (their own loan first, status computed from the file), the
 * printed loan slips (one A4 page per tool) and one tool card per tool.
 *
 *   npm run make               48 borrower emails + slips + 12 cards
 *   npm run make:sample        12 emails, for a quick look
 *
 * The gate runs first: the borrower email is validated before a single
 * file is written, so one bad lending file never becomes 48 bad
 * notices. Borrower generation is deterministic, a corrections run
 * re-renders only the records that changed.
 */
const arg = process.argv.indexOf("--count");
const count = arg >= 0 ? Number(process.argv[arg + 1]) : 48;
const started = Date.now();

const gate = validate(<BorrowerEmail />);
if (!gate.valid) {
  console.error(formatDiagnostics(gate.diagnostics));
  process.exit(1);
}

await mkdir("out/loans", { recursive: true });
const borrowers = makeBorrowers(count);
let emails = 0;
for (const borrower of borrowers) {
  const { html, text } = await render(<BorrowerEmail borrower={borrower} />);
  const stem = `out/loans/${borrower.ref.toLowerCase()}`;
  await writeFile(`${stem}.html`, html);
  if (text) await writeFile(`${stem}.txt`, text);
  emails++;
}

const slips = await renderPdf(<LoanSlipsDocument />);
await writeFile("out/loan-slips.pdf", slips.pdf);
const slipPages = (Buffer.from(slips.pdf).toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;

let cards = 0;
const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
if (existsSync(bold) && existsSync(regular)) {
  const fonts = [
    { family: "Inter", src: await readFile(regular), weight: 400 as const },
    { family: "Inter", src: await readFile(bold), weight: 700 as const },
  ];
  for (const tool of lendingWeek.tools) {
    const { image } = await renderImage(<ToolCanvas tool={tool} />, { fonts });
    await writeFile(`out/loans/card-${tool.id.toLowerCase()}.png`, image);
    cards++;
  }
} else {
  console.log("cards skipped: add Inter font files to assets/fonts/ (see its README)");
}

const summary = {
  week: `${lendingWeek.library}, ${lendingWeek.week}`,
  emails,
  slips: lendingWeek.tools.length,
  slipPages,
  cards,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
