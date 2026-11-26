import {
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Text,
} from "@hyper-elements/react";
import { lendingWeek } from "../src/data/lending";
import type { LendingWeek } from "../src/data/lending";
import { libraryTheme } from "../src/theme";
import { ToolLoansTable, ToolMark } from "../src/components/shared";

/**
 * OUTPUT 3: The loan slips (Document root -> print HTML via
 * render(), PDF via renderPdf() from @hyper-elements/react/pdf).
 *
 * One A4 slip per tool, printed for the shed counter: the tool's
 * facts, every loan out on it with its due date and computed status,
 * and a return checklist with a signature line. Document pages clip,
 * never flow, so each tool gets its own Document.Page, twelve tools,
 * twelve pages, verified from the real PDF bytes.
 */
export function LoanSlipsDocument({ week = lendingWeek }: { week?: LendingWeek }) {
  return (
    <Document
      theme={libraryTheme}
      size="A4"
      margin={42}
      title={`Loan slips, ${week.week}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <PageHeader style={{ padding: { bottom: 10 } }}>
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <ToolMark size={1} />
          <Text style={{ fontWeight: 700, fontSize: 11 }}>
            {week.library} · Loan slips · {week.week}
          </Text>
        </Row>
      </PageHeader>
      <PageFooter style={{ padding: { top: 10 } }}>
        <Text style={{ fontSize: 10, color: "#5a6b57" }}>
          Slip <PageNumber /> of <PageNumber total /> · One lending file
          rendered this slip · Shed No. 7 · {week.week}
        </Text>
      </PageFooter>

      {week.tools.map((tool) => (
        <Document.Page key={tool.id} style={{ gap: 16 }}>
          <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
            <Column style={{ gap: 4 }}>
              <Heading level={1} style={{ fontSize: 26 }}>
                {tool.name}
              </Heading>
              <Text>
                {tool.category} · ${tool.deposit} deposit · {tool.loanDays}
                -day loan · {tool.condition} · status: {tool.status}
              </Text>
            </Column>
            <Text style={{ apply: ["stamp"], color: "#1f4d2e" }}>
              SIGN OUT
            </Text>
          </Row>

          <Text>{tool.note}</Text>

          <Heading level={3}>Loans out on this tool</Heading>
          <ToolLoansTable week={week} tool={tool} />

          <Column
            style={{
              gap: 6,
              padding: { top: 12 },
              border: { top: "1px dashed #5a6b57" },
            }}
          >
            <Text style={{ fontWeight: 700 }}>
              Return checklist: tick with the shed volunteer, then sign.
            </Text>
            <Text>
              Clean [ ] · Parts counted [ ] · Manual in the case [ ] ·
              Deposit returned [ ]
            </Text>
            <Text>
              Borrower ______________________ · Volunteer
              ______________________ · Date ____________
            </Text>
          </Column>
        </Document.Page>
      ))}
    </Document>
  );
}

LoanSlipsDocument.PreviewProps = { week: lendingWeek };
export default LoanSlipsDocument;
