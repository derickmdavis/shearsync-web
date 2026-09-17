"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getPublicServices,
  setActiveBookingPreviewToken,
  type BookingPreviewContext,
  type PublicService,
  type PublicStylist,
} from "@/src/lib/api";
import { formatCurrency, formatDuration } from "@/src/lib/booking-format";
import { PublicBookingProfile } from "@/src/components/booking/PublicBookingProfile";

type BookingPreviewFlowProps = {
  preview: BookingPreviewContext;
  stylist: PublicStylist;
  previewToken: string;
};

type ServiceState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "ready"; services: PublicService[] }
  | { status: "error" };

export function BookingPreviewFlow({
  preview,
  stylist,
  previewToken,
}: BookingPreviewFlowProps) {
  const [serviceState, setServiceState] = useState<ServiceState>({
    status: "loading",
  });
  const capabilities = preview.preview_capabilities;
  const canReadPublicData =
    preview.preview_mode === true && capabilities.allow_public_reads === true;
  const previewDisablesBooking = capabilities.allow_booking_submission === false;
  const previewDisablesWaitlist = capabilities.allow_waitlist_submission === false;
  const previewDisablesUploads = capabilities.allow_uploads === false;
  const previewDisablesPayments = capabilities.allow_payments === false;
  const previewDisablesAnalytics = capabilities.allow_analytics === false;
  const services = useMemo(
    () =>
      serviceState.status === "ready"
        ? [...serviceState.services].sort(
            (left, right) => left.sortOrder - right.sortOrder,
          )
        : [],
    [serviceState],
  );

  useEffect(() => {
    setActiveBookingPreviewToken(previewToken);

    return () => {
      setActiveBookingPreviewToken(null);
    };
  }, [previewToken]);

  useEffect(() => {
    if (!canReadPublicData) {
      return;
    }

    let cancelled = false;

    void getPublicServices(preview.slug)
      .then((nextServices) => {
        if (!cancelled) {
          setServiceState({ status: "ready", services: nextServices });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setServiceState({ status: "error" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [canReadPublicData, preview.slug]);

  return (
    <div className="rounded-[30px] border border-white/80 bg-card p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] sm:p-8 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
      <PublicBookingProfile stylist={stylist} />

      <div className="mt-8 lg:mt-0 lg:min-w-0">
        <section
          aria-label="Preview status"
          className="rounded-3xl border border-brand/30 bg-brand-soft p-6"
        >
          <p className="text-sm font-bold uppercase tracking-[0.08em] text-brand">
            Preview
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            Preview — booking is disabled
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            This is a read-only view of your booking page. Customers cannot
            submit bookings, join the waitlist, upload photos, or make payments.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Services
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Services are displayed for preview only and cannot be selected.
          </p>

          {!canReadPublicData ? (
            <p className="mt-4 rounded-2xl bg-zinc-50 px-4 py-3 text-sm text-muted">
              Public service data is unavailable for this preview.
            </p>
          ) : serviceState.status === "loading" ? (
            <p className="mt-4 text-sm text-muted">Loading services…</p>
          ) : serviceState.status === "error" ? (
            <p className="mt-4 text-sm text-muted">
              Services could not be loaded for this preview.
            </p>
          ) : services.length ? (
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="rounded-2xl border border-border bg-white p-4"
                >
                  <p className="font-semibold text-foreground">
                    {service.name}
                  </p>
                  {service.description ? (
                    <p className="mt-1 text-sm leading-5 text-muted">
                      {service.description}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-muted">
                    {formatDuration(service.durationMinutes)} · {formatCurrency(service.price)}
                  </p>
                </li>
              ))}
            </ul>
          ) : serviceState.status === "ready" ? (
            <p className="mt-4 text-sm text-muted">
              No services are currently available.
            </p>
          ) : null}
        </section>

        <p className="mt-6 text-xs text-muted">
          {previewDisablesBooking && previewDisablesWaitlist && previewDisablesUploads && previewDisablesPayments && previewDisablesAnalytics
            ? "All booking actions, uploads, payments, and analytics are disabled in this preview."
            : "This preview is running with its resolver-provided capabilities."}
        </p>
      </div>
    </div>
  );
}
