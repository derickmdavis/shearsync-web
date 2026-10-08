"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import {
  ApiError,
  captureBookingAttributionContext,
  type BookingAttributionCapture,
  type StoredAttribution,
} from "@/src/lib/api";

const HANDOFF_PARAM = "booking_attribution_handoff_token";
const PENDING_HANDOFF_STORAGE_KEY = "rf.pending_attribution_handoff";
const ATTRIBUTION_STORAGE_KEY = "rf.booking_attribution.v1";
const MAX_STORED_ATTRIBUTIONS = 10;

type BookingAttributionContextValue = {
  attribution: StoredAttribution | null;
  clearAttribution: () => void;
};

const BookingAttributionContext = createContext<BookingAttributionContextValue>({
  attribution: null,
  clearAttribution: () => {},
});

// A handoff is single-use, so concurrent Strict Mode effects or route remounts
// share its in-flight request. Settled entries are removed immediately to avoid
// retaining bearer values in browser memory for the life of the tab.
const capturePromises = new Map<string, Promise<BookingAttributionCapture>>();

type PendingAttributionHandoff = {
  handoff: string;
  stylistSlug: string;
  retryAttempted: boolean;
};

type BookingAttributionGateProps = {
  stylistSlug: string;
  children: ReactNode;
};

export function BookingAttributionGate({
  stylistSlug,
  children,
}: BookingAttributionGateProps) {
  const [ready, setReady] = useState(false);
  const [attribution, setAttribution] = useState<StoredAttribution | null>(null);
  const clearAttribution = useCallback(() => {
    clearStoredBookingAttribution(stylistSlug);
    setAttribution(null);
  }, [stylistSlug]);

  useLayoutEffect(() => {
    const pendingHandoff = takeAttributionHandoff(stylistSlug);
    let active = true;

    if (!pendingHandoff) {
      setAttribution(getStoredBookingAttribution(stylistSlug));
      setReady(true);
      return () => {
        active = false;
      };
    }

    if (pendingHandoff.retryAttempted) {
      // A previous page instance already made the one permitted retry. Do not
      // turn reloads into unbounded capture attempts; discard the handoff and
      // continue with an unattributed normal booking flow.
      clearPendingAttributionHandoff();
      setAttribution(null);
      setReady(true);
      return () => {
        active = false;
      };
    }

    void captureAttributionWithRetry(pendingHandoff)
      .then((captured) => {
        if (!active) {
          return;
        }

        const storedAttribution = {
          token: captured.bookingAttributionToken,
          expiresAt: captured.expiresAt,
          stylistSlug,
        };
        clearPendingAttributionHandoff();
        saveStoredBookingAttribution(storedAttribution);
        // This page-scoped value remains authoritative for the active tab,
        // even if another tab later updates the last-known local record.
        setAttribution(storedAttribution);
      })
      .catch((error: unknown) => {
        // Invalid and malformed handoffs cannot recover. Other failures are
        // allowed to continue into the normal booking flow with the pending
        // handoff retained for no more than one controlled retry.
        if (isTerminalHandoffFailure(error)) {
          clearPendingAttributionHandoff();
        }
      })
      .finally(() => {
        if (active) {
          setReady(true);
        }
      });

    return () => {
      active = false;
    };
  }, [stylistSlug]);

  if (!ready) {
    return (
      <div
        className="flex min-h-[240px] items-center justify-center px-4 py-12"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="text-center">
          <div
            className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand/25 border-t-brand"
            aria-hidden="true"
          />
          <p className="mt-4 text-sm font-medium text-foreground">
            Preparing your booking
          </p>
          <p className="mt-1 text-sm text-muted">Just a moment…</p>
        </div>
      </div>
    );
  }

  return (
    <BookingAttributionContext.Provider value={{ attribution, clearAttribution }}>
      {children}
    </BookingAttributionContext.Provider>
  );
}

export function useBookingAttribution() {
  return useContext(BookingAttributionContext).attribution;
}

export function useClearBookingAttribution() {
  return useContext(BookingAttributionContext).clearAttribution;
}

function takeAttributionHandoff(
  stylistSlug: string,
): PendingAttributionHandoff | null {
  const url = new URL(window.location.href);
  const handoff = url.searchParams.get(HANDOFF_PARAM);

  if (url.searchParams.has(HANDOFF_PARAM)) {
    const pending = handoff
      ? { handoff, stylistSlug, retryAttempted: false }
      : null;
    if (pending) {
      savePendingAttributionHandoff(pending);
    }
    url.searchParams.delete(HANDOFF_PARAM);
    window.history.replaceState(
      window.history.state,
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
    return pending;
  }

  const pending = readPendingAttributionHandoff();

  if (pending && pending.stylistSlug !== stylistSlug) {
    clearPendingAttributionHandoff();
    return null;
  }

  return pending;
}

function readPendingAttributionHandoff(): PendingAttributionHandoff | null {
  try {
    const raw = sessionStorage.getItem(PENDING_HANDOFF_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    try {
      const parsed = JSON.parse(raw) as unknown;
      if (
        isRecord(parsed)
        && typeof parsed.handoff === "string"
        && parsed.handoff
        && typeof parsed.stylistSlug === "string"
        && parsed.stylistSlug
        && typeof parsed.retryAttempted === "boolean"
      ) {
        return {
          handoff: parsed.handoff,
          stylistSlug: parsed.stylistSlug,
          retryAttempted: parsed.retryAttempted,
        };
      }
    } catch {
      // Fall through to remove an unreadable pending capability.
    }

    clearPendingAttributionHandoff();
    return null;
  } catch {
    return null;
  }
}

function savePendingAttributionHandoff(pending: PendingAttributionHandoff) {
  try {
    sessionStorage.setItem(PENDING_HANDOFF_STORAGE_KEY, JSON.stringify(pending));
  } catch {
    // The initial capture can still proceed from the in-memory value.
  }
}

function captureAttributionWithRetry(pending: PendingAttributionHandoff) {
  const existing = capturePromises.get(pending.handoff);

  if (existing) {
    return existing;
  }

  const capture = (async () => {
    try {
      return await captureBookingAttributionContext(pending.handoff);
    } catch (error) {
      if (!isRetryableCaptureFailure(error) || pending.retryAttempted) {
        throw error;
      }

      savePendingAttributionHandoff({ ...pending, retryAttempted: true });
      return captureBookingAttributionContext(pending.handoff);
    }
  })();
  capturePromises.set(pending.handoff, capture);
  void capture
    .finally(() => {
      // Do not let an older completion remove a newer request for the same
      // opaque value.
      if (capturePromises.get(pending.handoff) === capture) {
        capturePromises.delete(pending.handoff);
      }
    })
    .catch(() => {
      // The caller owns the capture failure path; this branch only prevents
      // the cleanup chain from becoming an unhandled rejected promise.
    });
  return capture;
}

function isTerminalHandoffFailure(error: unknown) {
  return (
    error instanceof ApiError
    && ((error.status === 404 && error.code === "booking_attribution_handoff_invalid")
      || (error.status === 400 && error.code === "validation_failed"))
  );
}

function isRetryableCaptureFailure(error: unknown) {
  return error instanceof ApiError && error.status === 0;
}

function clearPendingAttributionHandoff() {
  try {
    sessionStorage.removeItem(PENDING_HANDOFF_STORAGE_KEY);
  } catch {
    // Storage cleanup must not interrupt booking.
  }
}

export function getStoredBookingAttribution(stylistSlug: string) {
  return readStoredAttributions().get(stylistSlug) ?? null;
}

export function saveStoredBookingAttribution(attribution: StoredAttribution) {
  if (!isStoredAttribution(attribution) || attribution.stylistSlug !== attribution.stylistSlug.trim()) {
    return;
  }

  const records = readStoredAttributions();
  records.delete(attribution.stylistSlug);
  records.set(attribution.stylistSlug, attribution);

  while (records.size > MAX_STORED_ATTRIBUTIONS) {
    const oldestSlug = records.keys().next().value;
    if (!oldestSlug) {
      break;
    }
    records.delete(oldestSlug);
  }

  writeStoredAttributions(records);
}

export function clearStoredBookingAttribution(stylistSlug: string) {
  const records = readStoredAttributions();
  records.delete(stylistSlug);
  writeStoredAttributions(records);
}

function readStoredAttributions() {
  const records = new Map<string, StoredAttribution>();

  try {
    const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) {
      return records;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!isRecord(parsed)) {
      localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return records;
    }

    for (const [slug, value] of Object.entries(parsed)) {
      if (isStoredAttribution(value) && value.stylistSlug === slug) {
        records.set(slug, value);
      }
    }

    while (records.size > MAX_STORED_ATTRIBUTIONS) {
      const oldestSlug = records.keys().next().value;
      if (!oldestSlug) {
        break;
      }
      records.delete(oldestSlug);
    }

    writeStoredAttributions(records);
    return records;
  } catch {
    try {
      localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
    } catch {
      // Storage may be unavailable; continue without persisted attribution.
    }
    return records;
  }
}

function writeStoredAttributions(records: Map<string, StoredAttribution>) {
  try {
    if (records.size === 0) {
      localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return;
    }

    localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(Object.fromEntries(records)),
    );
  } catch {
    // Persisted attribution is optional and must never interrupt booking.
  }
}

function isStoredAttribution(value: unknown): value is StoredAttribution {
  return (
    isRecord(value)
    && typeof value.token === "string"
    && Boolean(value.token)
    && typeof value.expiresAt === "string"
    && Date.parse(value.expiresAt) > Date.now()
    && typeof value.stylistSlug === "string"
    && Boolean(value.stylistSlug)
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
