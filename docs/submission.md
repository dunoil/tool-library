# Competition submission, TOOL LIBRARY (posted 27 Nov 2026)
Discussion: https://github.com/hyper-elements/hyper-elements/discussions/367

Target: GitHub Discussions, **Challenge Submissions** in `hyper-elements/hyper-elements`
Repository: https://github.com/dunoil/tool-library
All numbers below come from the actual run on 26 Nov 2026 (`out/checks.json`, `out/batch.json`).

---

### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
TOOL LIBRARY: Borrow the drill, return the story, a community tool-lending library kit (borrower email, library page, printed loan-slip PDF, tool cards from one lending file)

### Project description

One lending file in → **48 personalised borrower emails, a 12-page loan-slip PDF, a public library page and 12 tool cards** out, from one theme and one set of shared components.

A tool library runs on trust and on dates. If the email says the circular saw is due on the 25th and the slip on the shed counter says the 28th, the saw comes back three days late and the next borrower waits on a fence half built. This kit makes disagreement impossible by construction, and its central rule is a library rule: **a loan's status is computed, never typed**. `dueStatus()` compares each loan's due date with the fixed today in the file, so no output anywhere can call a loan "on loan" that the file knows is overdue. The library charges no fines, so the overdue block is a nudge, not a bill, and that is written into the copy, not just the design.

- **Borrower email** (`Email` → `render()`), each borrower's own loan first (tool, due date, deposit, condition note), the overdue list, the week's loans, and the return checklist. No Svg, no remote images: the ToolMark (a row of little tools, brass heads on green handles, like the pegboard above a workbench) is a `Row` of fixed-width `Column`s, so the email survives image-blocking inboxes. `MergeTag` greeting; plain-text twin from the same render.
- **Library page** (`Page` → `render()`), a deep-forest hero with real `Svg` shed art (allowed here, forbidden in the email), every tool as a typed `library.ToolCard`, and how borrowing works where everyone can read it. No client-side JavaScript.
- **Loan slips** (`Document` → `renderPdf()`), one A4 slip per tool, printed for the shed counter: the tool's facts, every loan out on it with its computed status, a return checklist and a signature line. Document pages clip, never flow, so each tool gets its own page, twelve tools, twelve pages, verified from the real PDF bytes. No browser makes this PDF.
- **Tool cards** (`Canvas` → `renderImage()`), 1080x1080 PNGs, one per tool, the deposit and loan period as the heroes on a deep forest ground. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (26 Nov 2026):** 48 borrower emails · 12 loan slips in one 12-page PDF · 12 tool cards · **gate: 0 errors, 0 warnings** · full batch in **4.0s**.

**Corrections pass:** loan generation is deterministic (no clock, no randomness), and each repeat loan on a tool is staggered so no two loans on one tool share a borrower or a date, so fixing one record re-renders only that record, the other 47 emails are byte-identical.

### Public GitHub repository URL
https://github.com/dunoil/tool-library

### How did you use Hyper Elements?

- **One `defineTheme()`** carries all four roots, deep forest green, cream, brass, named `card`/`stamp`/`mono` styles, Button variants, per-format overrides. The theme carries no `mobile` blocks on purpose, phone styles are an error in a Document or a Canvas.
- **Shared components across roots** (`Wordmark`, `ToolMark`, `WeekLine`, `LoanFacts`, `OverdueBlock`, `LoanTable`, `ToolLoansTable`) are why the emailed loan and the printed loan are the same loan.
- **Each root plays to its medium.** The Page gets full `Svg` shed art; the Email, which cannot hold an Svg, gets the ToolMark as layout instead, the same information, drawn the way each medium allows.
- **A custom element with `defineElement()`**: `library.ToolCard` with typed props (`prop.text`, `prop.number`, `prop.choice`). A mistyped deposit is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** The batch validates before writing a single file. `out/checks.json` makes the verdict a file instead of a claim.
- **Token scopes for the dark grounds**: the Page hero and the Canvas card invert via `tokens` on a Section/Column, the theme itself never changes.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): 5 previews of the email as classic Outlook, Gmail and Apple Mail draw it; screenshots in `docs/`.
- **CLI-ready**: `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 26 Nov 2026).
- **Written for agents too** (`AGENTS.md`): twelve invariants an agent must not break, including "a loan's due status is only ever the `dueStatus()` computation" and "Document pages clip, never flow".

**Run it:** `npm install && npm run check && npm run render && npm run make` (48 emails) · `npm run make:sample` (12) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind. Shed No. 7 is fictional; its tools and borrowers are sample data.

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the borrower email (HTML + plain text), the library page, the loan slips as a PDF and the most borrowed tool's card PNG, all from the demo run, and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [x] I have starred the Hyper Elements repository. (Starred 18 Nov 2026; same account.)
- [x] My repository is public and contains the complete source code and required README.
- [x] My submission meets the requirements of the selected challenge.
