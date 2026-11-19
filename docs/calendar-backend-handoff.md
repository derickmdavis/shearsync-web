# Calendar Month View — Backend Data Handoff

## Purpose

This document records the data currently consumed by the Root & Foil Calendar Month view, the conditions that cause the UI to show unavailable data, and the recommended backend additions or guarantees.

The frontend does not require any routing, authentication, or appointment-workflow changes. The primary source is `GET /api/calendar?date=YYYY-MM-DD`, proxied through the web application.

## Current frontend behavior

The Month view requests one daily calendar payload for every day in its six-week display window (up to 42 dates). It derives:

- monthly appointment count and booked minutes from the in-month daily summaries;
- day-cell appointment strips from each day's appointments;
- selected-day appointments and metrics from the selected day's payload;
- weekly totals and the capacity trend from the same daily records.

This means the UI can work with the existing daily endpoint, but a consistent daily capacity contract is essential. A range summary endpoint would still be valuable for performance and consistency; see the recommended endpoint below.

## Current daily contract consumed by the frontend

```ts
type CalendarDay = {
  date: string; // YYYY-MM-DD
  appointments: Array<{
    id: string;
    client_id: string;
    client_name: string | null;
    appointment_date: string;
    start_time: string; // ISO timestamp
    end_time: string; // ISO timestamp
    service_name: string | null;
    services: string[];
    duration_minutes: number;
    price: number;
    revenue: number;
    status: "pending" | "scheduled" | "completed" | "cancelled" | "no_show";
    notes: string | null;
  }>;
  availableSlots: Array<{
    id: string;
    startTime: string;
    endTime: string;
    durationMinutes: number;
    canBook: boolean;
  }>;
  summary: {
    selectedDateLabel: string;
    totalAppointments: number;
    bookedRevenueCents: number;
    bookedMinutes: number;
    workingMinutes: number;
    freeMinutesRemaining: number | null;
    openGapCount: number;
    comparisonVsLastWeekPercent: number | null;
    capacity_status?: "available" | "unavailable" | "not_configured" | "closed" | string | null;
    capacity_filled_rate?: number | null;
  };
};
```

## Data that is currently unavailable or not guaranteed

### 1. Monthly Capacity Filled

**What users see:** the top "Capacity filled" card can show `Unavailable`.

**Exact frontend condition:** monthly capacity is rendered only when **every in-month daily payload** has all of the following:

- `summary.capacity_status === "available"`
- `summary.capacity_filled_rate` is a number
- `summary.workingMinutes` is a number greater than zero

Otherwise the monthly KPI is `Unavailable`.

**Why this is likely happening:** both `capacity_status` and `capacity_filled_rate` are optional in the current client contract. Existing API test fixture data includes `workingMinutes`, but does not include either capacity field. An omitted status is not treated as `available`.

**Backend request:** return both fields consistently for every date, including dates with no appointments.

| Scenario | `capacity_status` | `capacity_filled_rate` | `workingMinutes` |
| --- | --- | --- | --- |
| Working day with configured availability | `available` | decimal from `0` to `1` | positive integer |
| Closed business day | `closed` | `null` | `0` |
| Schedule/availability not configured | `not_configured` | `null` | `0` or `null` by final contract |
| Capacity cannot be calculated | `unavailable` | `null` | known value if available |

**Definition to confirm:** `capacity_filled_rate` should equal `bookedMinutes / workingMinutes`, with the same business rules used for availability (time off, schedule exceptions, blocked time, breaks, and timezone).

### 2. Capacity denominator and business-state semantics

The frontend has `workingMinutes`, `freeMinutesRemaining`, and `openGapCount`, but does not have enough documented semantics to know whether the capacity denominator includes or excludes:

- breaks;
- manually blocked time;
- time off;
- schedule overrides;
- closed dates;
- appointment statuses that should not consume capacity, such as cancelled or no-show appointments.

**Backend request:** publish and enforce the calculation rules above. The daily `capacity_status` should be authoritative rather than asking the frontend to infer business state from zero minutes.

### 3. Month/range aggregate payload

There is a proxied `GET /api/calendar/summary` route in the web application, but its response is typed as `unknown` and is not part of the active Month-view contract. The redesigned screen currently derives the monthly and weekly figures from daily calls.

**Backend request (recommended):** provide a stable range endpoint for a month or arbitrary date interval. This avoids 42 separate daily responses and establishes a single source of truth for aggregates.

Suggested request:

```http
GET /api/calendar/summary?start_date=2026-11-01&end_date=2026-11-30&bucket=day
```

Suggested response:

```json
{
  "summary": {
    "total_appointments": 52,
    "booked_minutes": 2820,
    "working_minutes": 3360,
    "capacity_status": "available",
    "capacity_filled_rate": 0.8393
  },
  "days": [
    {
      "date": "2026-11-18",
      "total_appointments": 3,
      "booked_minutes": 660,
      "working_minutes": 780,
      "capacity_status": "available",
      "capacity_filled_rate": 0.8462
    }
  ]
}
```

The final response shape can differ, but it should be versioned/documented and include the capacity fields above.

### 4. Appointment marker categories for the Month grid

**What exists:** each appointment has a status, client name, service name(s), duration, price, and revenue. The Month grid currently uses appointment status only to color its compact strips.

**What is not available:** no explicit presentation-safe service category, service color, staff member, resource, or booking-intensity field is supplied. Therefore the frontend cannot reliably create the reference design's semantically distinct marker colors without inventing a mapping.

**Backend request (optional, for richer grid semantics):** include one or more of:

- `service_category` or `service_color` per appointment;
- `staff_id`, `staff_name`, and optional `staff_color` for multi-provider calendars;
- `resource_id` / `resource_name` for chair, room, or equipment scheduling;
- a pre-aggregated day `appointment_count_by_category` or `activity_level`.

### 5. Authoritative daily capacity / availability display state

The API provides available slots, but it does not expose a dedicated, documented summary of why a day has no capacity. Empty slots may mean a closed day, no configured schedule, an unavailable provider, or simply no bookable gaps.

**Backend request:** make `capacity_status` required and return a concise optional reason code, for example:

```json
{
  "capacity_status": "not_configured",
  "capacity_unavailable_reason": "business_hours_missing"
}
```

Suggested reason codes: `business_hours_missing`, `closed_date`, `time_off`, `provider_unavailable`, `insufficient_schedule_data`.

### 6. Operational status definitions

The frontend displays the raw appointment status as a badge. It has no backend-provided display label, ordering priority, or capacity-impact definition.

**Backend request (optional):** document which statuses count toward `totalAppointments`, `bookedMinutes`, and capacity. If statuses are tenant-configurable, return a display label and capacity-impact boolean.

## Data already available and working

The following fields are already sufficient for the current Month-view UI when returned consistently:

- selected date and business timezone (timezone is obtained from the account profile);
- appointment count and booked minutes per day;
- appointment time, client name, service name(s), and status;
- appointment duration;
- available slots for the existing create-appointment flow;
- daily working minutes, free minutes, and open-gap count;
- daily capacity rate when it is supplied.

## Priority order

1. Make daily `capacity_status` and `capacity_filled_rate` consistently available and document their calculation.
2. Confirm the meaning of `workingMinutes` and which appointment/status/availability rules affect it.
3. Define and document a typed date-range summary endpoint.
4. Add optional category/staff/resource metadata if richer month-grid visual coding is desired.
5. Add capacity reason codes and status display/capacity semantics for clearer empty and unavailable states.

## Acceptance checks for backend QA

- A fully configured month with working days returns a numeric monthly capacity in the UI.
- Closed days do not make a configured working month appear as a data-fetch failure; their behavior follows the agreed aggregation rule.
- A schedule-not-configured account produces `not_configured`, not an ambiguous omitted field.
- Every daily rate is within `0..1` and agrees with the documented numerator and denominator.
- Aggregated month totals equal the sum of daily totals for the same calendar timezone.
