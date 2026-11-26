# Examples, real artefacts from the demo run

Produced by `npm run render` on the sample week in
`src/data/lending.ts` (Shed No. 7, lending week 23 to 29 November
2026). Nothing here is hand-made: if it is in this folder, the
library rendered it.

- `borrower-email.html` / `borrower-email.txt`, the borrower loan
  email and its plain-text twin (the greeting shows `{{first_name}}`
  because the sample renders the template itself; the batch fills real
  names and puts each borrower's own loan first).
- `library-page.html`, the public library page.
- `loan-slips.pdf`, the printed slips: one A4 page per tool, with its
  loans, a return checklist and a signature line.
- `tool-card.png`, the most borrowed tool as a square card
  (1080x1080).

Regenerate everything with `npm run check && npm run render`.
