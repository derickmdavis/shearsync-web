import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DetailsStep } from "./DetailsStep";

describe("DetailsStep service categories", () => {
  it("starts categorized services collapsed and expands each category independently", () => {
    render(
      <DetailsStep
        mode="services"
        values={{ fullName: "Jane Smith", email: "jane@example.com", phone: "555-0103" }}
        errors={{}}
        services={[
          { id: "cut", name: "Haircut", category: "Cuts", durationMinutes: 60, price: 95, isActive: true, isDefault: false, sortOrder: 0 },
          { id: "color", name: "Color", category: "Color", durationMinutes: 90, price: 140, isActive: true, isDefault: false, sortOrder: 1 },
        ]}
        intake={null}
        intakeLoading={false}
        servicesLoading={false}
        selectedServices={[]}
        canBeginServiceSelection
        showServicePicker
        onChange={vi.fn()}
        onToggleService={vi.fn()}
        onContinue={vi.fn()}
      />,
    );

    const cuts = screen.getByRole("button", { name: "Cuts" });
    const color = screen.getByRole("button", { name: "Color" });
    expect(cuts.getAttribute("aria-expanded")).toBe("false");
    expect(color.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Haircut")).toBeNull();
    expect(screen.queryByText("Color", { selector: "p" })).toBeNull();

    fireEvent.click(cuts);
    expect(cuts.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Haircut")).toBeTruthy();
    expect(screen.queryByText("Color", { selector: "p" })).toBeNull();
  });
});
