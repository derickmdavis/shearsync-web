import type { AccountPlan } from "@/src/lib/api";

export const accountNavItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "profile", label: "Profile" },
  { id: "clients", label: "Clients" },
  { id: "appointments", label: "Appointments" },
] as const;

export type AccountTab = (typeof accountNavItems)[number]["id"];

export const planNotes = [
  {
    tier: "basic",
    name: "Basic",
    description: "Simple CRM, booking page access, and email reminders.",
  },
  {
    tier: "pro",
    name: "Pro",
    description: "Adds SMS reminders, custom links, and calendar sync.",
  },
  {
    tier: "premium",
    name: "Premium",
    description: "Advanced automation, exports, and weekly business recaps.",
  },
] as const;

export const featureLabels: Record<keyof AccountPlan["features"], string> = {
  bookingPage: "Booking page",
  crm: "Client CRM",
  emailReminders: "Email reminders",
  smsReminders: "SMS reminders",
  customCoverPhoto: "Custom cover photo",
  customSlug: "Custom booking link",
  googleCalendarSync: "Google Calendar sync",
  weeklyBusinessRecap: "Weekly business recap",
  clientExport: "Client export",
};

export type Toast = {
  id: number;
  message: string;
};

export type LoadState =
  | { status: "config"; message: string }
  | { status: "auth" }
  | { status: "loading" }
  | { status: "ready" }
  | { status: "error"; message: string };

export type ClientsLoadState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready" }
  | { status: "error"; message: string };

export type AuthMode = "sign-in" | "sign-up" | "reset";

export type ProfileForm = {
  full_name: string;
  phone_number: string;
  business_name: string;
  location_label: string;
  avatar_image_id: string;
  timezone: string;
};

export type PublicProfileForm = {
  slug: string;
  display_name: string;
  bio: string;
  cover_photo_url: string;
  booking_enabled: boolean;
};
