# TOOL LIBRARY, design notes

## Concept

A template kit for a community tool-lending library's lending week.
One lending file (12 tools with category, deposit, loan period,
condition and status; 48 loans with borrower, dates and condition
note) renders personalised borrower emails, the public library page,
printed A4 loan slips and square tool cards. Style: "the shed", deep
forest green `#1f2a1d`, cream `#f2f0e4`, brass `#c9a227`, mono loan
numbers.

Signature: the **ToolMark**, a row of little tools, brass heads on
green handles of different heights, like the pegboard above a
workbench, built from a Row of fixed-width Columns so it works in an
inbox, on the page, on the printed slip and on the card. The kit's
rule is a library rule: **a loan's status is computed, never typed**.
`dueStatus()` compares each loan's due date with the fixed today in
the file (Thursday 26 November 2026), so the email, the page and the
slip can never disagree about what is overdue. The library charges no
fines, so the overdue block is a nudge, not a bill, and that is
written into the copy, not just the design.

## Build lessons

- The first gate run passed at 0 errors, 0 warnings on the first try,
  the accumulated traps from nine earlier kits paying off.
- The first slip screenshot caught a data smell, not a layout bug:
  every tool's four loans showed the same borrower four times with
  identical dates, because the name step (5) and the tool cycle (12)
  shared a factor with the name list (20). Fixed by staggering each
  repeat with its occurrence number, then verifying per-tool
  distinctness and recounting the statuses (11 overdue, 6 due today,
  4 returned) before touching the summary prose. The summary is the
  only hard-coded count in the kit; everything else counts itself.
- Condition notes were first written as return notes ("Returned with
  the case wiped down"), which read wrong on a loan still out. They
  are now pickup notes, true for any status.
