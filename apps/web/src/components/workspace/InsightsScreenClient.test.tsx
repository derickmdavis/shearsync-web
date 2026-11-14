import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InsightsScreenClient, calendarDaysBefore, localCalendarDate } from "@/src/components/workspace/InsightsScreenClient";

const api = vi.hoisted(() => ({ getInsights: vi.fn(), getInsightMetricDetail: vi.fn() }));
const auth = vi.hoisted(() => ({ withActiveAccount: vi.fn() }));

vi.mock("@/src/lib/api", () => ({
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
});
