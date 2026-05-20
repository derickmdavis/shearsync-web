import { BookingFlow } from "@/src/components/booking/BookingFlow";
import {
  ApiError,
  getPublicStylist,
  type PublicStylist,
} from "@/src/lib/api";

type BookingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BookingPage(props: BookingPageProps) {
  const { slug } = await props.params;

  let stylist: PublicStylist | null = null;

  try {
    stylist = await getPublicStylist(slug);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return (
        <main className="flex min-h-screen items-center justify-center px-4 py-10">
          <div className="w-full max-w-[430px] rounded-[30px] border border-white/80 bg-card p-8 text-center shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
            <p className="font-display text-4xl font-semibold italic text-foreground">
              DripDesk
            </p>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
              Stylist not found
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              We couldn&apos;t find that booking page. Please double-check the
              link or contact your stylist directly.
            </p>
          </div>
        </main>
      );
    }

    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-[430px] rounded-[30px] border border-white/80 bg-card p-8 shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Booking unavailable
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            {error instanceof Error
              ? error.message
              : "We couldn't load this booking page right now."}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-[430px]">
        <BookingFlow slug={slug} stylist={stylist} />
      </div>
    </main>
  );
}
