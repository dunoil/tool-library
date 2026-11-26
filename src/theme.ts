import { defineTheme } from "@hyper-elements/react";

/**
 * TOOL LIBRARY theme: "the shed": deep forest green, cream paper,
 * brass yellow, mono loan numbers.
 *
 * One theme serves all four roots, so it carries NO `mobile` blocks
 * (phone styles are an error in a Document or a Canvas); Email and
 * Page templates set their own phone styles.
 *
 * Brass #c9a227 is a shape colour only, it never sets body text.
 * Text ink is dark brass #6d4c00 or the green/brown greys, all
 * >= 4.5:1 on the cream paper. Status colours are dark enough to be
 * text: on loan green #1f4d2e, due today amber #92400e, overdue red
 * #991b1b.
 */
export const libraryTheme = defineTheme({
  colors: {
    background: "#f2f0e4",
    paper: "#fffdf4",
    foreground: "#1f2a1d",
    muted: "#5a6b57",
    primary: "#1f4d2e",
    primaryForeground: "#ffffff",
    border: "#d3cfae",
    brass: "#c9a227",
    brassInk: "#6d4c00",
    pine: "#2d6a4f",
    onLoan: "#1f4d2e",
    dueToday: "#92400e",
    overdue: "#991b1b",
    available: "#166534",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 28, xl: 44 },
  fontSizes: { sm: 12, md: 15, lg: 19, xl: 30 },
  lineHeights: { tight: 1.25, normal: 1.55 },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Inter, Helvetica, Arial, sans-serif",
    mono: "'Cascadia Code', Consolas, 'Courier New', monospace",
  },
  radii: { sm: 4, md: 8 },
  elements: {
    Heading: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
      fontWeight: 700,
      letterSpacing: -0.3,
      by: {
        level: {
          1: { fontSize: 34 },
          2: { fontSize: 23 },
          3: { fontSize: 16 },
        },
      },
    },
    Text: { fontSize: 15, lineHeight: 1.55 },
    Button: {
      backgroundColor: "#1f4d2e",
      fontWeight: 700,
      padding: [12, 22],
      borderRadius: 6,
      hover: { backgroundColor: "#163a22" },
      variants: {
        secondary: {
          backgroundColor: "#fffdf4",
          color: "#1f2a1d",
          border: { width: 1, style: "solid", color: "#1f2a1d" },
          hover: { backgroundColor: "#f2f0e4" },
        },
        small: { fontSize: 13, padding: [8, 14] },
      },
    },
    Table: { border: { bottom: "1px solid #d3cfae" } },
    TableCell: { padding: [10, 8], fontSize: 13 },
  },
  styles: {
    card: {
      backgroundColor: "#fffdf4",
      padding: 28,
      gap: 16,
      borderRadius: 8,
      border: { width: 1, style: "solid", color: "#d3cfae" },
    },
    quiet: { color: "#5a6b57", fontSize: 12 },
    eyebrow: {
      color: "#1f4d2e",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    stamp: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
      padding: [5, 10],
      border: { width: 1, style: "dashed", color: "#1f4d2e" },
      borderRadius: 4,
    },
    mono: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 13,
    },
    brassRule: {
      backgroundColor: "#c9a227",
      height: 3,
      borderRadius: 2,
    },
    pineRule: {
      backgroundColor: "#2d6a4f",
      height: 3,
      borderRadius: 2,
    },
  },
  formats: {
    email: { elements: { Button: { borderRadius: 2 } } },
    document: {
      styles: { quiet: { fontSize: 10 } },
      elements: {
        Text: { fontSize: 11, lineHeight: 1.45 },
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
    canvas: {
      elements: {
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
        Text: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof libraryTheme;
  }
}
