import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import HomePage from "@/src/app/page";

vi.mock("next/image", () => ({
  default: (props: {
    alt?: string;
    fill?: boolean;
    priority?: boolean;
    [key: string]: unknown;
  }) => {
    const imageProps = { ...props };
    delete imageProps.fill;
    delete imageProps.priority;

    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={props.alt ?? ""} {...imageProps} />;
  },
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HomePage waitlist modal", () => {
  it("opens with the refined waitlist copy and closes from the dialog control", () => {
    render(<HomePage />);

    fireEvent.click(screen.getAllByRole("button", { name: "Join Waitlist" })[0]);

    expect(screen.getByRole("dialog")).toBeTruthy();
    expect(
      screen.getByText(
        "Root & Foil is opening first to a small group of independent stylists and barbers.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Be among the first to experience a simpler way to book, manage, and grow your business.",
      ),
    ).toBeTruthy();
    expect(screen.getByRole("button", { name: "GET EARLY ACCESS" })).toBeTruthy();
    expect(
      screen.getByText("We'll be in touch when early access opens."),
    ).toBeTruthy();
    expect(screen.queryByText("Private beta")).toBeNull();
    expect(screen.queryByText(/No account is created/i)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Close waitlist form" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("switches the mobile philosophy message from the accessible selector", () => {
    render(<HomePage />);

    const focusedTab = screen.getByRole("tab", { name: "Simple" });
    const tailoredTab = screen.getByRole("tab", { name: "Tailored" });
    const includedTab = screen.getByRole("tab", { name: "All-Access" });

    expect(focusedTab.getAttribute("aria-selected")).toBe("true");
    expect(tailoredTab.getAttribute("aria-selected")).toBe("false");
    expect(includedTab.getAttribute("aria-selected")).toBe("false");

    fireEvent.click(includedTab);

    expect(includedTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getAllByText("Our best ideas aren't upgrades.").length).toBeGreaterThan(0);
  });
});
