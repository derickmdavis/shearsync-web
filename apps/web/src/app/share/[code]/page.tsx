import type { Metadata } from "next";
import { ReferralSharePageClient } from "@/src/components/referrals/ReferralSharePageClient";

type SharePageProps = {
  params: Promise<{ code: string }>;
};

export const metadata: Metadata = {
  title: "Share your stylist | Root & Foil",
  robots: { index: false, follow: false },
};

export default async function SharePage({ params }: SharePageProps) {
  const { code } = await params;
  return <ReferralSharePageClient referralCode={code} />;
}
