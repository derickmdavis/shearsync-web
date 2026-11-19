import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InsightsScreenClient, calendarDateInTimezone, calendarDaysBefore, localCalendarDate } from "@/src/components/workspace/InsightsScreenClient";

const api = vi.hoisted(() => ({ getAccountProfile: vi.fn(), getInsights: vi.fn(), getInsightMetricDetail: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", () => ({
  getAccountProfile: api.getAccountProfile,
  getInsights: api.getInsights,
  getInsightMetricDetail: api.getInsightMetricDetail,
}));

vi.mock("@/src/lib/auth/active-account", () => ({
  withActiveAccount: auth.withActiveAccount,
}));

describe("InsightsScreenClient", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 10, 13, 20));
    api.getAccountProfile.mockResolvedValue({ timezone: "America/Denver" });
    api.getInsights.mockResolvedValue({ metrics: [] });
    auth.withActiveAccount.mockImplementation((request) => request("token-1"));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("formats reporting dates as local calendar dates rather than UTC dates", () => {
    expect(localCalendarDate(new Date(2026, 10, 13, 20))).toBe("2026-11-13");
    expect(calendarDaysBefore("2026-11-13", 29)).toBe("2026-10-15");
    expect(calendarDateInTimezone(new Date("2026-11-14T01:00:00Z"), "America/Denver")).toBe("2026-11-13");
  });

  it("waits for hydration before requesting a non-future local date range", async () => {
    render(<InsightsScreenClient />);

    await act(async () => { await vi.runAllTimersAsync(); });
    expect(api.getInsights).toHaveBeenCalledTimes(2);
    expect(api.getInsights).toHaveBeenNthCalledWith(1, {
      startDate: "2026-10-15",
      endDate: "2026-11-13",
      preset: "last30",
      comparisonMode: "none",
    }, "token-1");
    expect(api.getInsights).toHaveBeenNthCalledWith(2, expect.any(Object), "token-1", true);
  });

  it("renders the at-risk sparkline from dated trend buckets", async () => {
    api.getInsights.mockImplementation((_selection, _token, trends) => Promise.resolve(trends ? {
      trends: [{ metric_id: "at_risk_clients", buckets: [{ date: "2026-10-15", value: 0 }, { date: "2026-10-16", value: 2 }] }],
    } : {
      metrics: [{ id: "at_risk_clients", unit: "count", result: { value: 2 } }],
    }));

    render(<InsightsScreenClient />);

    await act(async () => { await vi.runAllTimersAsync(); });
    expect(screen.getAllByLabelText("At-Risk Clients trend")).toHaveLength(2);
    expect(screen.getAllByLabelText("At-Risk Clients trend")[1].querySelector("polygon")).not.toBeNull();
  });

  it("uses compact presets and the previous-period comparison switch", async () => {
    render(<InsightsScreenClient />);
    await act(async () => { await vi.runAllTimersAsync(); });

    expect(screen.getByRole("button", { name: "30 Days" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getAllByText("Oct 15 – Nov 13")).toHaveLength(2);

    fireEvent.click(screen.getByRole("button", { name: "7 Days" }));
    fireEvent.click(screen.getByRole("switch", { name: "Compare" }));
    await act(async () => { await vi.runAllTimersAsync(); });

    expect(screen.getByRole("switch", { name: "Compare" }).getAttribute("aria-checked")).toBe("true");
    expect(api.getInsights).toHaveBeenCalledWith({
      startDate: "2026-11-07",
      endDate: "2026-11-13",
      preset: "last7",
      comparisonMode: "previous",
    }, "token-1");
  });

  it("applies a custom date range through the compact picker", async () => {
    render(<InsightsScreenClient />);
    await act(async () => { await vi.runAllTimersAsync(); });

    fireEvent.click(screen.getByRole("button", { name: "Custom" }));
    fireEvent.change(screen.getByLabelText("Custom start date"), { target: { value: "2026-11-01" } });
    fireEvent.change(screen.getByLabelText("Custom end date"), { target: { value: "2026-11-10" } });
    fireEvent.click(screen.getByRole("button", { name: "Apply" }));
    await act(async () => { await vi.runAllTimersAsync(); });

    expect(screen.getByRole("button", { name: "Custom" }).getAttribute("aria-pressed")).toBe("true");
    expect(api.getInsights).toHaveBeenCalledWith({
      startDate: "2026-11-01",
      endDate: "2026-11-10",
      preset: "custom",
      comparisonMode: "none",
    }, "token-1");
  });
});
