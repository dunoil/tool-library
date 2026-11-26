import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Text,
} from "@hyper-elements/react";
import { lendingWeek } from "../src/data/lending";
import type { Borrower, LendingWeek } from "../src/data/lending";
import { dueStatus } from "../src/data/lending";
import { libraryTheme } from "../src/theme";
import {
  KitFooter,
  LoanFacts,
  LoanTable,
  OverdueBlock,
  WeekLine,
  Wordmark,
} from "../src/components/shared";

/**
 * OUTPUT 1: The borrower email (Email root -> email-safe HTML + a
 * plain-text twin from the same render).
 *
 * Personal in the way a library needs: each borrower gets their own
 * loan first, tool, due date, deposit, condition note, with the
 * status computed from the file, then the week's loans and the return
 * checklist. No Svg, no remote images: the ToolMark is layout, so the
 * email survives image-blocking inboxes.
 */
export function BorrowerEmail({
  week = lendingWeek,
  borrower,
}: {
  week?: LendingWeek;
  borrower?: Borrower;
}) {
  const loan = borrower ? week.loans[borrower.loanIndex] : undefined;
  const status = loan ? dueStatus(loan) : undefined;
  return (
    <Email
      theme={libraryTheme}
      width={600}
      previewText={
        loan
          ? `Your loan: due ${loan.due} (${status}), return checklist inside.`
          : "This week at Shed No. 7: 48 loans out, 12 tools, no fines."
      }
      title={`Your tool loan, ${week.week}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark week={week} />
        <Heading level={1} style={{ mobile: { fontSize: 26 } }}>
          Hello, <MergeTag name="first_name" />
        </Heading>
        <Text>{week.summary}</Text>
        <WeekLine week={week} />
        {loan ? <LoanFacts week={week} loan={loan} /> : null}
        <OverdueBlock week={week} />
        <Heading level={2}>Loans out this week</Heading>
        <LoanTable week={week} />
        <Heading level={2}>Bringing it back</Heading>
        <Text>
          Clean it, coil it, count the parts against the case card, and
          hand it to the shed volunteer, who checks it with you. Your
          deposit comes back the moment the tool is checked in clean.
          Late is fine, the library charges no fines, only reminders.
        </Text>
        <Button href="https://shed7.example/loans">
          See your loans
        </Button>
        {borrower ? (
          <Text style={{ apply: ["quiet"] }}>
            Loan notice for {borrower.ref}. The due date above is computed
            from the lending file, the same date the printed loan slip
            shows.
          </Text>
        ) : null}
      </Column>
      <KitFooter />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You receive loan notices because you borrow from Shed No. 7.{" "}
        <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

BorrowerEmail.PreviewProps = { week: lendingWeek };
export default BorrowerEmail;
