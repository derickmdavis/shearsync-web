import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PreviewUrlCleanup } from "@/src/components/booking/PreviewUrlCleanup";

afterEach(() => {
  vi.restoreAllMocks();
  window.history.replaceState({}, "", "/");
});

describe("PreviewUrlCleanup", () => {
  it("removes only the preview capability from the visible URL", async () => {
    const storageSetItem = vi.spyOn(Storage.prototype, "setItem");
    const storageGetItem = vi.spyOn(Storage.prototype, "getItem");
    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?preview=PVW_secret&ref=rf_client123#details",
    );

    render(<PreviewUrlCleanup />);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/book/maya-johnson");
      expect(window.location.search).toBe("?ref=rf_client123");
      expect(window.location.hash).toBe("#details");
    });

    expect(storageSetItem).not.toHaveBeenCalled();
    expect(storageGetItem).not.toHaveBeenCalled();
  });
});
