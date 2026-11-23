import { render, screen } from "@testing-library/react";
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

  it("shows the Why Root & Foil benefits as static cards", () => {
    render(<HomePage />);

    expect(screen.getByRole("heading", { name: "Premium" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "Focused" })).not.toBeNull();
    expect(screen.getByRole("heading", { name: "All-Access" })).not.toBeNull();
    expect(screen.getByText("Every feature for $25/month.")).not.toBeNull();
    expect(screen.queryByRole("tab", { name: "Simple" })).toBeNull();
  });
});
