import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  ClientsTabPanel,
  ProfileTabPanel,
} from "@/src/components/account/AccountPanels";
import type { ClientReferralLoadState } from "@/src/components/account/account-types";
import type {
  AccountPlan,
  AccountProfile,
  Customer,
  ReferralLink,
  ReferralStats,
} from "@/src/lib/api";

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

describe("ProfileTabPanel", () => {
  it("renders bounded Instagram and booking-request-form settings", () => {
    const onBookingRequestFormEnabledChange = vi.fn();
    const onPublicPreview = vi.fn();

    render(
      <ProfileTabPanel
        profile={makeAccountProfile()}
        plan={makeAccountPlan()}
        profileForm={{
          full_name: "Maya Johnson",
          phone_number: "(720) 555-0103",
          business_name: "Maya Studio",
          location_label: "Denver, CO",
          avatar_image_id: "avatar-1",
          timezone: "America/Denver",
        }}
        publicForm={{
          slug: "maya-johnson",
          display_name: "Maya Johnson",
          bio: "Lived-in color specialist",
          instagram: "@mayajohnsonhair",
          cover_photo_url: "",
          booking_enabled: true,
          booking_request_form_enabled: false,
        }}
        publicUrl="https://dripdesk.test/book/maya-johnson"
        authBusy={false}
        newPassword=""
        savingProfile={false}
        savingPublic={false}
        previewingPublic={false}
        previewError={null}
        previewCooldownSeconds={0}
        canUpgrade
        onNewPasswordChange={() => undefined}
        onPasswordSubmit={(event) => event.preventDefault()}
        onSignOut={() => undefined}
        onProfileFieldChange={() => undefined}
        onProfileSubmit={(event) => event.preventDefault()}
        onPublicFieldChange={() => undefined}
        onBookingEnabledChange={() => undefined}
        onBookingRequestFormEnabledChange={onBookingRequestFormEnabledChange}
        onPublicSubmit={(event) => event.preventDefault()}
        onPublicPreview={onPublicPreview}
        onPreviewSettingsRefresh={() => undefined}
        onCancel={() => undefined}
        onSoon={() => undefined}
      />,
    );

    expect(
      screen
        .getAllByDisplayValue("Maya Johnson")
        .find((input) => input.getAttribute("maxlength") === "160")
        ?.getAttribute("maxlength"),
    ).toBe("160");
    expect(
      screen.getByDisplayValue("@mayajohnsonhair").getAttribute("maxlength"),
    ).toBe("100");

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: /booking request form enabled/i,
      }),
    );

    expect(onBookingRequestFormEnabledChange).toHaveBeenCalledWith(true);

    fireEvent.click(
      screen.getByRole("button", { name: "Preview booking page" }),
    );

    expect(onPublicPreview).toHaveBeenCalledOnce();
  });

  it("disables Preview while its retry cooldown is active", () => {
    render(
      <ProfileTabPanel
        profile={makeAccountProfile()}
        plan={makeAccountPlan()}
        profileForm={{
          full_name: "Maya Johnson",
          phone_number: "(720) 555-0103",
          business_name: "Maya Studio",
          location_label: "Denver, CO",
          avatar_image_id: "avatar-1",
          timezone: "America/Denver",
        }}
        publicForm={{
          slug: "maya-johnson",
          display_name: "Maya Johnson",
          bio: "",
          instagram: "",
          cover_photo_url: "",
          booking_enabled: true,
          booking_request_form_enabled: false,
        }}
        publicUrl="https://dripdesk.test/book/maya-johnson"
        authBusy={false}
        newPassword=""
        savingProfile={false}
        savingPublic={false}
        previewingPublic={false}
        previewError={{
          message: "Preview creation is temporarily limited.",
        }}
        previewCooldownSeconds={12}
        canUpgrade
        onNewPasswordChange={() => undefined}
        onPasswordSubmit={(event) => event.preventDefault()}
        onSignOut={() => undefined}
        onProfileFieldChange={() => undefined}
        onProfileSubmit={(event) => event.preventDefault()}
        onPublicFieldChange={() => undefined}
        onBookingEnabledChange={() => undefined}
        onBookingRequestFormEnabledChange={() => undefined}
        onPublicSubmit={(event) => event.preventDefault()}
        onPublicPreview={() => undefined}
        onPreviewSettingsRefresh={() => undefined}
        onCancel={() => undefined}
        onSoon={() => undefined}
      />,
    );

    expect(
      screen.getByRole("button", { name: "Try again in 12s" }),
    ).toHaveProperty("disabled", true);
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

function makeAccountProfile(): AccountProfile {
  return {
    id: "profile-1",
    email: "maya@example.com",
    full_name: "Maya Johnson",
    phone_number: "(720) 555-0103",
    business_name: "Maya Studio",
    timezone: "America/Denver",
    location_label: "Denver, CO",
    avatar_image_id: "avatar-1",
    created_at: "2026-05-12T18:00:00.000Z",
    updated_at: "2026-05-12T18:00:00.000Z",
  };
}

function makeAccountPlan(): AccountPlan {
  return {
    tier: "pro",
    status: "active",
    displayName: "Pro",
    smsMonthlyLimit: 500,
    smsUsedThisMonth: 12,
    smsRemainingThisMonth: 488,
    features: {
      bookingPage: true,
      crm: true,
      emailReminders: true,
      smsReminders: true,
      customCoverPhoto: true,
      customSlug: true,
      googleCalendarSync: false,
      weeklyBusinessRecap: false,
      clientExport: false,
    },
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
