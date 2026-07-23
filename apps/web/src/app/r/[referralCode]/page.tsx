import { redirect } from "next/navigation";
import { resolvePublicReferral, type PublicReferralResponse } from "@/src/lib/api";

type ReferralPageProps = {
  params: Promise<{
    referralCode: string;
  }>;
};

export default async function ReferralPage(props: ReferralPageProps) {
  const { referralCode } = await props.params;
  let referral: PublicReferralResponse | null = null;

  try {
    referral = await resolvePublicReferral(referralCode);
  } catch {
    return <InvalidReferralLink />;
  }

  redirect(
    `/book/${encodeURIComponent(referral.stylistSlug)}?ref=${encodeURIComponent(
      referral.referralCode,
    )}`,
  );
}

function InvalidReferralLink() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-[430px] rounded-[30px] border border-white/80 bg-card p-8 text-center shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
        <p className="font-display text-4xl font-semibold italic text-foreground">
          DripDesk
        </p>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
          Referral link unavailable
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          This referral link may be invalid or expired. Please ask your stylist
          for a fresh booking link.
        </p>
      </div>
    </main>
  );
}
