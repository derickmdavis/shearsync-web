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

describe("HomePage", () => {
  it("links waitlist calls to the dedicated waitlist page", () => {
    render(<HomePage />);

    const callsToAction = screen.getAllByRole("link", { name: /Join (the )?waitlist/i });
    expect(callsToAction).toHaveLength(2);
    callsToAction.forEach((callToAction) => {
      expect(callToAction.getAttribute("href")).toBe("/waitlist");
    });
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
