import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ClientsScreenClient } from "@/src/components/workspace/ClientsScreenClient";

const api = vi.hoisted(() => ({
  createClient: vi.fn(),
  getAccountProfile: vi.fn(),
  getClientDetail: vi.fn(),
  getClients: vi.fn(),
}));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", () => ({
  ApiError: class ApiError extends Error {
    status: number;
    retryAfterSeconds?: number;
    constructor(message: string, status: number, _details?: unknown, _code?: string, retryAfterSeconds?: number) {
      super(message);
      this.status = status;
      this.retryAfterSeconds = retryAfterSeconds;
    }
  },
  createClient: api.createClient,
  getAccountProfile: api.getAccountProfile,
  getClientDetail: api.getClientDetail,
  getClients: api.getClients,
}));

vi.mock("@/src/lib/auth/active-account", () => ({
  AccountLifecycleError: class AccountLifecycleError extends Error {},
  withActiveAccount: auth.withActiveAccount,
}));

function client(overrides: Record<string, unknown> = {}) {
  return {
    id: "client-1",
    user_id: "user-1",
    first_name: "Ava",
    last_name: "Martinez",
    preferred_name: null,
    phone: "555-0100",
    phone_normalized: null,
    email: "ava@example.com",
    instagram: null,
    birthday: null,
    notes: null,
    preferred_contact_method: null,
    tags: null,
    source: null,
    reminder_consent: null,
    is_vip: false,
    avatar_image_id: null,
    avatar_initials: "AM",
    total_spend: 120,
    last_visit_at: null,
    completed_visit_count: 1,
    first_completed_visit_at: null,
    last_completed_visit_at: null,
    created_at: "2026-10-01T00:00:00.000Z",
    updated_at: "2026-10-01T00:00:00.000Z",
    next_appointment_at: null,
    has_future_appointment: false,
    needs_rebook: false,
    last_service: null,
    ...overrides,
  };
}

function page(data = [client()], overrides: Record<string, unknown> = {}) {
  return {
    data,
    page: 1,
    pageSize: 25,
    totalCount: data.length,
    nextCursor: null,
    insights: {
      overdue: { count: 0, supportingText: "" },
      firstTime: { count: 0, supportingText: "" },
      topSpenders: { count: 0, supportingText: "", thresholdAmount: 0, period: "lifetime" as const, percentile: 10 as const },
    },
    ...overrides,
  };
}

describe("ClientsScreenClient", () => {
  let accountId: string;

  beforeEach(() => {
    accountId = `account-${crypto.randomUUID()}`;
    api.getAccountProfile.mockResolvedValue({ timezone: "America/Denver" });
    api.getClients.mockResolvedValue(page());
    api.getClientDetail.mockResolvedValue({
      client: client(),
      identity: { display_name: "Ava Martinez", avatar_initials: "AM", avatar_url: null, avatar_image_id: null, is_vip: false },
      snapshot: { total_completed_visits: 1, total_spent: 120, last_visit_label: null },
      next_appointment: null,
      next_appointment_summary: null,
    });
    auth.withActiveAccount.mockImplementation((request) => request("token-1", { isActive: true, status: "active" }, accountId));
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("shows loading and then list data without loading detail for every row", async () => {
    render(<ClientsScreenClient />);

    expect(screen.getByText("Loading clients…")).toBeTruthy();
    await screen.findByRole("button", { name: /Ava Martinez/ });
    expect(api.getClientDetail).not.toHaveBeenCalled();
  });

  it("renders a timezone-aware next appointment and a real empty state", async () => {
    api.getClients.mockResolvedValueOnce(page([client({ next_appointment_at: "2026-10-07T14:00:00.000Z", has_future_appointment: true })]));
    const { unmount } = render(<ClientsScreenClient />);
    await screen.findByText("Oct 7, 8:00 AM");
    unmount();

    accountId = `account-${crypto.randomUUID()}`;
    api.getClients.mockResolvedValueOnce(page([]));
    render(<ClientsScreenClient />);
    await screen.findByText("No clients yet");
  });

  it("moves through pagination without allowing navigation before page one", async () => {
    api.getClients
      .mockResolvedValueOnce(page([client()], { totalCount: 26, nextCursor: "cursor-2" }))
      .mockResolvedValueOnce(page([client({ id: "client-26", first_name: "Zoe" })], { page: 2, totalCount: 26, nextCursor: null }));
    render(<ClientsScreenClient />);

    expect((await screen.findByRole("button", { name: "Previous" }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    await screen.findByText("Page 2 of 2");
    expect(api.getClients).toHaveBeenLastCalledWith("token-1", expect.objectContaining({ page: 2 }), expect.anything());
    expect((screen.getByRole("button", { name: "Next" }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("keeps the most recently selected client when detail responses race", async () => {
    const first = client({ id: "first", first_name: "Ava", last_name: "First" });
    const second = client({ id: "second", first_name: "Bea", last_name: "Second" });
    api.getClients.mockResolvedValueOnce(page([first, second]));
    let resolveFirst: (value: unknown) => void = () => undefined;
    let resolveSecond: (value: unknown) => void = () => undefined;
    api.getClientDetail.mockImplementation((id: string) => new Promise((resolve) => {
      if (id === "first") resolveFirst = resolve;
      else resolveSecond = resolve;
    }));

    render(<ClientsScreenClient />);
    fireEvent.click(await screen.findByRole("button", { name: /Ava First/ }));
    fireEvent.click(screen.getByRole("button", { name: /Bea Second/ }));
    resolveSecond({ client: second, identity: { display_name: "Bea Second", avatar_initials: "BS", avatar_url: null, avatar_image_id: null, is_vip: false }, snapshot: { total_completed_visits: 0, total_spent: 0, last_visit_label: null }, next_appointment: null, next_appointment_summary: null });
    await screen.findByRole("heading", { name: "Bea Second" });
    resolveFirst({ client: first, identity: { display_name: "Ava First", avatar_initials: "AF", avatar_url: null, avatar_image_id: null, is_vip: false }, snapshot: { total_completed_visits: 0, total_spent: 0, last_visit_label: null }, next_appointment: null, next_appointment_summary: null });
    await waitFor(() => expect(screen.getByRole("heading", { name: "Bea Second" })).toBeTruthy());
  });

  it("surfaces retryable list errors and a 404 detail as a missing client", async () => {
    const { ApiError } = await import("@/src/lib/api");
    api.getClients.mockRejectedValueOnce(new ApiError("down", 503));
    render(<ClientsScreenClient />);
    await screen.findByText("The client service is temporarily unavailable. Please try again.");

    accountId = `account-${crypto.randomUUID()}`;
    api.getClients.mockResolvedValueOnce(page());
    api.getClientDetail.mockRejectedValueOnce(new ApiError("gone", 404));
    render(<ClientsScreenClient />);
    fireEvent.click(await screen.findByRole("button", { name: /Ava Martinez/ }));
    await screen.findByText("Select a client to view their details.");
  });

  it("creates phone-only and VIP clients with the API contract", async () => {
    const created = client({ id: "created", first_name: "Nia", last_name: "Jones", phone: "555-0111", email: null, is_vip: true });
    api.createClient.mockResolvedValueOnce(created);
    render(<ClientsScreenClient />);
    await screen.findByRole("button", { name: /Ava Martinez/ });
    fireEvent.click(screen.getByRole("button", { name: /Add Client/ }));
    fireEvent.change(screen.getByLabelText("First name"), { target: { value: " Nia " } });
    fireEvent.change(screen.getByLabelText("Last name"), { target: { value: " Jones " } });
    fireEvent.change(screen.getByLabelText("Phone"), { target: { value: "555-0111" } });
    fireEvent.click(screen.getByLabelText("Mark as VIP"));
    fireEvent.click(screen.getByRole("button", { name: "Add Client" }));

    await waitFor(() => expect(api.createClient).toHaveBeenCalledWith("token-1", expect.objectContaining({ first_name: "Nia", last_name: "Jones", phone: "555-0111", is_vip: true })));
  });

  it("creates an email-only client without adding a phone field", async () => {
    api.createClient.mockResolvedValueOnce(client({ id: "email-only", first_name: "Eli", last_name: "Stone", phone: null, email: "eli@example.com" }));
    render(<ClientsScreenClient />);
    await screen.findByRole("button", { name: /Ava Martinez/ });
    fireEvent.click(screen.getByRole("button", { name: /Add Client/ }));
    fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Eli" } });
    fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Stone" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "eli@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Client" }));

    await waitFor(() => expect(api.createClient).toHaveBeenCalledWith("token-1", expect.not.objectContaining({ phone: expect.anything() })));
    expect(api.createClient).toHaveBeenCalledWith("token-1", expect.objectContaining({ email: "eli@example.com" }));
  });

  it("rejects invalid birthdays and verifies before another ambiguous create attempt", async () => {
    const { ApiError } = await import("@/src/lib/api");
    api.createClient.mockRejectedValueOnce(new ApiError("dropped", 0));
    render(<ClientsScreenClient />);
    await screen.findByRole("button", { name: /Ava Martinez/ });
    fireEvent.click(screen.getByRole("button", { name: /Add Client/ }));
    fireEvent.change(screen.getByLabelText("First name"), { target: { value: "Nia" } });
    fireEvent.change(screen.getByLabelText("Last name"), { target: { value: "Jones" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "nia@example.com" } });
    fireEvent.change(screen.getByLabelText("Birthday DD/MM"), { target: { value: "31/02" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Client" }));
    expect(screen.getByRole("alert").textContent).toContain("Birthday must use DD/MM");
    expect(api.createClient).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText("Birthday DD/MM"), { target: { value: "24/09" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Client" }));
    await screen.findByRole("button", { name: "Check for Client" });
    fireEvent.click(screen.getByRole("button", { name: "Check for Client" }));
    await waitFor(() => expect(api.getClients).toHaveBeenCalledTimes(2));
    expect(api.createClient).toHaveBeenCalledTimes(1);
  });
});
