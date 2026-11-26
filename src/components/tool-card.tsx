import { Column, Row, Text, defineElement, prop, token } from "@hyper-elements/react";

/**
 * `library.ToolCard`, one tool, as a card: its name, category,
 * deposit, loan period, condition and status.
 *
 * A custom element because the tool is the kit's unit of reuse: the
 * page grids twelve of them, and a deposit typed by hand, instead of
 * read from the lending file, should be impossible, not just
 * unlikely. Props are typed with the prop.* builders.
 */
export const ToolCard = defineElement({
  type: "library.ToolCard",
  label: "Tool card",
  description:
    "One lendable tool: name, category, deposit, loan period, condition and status.",
  props: {
    name: prop.text({ label: "Tool name", required: true }),
    category: prop.text({ label: "Category", required: true }),
    deposit: prop.number({ label: "Deposit ($)", required: true }),
    loanDays: prop.number({ label: "Loan period (days)", required: true }),
    condition: prop.text({ label: "Condition", required: true }),
    status: prop.choice(["available", "on loan", "overdue", "maintenance"] as const, {
      label: "Status",
      default: "available",
    }),
    note: prop.text({ label: "Note", required: true }),
  },
  render: ({ name, category, deposit, loanDays, condition, status, note }) => {
    const statusColor =
      status === "overdue"
        ? "#991b1b"
        : status === "maintenance"
          ? "#92400e"
          : status === "available"
            ? "#166534"
            : "#1f4d2e";
    return (
      <Column
        style={{
          gap: 8,
          backgroundColor: token("colors.paper"),
          border: {
            width: 1,
            style: "solid",
            color: status === "overdue" ? "#991b1b" : token("colors.border"),
          },
          borderRadius: 8,
          padding: 18,
        }}
      >
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <Column
            style={{
              backgroundColor: "#c9a227",
              width: 10,
              height: 10,
              borderRadius: 2,
            }}
          />
          <Column
            style={{
              backgroundColor: "#1f4d2e",
              width: 5,
              height: 26,
              borderRadius: 2,
            }}
          />
          <Text style={{ fontWeight: 700, fontSize: 16 }}>{name}</Text>
          <Text
            style={{
              color: statusColor,
              fontWeight: 700,
              fontSize: 12,
              textTransform: "uppercase",
            }}
          >
            {status}
          </Text>
        </Row>
        <Text style={{ fontWeight: 700, fontSize: 15 }}>
          {category} · ${deposit} deposit · {loanDays}-day loan
        </Text>
        <Text style={{ fontSize: 14 }}>
          Condition: {condition}. {note}
        </Text>
      </Column>
    );
  },
});
