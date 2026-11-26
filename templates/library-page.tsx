import {
  Button,
  Column,
  Grid,
  Heading,
  Page,
  Path,
  Row,
  Section,
  Svg,
  Text,
  token,
} from "@hyper-elements/react";
import { lendingWeek } from "../src/data/lending";
import type { LendingWeek } from "../src/data/lending";
import { libraryTheme } from "../src/theme";
import {
  KitFooter,
  OverdueBlock,
  ToolMark,
  WeekLine,
} from "../src/components/shared";
import { ToolCard } from "../src/components/tool-card";

/**
 * OUTPUT 2: The public library page (Page root -> responsive web
 * HTML, no client-side JavaScript).
 *
 * The shed door: a deep-green hero with real Svg shed art (allowed
 * here, forbidden in the email), every tool as a typed
 * library.ToolCard, and the lending rules where everyone can read
 * them.
 */
export function LibraryPage({ week = lendingWeek }: { week?: LendingWeek }) {
  return (
    <Page
      theme={libraryTheme}
      width={1100}
      title={`Shed No. 7, ${week.week}`}
      description={week.summary}
      lang="en"
      style={{ gap: 0 }}
    >
      <Section
        style={{
          backgroundColor: "#1f2a1d",
          padding: [48, 40],
          gap: 20,
          mobile: { padding: [32, 20] },
        }}
        tokens={{
          colors: {
            foreground: "#f2f0e4",
            muted: "#b9c4a8",
            primary: "#c9a227",
          },
        }}
      >
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ gap: 14 }}>
            <Text
              style={{
                color: "#c9a227",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`${week.library} · ${week.week}`}
            </Text>
            <Heading level={1} style={{ fontSize: 46, mobile: { fontSize: 30 } }}>
              Borrow the drill, return the story.
            </Heading>
            <Text style={{ fontSize: 17 }}>{week.summary}</Text>
            <WeekLine week={week} />
            <Row style={{ gap: 12 }}>
              <Button href="https://shed7.example/join">
                Become a member
              </Button>
              <Button
                href="https://shed7.example/slips"
                variant="secondary"
                style={{ color: "#1f2a1d" }}
              >
                Print the loan slips
              </Button>
            </Row>
          </Column>
          <Column style={{ gap: 12, alignItems: "center" }}>
            <Svg
              width={220}
              height={170}
              viewBox="0 0 220 170"
              title="The tool shed"
            >
              <Path
                d="M10 90 L110 30 L210 90 Z"
                style={{ fill: "#c9a227" }}
              />
              <Path
                d="M30 90 H190 V160 H30 Z"
                style={{ fill: "#2d6a4f" }}
              />
              <Path
                d="M95 160 V115 H125 V160 Z"
                style={{ fill: "#f2f0e4" }}
              />
              <Path
                d="M45 105 H75 V120 H45 Z"
                style={{ fill: "#f2f0e4" }}
              />
              <Path
                d="M145 105 H175 V120 H145 Z"
                style={{ fill: "#f2f0e4" }}
              />
            </Svg>
            <ToolMark size={1} />
            <Text style={{ apply: ["quiet"], color: "#b9c4a8", textAlign: "center" }}>
              The tool mark: brass heads on green handles, one per tool
              family, the same mark your loan email and the printed
              slip carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 40], gap: 24, mobile: { padding: [24, 20] } }}>
        <OverdueBlock week={week} />
        <Heading level={2}>The twelve tools</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {week.tools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              category={tool.category}
              deposit={tool.deposit}
              loanDays={tool.loanDays}
              condition={tool.condition}
              status={tool.status}
              note={tool.note}
            />
          ))}
        </Grid>
        <Heading level={2}>How borrowing works</Heading>
        <Text style={{ color: token("colors.muted"), fontSize: 14 }}>
          Join once, borrow for a week. Pick a tool, leave a refundable
          deposit, take the manual. Bring it back clean and the deposit
          comes straight back, late returns cost a reminder, never a
          fine. Broken tools go to the repair bench, not the bin.
        </Text>
      </Section>

      <Section style={{ padding: [28, 40], mobile: { padding: [20, 20] } }}>
        <KitFooter />
      </Section>
    </Page>
  );
}

LibraryPage.PreviewProps = { week: lendingWeek };
export default LibraryPage;
