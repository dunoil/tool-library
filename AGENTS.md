Templates use Hyper Elements (@hyper-elements/react).
If it isn't installed, install it with react and react-dom.
Before writing a template, read node_modules/@hyper-elements/react/GUIDE.md.

Validate every template, fix errors, review warnings, and inspect outline() before rendering.

# TOOL LIBRARY invariants, do not break these

1. ONE source of truth. All content comes from src/data/lending.ts.
   Never hard-code tool, loan or borrower data inside a template.
2. ONE theme. All styling tokens live in src/theme.ts (defineTheme).
   Templates refer to tokens with token("..."); they do not invent palettes.
3. The ToolMark is a Row of fixed-width Columns, never a Grid, never
   an Svg and never an Image. An Email cannot hold an Svg; the mark
   must survive image-blocking inboxes. A Grid mark scatters when its
   columns stretch, the mark is a Row with an explicit width.
4. No Svg in templates/borrower-email.tsx. No remote images in the email at all.
5. No margins anywhere. Space between blocks is the parent's gap;
   space inside a box is its padding. Roots take no padding.
6. Styles go in style={{ }}, never as props. A root's width is a prop.
7. Brass #c9a227 is for shapes; brass ink #6d4c00 is for text. Never
   set body text in bright brass, contrast fails on cream. Text ink
   is the green/brown greys (≥ 4.5:1 on cream). Status colours are
   dark green/amber/red, text-safe.
8. A loan's due status is ONLY ever the dueStatus() computation in
   the data file (fixed today, 26 Nov 2026). Never write a status by
   hand anywhere.
9. Every template default-exports its component and sets PreviewProps,
   so `npx hyper-elements check templates/` keeps working.
10. The gate runs first. scripts/check.tsx (or the gate inside
    make-loans.tsx) must pass before any batch render. Never delete
    the gate to make a run pass.
11. Loan data is deterministic. No Date.now(), no Math.random()
    in src/data/lending.ts, a corrections run must re-render only
    changed records. (Date.now() in the batch script only times the run.)
12. Document pages clip, never flow. Paginate explicitly: one tool per
    Document.Page, and verify the PDF page count from the real bytes.
