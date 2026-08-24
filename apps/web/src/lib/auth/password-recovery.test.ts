import { describe, expect, it, vi } from "vitest";
import {
  consumePasswordRecoveryCallback,
  isPasswordRecoveryCallback,
} from "@/src/lib/auth/password-recovery";

const session = {
  access_token: "access-token",
  refresh_token: "refresh-token",
} as never;

function makeClient() {
  return {
    auth: {
      exchangeCodeForSession: vi.fn().mockResolvedValue({
        data: { session },
        error: null,
      }),
      setSession: vi.fn().mockResolvedValue({
        data: { session },
        error: null,
      }),
    },
  };
}

describe("password recovery callback handling", () => {
  it("exchanges a recovery code exactly once", async () => {
    const client = makeClient();
    const url = "https://www.rootfoil.app/reset-password?code=one-time-code";

    expect(isPasswordRecoveryCallback(url)).toBe(true);
    await consumePasswordRecoveryCallback(client, url);

    expect(client.auth.exchangeCodeForSession).toHaveBeenCalledTimes(1);
    expect(client.auth.exchangeCodeForSession).toHaveBeenCalledWith(
      "one-time-code",
    );
    expect(client.auth.setSession).not.toHaveBeenCalled();
  });

  it("establishes a session from fragment tokens", async () => {
    const client = makeClient();
    const url = "https://www.rootfoil.app/reset-password#access_token=access-token&refresh_token=refresh-token";

    await consumePasswordRecoveryCallback(client, url);

    expect(client.auth.setSession).toHaveBeenCalledWith({
      access_token: "access-token",
      refresh_token: "refresh-token",
    });
    expect(client.auth.exchangeCodeForSession).not.toHaveBeenCalled();
  });

  it("rejects callback URLs without a code or complete token pair", async () => {
    const client = makeClient();

    expect(
      isPasswordRecoveryCallback("https://www.rootfoil.app/reset-password"),
    ).toBe(false);
    await expect(
      consumePasswordRecoveryCallback(
        client,
        "https://www.rootfoil.app/reset-password#access_token=access-token",
      ),
    ).rejects.toThrow("Invalid or expired password recovery link.");
  });
});
