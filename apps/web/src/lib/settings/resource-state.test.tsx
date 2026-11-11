import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSettingsResource } from "./resource-state";

describe("useSettingsResource", () => {
  it("keeps a draft on failure and replaces baseline and draft after save", async () => {
    const { result } = renderHook(() => useSettingsResource({ name: "Saved" }));
    act(() => result.current.updateDraft((value) => ({ ...value, name: "Draft" })));
    await act(async () => {
      await result.current.save(async () => { throw new Error("Server validation failed"); });
    });
    expect(result.current.baseline).toEqual({ name: "Saved" });
    expect(result.current.draft).toEqual({ name: "Draft" });
    expect(result.current.error).toBe("Server validation failed");

    await act(async () => {
      await result.current.save(async () => ({ name: "Canonical" }));
    });
    expect(result.current.baseline).toEqual({ name: "Canonical" });
    expect(result.current.draft).toEqual({ name: "Canonical" });
  });
});
