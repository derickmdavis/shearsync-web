import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  BookingFlow,
  getBookingAttributionErrorCode,
  getUsableBookingAttributionToken,
} from "@/src/components/booking/BookingFlow";
import type {
  PublicBookingIntakeData,
  PublicBookingConfirmation,
  PublicService,
  PublicStylist,
  RawAvailabilityRow,
} from "@/src/lib/api";
import * as bookingApi from "@/src/lib/api";

const bookingApiMocks = vi.hoisted(() => ({
  createPublicBooking: vi.fn(),
  createPublicBookingIntake: vi.fn(),
  createPublicBookingInquiry: vi.fn(),
  createPublicBookingInquirySession: vi.fn(),
  resolveBookingInquiryHandoff: vi.fn(),
  getPublicAvailability: vi.fn(),
  getPublicServices: vi.fn(),
  getPublicSlots: vi.fn(),
  joinWaitlist: vi.fn(),
}));

const bookingAttributionMocks = vi.hoisted(() => ({
  useBookingAttribution: vi.fn(),
  useClearBookingAttribution: vi.fn(),
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

vi.mock("@/src/components/booking/BookingAttributionGate", () => ({
  useBookingAttribution: bookingAttributionMocks.useBookingAttribution,
  useClearBookingAttribution: bookingAttributionMocks.useClearBookingAttribution,
}));

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
  category?: string | null,
): PublicService {
  return {
    id,
    name,
    category,
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
      firstName: "Jane",
      lastName: "Smith",
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
    createPublicBookingInquiry: vi.mocked(bookingApi.createPublicBookingInquiry),
    createPublicBookingInquirySession: vi.mocked(bookingApi.createPublicBookingInquirySession),
    resolveBookingInquiryHandoff: vi.mocked(bookingApi.resolveBookingInquiryHandoff),
    getPublicServices: vi.mocked(bookingApi.getPublicServices),
    getPublicAvailability: vi.mocked(bookingApi.getPublicAvailability),
    getPublicSlots: vi.mocked(bookingApi.getPublicSlots),
    joinWaitlist: vi.mocked(bookingApi.joinWaitlist),
  };
}

function createBookingConfirmation(
  overrides: Partial<PublicBookingConfirmation> = {},
): PublicBookingConfirmation {
  return {
    stylist_slug: "maya-johnson",
    service_id: "service-1",
    service_name: "Haircut",
    service_duration_minutes: 60,
    service_price: 95,
    appointment_date: "2026-07-15T09:00:00-06:00",
    status: "scheduled" as const,
    ...overrides,
  };
}

function createInquiryHandoff(
  overrides: Partial<bookingApi.BookingInquiryHandoff> = {},
): bookingApi.BookingInquiryHandoff {
  return {
    contract_version: "booking_inquiry.handoff.v1",
    next_step: "select_datetime",
    booking_context_token: "direct-handoff-context",
    expires_at: "2026-07-01T12:30:00.000Z",
    customer: {
      display_name: "Jenna",
      email_masked: "j***a@example.com",
      phone_masked: "***-***-0103",
    },
    service: {
      id: "service-1",
      name: "Balayage + Toner",
      duration_minutes: 210,
      price: 250,
    },
    suggested_dates: ["2026-07-08"],
    ...overrides,
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

async function completeSuccessfulBooking() {
  await openServicesStep();
  fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));

  await screen.findByText("Choose a date & time");
  fireEvent.click(await screen.findByRole("button", { name: /9:00/i }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));

  await screen.findByText("Review your booking");
  fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));
}

describe("BookingFlow", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date("2026-07-01T12:00:00.000Z"));
    vi.clearAllMocks();
    bookingAttributionMocks.useBookingAttribution.mockReturnValue(null);
    bookingAttributionMocks.useClearBookingAttribution.mockReturnValue(vi.fn());
    window.sessionStorage.clear();
    window.history.replaceState({}, "", "/book/maya-johnson");
  });

  afterEach(() => {
    vi.useRealTimers();
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

  it("renders saved client-information copy", () => {
    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={{
          ...baseStylist,
          intro: "Tell us about yourself",
          intro_description:
            "Share your contact details before choosing a service.",
        }}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Tell us about yourself" }),
    ).toBeTruthy();
    expect(
      screen.getByText("Share your contact details before choosing a service."),
    ).toBeTruthy();
  });

  it("only shows the booking inquiry on the services screen", async () => {
    const { createPublicBookingIntake, getPublicServices } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(createIntake());
    getPublicServices.mockResolvedValue([
      createService("service-1", "Signature Cut"),
    ]);

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={{
          ...baseStylist,
          booking_request_form_enabled: true,
          booking_request_form: {
            enabled: true,
            questions: [],
          },
        }}
      />,
    );

    expect(screen.queryByText("Not sure what to book?")).toBeNull();

    await openServicesStep();

    const serviceName = screen.getByText("Signature Cut");
    const inquiryTitle = screen.getByText("Not sure what to book?");

    expect(inquiryTitle).toBeTruthy();
    expect(
      serviceName.compareDocumentPosition(inquiryTitle)
      & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("reuses the first-step identity when submitting a booking inquiry", async () => {
    const {
      createPublicBookingInquiry,
      createPublicBookingInquirySession,
      createPublicBookingIntake,
      getPublicServices,
    } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(createIntake({
      submittedContact: {
        fullName: "Jenny Stone",
        firstName: "Jenny",
        lastName: "Stone",
        phoneNormalized: "+17205550103",
        email: "jenny@example.com",
      },
    }));
    getPublicServices.mockResolvedValue([
      createService("service-1", "Signature Cut"),
    ]);
    createPublicBookingInquirySession.mockResolvedValue({
      inquiry_session_id: "11111111-1111-4111-8111-111111111111",
      expires_at: "2026-07-01T12:30:00.000Z",
      booking_request_form: {
        enabled: true,
        questions: [],
      },
    });
    createPublicBookingInquiry.mockResolvedValue({
      inquiry_id: "22222222-2222-4222-8222-222222222222",
      submitted_at: "2026-07-01T12:05:00.000Z",
    });

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={{
          ...baseStylist,
          booking_request_form_enabled: true,
          booking_request_form: {
            enabled: true,
            questions: [],
          },
        }}
      />,
    );

    fillContactDetails({
      fullName: "Jenny Stone",
      email: "jenny@example.com",
    });
    fireEvent.click(screen.getByRole("button", { name: "Select Services" }));
    await screen.findByText("Select your service");
    fireEvent.click(screen.getByRole("button", { name: "Answer a few questions" }));

    fireEvent.change(await screen.findByLabelText(/1\. What are you hoping/i), {
      target: { value: "Dimensional blonde" },
    });
    fireEvent.change(screen.getByLabelText(/2\. Describe your current hair/i), {
      target: { value: "Gloss six months ago" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send inquiry" }));

    await waitFor(() => {
      expect(createPublicBookingInquiry).toHaveBeenCalledWith({
        inquiry_session_id: "11111111-1111-4111-8111-111111111111",
        guest_first_name: "Jenny",
        guest_last_name: "Stone",
        guest_phone: "+17205550103",
        guest_email: "jenny@example.com",
        inquiry_answers: {
          desired_outcome: "Dimensional blonde",
          hair_history: "Gloss six months ago",
          optional_photo_upload_ids: [],
        },
      });
    });
  });

  it("hides booking inquiry when the stylist has disabled it", async () => {
    const { createPublicBookingIntake, getPublicServices } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(createIntake());
    getPublicServices.mockResolvedValue([
      createService("service-1", "Signature Cut"),
    ]);

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={{
          ...baseStylist,
          booking_request_form_enabled: false,
          booking_request_form: {
            enabled: true,
            questions: [],
          },
        }}
      />,
    );

    await openServicesStep();

    expect(screen.queryByText("Not sure what to book?")).toBeNull();
  });

  it("requires email on the existing contact step before running intake", () => {
    const { createPublicBookingIntake } = setupMockReferences();

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    fillContactDetails({ email: "" });
    fireEvent.click(screen.getByRole("button", { name: "Select Services" }));

    expect(screen.getByText("Email is required.")).toBeTruthy();
    expect(createPublicBookingIntake).not.toHaveBeenCalled();
  });

  it("resolves an inquiry handoff and starts directly on date and time", async () => {
    const {
      createPublicBooking,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
      resolveBookingInquiryHandoff,
    } = setupMockReferences();
    resolveBookingInquiryHandoff.mockResolvedValue(createInquiryHandoff());
    getPublicAvailability.mockResolvedValue({
      availability: [createAvailabilityRow("all")],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      slots: [{
        start: "2026-07-08T09:00:00-06:00",
        end: "2026-07-08T12:30:00-06:00",
      }],
      timezone: "America/Denver",
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation({
      service_name: "Balayage + Toner",
      service_duration_minutes: 210,
      service_price: 250,
    }));
    window.history.replaceState(
      {},
      "",
      "/book/maya-johnson?booking_inquiry_token=signed-inquiry-token",
    );

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={baseStylist}
        initialBookingInquiryToken="signed-inquiry-token"
      />,
    );

    expect(screen.getByText("Preparing your recommendation")).toBeTruthy();
    expect(await screen.findByText("Choose a date & time")).toBeTruthy();
    expect(resolveBookingInquiryHandoff).toHaveBeenCalledWith("signed-inquiry-token");
    expect(screen.queryByPlaceholderText("Enter your full name")).toBeNull();
    expect(window.location.search).not.toContain("booking_inquiry_token");
    expect(getPublicServices).not.toHaveBeenCalled();

    fireEvent.click((await screen.findAllByRole("button", { name: /9:00/i }))[0]);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(await screen.findByText("Review your booking")).toBeTruthy();
    expect(screen.getByText("j***a@example.com")).toBeTruthy();
    expect(screen.getByText("***-***-0103")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledWith(
        {
          stylist_slug: "maya-johnson",
          service_id: "service-1",
          requested_datetime: "2026-07-08T09:00:00-06:00",
          booking_context_token: "direct-handoff-context",
          referral_code: undefined,
          sms_opt_in: false,
          notes: undefined,
        },
        expect.any(Object),
      );
    });
  });

  it("falls back to the existing contact step when the handoff requires identity", async () => {
    const { resolveBookingInquiryHandoff } = setupMockReferences();
    resolveBookingInquiryHandoff.mockResolvedValue(createInquiryHandoff({
      next_step: "contact_information",
    }));

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={baseStylist}
        initialBookingInquiryToken="legacy-inquiry-token"
      />,
    );

    expect(await screen.findByPlaceholderText("Enter your full name")).toBeTruthy();
    expect(screen.getByPlaceholderText("you@email.com")).toBeTruthy();
    expect(screen.queryByText("Choose a date & time")).toBeNull();
  });

  it("returns to contact details when final handoff booking requires identity", async () => {
    const {
      createPublicBooking,
      getPublicAvailability,
      getPublicSlots,
      resolveBookingInquiryHandoff,
    } = setupMockReferences();
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    resolveBookingInquiryHandoff.mockResolvedValue(createInquiryHandoff());
    getPublicAvailability.mockResolvedValue({
      availability: [createAvailabilityRow("all")],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      slots: [{
        start: "2026-07-08T09:00:00-06:00",
        end: "2026-07-08T12:30:00-06:00",
      }],
      timezone: "America/Denver",
    });
    createPublicBooking.mockRejectedValue(new bookingApi.ApiError(
      "Customer contact information is required",
      422,
      { next_step: "contact_information" },
      "booking_identity_required",
    ));

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={baseStylist}
        initialBookingInquiryToken="signed-inquiry-token"
      />,
    );

    expect(await screen.findByText("Choose a date & time")).toBeTruthy();
    fireEvent.click((await screen.findAllByRole("button", { name: /9:00/i }))[0]);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    await screen.findByText("Review your booking");
    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    expect(await screen.findByPlaceholderText("Enter your full name")).toBeTruthy();
    expect(
      screen.getByText("Please confirm your contact details before finishing this booking."),
    ).toBeTruthy();
    consoleError.mockRestore();
  });

  it("discards the trusted context when a direct-handoff customer goes back", async () => {
    const { getPublicAvailability, getPublicSlots, resolveBookingInquiryHandoff } = setupMockReferences();
    resolveBookingInquiryHandoff.mockResolvedValue(createInquiryHandoff());
    getPublicAvailability.mockResolvedValue({
      availability: [createAvailabilityRow("all")],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({ slots: [], timezone: "America/Denver" });

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={baseStylist}
        initialBookingInquiryToken="signed-inquiry-token"
      />,
    );

    expect(await screen.findByText("Choose a date & time")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(await screen.findByPlaceholderText("Enter your full name")).toBeTruthy();
    expect(screen.queryByText("Choose a date & time")).toBeNull();
  });

  it("submits an inquiry attribution token from a generated booking link", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
      resolveBookingInquiryHandoff,
    } = setupMockReferences();

    resolveBookingInquiryHandoff.mockResolvedValue(createInquiryHandoff({
      next_step: "contact_information",
    }));
    createPublicBookingIntake.mockResolvedValue(createIntake());
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      availability: [createAvailabilityRow("all")],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      slots: [{ start: "2026-07-06T09:00:00-06:00", end: "2026-07-06T10:00:00-06:00" }],
      timezone: "America/Denver",
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation());

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={baseStylist}
        initialServiceIds={["service-1"]}
        initialSuggestedDates={["2026-07-08"]}
        initialBookingInquiryToken="signed-inquiry-token"
      />,
    );

    await screen.findByPlaceholderText("Enter your full name");
    fillContactDetails();
    fireEvent.click(screen.getByRole("button", { name: "Select Services" }));
    const serviceButton = await screen.findByRole("button", { name: /Haircut/i });
    expect(serviceButton.getAttribute("aria-pressed")).toBe("true");

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    await screen.findByText("Choose a date & time");
    await waitFor(() => {
      expect(getPublicSlots).toHaveBeenCalledWith(
        "maya-johnson",
        ["service-1"],
        "2026-07-08",
        "token-1",
        expect.any(Object),
      );
    });
    fireEvent.click(screen.getAllByRole("button", { name: /9:00/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    await screen.findByText("Review your booking");
    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledWith(
        expect.objectContaining({
          booking_inquiry_token: "signed-inquiry-token",
          service_id: "service-1",
        }),
        expect.any(Object),
      );
    });
  });

  it("omits the booking behavior message for an identified returning client", async () => {
    const { createPublicBookingIntake, getPublicServices } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(createIntake());
    getPublicServices.mockResolvedValue([
      createService("service-1", "Signature Cut"),
    ]);

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();

    expect(screen.getByText("Welcome back, Jane")).toBeTruthy();
    expect(
      screen.queryByText("Welcome back — you can book directly."),
    ).toBeNull();
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
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });

  it("reuses slot responses across availability probing, selected-date loading, and previews", async () => {
    const {
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-availability" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15", "2026-07-16", "2026-07-17"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockImplementation(async (_slug, _serviceIds, date) => ({
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
          start: `${date}T09:00:00-06:00`,
          end: `${date}T10:00:00-06:00`,
        },
      ],
    }));

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Choose a date & time");
    await screen.findAllByRole("button", { name: /9:00/i });

    await waitFor(() => {
      expect(getPublicSlots).toHaveBeenCalledTimes(3);
    });
    expect(
      getPublicSlots.mock.calls.map(([, , date]) => date).sort(),
    ).toEqual(["2026-07-15", "2026-07-16", "2026-07-17"]);
  });

  it("keeps upcoming day sections in place when a time is selected", async () => {
    const {
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-stable-days" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15", "2026-07-16", "2026-07-17"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockImplementation(async (_slug, _serviceIds, date) => {
      const hourByDate: Record<string, number> = {
        "2026-07-15": 9,
        "2026-07-16": 10,
        "2026-07-17": 11,
      };
      const hour = hourByDate[date] ?? 12;

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
            start: `${date}T${String(hour).padStart(2, "0")}:00:00-06:00`,
            end: `${date}T${String(hour + 1).padStart(2, "0")}:00:00-06:00`,
          },
        ],
      };
    });

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    const firstDay = await screen.findByText("Jul 15");
    const middleDay = await screen.findByText("Jul 16");
    const middleDayTime = await screen.findByRole("button", { name: /10:00/i });

    expect(
      firstDay.compareDocumentPosition(middleDay) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);

    fireEvent.click(middleDayTime);

    await waitFor(() => {
      expect(middleDayTime.getAttribute("aria-pressed")).toBe("true");
    });
    expect(
      firstDay.compareDocumentPosition(middleDay) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
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
    expect(screen.queryByText("New client booking")).toBeNull();
    expect(screen.queryByText("New client booking rules apply.")).toBeNull();
    expect(
      screen.queryByRole("button", { name: /Color Correction/i }),
    ).toBeNull();
  });

  it("keeps services flat when none have a category", async () => {
    const { getPublicServices } = setupMockReferences();
    getPublicServices.mockResolvedValue([
      createService("service-1", "Haircut"),
      createService("service-2", "Blowout"),
    ]);

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();

    expect(screen.queryByText("Other services")).toBeNull();
    expect(screen.queryByRole("heading", { name: "Services" })).toBeNull();
  });

  it("groups categorized services and collects uncategorized services under Other services", async () => {
    const { getPublicServices } = setupMockReferences();
    getPublicServices.mockResolvedValue([
      createService("service-1", "Haircut", 60, "Cuts"),
      createService("service-2", "Blowout"),
      createService("service-3", "Color", 60, "Color"),
      createService("service-4", "Treatment", 60, " "),
    ]);

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();

    const cuts = screen.getByRole("heading", { name: "Cuts" });
    const otherServices = screen.getByRole("heading", { name: "Other services" });
    const color = screen.getByRole("heading", { name: "Color" });

    expect(
      cuts.compareDocumentPosition(otherServices) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
    expect(
      otherServices.compareDocumentPosition(color) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).not.toBe(0);
    expect(within(screen.getByLabelText("Other services")).getByText("Blowout")).toBeTruthy();
    expect(within(screen.getByLabelText("Other services")).getByText("Treatment")).toBeTruthy();
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
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
      );
      expect(getPublicSlots).toHaveBeenCalledWith(
        "maya-johnson",
        ["service-1"],
        expect.any(String),
        intake.bookingContextToken,
        expect.objectContaining({ signal: expect.any(AbortSignal) }),
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
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
    expect(screen.queryByText("Booking preview")).toBeNull();
    expect(
      screen.queryByText("Welcome back — you can book directly."),
    ).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledWith(
        expect.objectContaining({
          stylist_slug: "maya-johnson",
          service_id: "service-1",
          requested_datetime: "2026-07-15T09:00:00-06:00",
          guest_first_name: "Jane",
          guest_last_name: "Smith",
          guest_email: "jane@example.com",
          guest_phone: "(720) 555-0103",
          booking_context_token: "token-final",
          sms_opt_in: false,
        }),
        expect.objectContaining({ idempotencyKey: expect.any(String) }),
      );
    });
  });

  it("shows an optional appointment-text opt-in above the booking button", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-sms-opt-in" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
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

    const smsOptIn = await screen.findByRole("checkbox", {
      name: "Receive appointment text updates",
    });
    expect(smsOptIn.checked).toBe(false);

    expect(
      screen.getByText(/Root & Foil LLC on behalf of your stylist/i),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /booking confirmations, appointment reminders, rescheduling or cancellation updates, and customer service responses/i,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /Message frequency varies\. Message and data rates may apply\. Reply STOP to opt out or HELP for help\. Consent is not a condition of purchase\./i,
      ),
    ).toBeTruthy();

    fireEvent.click(smsOptIn);
    expect(smsOptIn.checked).toBe(true);

    expect(
      screen.getByRole("link", { name: "Terms of Service" }).getAttribute("href"),
    ).toBe("https://www.rootfoil.com/terms-of-service");
    expect(
      screen.getByRole("link", { name: "Terms of Service" }).getAttribute("target"),
    ).toBe("_blank");
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }).getAttribute("href"),
    ).toBe("https://www.rootfoil.com/privacy-policy");
    expect(
      screen.getByRole("link", { name: "Privacy Policy" }).getAttribute("target"),
    ).toBe("_blank");

    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledWith(
        expect.objectContaining({ sms_opt_in: true }),
        expect.objectContaining({ idempotencyKey: expect.any(String) }),
      );
    });
  });

  it("guards against duplicate final booking submissions", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();
    let resolveBooking!: (confirmation: PublicBookingConfirmation) => void;

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockReturnValue(
      new Promise((resolve) => {
        resolveBooking = resolve;
      }),
    );

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Choose a date & time");
    fireEvent.click(await screen.findByRole("button", { name: /9:00/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Review your booking");

    const submitButton = screen.getByRole("button", { name: /Book Appointment/i });
    fireEvent.click(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledTimes(1);
    });
    expect(createPublicBooking.mock.calls[0]?.[1]).toEqual(
      expect.objectContaining({ idempotencyKey: expect.any(String) }),
    );

    resolveBooking(createBookingConfirmation());
    expect(await screen.findByText("You're All Set!")).toBeTruthy();
  });

  it("returns Done users to an empty booking flow", async () => {
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation());

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await completeSuccessfulBooking();
    expect(await screen.findByText("You're All Set!")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Done" }));

    expect(await screen.findByText("Let's get to know you")).toBeTruthy();
    expect(
      (screen.getByPlaceholderText("Enter your full name") as HTMLInputElement).value,
    ).toBe("");
    expect(
      (screen.getByPlaceholderText("(555) 123-4567") as HTMLInputElement).value,
    ).toBe("");
    expect(
      (screen.getByPlaceholderText("you@email.com") as HTMLInputElement).value,
    ).toBe("");
    expect(screen.queryByText("Select your service")).toBeNull();
    expect(screen.queryByText("Haircut")).toBeNull();
  });

  it("sends the referral code when submitting the final booking", async () => {
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation());
    bookingAttributionMocks.useBookingAttribution.mockReturnValue({
      token: "opaque-booking-token",
      expiresAt: "2026-11-06T12:00:00.000Z",
      stylistSlug: "maya-johnson",
    });

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={baseStylist}
        initialReferralCode="rf_client123"
      />,
    );

    await completeSuccessfulBooking();

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledWith(
        expect.objectContaining({
          referral_code: "rf_client123",
          booking_attribution_token: "opaque-booking-token",
          booking_context_token: "token-final",
        }),
        expect.objectContaining({ idempotencyKey: expect.any(String) }),
      );
    });
  });

  it("withholds unavailable, expired, and cross-stylist attribution tokens", () => {
    expect(getUsableBookingAttributionToken(null, "maya-johnson")).toBeUndefined();
    expect(
      getUsableBookingAttributionToken(
        {
          token: "expired-token",
          expiresAt: "2026-06-01T12:00:00.000Z",
          stylistSlug: "maya-johnson",
        },
        "maya-johnson",
      ),
    ).toBeUndefined();
    expect(
      getUsableBookingAttributionToken(
        {
          token: "other-stylist-token",
          expiresAt: "2026-11-06T12:00:00.000Z",
          stylistSlug: "other-stylist",
        },
        "maya-johnson",
      ),
    ).toBeUndefined();
    expect(
      getUsableBookingAttributionToken(
        {
          token: "malformed-expiry-token",
          expiresAt: "not-a-date",
          stylistSlug: "maya-johnson",
        },
        "maya-johnson",
      ),
    ).toBeUndefined();
  });

  it("recognizes only structured attribution-context errors", () => {
    expect(
      getBookingAttributionErrorCode(
        new bookingApi.ApiError(
          "Any message is ignored",
          400,
          undefined,
          "booking_attribution_context_stylist_mismatch",
        ),
      ),
    ).toBe("booking_attribution_context_stylist_mismatch");
    expect(
      getBookingAttributionErrorCode(
        new bookingApi.ApiError(
          "Any message is ignored",
          400,
          undefined,
          "booking_attribution_context_unavailable",
        ),
      ),
    ).toBe("booking_attribution_context_unavailable");
    expect(
      getBookingAttributionErrorCode(
        new bookingApi.ApiError("Similar prose", 400),
      ),
    ).toBeNull();
  });

  it("clears rejected attribution and lets the customer retry without it", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();
    const clearAttribution = vi.fn(() => {
      bookingAttributionMocks.useBookingAttribution.mockReturnValue(null);
    });
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    bookingAttributionMocks.useBookingAttribution.mockReturnValue({
      token: "opaque-booking-token",
      expiresAt: "2026-11-06T12:00:00.000Z",
      stylistSlug: "maya-johnson",
    });
    bookingAttributionMocks.useClearBookingAttribution.mockReturnValue(
      clearAttribution,
    );
    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking
      .mockRejectedValueOnce(
        new bookingApi.ApiError(
          "Any backend wording",
          400,
          undefined,
          "booking_attribution_context_stylist_mismatch",
        ),
      )
      .mockResolvedValueOnce(createBookingConfirmation());

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await completeSuccessfulBooking();

    expect(
      await screen.findByText(
        "We couldn't apply that booking link. Please try booking again.",
      ),
    ).toBeTruthy();
    expect(clearAttribution).toHaveBeenCalledTimes(1);
    expect(createPublicBooking.mock.calls[0]?.[0]).toEqual(
      expect.objectContaining({ booking_attribution_token: "opaque-booking-token" }),
    );

    fireEvent.click(screen.getByRole("button", { name: /Book Appointment/i }));

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledTimes(2);
    });
    expect(createPublicBooking.mock.calls[1]?.[0].booking_attribution_token).toBeUndefined();
    consoleError.mockRestore();
  });

  it("clears the stored referral code after a successful booking", async () => {
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation());

    render(
      <BookingFlow
        slug="maya-johnson"
        stylist={baseStylist}
        initialReferralCode="rf_client123"
      />,
    );

    await waitFor(() => {
      expect(window.sessionStorage.getItem("referral:maya-johnson")).toBe(
        "rf_client123",
      );
    });

    await completeSuccessfulBooking();

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalled();
    });
    expect(window.sessionStorage.getItem("referral:maya-johnson")).toBeNull();
  });

  it("falls back to a stored referral code scoped by stylist slug", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    window.sessionStorage.setItem("referral:maya-johnson", "rf_stored123");
    window.sessionStorage.setItem("referral:other-stylist", "rf_other999");
    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation());

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await completeSuccessfulBooking();

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalledWith(
        expect.objectContaining({
          referral_code: "rf_stored123",
        }),
        expect.objectContaining({ idempotencyKey: expect.any(String) }),
      );
    });
  });

  it("does not use a stored referral code from another stylist slug", async () => {
    const {
      createPublicBooking,
      createPublicBookingIntake,
      getPublicAvailability,
      getPublicServices,
      getPublicSlots,
    } = setupMockReferences();

    window.sessionStorage.setItem("referral:other-stylist", "rf_other999");
    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation());

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await completeSuccessfulBooking();

    await waitFor(() => {
      expect(createPublicBooking).toHaveBeenCalled();
    });
    expect(createPublicBooking.mock.calls[0]?.[0].referral_code).toBeUndefined();
  });

  it("shows the optional reference photo upload after a booking returns a live upload token", async () => {
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(
      createBookingConfirmation({
        reference_photo_upload_token: "reference-token",
        reference_photo_upload_token_expires_at: "2099-06-15T09:00:00-06:00",
      }),
    );

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await completeSuccessfulBooking();

    expect(await screen.findByText("You're All Set!")).toBeTruthy();
    expect(
      await screen.findByText("Add an inspiration/reference photo"),
    ).toBeTruthy();
    expect(
      screen.getByText(
        "This photo is private and shared only with your stylist for this appointment.",
      ),
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /Add a reference photo/i }),
    ).toBeTruthy();
  });

  it("rejects reference photos larger than 5 MB before booking", async () => {
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(createBookingConfirmation());

    const { container } = render(
      <BookingFlow slug="maya-johnson" stylist={baseStylist} />,
    );

    await openServicesStep();
    fireEvent.click(screen.getByRole("button", { name: /Haircut/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Choose a date & time");
    fireEvent.click(await screen.findByRole("button", { name: /9:00/i }));
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));

    await screen.findByText("Review your booking");

    const fileInput = container.querySelector<HTMLInputElement>(
      'input[type="file"]',
    );
    expect(fileInput).toBeTruthy();

    const oversizedPhoto = new File(
      [new Uint8Array(5 * 1024 * 1024 + 1)],
      "too-large.jpg",
      { type: "image/jpeg" },
    );

    fireEvent.change(fileInput!, {
      target: { files: [oversizedPhoto] },
    });

    expect(
      await screen.findByText("Please choose a photo smaller than 5 MB."),
    ).toBeTruthy();
    expect(screen.queryByText("too-large.jpg")).toBeNull();
  });

  it("hides the reference photo upload when the returned upload token is expired", async () => {
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      service: {
        id: "service-1",
        name: "Haircut",
        durationMinutes: 60,
        price: 95,
      },
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    createPublicBooking.mockResolvedValue(
      createBookingConfirmation({
        reference_photo_upload_token: "reference-token",
        reference_photo_upload_token_expires_at: "2020-06-15T09:00:00-06:00",
      }),
    );

    render(<BookingFlow slug="maya-johnson" stylist={baseStylist} />);

    await completeSuccessfulBooking();

    expect(await screen.findByText("You're All Set!")).toBeTruthy();
    expect(
      screen.queryByText("Add an inspiration/reference photo"),
    ).toBeNull();
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
      start: "2026-07-15T09:00:00-06:00",
      end: "2026-07-15T10:00:00-06:00",
    };

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
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
      date: "2026-07-15",
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
      start: "2026-07-15T09:00:00-06:00",
      end: "2026-07-15T10:00:00-06:00",
    };
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    createPublicBookingIntake.mockResolvedValue(
      createIntake({ bookingContextToken: "token-final" }),
    );
    getPublicServices.mockResolvedValue([createService("service-1", "Haircut")]);
    getPublicAvailability.mockResolvedValue({
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
      timezone: "America/Denver",
      slots: [
        {
          start: "2026-07-15T09:00:00-06:00",
          end: "2026-07-15T10:00:00-06:00",
        },
      ],
    });
    const attributionToken = "opaque-token-in-api-details";
    createPublicBooking.mockRejectedValue(
      new bookingApi.ApiError("Unable to create appointment", 400, {
        reason: "Selected service is not available for returning clients",
        booking_attribution_token: attributionToken,
        bookingAttributionToken: attributionToken,
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
    const logged = consoleError.mock.calls.flat().join(" ");
    expect(logged).not.toContain(attributionToken);
    expect(logged).not.toContain(
      "Selected service is not available for returning clients",
    );
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
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
      requestedDate: "2026-07-15",
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
    ).toBe("2026-07-15");

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
      requestedDate: "2026-07-15",
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
      dates: ["2026-07-15"],
      timezone: "America/Denver",
    });
    getPublicSlots.mockResolvedValue({
      date: "2026-07-15",
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
