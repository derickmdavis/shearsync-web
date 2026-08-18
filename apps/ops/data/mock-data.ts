export type Status = "Active" | "At Risk" | "Churn Risk" | "Inactive";
export type PageKey = "overview" | "health" | "accounts" | "insights" | "revenue" | "messaging" | "automations" | "content" | "support" | "settings";

export type ContentDestination = "Website" | "App";
export type ContentStatus = "Published" | "Draft" | "Scheduled";

export interface ContentItem {
  id: string;
  title: string;
  destination: ContentDestination;
  area: string;
  status: ContentStatus;
  updatedBy: string;
  updatedAt: string;
}

export type SupportSource = "Website" | "App";
export type SupportStatus = "Open" | "In Progress" | "Done";

export interface SupportTicket {
  id: string;
  sender: string;
  email: string;
  account: string;
  source: SupportSource;
  subject: string;
  message: string;
  submittedAt: string;
  status: SupportStatus;
}

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
  { key: "automations", label: "Automations", href: "/automations", icon: "↗" }, { key: "content", label: "Content Management", href: "/content", icon: "▤" },
  { key: "support", label: "Support", href: "/support", icon: "?" },
  { key: "settings", label: "Settings", href: "/settings", icon: "⚙" },
];

export const contentSummary = [
  ["Content Items", "24", "Across app and website", "neutral"],
  ["Published", "18", "Live now", "positive"],
  ["Drafts", "4", "Needs review", "warning"],
  ["Scheduled", "2", "Next: Jun 14", "neutral"],
  ["Last Publish", "Today", "2:18 PM", "positive"],
] as const;

export const contentItems: ContentItem[] = [
  { id: "website-home", title: "Homepage hero", destination: "Website", area: "rootfoil.com / Home", status: "Published", updatedBy: "Alex Kim", updatedAt: "12 min ago" },
  { id: "website-pricing", title: "Plans & pricing", destination: "Website", area: "rootfoil.com / Pricing", status: "Draft", updatedBy: "Maya Tran", updatedAt: "Yesterday" },
  { id: "website-barber", title: "For barbers landing page", destination: "Website", area: "rootfoil.com / Barber", status: "Published", updatedBy: "Alex Kim", updatedAt: "May 28" },
  { id: "website-waitlist", title: "Waitlist confirmation", destination: "Website", area: "rootfoil.com / Waitlist", status: "Scheduled", updatedBy: "Jordan Davis", updatedAt: "Jun 14, 9:00 AM" },
  { id: "app-booking", title: "Booking service descriptions", destination: "App", area: "rootfoil.app / Booking", status: "Published", updatedBy: "Sophie Park", updatedAt: "3h ago" },
  { id: "app-referral", title: "Referral reward message", destination: "App", area: "rootfoil.app / Referrals", status: "Draft", updatedBy: "Alex Kim", updatedAt: "Yesterday" },
  { id: "app-empty-state", title: "Appointments empty state", destination: "App", area: "rootfoil.app / Appointments", status: "Published", updatedBy: "Maya Tran", updatedAt: "May 30" },
  { id: "app-account", title: "Account settings help text", destination: "App", area: "rootfoil.app / Account", status: "Scheduled", updatedBy: "Jordan Davis", updatedAt: "Jun 18, 10:00 AM" },
];

export const supportSummary = [
  ["Open Tickets", "8", "3 new today", "negative"],
  ["In Progress", "3", "Assigned to the team", "warning"],
  ["Done Today", "5", "Average 2h 14m", "positive"],
  ["First Response", "42m", "Within target", "positive"],
  ["Website / App", "5 / 6", "Tickets this week", "neutral"],
] as const;

export const supportTickets: SupportTicket[] = [
  { id: "sup-1042", sender: "Mia Thompson", email: "mia@thehaircollective.com", account: "The Hair Collective", source: "App", subject: "Unable to update a recurring appointment", message: "I’m trying to move a recurring client appointment to next Tuesday, but the time picker closes before I can save. I’ve tried from both the appointment detail screen and the calendar.", submittedAt: "Jun 11, 2025 · 10:42 AM", status: "Open" },
  { id: "sup-1041", sender: "Jordan Lee", email: "jordan@glossandgrace.com", account: "Gloss & Grace", source: "Website", subject: "Question about the Professional plan", message: "Could you confirm whether the Professional plan includes automated rebooking reminders for every stylist on our team?", submittedAt: "Jun 11, 2025 · 9:18 AM", status: "In Progress" },
  { id: "sup-1040", sender: "Nora Williams", email: "nora@bellaco.com", account: "Bella + Co.", source: "App", subject: "Client notes are not showing", message: "A client’s notes appear when I edit their profile but not when I open their appointment. Is there a setting I need to turn on?", submittedAt: "Jun 10, 2025 · 4:36 PM", status: "Open" },
  { id: "sup-1039", sender: "Evan Brooks", email: "evan@sunsetstudio.com", account: "Sunset Studio", source: "Website", subject: "Can I change my billing date?", message: "Our billing date falls before our monthly payroll. Is it possible to move the renewal to the fifteenth of each month?", submittedAt: "Jun 10, 2025 · 2:05 PM", status: "Done" },
  { id: "sup-1038", sender: "Avery Chen", email: "avery@willowandco.com", account: "Willow & Co.", source: "App", subject: "Booking link shows the wrong location", message: "The booking link shared from my profile is showing our old location. The account settings have already been updated.", submittedAt: "Jun 10, 2025 · 11:29 AM", status: "Open" },
  { id: "sup-1037", sender: "Taylor Morgan", email: "taylor@halostudio.com", account: "Halo Studio", source: "Website", subject: "Need help importing clients", message: "I have a CSV export from our prior booking tool. What fields should I include to import client names, contact details, and notes?", submittedAt: "Jun 9, 2025 · 3:51 PM", status: "In Progress" },
];

export const weeklyRevenue = [48, 52, 51, 58, 61, 59, 66, 68, 73, 76, 74, 82];
export const accountGrowth = [68, 76, 83, 78, 91, 98, 104, 112];
export const recentRuns = ["Rebook Nudge", "Thank You", "Birthday", "Trial Ending Soon", "Failed Payment Follow-up"];
