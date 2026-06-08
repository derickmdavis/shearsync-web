import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { BookingFlow } from "@/src/components/booking/BookingFlow";
import type {
  PublicBookingIntakeData,
  PublicService,
  PublicStylist,
  RawAvailabilityRow,
} from "@/src/lib/api";
import * as bookingApi from "@/src/lib/api";

const bookingApiMocks = vi.hoisted(() => ({
  createPublicBooking: vi.fn(),
  createPublicBookingIntake: vi.fn(),
  getPublicAvailability: vi.fn(),
  getPublicServices: vi.fn(),
  getPublicSlots: vi.fn(),
  joinWaitlist: vi.fn(),
}));

vi.mock("@/src/lib/api", async () => {
  const actual = await vi.importActual<typeof import("@/src/lib/api")>(
    "@/src/lib/api",
  );

  return {
    ...actual,
    ...bookingApiMocks,
  };
});

const baseStylist: PublicStylist = {
  id: "stylist-1",
  slug: "maya-johnson",
  display_name: "Maya Johnson",
  bio: "Lived-in color specialist",
  cover_photo_url: null,
  instagram: null,
  booking_enabled: true,
  business_name: "Maya Johnson Hair",
  phone_number: "555-0101",
  timezone: "America/Denver",
};

function createService(
  id: string,
  name: string,
  durationMinutes = 60,
): PublicService {
  return {
    id,
    name,
    durationMinutes,
    price: 95,
    isActive: true,
    isDefault: false,
    sortOrder: 0,
  };
}

function createIntake(
  overrides: Partial<PublicBookingIntakeData> = {},
): PublicBookingIntakeData {
  return {
    matchStatus: "matched",
    clientFound: true,
    isExistingClient: true,
    bookingContextToken: "token-1",
    bookingEnabled: true,
    client: {
      id: "client-1",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phoneMasked: "***-***-0103",
    },
    submittedContact: {
      fullName: "Jane Smith",
      phoneNormalized: "+17205550103",
      email: "jane@example.com",
    },
    recommendedService: null,
    bookingBehavior: {
      requiresApproval: false,
      restrictedToNewClientRules: false,
      canUseReturningClientRules: true,
      message: "Welcome back — you can book directly.",
    },
    ...overrides,
  };
}

function createAvailabilityRow(
  audience: RawAvailabilityRow["client_audience"],
): RawAvailabilityRow {
  return {
    id: `availability-${audience}`,
    user_id: "user-1",
    day_of_week: 1,
    start_time: "09:00:00",
    end_time: "17:00:00",
    is_active: true,
    client_audience: audience,
  };
}

function setupMockReferences() {
  return {
    createPublicBooking: vi.mocked(bookingApi.createPublicBooking),
    createPublicBookingIntake: vi.mocked(bookingApi.createPublicBookingIntake),
    getPublicServices: vi.mocked(bookingApi.getPublicServices),
    getPublicAvailability: vi.mocked(bookingApi.getPublicAvailability),
    getPublicSlots: vi.mocked(bookingApi.getPublicSlots),
    joinWaitlist: vi.mocked(bookingApi.joinWaitlist),
  };
}

function createBookingConfirmation() {
  return {
    stylist_slug: "maya-johnson",
    service_id: "service-1",
    service_name: "Haircut",
    service_duration_minutes: 60,
    service_price: 95,
    appointment_date: "2026-06-15T09:00:00-06:00",
    status: "scheduled" as const,
  };
}

function fillContactDetails({
  fullName = "Jane Smith",
  phone = "(720) 555-0103",
  email = "jane@example.com",
}: Partial<{
  fullName: string;
  phone: string;
  email: string;
}> = {}) {
  fireEvent.change(screen.getByPlaceholderText("Enter your full name"), {
    target: { value: fullName },
  });
  fireEvent.change(screen.getByPlaceholderText("(555) 123-4567"), {
    target: { value: phone },
  });
  fireEvent.change(screen.getByPlaceholderText("you@email.com"), {
    target: { value: email },
  });
}

async function openServicesStep() {
  fillContactDetails();
  fireEvent.click(screen.getByRole("button", { name: "Select Services" }));
  await screen.findByText("Select your service");
}

describe("BookingFlow", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows a linked Instagram handle when the stylist profile includes one", () => {
    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={{ ...baseStylist, instagram: "mayajohnsonhair" }}
      />,
    );

    const instagramLink = screen.getByRole("link", {
      name: "@mayajohnsonhair",
    });

    expect(instagramLink.getAttribute("href")).toBe(
      "https://instagram.com/mayajohnsonhair",
    );
    expect(screen.getByText("Maya Johnson Hair")).toBeTruthy();
  });

  it("hides the Instagram link when the stylist profile does not include one", () => {
    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    expect(screen.queryByRole("link", { name: /^@/ })).toBeNull();
  });

  it("stops immediately when profile booking is disabled", () => {
    const {
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={{ ...baseStylist, booking_enabled: false }}
      />,
    );

    expect(
      screen.getByText("Online booking is currently unavailable."),
    ).toBeTruthy();
    expect(createPublicBookingIntake).not.toHaveBeenCalled();
    expect(getPublicServices).not.toHaveBeenCalled();
    expect(getPublicAvailability).not.toHaveBeenCalled();
    expect(getPublicSlots).not.toHaveBeenCalled();
  });

  it("stops when intake reports booking disabled", async () => {
    const { createPublicBookingIntake, getPublicServices } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingEnabled: false }),
    );

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    fillContactDetails();
    fireEvent.click(screen.getByRole("button", { name: "Select Services" }));

    await waitFor(() => {
      expect(
        screen.getByText("Online booking is currently unavailable."),
      ).toBeTruthy();
    });
    expect(getPublicServices).not.toHaveBeenCalled();
    expect(
      screen.queryByText("No services are currently available for online booking."),
    ).toBeNull();
  });

  it("shows the backend intake error instead of a generic booking details error", async () => {
    const { createPublicBookingIntake, getPublicServices } = setupMockReferences();

    createPublicBookingIntake.mockRejectedValue(
      new bookingApi.ApiError("Stylist not found", 404),
    );

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    fillContactDetails();
    fireEvent.click(screen.getByRole("button", { name: "Select Services" }));

    expect(await screen.findByText("Stylist not found")).toBeTruthy();
    expect(
      screen.queryByText("We couldn't check your booking details right now."),
    ).toBeNull();
    expect(getPublicServices).not.toHaveBeenCalled();
  });

  it("reruns intake and reloads token-dependent services when contact details change", async () => {
    const { createPublicBookingIntake, getPublicServices } = setupMockReferences();

    createPublicBookingIntake
      .mockResolvedValueOnce(createIntake({ bookingContextToken: "token-1" }))
      .mockResolvedValueOnce(createIntake({ bookingContextToken: "token-2" }));
    getPublicServices
      .mockResolvedValueOnce([createService("service-1", "Haircut")])
      .mockResolvedValueOnce([createService("service-2", "Blowout")]);

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    expect(screen.getByText("Haircut")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.change(screen.getByPlaceholderText("(555) 123-4567"), {
      target: { value: "(720) 555-0104" },
    });

    await waitFor(() => {
      expect(screen.queryByText("Select your service")).toBeNull();
    });

    fireEvent.click(screen.getByRole("button", { name: "Select Services" }));

    await screen.findByText("Blowout");

    expect(createPublicBookingIntake).toHaveBeenCalledTimes(2);
    expect(getPublicServices).toHaveBeenNthCalledWith(
      1,
      "maya-johnson",
      "token-1",
    );
    expect(getPublicServices).toHaveBeenNthCalledWith(
      2,
      "maya-johnson",
      "token-2",
    );
    expect(screen.queryByText("Haircut")).toBeNull();
  });

  it("refreshes intake and retries when the booking context expires", async () => {
    const {
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    createPublicBookingIntake
      .mockResolvedValueOnce(createIntake({ bookingContextToken: "token-1" }))
      .mockResolvedValueOnce(createIntake({ bookingContextToken: "token-2" }));
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockImplementation(async (_slug, token) => [
      createAvailabilityRow(token === "token-2" ? "returning" : "all"),
    ]);

    let expiredOnce = false;
    getPublicSlots.mockImplementation(async (_slug, _serviceIds, date, token) => {
      if (token === "token-1" && !expiredOnce) {
        expiredOnce = true;
        throw new bookingApi.ApiError(
          "Booking context is invalid or expired",
          400,
        );
      }

      return {
        date,
        timezone: "America/Denver",
        service: {
          id: "service-1",
          name: "Haircut",
          durationMinutes: 60,
          price: 95,
        },
        slots: [
          {
            start: "2026-05-04T09:00:00-06:00",
            end: "2026-05-04T10:00:00-06:00",
          },
        ],
      };
    });

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Choose a date & time");
    await screen.findByRole("button", { name: /9:00/i });

    expect(createPublicBookingIntake).toHaveBeenCalledTimes(2);
    expect(getPublicServices).toHaveBeenCalledWith("maya-johnson", "token-2");
    expect(getPublicAvailability).toHaveBeenCalledWith(
      "maya-johnson",
      "token-2",
    );
  });

  it("renders only backend-filtered services for new clients", async () => {
    const { createPublicBookingIntake, getPublicServices } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(
      createIntake({
        bookingContextToken: "token-new",
        matchStatus: "not_found",
        clientFound: false,
        isExistingClient: false,
        recommendedService: {
          serviceId: "service-hidden",
          serviceName: "Color Correction",
          reason: "default_service",
        },
        bookingBehavior: {
          requiresApproval: false,
          restrictedToNewClientRules: true,
          canUseReturningClientRules: false,
          message: "New client booking rules apply.",
        },
      }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();

    expect(screen.getByText("Haircut")).toBeTruthy();
    expect(
      screen.queryByRole("button", { name: /Color Correction/i }),
    ).toBeNull();
  });

  it.each([
    {
      audience: "new" as const,
      intake: createIntake({
        bookingContextToken: "token-new",
        matchStatus: "not_found",
        clientFound: false,
        isExistingClient: false,
        bookingBehavior: {
          requiresApproval: false,
          restrictedToNewClientRules: true,
          canUseReturningClientRules: false,
          message: "New client booking rules apply.",
        },
      }),
      slotLabel: /10:00/i,
      slotStart: "2026-05-04T10:00:00-06:00",
      slotEnd: "2026-05-04T11:00:00-06:00",
    },
    {
      audience: "returning" as const,
      intake: createIntake({
        bookingContextToken: "token-returning",
        isExistingClient: true,
      }),
      slotLabel: /2:00/i,
      slotStart: "2026-05-04T14:00:00-06:00",
      slotEnd: "2026-05-04T15:00:00-06:00",
    },
  ])(
    "renders backend-filtered availability and slots for $audience clients",
    async ({ audience, intake, slotLabel, slotEnd, slotStart }) => {
      const {
        createPublicBookingIntake,
        getPublicAvailability,
        getPublicServices,
        getPublicSlots,
      } = setupMockReferences();

      createPublicBookingIntake.mockResolvedValue(intake);
      getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
      getPublicAvailability.mockResolvedValue([createAvailabilityRow(audience)]);
      getPublicSlots.mockImplementation(async (_slug, _serviceIds, date, token) => ({
        date,
        timezone: "America/Denver",
        service: {
          id: "service-1",
          name: "Haircut",
          durationMinutes: 60,
          price: 95,
        },
        slots: token === intake.bookingContextToken
          ? [{ start: slotStart, end: slotEnd }]
          : [],
      }));

      render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

      await openServicesStep();
      fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
      fireEvent.click(screen.getByRole("button", { name: "Continue" }));

      await screen.findByText("Choose a date & time");
      await screen.findByRole("button", { name: slotLabel });

      expect(getPublicAvailability).toHaveBeenCalledWith(
        "maya-johnson",
        intake.bookingContextToken,
      );
      expect(getPublicSlots).toHaveBeenCalledWith(
        "maya-johnson",
        ["service-1"],
        expect.any(String),
        intake.bookingContextToken,
      );
    },
  );

  it("sends the intake booking context token when submitting the final booking", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-06-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-06-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-06-15T09:00:00-06:00",
          end: "2026-06-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation());

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Choose a date & time");
    fireEvent.click(await screen.findByRole("button", { name: /9:00/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Review your booking");
    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledWith(
        expect.objectContaining({
          stylist_slug: "maya-johnson",
          service_id: "service-1",
          requested_datetime: "2026-06-15T09:00:00-06:00",
          guest_first_name: "Jane",
          guest_last_name: "Smith",
          guest_email: "jane@example.com",
          guest_phone: "(720) 555-0103",
          booking_context_token: "token-final",
        }),
      );
    });
  });

  it("rechecks the selected slot before submitting a booking", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    const availableSlot = {
      start: "2026-06-15T09:00:00-06:00",
      end: "2026-06-15T10:00:00-06:00",
    };

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-06-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-06-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [availableSlot],
    });

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Choose a date & time");
    fireEvent.click(await screen.findByRole("button", { name: /9:00/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Review your booking");

    getPublicSlots.mockResolvedValue({
      date: "2026-06-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [],
    });

    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    expect(
      await screen.findByText("That time just became unavailable. Please choose another time."),
    ).toBeTruthy();
    expect(createPublicBooking).not.toHaveBeenCalled();
  });

  it("suppresses a conflicted slot when the refreshed slots endpoint still returns it", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();
    const conflictedSlot = {
      start: "2026-06-15T09:00:00-06:00",
      end: "2026-06-15T10:00:00-06:00",
    };
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-06-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-06-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [conflictedSlot],
    });
    createPublicBooking.mockRejectedValue(
      new bookingApi.ApiError("Requested time is no longer available", 409),
    );

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Choose a date & time");
    fireEvent.click(await screen.findByRole("button", { name: /9:00/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Review your booking");
    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    expect(
      await screen.findByText("That time just became unavailable. Please choose another time."),
    ).toBeTruthy();
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: /9:00/i })).toBeNull();
    });
    expect(
      consoleError.mock.calls.some(([message]) =>
        String(message).includes(
          '"slotStillReturnedByAvailabilityEndpoint":true',
        ),
      ),
    ).toBe(true);

    consoleError.mockRestore();
  });

  it("shows booking failure reasons from API error details", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(createIntake());
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-06-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-06-15",
      timezone: "America/Denver",
      slots: [
        {
          start: "2026-06-15T09:00:00-06:00",
          end: "2026-06-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockRejectedValue(
      new bookingApi.ApiError("Unable to create appointment", 400, {
        reason: "Selected service is not available for returning clients",
      }),
    );
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Choose a date & time");
    fireEvent.click(await screen.findByRole("button", { name: /9:00/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Review your booking");
    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    expect(
      await screen.findByText("Selected service is not available for returning clients"),
    ).toBeTruthy();
    consoleError.mockRestore();
  });

  it("shows waitlist CTA for enabled stylists when the selected date has no slots", async () => {
    const {
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
      joinWaitlist,
    } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(createIntake());
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-06-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-06-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [],
    });
    joinWaitlist.mockResolvedValue({
      id: "waitlist-1",
      requestedDate: "2026-06-15",
      serviceId: "service-1",
      serviceName: "Haircut",
      requestedTimePreference: "Morning preferred",
      clientName: "Jane Smith",
      clientEmail: "jane@example.com",
      clientPhone: "+17205550103",
      note: null,
      status: "active",
      source: "public_booking",
      createdAt: "2026-05-13T12:00:00.000Z",
    });

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={{
          ...baseStylist,
          features: { waitlistEnabled: true },
        }}
      />,
    );

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("No available times");
    fireEvent.click(screen.getByRole("button", { name: "Join waitlist" }));

    const dialog = screen.getByRole("dialog", { name: "Join the waitlist" });

    expect(dialog).toBeTruthy();
    expect(
      (within(dialog).getByLabelText("Requested date") as HTMLInputElement).value,
    ).toBe("2026-06-15");

    fireEvent.change(within(dialog).getByLabelText("Name"), {
      target: { value: "" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Join waitlist" }));
    expect(await screen.findByText("Name is required.")).toBeTruthy();

    fireEvent.change(within(dialog).getByLabelText("Name"), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(within(dialog).getByLabelText("Email"), {
      target: { value: "" },
    });
    fireEvent.change(within(dialog).getByLabelText("Phone"), {
      target: { value: "" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Join waitlist" }));
    expect(
      await screen.findByText("Please provide either an email address or phone number."),
    ).toBeTruthy();

    fireEvent.change(within(dialog).getByLabelText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(within(dialog).getByLabelText("Preferred time"), {
      target: { value: "Morning preferred" },
    });
    fireEvent.click(within(dialog).getByRole("button", { name: "Join waitlist" }));

    await screen.findByText("You're on the waitlist");
    expect(joinWaitlist).toHaveBeenCalledWith("maya-johnson", {
      requestedDate: "2026-06-15",
      serviceId: "service-1",
      clientName: "Jane Smith",
      clientEmail: "jane@example.com",
      clientPhone: null,
      requestedTimePreference: "Morning preferred",
      note: null,
    });
    expect(bookingApi.createPublicBooking).not.toHaveBeenCalled();
  });

  it("hides waitlist CTA when the stylist metadata does not enable it", async () => {
    const {
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(createIntake());
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-06-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-06-15",
      timezone: "America/Denver",
      slots: [],
    });

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={{ ...baseStylist, features: { waitlistEnabled: false } }}
      />,
    );

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("No available times");
    expect(
      screen.queryByRole("button", { name: "Join waitlist" }),
    ).toBeNull();
  });
});
