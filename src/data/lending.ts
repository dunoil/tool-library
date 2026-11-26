/**
 * The lending file, the kit's single source of truth.
 *
 * One week at Shed No. 7, the neighbourhood tool library: twelve
 * tools, each with its category, deposit, loan period, condition and
 * status, and forty-eight loans, each with its borrower, dates and
 * condition note. The borrower emails, the public library page, the
 * printed loan slips and the tool cards all read this file, so they
 * can never disagree about who has the drill, or when it is due back.
 *
 * "Today" is fixed in the file (Thursday 26 November 2026), never
 * read from the clock, so a re-run of the batch reproduces the same
 * due dates, the same overdue list and the same reminders.
 */

export type ToolStatus = "available" | "on loan" | "overdue" | "maintenance";

export interface Tool {
  /** Stable tool id, e.g. "TL-01". */
  id: string;
  name: string;
  category: string;
  deposit: number; // dollars, refunded when the tool comes back clean
  loanDays: number;
  condition: string;
  status: ToolStatus;
  note: string;
}

export interface Loan {
  borrower: string;
  toolId: string;
  borrowed: string;
  due: string; // ISO date, e.g. "2026-11-26"
  returned: boolean;
  conditionNote: string;
}

export interface LendingWeek {
  library: string;
  shed: string;
  week: string;
  today: string; // fixed "today" for due-date math
  summary: string;
  tools: Tool[];
  loans: Loan[];
}

export const TODAY = "2026-11-26";

/** Due status, computed from the fixed today, never typed by hand. */
export function dueStatus(loan: Loan): "overdue" | "due today" | "on loan" | "returned" {
  if (loan.returned) return "returned";
  if (loan.due < TODAY) return "overdue";
  if (loan.due === TODAY) return "due today";
  return "on loan";
}

/** The loans for one tool, in due-date order. */
export function loansFor(week: LendingWeek, toolId: string): Loan[] {
  return week.loans
    .filter((l) => l.toolId === toolId)
    .sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : 0));
}

export function toolById(week: LendingWeek, id: string): Tool {
  const tool = week.tools.find((t) => t.id === id);
  if (!tool) throw new Error(`unknown tool ${id}`);
  return tool;
}

export const lendingWeek: LendingWeek = {
  library: "Shed No. 7, the Neighbourhood Tool Library",
  shed: "Shed No. 7, behind the community hall",
  week: "Lending week, 23 to 29 November 2026",
  today: "Thursday 26 November 2026",
  summary:
    "Forty-eight loans out this week, and the shed still lends like a library, not a shop: every tool comes with its manual, its deposit is refunded when it comes back clean, and nobody pays for a tool they only needed once. Eleven loans are overdue, six are due today, four are already returned, and the rest are out doing honest work.",
  tools: [
    {
      id: "TL-01",
      name: "Cordless drill driver",
      category: "Drilling",
      deposit: 40,
      loanDays: 7,
      condition: "Serviced, new chuck, October",
      status: "on loan",
      note: "The most borrowed tool in the shed. Two batteries in the case, charger included, and the torque ring set to 8 for plasterboard.",
    },
    {
      id: "TL-02",
      name: "Circular saw",
      category: "Cutting",
      deposit: 60,
      loanDays: 3,
      condition: "Good, blade replaced in November",
      status: "overdue",
      note: "Short loan, sharp blade. The guard works and the riving knife stays on, no exceptions, and the safety card is signed at pickup.",
    },
    {
      id: "TL-03",
      name: "Pressure washer",
      category: "Cleaning",
      deposit: 80,
      loanDays: 3,
      condition: "Good, seals checked weekly",
      status: "on loan",
      note: "Two nozzles: fan for the deck, jet for the driveway. Return it with the hose coiled, not knotted.",
    },
    {
      id: "TL-04",
      name: "Hedge trimmer",
      category: "Garden",
      deposit: 45,
      loanDays: 7,
      condition: "Serviced, blades sharpened",
      status: "available",
      note: "Quiet enough for a Sunday morning, long enough for the back hedge. The blade cover goes back on before it leaves the shed.",
    },
    {
      id: "TL-05",
      name: "Tile cutter",
      category: "Cutting",
      deposit: 35,
      loanDays: 7,
      condition: "Good, spare wheel in the box",
      status: "on loan",
      note: "Scores porcelain up to 600 mm. Practice on the offcut in the box first; the first tile is never the good one.",
    },
    {
      id: "TL-06",
      name: "Extension ladder, 6 m",
      category: "Access",
      deposit: 50,
      loanDays: 3,
      condition: "Good, feet replaced in October",
      status: "on loan",
      note: "Two people to carry it, one to foot it. It reaches the gutter of a two-storey house and no higher, by design.",
    },
    {
      id: "TL-07",
      name: "Laser level and stud finder",
      category: "Measuring",
      deposit: 25,
      loanDays: 7,
      condition: "New, donated in September",
      status: "available",
      note: "The quiet hero of every shelf-hanging Saturday. Batteries included; the case has a printed quick-start card inside the lid.",
    },
    {
      id: "TL-08",
      name: "Orbital sander",
      category: "Sanding",
      deposit: 30,
      loanDays: 7,
      condition: "Good, dust bag washed",
      status: "overdue",
      note: "Three grits in the box, 80, 120 and 240. Start coarse, finish fine, and the table will forgive the first pass.",
    },
    {
      id: "TL-09",
      name: "Paint sprayer",
      category: "Painting",
      deposit: 55,
      loanDays: 3,
      condition: "Serviced, seals and filters new",
      status: "on loan",
      note: "Fence panels in an afternoon. Clean it the same day you use it, dried paint in a sprayer is a repair, not a return.",
    },
    {
      id: "TL-10",
      name: "Post-hole digger",
      category: "Garden",
      deposit: 20,
      loanDays: 7,
      condition: "Good, handles re-waxed",
      status: "available",
      note: "For fences, not for revenge on tree stumps. Two handles, one rhythm, and the hole is straight if you let the tool do the work.",
    },
    {
      id: "TL-11",
      name: "Angle grinder",
      category: "Cutting",
      deposit: 45,
      loanDays: 3,
      condition: "Good, guard and handle checked",
      status: "maintenance",
      note: "In the workshop this week: the guard catch is being replaced. It comes back when the catch holds, not before.",
    },
    {
      id: "TL-12",
      name: "Carpet cleaner",
      category: "Cleaning",
      deposit: 65,
      loanDays: 3,
      condition: "Serviced, tank descaled",
      status: "on loan",
      note: "One tank of solution in the box, enough for a living room. Empty the dirty tank before you bring it back, nobody's week needs that smell.",
    },
  ],
  loans: [],
};

export interface Borrower {
  firstName: string;
  loanIndex: number;
  ref: string;
}

export const sampleBorrower: Borrower = {
  firstName: "Mara",
  loanIndex: 0,
  ref: "MBR-0101",
};

const FIRST = [
  "Mara", "Tom", "Priya", "Sam", "Elena", "Jonas", "Aisha", "Ruth",
  "Diego", "Nadia", "Felix", "Grace", "Omar", "Iris", "Hugo", "Lena",
  "Marco", "Tara", "Ben", "Sofia",
];

/**
 * Deterministic dates. Each tool is loaned four times a week, and the
 * occurrence number k = floor(i / 12) staggers each repeat, so no two
 * loans on the same tool share a borrower, a borrowed date or a due
 * date. Counts below are verified by the batch, never guessed.
 */
function dueFor(i: number): string {
  const k = Math.floor(i / 12);
  return `2026-11-${24 + ((i + 2 * k) % 8)}`;
}

function borrowedFor(i: number): string {
  const k = Math.floor(i / 12);
  return `2026-11-${20 + ((i + k) % 6)}`;
}

/**
 * Deterministic loan generation, no clock, no randomness.
 * Regenerating the batch after fixing one record reproduces every
 * other record byte-for-byte, which is what makes a corrections pass
 * honest.
 */
export function makeLoans(count: number): Loan[] {
  const out: Loan[] = [];
  const notes = [
    "Picked up clean, case wiped down.",
    "Blade cover on, battery charged at pickup.",
    "Hose coiled, nozzles in the bag.",
    "Dust bag emptied before it left the shed.",
    "Charger and both batteries in the case.",
    "Handles wiped, blade cover on at pickup.",
  ];
  for (let i = 0; i < count; i++) {
    out.push({
      borrower: FIRST[(i * 7 + 2 + Math.floor(i / 12)) % FIRST.length],
      toolId: lendingWeek.tools[i % lendingWeek.tools.length].id,
      borrowed: borrowedFor(i),
      due: dueFor(i),
      returned: i % 12 === 11,
      conditionNote: notes[i % notes.length],
    });
  }
  return out;
}

export function makeBorrowers(count: number): Borrower[] {
  const out: Borrower[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      firstName: FIRST[(i * 7 + 2 + Math.floor(i / 12)) % FIRST.length],
      loanIndex: i,
      ref: `MBR-${String(101 + ((i * 37) % 880)).padStart(4, "0")}`,
    });
  }
  return out;
}

/** The week's loans, generated once and shared by every template. */
lendingWeek.loans = makeLoans(48);
