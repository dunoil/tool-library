import {
  Canvas,
  Column,
  Heading,
  Row,
  Text,
  token,
} from "@hyper-elements/react";
import { lendingWeek } from "../src/data/lending";
import type { LendingWeek, Tool } from "../src/data/lending";
import { loansFor } from "../src/data/lending";
import { libraryTheme } from "../src/theme";
import { ToolMark } from "../src/components/shared";

/**
 * OUTPUT 4: The tool card (Canvas root, 1080 x 1080 -> PNG).
 *
 * A square card per tool, rendered on the server with renderImage():
 * deep forest ground, the tool mark, and the deposit and loan period
 * as the heroes, the card a borrower shares when their project is
 * done. The batch makes one card per tool (12 cards); this default
 * export is the most borrowed tool, the cordless drill. Fonts arrive
 * as bytes; nothing is fetched.
 */
export function ToolCanvas({
  week = lendingWeek,
  tool,
}: {
  week?: LendingWeek;
  tool?: Tool;
}) {
  const hero = tool ?? week.tools[0];
  const loans = loansFor(week, hero.id);
  return (
    <Canvas
      theme={libraryTheme}
      width={1080}
      height={1080}
      title={`${hero.name}, $${hero.deposit} deposit, ${hero.loanDays}-day loan, ${week.week}`}
      lang="en"
      style={{
        padding: 72,
        gap: 28,
        justifyContent: "space-between",
        backgroundColor: "#1f2a1d",
      }}
    >
      <Column
        style={{ gap: 28, justifyContent: "space-between", height: 936 }}
        tokens={{
          colors: { foreground: "#f2f0e4", muted: "#b9c4a8", primary: "#c9a227" },
        }}
      >
        <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
          <ToolMark size={1} />
          <Column style={{ gap: 0 }}>
            <Text style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2 }}>
              TOOL LIBRARY
            </Text>
            <Text style={{ fontSize: 20, color: token("colors.muted") }}>
              {week.library}
            </Text>
          </Column>
        </Row>

        <Column style={{ gap: 22 }}>
          <Column
            style={{
              backgroundColor: "#c9a227",
              height: 18,
              borderRadius: 4,
            }}
          />
          <Text
            style={{
              color: "#c9a227",
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            {hero.category.toUpperCase()} · {hero.status.toUpperCase()} ·{" "}
            {week.week}
          </Text>
          <Heading level={1} style={{ fontSize: 76, lineHeight: 1.05 }}>
            {hero.name}: ${hero.deposit} deposit, {hero.loanDays}-day loan
          </Heading>
          <Text style={{ fontSize: 28 }}>
            {hero.condition}. {loans.length} loans out on it this week.
          </Text>
          <Text style={{ fontSize: 24, color: token("colors.muted") }}>
            {hero.note}
          </Text>
        </Column>

        <Column style={{ gap: 12 }}>
          <Text style={{ apply: ["mono"], fontSize: 22, color: token("colors.muted") }}>
            Tool {hero.id} · One lending file rendered this card, the
            borrower email, the library page and the printed loan slip.
          </Text>
          <Text style={{ fontSize: 20, color: token("colors.muted") }}>
            Shed No. 7 · Borrow the drill, return the story.
          </Text>
        </Column>
      </Column>
    </Canvas>
  );
}

ToolCanvas.PreviewProps = { week: lendingWeek };
export default ToolCanvas;
