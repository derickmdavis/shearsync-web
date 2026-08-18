export type Status = "Active" | "At Risk" | "Churn Risk" | "Inactive";
export type PageKey = "overview" | "health" | "accounts" | "insights" | "revenue" | "messaging" | "automations" | "settings";

export interface OpsAccount {
  id: string; name: string; location: string; plan: string; mrr: number; status: Status;
  healthScore: number; lastActivity: string; owner: string;
}

export const accounts: OpsAccount[] = [
  { id: "acc-01", name: "The Hair Collective", location: "Portland, OR", plan: "Professional", mrr: 24560, status: "Active", healthScore: 96, lastActivity: "2h ago", owner: "Alex Kim" },
  { id: "acc-02", name: "Gloss & Grace", location: "Denver, CO", plan: "Professional", mrr: 21430, status: "Active", healthScore: 92, lastActivity: "3h ago", owner: "Maya Tran" },
  { id: "acc-03", name: "Bella + Co.", location: "Austin, TX", plan: "Professional", mrr: 18920, status: "Active", healthScore: 89, lastActivity: "5h ago", owner: "Jordan Davis" },
  { id: "acc-04", name: "Sunset Studio", location: "Los Angeles, CA", plan: "Professional", mrr: 16780, status: "At Risk", healthScore: 72, lastActivity: "1d ago", owner: "Alex Kim" },
  { id: "acc-05", name: "Willow & Co.", location: "Nashville, TN", plan: "Professional", mrr: 14320, status: "Active", healthScore: 85, lastActivity: "4h ago", owner: "Maya Tran" },
  { id: "acc-06", name: "Halo Studio", location: "Brooklyn, NY", plan: "Professional", mrr: 12280, status: "At Risk", healthScore: 68, lastActivity: "3d ago", owner: "Sophie Park" },
  { id: "acc-07", name: "Luxe Hair Studio", location: "Scottsdale, AZ", plan: "Professional", mrr: 10860, status: "Churn Risk", healthScore: 43, lastActivity: "6d ago", owner: "Jordan Davis" },
  { id: "acc-08", name: "Indigo", location: "Chicago, IL", plan: "Starter", mrr: 7640, status: "Inactive", healthScore: 22, lastActivity: "12d ago", owner: "Sophie Park" },
];

export const overviewMetrics = [
  ["Active Accounts", "1,243", "↑ 8.6%", "positive"], ["Monthly Recurring Revenue", "$428,940", "↑ 12.4%", "positive"],
  ["Trial-to-Paid Conversion", "32.7%", "↑ 4.3pp", "positive"], ["Churn Risk Accounts", "23", "↑ 4", "negative"], ["Support Health Score", "96%", "↑ 2pp", "positive"],
] as const;

export const activity = ["New account created · Gloss & Grace", "Payment received · The Hair Collective", "Trial started · Studio Eight", "Account downgraded · Blackbird Hair", "Payment failed · Halo Studio"];
export const alerts = [["Failed payment", "12", "danger"], ["Trial ending soon", "18", "warning"], ["Low usage", "7", "warning"], ["Overdue follow-up", "5", "danger"]] as const;
export const navItems: { key: PageKey; label: string; href: string; icon: string }[] = [
  { key: "overview", label: "Overview", href: "/", icon: "⌂" }, { key: "health", label: "Health", href: "/health", icon: "♡" },
  { key: "accounts", label: "Accounts", href: "/accounts", icon: "◉" }, { key: "insights", label: "Customer Insights", href: "/insights", icon: "◌" },
  { key: "revenue", label: "Revenue", href: "/revenue", icon: "⌁" }, { key: "messaging", label: "Messaging", href: "/messaging", icon: "◈" },
  { key: "automations", label: "Automations", href: "/automations", icon: "↗" }, { key: "settings", label: "Settings", href: "/settings", icon: "⚙" },
];

export const weeklyRevenue = [48, 52, 51, 58, 61, 59, 66, 68, 73, 76, 74, 82];
export const accountGrowth = [68, 76, 83, 78, 91, 98, 104, 112];
export const recentRuns = ["Rebook Nudge", "Thank You", "Birthday", "Trial Ending Soon", "Failed Payment Follow-up"];
