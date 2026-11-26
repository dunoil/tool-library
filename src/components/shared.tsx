import {
  Column,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { LendingWeek, Loan, Tool } from "../data/lending";
import { dueStatus, loansFor, toolById } from "../data/lending";

/**
 * Shared components, plain functions returning elements, used under
 * several roots, which is exactly why the borrower email, the public
 * page and the printed slip can never disagree about a loan.
 */

/**
 * The ToolMark: a row of little tools, a brass head on a green
 * handle, each a different height, like the pegboard above a workbench.
 * Built from a Row of fixed-width Columns, never a Grid, never an Svg,
 * never an image: an Email cannot hold an Svg and inboxes block images.
 * A Grid mark scatters when its columns stretch; this Row carries an
 * explicit width.
 */
export function ToolMark({ size = 1 }: { size?: number }) {
  const heads = [0, 1, 2, 3, 4, 5];
  const heights = [26, 34, 22, 30, 18, 28];
  const width = heads.length * (12 * size + 2);
  return (
    <Row
      style={{ gap: 2 * size, width, alignItems: "end" }}
      stackOnMobile={false}
    >
      {heads.map((i) => (
        <Column
          key={i}
          style={{ gap: 0, width: 12 * size, alignItems: "center" }}
        >
          <Column
            style={{
              backgroundColor: "#c9a227",
              width: 10 * size,
              height: 8 * size,
              borderRadius: 2,
            }}
          />
          <Column
            style={{
              backgroundColor: i % 2 === 0 ? "#1f4d2e" : "#2d6a4f",
              width: 5 * size,
              height: heights[i] * size,
              borderRadius: 2,
            }}
          />
        </Column>
      ))}
    </Row>
  );
}

export function Wordmark({ week }: { week: LendingWeek }) {
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <ToolMark />
      <Column style={{ gap: 0 }}>
        <Text style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>
          TOOL LIBRARY
        </Text>
        <Text style={{ apply: ["quiet"] }}>
          {week.library} · {week.week}
        </Text>
      </Column>
    </Row>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

/** The week at a glance, as a mono line. Counts are computed, never typed. */
export function WeekLine({ week }: { week: LendingWeek }) {
  const overdue = week.loans.filter((l) => dueStatus(l) === "overdue").length;
  const dueToday = week.loans.filter((l) => dueStatus(l) === "due today").length;
  return (
    <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
      {`${week.loans.length} loans · ${week.tools.length} tools · ${overdue} overdue · ${dueToday} due today`}
    </Text>
  );
}

/** One loan as a boxed card, the borrower's own loan, first in the email. */
export function LoanFacts({
  week,
  loan,
}: {
  week: LendingWeek;
  loan: Loan;
}) {
  const tool = toolById(week, loan.toolId);
  const status = dueStatus(loan);
  const statusColor =
    status === "overdue"
      ? "#991b1b"
      : status === "due today"
        ? "#92400e"
        : status === "returned"
          ? "#166534"
          : "#1f4d2e";
  return (
    <Column
      style={{
        gap: 6,
        padding: 16,
        backgroundColor: "#f2f0e4",
        border: { width: 1, style: "solid", color: "#d3cfae" },
        borderRadius: 8,
      }}
    >
      <Text style={{ fontWeight: 700 }}>
        Your loan: {tool.name} ({tool.id})
      </Text>
      <Text style={{ fontSize: 14 }}>
        Borrowed {loan.borrowed} · due {loan.due} ·{" "}
        <Span style={{ color: statusColor, fontWeight: 700 }}>
          {status.toUpperCase()}
        </Span>{" "}
        · deposit ${tool.deposit}, refunded when it comes back clean ·{" "}
        {tool.loanDays}-day loan.
      </Text>
      <Text style={{ fontSize: 14 }}>{tool.note}</Text>
      <Text style={{ fontSize: 14 }}>
        Condition note: {loan.conditionNote}
      </Text>
    </Column>
  );
}

/** The overdue loans, called out on their own, email and page. */
export function OverdueBlock({ week }: { week: LendingWeek }) {
  const overdue = week.loans.filter((l) => dueStatus(l) === "overdue");
  if (overdue.length === 0) return null;
  return (
    <Column
      style={{
        gap: 10,
        padding: 18,
        backgroundColor: "#fdf0ee",
        border: { width: 1, style: "solid", color: "#991b1b" },
        borderRadius: 8,
      }}
    >
      <Text style={{ fontWeight: 700, color: "#991b1b" }}>
        Overdue: {overdue.length} loans, no late fees, just bring them back
      </Text>
      {overdue.slice(0, 4).map((loan) => {
        const tool = toolById(week, loan.toolId);
        return (
          <Text key={`${loan.toolId}-${loan.borrowed}-${loan.borrower}`} style={{ fontSize: 14 }}>
            <Span style={{ fontWeight: 700 }}>
              {tool.name}, {loan.borrower}, due {loan.due}.
            </Span>{" "}
            {loan.conditionNote}
          </Text>
        );
      })}
      <Text style={{ fontSize: 14 }}>
        The library charges no fines. An overdue tool is a neighbour
        waiting, so the reminder is a nudge, not a bill.
      </Text>
    </Column>
  );
}

/** Every tool as a loan table, email and document. Cells hold text/Spans. */
export function LoanTable({ week }: { week: LendingWeek }) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Tool</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Borrower</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Due</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Status</Span>
        </TableCell>
      </TableRow>
      {week.loans.slice(0, 12).map((loan) => {
        const tool = toolById(week, loan.toolId);
        const status = dueStatus(loan);
        return (
          <TableRow key={`${loan.toolId}-${loan.borrowed}-${loan.borrower}`}>
            <TableCell>
              <Span style={{ fontWeight: 700 }}>{tool.name}</Span>
            </TableCell>
            <TableCell>{loan.borrower}</TableCell>
            <TableCell>
              <Span style={{ apply: ["mono"] }}>{loan.due}</Span>
            </TableCell>
            <TableCell>
              <Span
                style={{
                  color:
                    status === "overdue"
                      ? "#991b1b"
                      : status === "due today"
                        ? "#92400e"
                        : "#1f4d2e",
                  fontWeight: 700,
                }}
              >
                {status}
              </Span>
            </TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
}

/** One tool's loans as a table, the printed slip page. */
export function ToolLoansTable({
  week,
  tool,
}: {
  week: LendingWeek;
  tool: Tool;
}) {
  const loans = loansFor(week, tool.id);
  if (loans.length === 0) {
    return <Text>No loans out this week, on the shelf, ready to go.</Text>;
  }
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Borrower</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Borrowed</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Due</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Status</Span>
        </TableCell>
      </TableRow>
      {loans.map((loan) => (
        <TableRow key={`${loan.borrowed}-${loan.borrower}`}>
          <TableCell>{loan.borrower}</TableCell>
          <TableCell>
            <Span style={{ apply: ["mono"] }}>{loan.borrowed}</Span>
          </TableCell>
          <TableCell>
            <Span style={{ apply: ["mono"] }}>{loan.due}</Span>
          </TableCell>
          <TableCell>{dueStatus(loan)}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

export function KitFooter() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        Shed No. 7 · Behind the community hall · Open Tue, Thu, Sat
        9:00 to 13:00 · Borrow the drill, return the story
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One lending file rendered this, borrower email, library page,
        loan slips and tool cards, with Hyper Elements.
      </Text>
    </Column>
  );
}
