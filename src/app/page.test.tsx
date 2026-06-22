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
      screen.getByText("Join the list and we'll reach out when we're ready."),
    ).toBeTruthy();
    expect(screen.queryByText("Private beta")).toBeNull();
    expect(screen.queryByText(/No account is created/i)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Close waitlist form" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
