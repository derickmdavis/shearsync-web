import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { ClientsTabPanel } from "@/src/components/account/AccountPanels";
import type { ClientReferralLoadState } from "@/src/components/account/account-types";
import type { Customer, ReferralLink, ReferralStats } from "@/src/lib/api";

describe("ClientsTabPanel", () => {
  it("shows referral empty state, creates a link, renders it, and copies it", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<ClientReferralHarness />);

    fireEvent.click(screen.getByRole("button", { name: "View referral" }));

    expect(
      screen.getByText("Create a referral link for this client."),
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "Create referral link" }),
    );

    expect(screen.getByText("https://dripdesk.test/r/rf_client123")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        "https://dripdesk.test/r/rf_client123",
      );
    });
  });
});

function ClientReferralHarness() {
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [referralStates, setReferralStates] = useState<
    Record<string, ClientReferralLoadState>
  >({});

  function handleClientToggle(clientId: string) {
    const isClosing = selectedClientId === clientId;

    setSelectedClientId(isClosing ? null : clientId);

    if (!isClosing && !referralStates[clientId]) {
      setReferralStates((currentStates) => ({
        ...currentStates,
        [clientId]: {
          status: "ready",
          link: null,
          stats: makeReferralStats(),
        },
      }));
    }
  }

  function handleCreateReferralLink(clientId: string) {
    setReferralStates((currentStates) => ({
      ...currentStates,
      [clientId]: {
        status: "ready",
        link: makeReferralLink(),
        stats: makeReferralStats(),
      },
    }));
  }

  return (
    <ClientsTabPanel
      clients={[makeCustomer()]}
      loadState={{ status: "ready" }}
      selectedClientId={selectedClientId}
      referralStates={referralStates}
      creatingReferralClientId={null}
      canNativeShare={false}
      onClientToggle={handleClientToggle}
      onCreateReferralLink={handleCreateReferralLink}
      onReferralRetry={() => undefined}
      onMessage={() => undefined}
      onRetry={() => undefined}
    />
  );
}

function makeCustomer(): Customer {
  return {
    id: "client-1",
    user_id: "user-1",
    first_name: "Ava",
    last_name: "Martinez",
    preferred_name: null,
    phone: "(720) 555-0103",
    phone_normalized: "+17205550103",
    email: "ava@example.com",
    instagram: null,
    birthday: null,
    notes: null,
    preferred_contact_method: null,
    tags: null,
    source: null,
    reminder_consent: null,
    total_spend: null,
    last_visit_at: null,
    created_at: "2026-05-12T18:00:00.000Z",
    updated_at: "2026-05-12T18:00:00.000Z",
  };
}

function makeReferralLink(): ReferralLink {
  return {
    id: "referral-link-1",
    user_id: "user-1",
    client_id: "client-1",
    referral_code: "rf_client123",
    referral_url: "https://dripdesk.test/r/rf_client123",
    status: "active",
    created_at: "2026-05-12T18:00:00.000Z",
    updated_at: "2026-05-12T18:00:00.000Z",
  };
}

function makeReferralStats(): ReferralStats {
  return {
    referral_link_id: "referral-link-1",
    referral_code: "rf_client123",
    referral_url: "https://dripdesk.test/r/rf_client123",
    opened_count: 3,
    booking_attributed_count: 1,
  };
}
