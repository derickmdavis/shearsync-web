# At-Risk Clients Trend — Frontend Handoff

## Outcome

The Insights screen displays the live **At-Risk Clients** count and a 7- or
30-day sparkline from the backend's daily account-level trend. The frontend
does not calculate eligibility, create snapshots, fill missing dates, or
convert the business rules into client-side logic.

The implementation is in:

- `apps/web/src/components/workspace/InsightsScreenClient.tsx`
- `apps/web/src/lib/api.ts`
- `apps/web/src/components/workspace/InsightsScreenClient.test.tsx`

## Requests and contracts

The screen makes two authenticated same-origin requests for the selected range:

```text
GET /api/insights?start_date=...&end_date=...&preset=...&comparison_mode=...
X-Insights-Contract-Version: insights.v8

GET /api/insights/trends?start_date=...&end_date=...&preset=...&comparison_mode=...
X-Insights-Contract-Version: insights.v6.trends.2
```

The first request supplies the headline metric:

```json
{
  "metrics": [
    {
      "id": "at_risk_clients",
      "unit": "count",
      "result": { "value": 3 }
    }
  ]
}
```

The trends request supplies the sparkline series:

```json
{
  "trends": [
    {
      "metric_id": "at_risk_clients",
      "buckets": [
        { "date": "2026-11-12", "value": 3, "final": true },
        { "date": "2026-11-13", "value": 0, "final": true },
        { "date": "2026-11-14", "value": 2, "final": false }
      ]
    }
  ]
}
```

`final` is optional for the current UI but recommended for future tooltip and
accessibility copy. The UI relies on `date` and a non-negative numeric `value`.
The backend must provide one ascending bucket per requested local date,
including zeroes.

## Date and timezone behavior

The reporting period must use the business account's timezone, not the browser
timezone. This matters when an owner travels or uses a device in another
timezone. On mount, `InsightsScreenClient` loads `getAccountProfile()` and
uses its IANA timezone to produce the account-local `today`, then derives the
7- or 30-day date range from it.

The frontend passes date strings unchanged to the backend. The backend remains
the authority for validating the range and interpreting it for the account.
If loading the profile fails, the client temporarily falls back to UTC so it
does not send a date in the viewer's arbitrary local timezone. This fallback
should be observable in frontend error telemetry and is not a substitute for a
configured account timezone.

## Rendering behavior

- The desktop card under **Client Health** uses the standard metric card and
  renders the at-risk sparkline when two or more values are present.
- The mobile card renders the same series with an SVG labelled
  `At-Risk Clients trend`.
- A flat series such as `[0, 0, 0, 0, 0, 0, 0]` is valid and must render as a
  flat line.
- One point is not a trend, so the UI shows **No trend yet**.
- If the trends request fails or omits `at_risk_clients`, the mobile card shows
  **Trend temporarily unavailable**. It must not say **No trend yet**, because
  the latter implies insufficient history rather than an API problem.
- A headline metric request failure remains a page-level Insights failure. A
  trend-only failure preserves the headline count and degrades only the trend.

The chart needs no synthetic fallback values for this metric. Unlike the
desktop revenue/appointments feature chart, do not fabricate a line when the
at-risk trend is unavailable.

## Performance and stability requirements

- Load the headline and trend requests in parallel after the timezone is
  known. The current implementation does this with `Promise.all` while letting
  the trend request fail independently.
- Keep the request through the existing same-origin proxy routes. Do not expose
  a backend base URL or bearer token to the browser.
- Do not client-side poll for snapshots. Refresh on the existing
  `rootfoil:appointments-changed` event and on normal navigation/range changes.
  Backend snapshot freshness belongs to the scheduler.
- Do not persist trend responses in local storage. They are account-scoped,
  time-sensitive business data.
- Preserve the existing effect cancellation guard so a late request from a
  previous range cannot replace a newer selection.
- Do not assume bucket array position is a date. Preserve the returned dates in
  any future tooltip, hover, or accessibility work; use the date to identify a
  selected data point.

## At-risk detail modal

Clicking the metric calls:

```text
GET /api/insights/at-risk-clients/attention
X-Insights-Contract-Version: at_risk_clients.attention.v4
```

The detail endpoint is a current-state attention list. Its distinct client
count should match the current headline for the same account/evaluation
instant. The existing generic detail renderer only displays top-level scalar
fields; when the backend returns client rows, replace it with an explicit,
paginated attention-list UI rather than flattening arbitrary response fields.

Recommended future detail row fields:

```text
client_id, display_name, expected_return_date, days_overdue,
last_completed_appointment_at, next_appointment_at, risk_reason
```

Never expose internal calculation versions, worker errors, or snapshot job
metadata in the client-facing detail UI.

## QA checklist

- An account in `America/Denver` at `2026-11-14T01:00:00Z` requests a range
  ending on `2026-11-13`, not `2026-11-14`.
- A seven-day selection receives and renders seven dated buckets, including a
  zero value and today’s provisional bucket when present.
- All-zero buckets render a sparkline; one bucket renders **No trend yet**.
- A trends 5xx/network failure leaves the headline visible and shows **Trend
  temporarily unavailable** on mobile.
- A landing-metric failure shows the existing page-level error state.
- Switching between 7 and 30 days cannot show a stale prior-range response.
- Clicking At-Risk Clients opens the attention endpoint; its visible count and
  headline count agree for stable fixture data.

## Tests to maintain

`InsightsScreenClient.test.tsx` now covers account-timezone date derivation and
rendering a sparkline from `{ date, value }` buckets. Add backend contract
fixtures for:

- exactly 7 and 30 ordered buckets;
- a zero-valued bucket;
- a missing/malformed at-risk series;
- a trend-only request failure; and
- account timezone boundaries and daylight-saving dates.
