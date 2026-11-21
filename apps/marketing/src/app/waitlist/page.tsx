import type { Metadata } from "next";
import { WaitlistPage } from "./waitlist-page";

export const metadata: Metadata = {
  title: "Join the waitlist | Root & Foil",
  description: "Get early access to Root & Foil.",
};

export default function WaitlistRoute() {
  return <WaitlistPage />;
}
