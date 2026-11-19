# At-Risk Clients Metric Definition

## Purpose and scope

`at_risk_clients` is the number of distinct clients for one business account who
are due (or overdue) to return and do not already have a valid future
appointment. It is an **account-level daily metric**. It is not a per-client
trend and it is not tied to whether an automated rebooking message was sent.

This definition is versioned as `at_risk_clients.v1`.

## Daily snapshot storage

The backend must persist one aggregate value per account-local date in a table
owned by the analytics/Insights schema. The following PostgreSQL migration is
the required table definition; replace `accounts(id)` only if the backend's
canonical account table uses a different name or primary-key type.

```sql
CREATE TABLE account_at_risk_client_daily_snapshots (
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  snapshot_date DATE NOT NULL,
  at_risk_client_count INTEGER NOT NULL,
  calculation_version TEXT NOT NULL,
  calculated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT account_at_risk_client_daily_snapshots_nonnegative_count
    CHECK (at_risk_client_count >= 0),
  CONSTRAINT account_at_risk_client_daily_snapshots_one_value_per_version
    UNIQUE (account_id, snapshot_date, calculation_version)
);

CREATE INDEX account_at_risk_client_daily_snapshots_range_idx
  ON account_at_risk_client_daily_snapshots
     (account_id, calculation_version, snapshot_date);
```

`snapshot_date` is a timezone-free `DATE`: it represents the account's local
business date, not a UTC date and not an execution timestamp. `calculated_at`
is an audit timestamp for when that date was evaluated.

The snapshot writer must be an upsert, so retries replace the value for the
same account/date/calculation version instead of creating a duplicate:

```sql
INSERT INTO account_at_risk_client_daily_snapshots (
  account_id,
  snapshot_date,
  at_risk_client_count,
  calculation_version,
  calculated_at
)
VALUES ($1, $2, $3, $4, now())
ON CONFLICT (account_id, snapshot_date, calculation_version)
DO UPDATE SET
  at_risk_client_count = EXCLUDED.at_risk_client_count,
  calculated_at = EXCLUDED.calculated_at;
```

The daily job and backfill must write a row even when the count is zero. Trend
queries select by `account_id`, `calculation_version`, and the inclusive date
range, ordered ascending by `snapshot_date`.

## Snapshot calculation

The backend should expose one application service, for example
`writeAtRiskClientDailySnapshot(accountId, snapshotDate)`. Both the scheduled
job and historical backfill call this service; neither has a separate query or
calculation path.

Inputs:

- `accountId`: the account whose data is evaluated;
- `snapshotDate`: a `YYYY-MM-DD` date in that account's local timezone;
- `calculationVersion`: `at_risk_clients.v1` for this definition.

Algorithm:

1. Load the account's IANA timezone. Reject the request if it is unavailable
   or invalid; do not silently use the server timezone.
2. Convert the local start of the day after `snapshotDate` into an instant.
   This exclusive `asOf` instant is the cutoff for facts known by the end of
   the snapshot date.
3. Load the account's eligible clients as of that cutoff. A client must meet
   every eligibility condition in this document. The query must exclude
   soft-deleted, merged, and inactive clients, and must scope every joined
   record to the same account.
4. For every eligible client, ask the canonical projected-return evaluator for
   the expected return date *as of* the cutoff. Pass the snapshot date,
   effective-dated rebooking settings, and only appointment/client facts known
   by the cutoff. Do not derive a second cadence calculation in Insights.
5. A client qualifies when the evaluator returns a local expected-return date
   on or before `snapshotDate` and there is no valid future appointment as of
   the cutoff. Valid future appointments are `pending` or `scheduled`, have a
   local appointment date after `snapshotDate`, and were not later cancelled
   as of the cutoff.
6. Count distinct qualifying client IDs. An empty result is the integer `0`.
7. In the same database transaction, upsert that integer into
   `account_at_risk_client_daily_snapshots` using the statement in the Daily
   snapshot storage section. Commit only after the upsert succeeds.

Reference pseudocode:

```ts
async function writeAtRiskClientDailySnapshot(
  accountId: string,
  snapshotDate: LocalDate,
): Promise<void> {
  const account = await accounts.require(accountId);
  const timezone = requireIanaTimezone(account.timezone);
  const asOf = startOfLocalDay(snapshotDate.plus({ days: 1 }), timezone);

  await database.transaction(async (tx) => {
    const clients = await clientsRepository.eligibleAsOf(tx, {
      accountId,
      asOf,
    });
    let count = 0;

    for (const client of clients) {
      const expectedReturnDate = await projectedReturnDateAsOf(tx, {
        accountId,
        clientId: client.id,
        snapshotDate,
        asOf,
      });
      if (!expectedReturnDate || expectedReturnDate > snapshotDate) continue;

      const hasFutureBooking = await appointmentsRepository.hasValidFutureAsOf(tx, {
        accountId,
        clientId: client.id,
        afterLocalDate: snapshotDate,
        asOf,
        statuses: ["pending", "scheduled"],
      });
      if (!hasFutureBooking) count += 1;
    }

    await snapshotsRepository.upsertAtRiskClientCount(tx, {
      accountId,
      snapshotDate,
      calculationVersion: "at_risk_clients.v1",
      count, // may be zero
    });
  });
}
```

Implementations may replace the per-client calls with a set-based SQL query or
a batch projected-return evaluator. They must retain the same as-of semantics
and use `COUNT(DISTINCT client_id)` so a client with multiple appointments is
never counted more than once.

### Required source-query properties

- Completed-history and projected-return inputs must be limited to appointments
  on or before the `asOf` cutoff.
- Future-booking checks must honor the appointment's lifecycle state at
  `asOf`; a later cancellation cannot change an already-finalized snapshot.
- All appointment comparisons must use the account-local date derived from the
  appointment instant, not the database server's timezone.
- The final write must occur even when there are no eligible clients or no
  qualifying clients.
- The operation is safe to retry because the database uniqueness constraint and
  upsert make it idempotent for a given account/date/version.

## Daily scheduling, retries, and monitoring

Run this as a rolling, timezone-aware backend job rather than a single global
midnight cron. The recommended schedule is an hourly sweep. On each run, it
finds accounts whose *prior local calendar date* has ended and queues a
snapshot for that account/date. A once-per-day global UTC job is not sufficient
because accounts can have different timezones and daylight-saving transitions.

### Work selection

For every active account with a valid IANA timezone:

1. Derive `localToday` from the job's current instant in that account's
   timezone.
2. Set the target `snapshotDate` to `localToday - 1 day`.
3. Queue `(accountId, snapshotDate, "at_risk_clients.v1")` only after a small
   configurable completion buffer (recommended: 30 minutes after local
   midnight) has elapsed.
4. Also select incomplete or failed snapshot work for recent past dates. This
   catches a missed hourly sweep or temporary outage without needing manual
   intervention.

The selector must use timezone-library calendar arithmetic, not a fixed
24-hour subtraction, so it remains correct on daylight-saving days.

### Work ledger and concurrency control

The scheduler needs a durable work ledger separate from the aggregate snapshot
table. It may be a generic jobs table or a dedicated table with the following
equivalent fields:

```text
job_key              // accountId:snapshotDate:calculationVersion
account_id
snapshot_date
calculation_version
status               // queued | running | succeeded | failed
attempt_count
next_attempt_at
last_error_code
last_error_message   // sanitized, bounded diagnostic text
started_at
completed_at
```

Enforce a unique key on `job_key` (or on account/date/version). Workers claim
work atomically, for example with a `FOR UPDATE SKIP LOCKED` claim or a
compare-and-set status update. A lease/heartbeat is required so a job left in
`running` by a crashed worker becomes eligible again after its lease expires.

The calculation's aggregate upsert is the final idempotency guard. It remains
safe if the scheduler queues duplicate work or a worker retries after an
ambiguous timeout.

### Retry policy

- Retry transient database, service, and network failures automatically with
  exponential backoff and jitter (for example: 5 minutes, 30 minutes, 2 hours,
  then 6 hours).
- Do not retry invalid account configuration, such as a missing/invalid
  timezone, until that configuration changes; record it as a permanent failure
  with an actionable error code.
- Cap automatic attempts (recommended: 5). Thereafter surface the work item in
  an operations queue and retain a manual replay action.
- A successful replay always writes the same account/date/version via upsert;
  no cleanup or delete is required first.

### Monitoring and alerting

Emit structured logs and metrics for every account/date attempt. At minimum,
record:

- `at_risk_snapshot_attempt_total` tagged by outcome and calculation version;
- `at_risk_snapshot_duration_seconds`;
- `at_risk_snapshot_queue_lag_seconds` from local-day completion to success;
- `at_risk_snapshot_failed_accounts` / count of terminal failures;
- the account ID, snapshot date, attempt number, and a sanitized failure code
  in logs (never client data).

Alert the on-call/operations channel when any of the following occurs:

- a terminal account/date failure exists;
- a completed local day has no successful snapshot after the allowed lag
  window (recommended: 6 hours);
- failure rate or queue lag exceeds the service's normal threshold;
- the hourly scheduler has not run within two expected intervals.

Provide an operations view or command to filter failures by account/date,
inspect the error code, and safely requeue a job. Its replay must invoke the
same snapshot service, never write a count supplied by the operator.

## Historical backfill

Provide a backend-only, resumable command that reuses
`writeAtRiskClientDailySnapshot`. It is for seeding existing accounts after the
feature is released and for repairing gaps; it must not have a separate metric
implementation.

Suggested interface:

```text
backfill-at-risk-client-snapshots \
  [--account-id <id>] \
  [--start-date YYYY-MM-DD --end-date YYYY-MM-DD | --days 90] \
  [--force] \
  [--dry-run] \
  [--concurrency <n>]
```

### Date selection

- The default is `--days 90`, meaning the 90 fully completed local calendar
  dates ending yesterday for each account. This immediately covers the 7- and
  30-day selectors with sufficient buffer.
- `--days 30` is the supported minimum rollout window. Use 90 for the initial
  production backfill unless capacity constraints require a staged rollout.
- An explicit `--start-date` and `--end-date` is inclusive and is interpreted
  as account-local dates. It cannot include a future local date for that
  account.
- Backfill does not create today's final snapshot. Today's headline metric is
  live; its finalized daily point is created by the normal scheduler after the
  account's day has ended.

### Gap-fill behavior

For every selected account/date/version, first check for an existing snapshot.
By default, enqueue and calculate only missing dates. Existing finalized
snapshots are preserved, which makes the command safe to stop and resume.

`--force` is an explicit correction mode: it re-evaluates and upserts every
selected date for the requested version. It requires an audited invocation and
should be limited to a known correction/backfill policy because a current-state
calculation must not overwrite historical values unless the evaluator can
reconstruct the required as-of facts.

An empty qualifying set writes `at_risk_client_count = 0`. Therefore a gap is
defined by absence of a snapshot row, not by a count of zero.

### Execution and recovery

1. Enumerate active accounts in stable, paginated batches; never load all
   accounts into memory.
2. For each account, derive the account-local date window and identify missing
   date rows for `at_risk_clients.v1`.
3. Insert/claim one durable scheduler-work item per missing account/date pair.
   The normal workers then execute the same retryable snapshot service used for
   daily scheduling.
4. Persist progress by account cursor and work-item status. Rerunning the same
   command is safe: completed rows are skipped and unfinished/failed work is
   resumed through the work ledger.
5. Report totals for accounts scanned, dates considered, snapshots already
   present, jobs queued, successful writes (including zeroes), and failures.

`--dry-run` performs all account/date and gap selection but creates neither
work items nor snapshot rows. Use it before every broad production invocation.

### Rollout verification

After the initial 90-day backfill completes, verify for a sample of accounts
in multiple timezones that:

- each completed local date has one row for `at_risk_clients.v1`;
- zero-risk dates are represented by `0`, not absent rows;
- 7- and 30-day trend queries return the expected number of daily buckets;
- no failed or expired work items remain; and
- the scheduled job continues from the last completed local date without a
  duplicate or a gap.

## `GET /api/insights/trends` contract

Extend the existing Insights trends endpoint to include an additive
`at_risk_clients` series. The existing web client requests this endpoint with
`X-Insights-Contract-Version: insights.v6.trends.2`; the new series must be
available under that contract (or under a documented successor that the web
client is updated to request).

For an authenticated account, the endpoint must interpret `start_date` and
`end_date` as inclusive local calendar dates in that account's configured IANA
timezone. It must reject an invalid range or any date after the account's local
today; it must never reinterpret the dates in the API server's timezone.

The response includes exactly one ordered bucket for every requested date:

```json
{
  "trends": [
    {
      "metric_id": "at_risk_clients",
      "buckets": [
        { "date": "2026-11-12", "value": 3 },
        { "date": "2026-11-13", "value": 0 },
        { "date": "2026-11-14", "value": 2 }
      ]
    }
  ]
}
```

`date` is required, is an account-local `YYYY-MM-DD` string, and is strictly
ascending. `value` is required and is a non-negative integer. A zero count is
returned as `0`, never `null`, omitted, or a missing bucket. The endpoint may
retain its normal response envelope (for example `data.trends`) so long as this
series shape is preserved inside it.

### Bucket generation

1. Generate the complete inclusive sequence of account-local dates before
   looking up data. This sequence is the source of bucket order and expected
   cardinality, not the database rows.
2. For every completed local date, read the single
   `at_risk_clients.v1` snapshot matching the account and date.
3. The requested local today is allowed and is represented by a provisional
   live evaluation using the same canonical evaluator as the snapshot service;
   it is not persisted as the day's final snapshot. If the API contract allows
   metadata, include `final: false` on this bucket and `final: true` on
   completed-date buckets. The numeric `value` remains required in either
   case.
4. A missing completed-date snapshot is a data-integrity failure, not evidence
   that the count was zero. Queue a repair through the shared snapshot service
   and return a retriable Insights error; do not run an unbounded backfill in a
   user-facing request. Never silently substitute `0` or omit the date.

The endpoint must always scope its snapshot query by account ID and
calculation version. It should fetch all completed-date rows in one range query
and map them back onto the generated date sequence; it must not issue one query
per bucket.

### Endpoint acceptance checks

- A seven-day request including today returns seven buckets, in ascending
  account-local date order; six are finalized snapshots and today is a live
  provisional value.
- A 30-day request returns 30 buckets, including dates whose value is zero.
- A requested completed date with an absent row is repaired or fails visibly;
  it never becomes a fabricated zero.
- Requests made near UTC midnight by accounts in different timezones return
  each account's own local dates and correct bucket count.
- The current frontend parser accepts `{ date, value }` buckets already, but
  API and UI tests must assert that `at_risk_clients` is present and its date
  order is preserved.

## Shared evaluator for the live headline and snapshots

Implement one backend domain service as the sole authority for this metric—for
example:

```text
evaluateAtRiskClients({ accountId, evaluationDate, asOf, calculationVersion })
  -> { count, clientIds, evaluationDate, asOf, calculationVersion }
```

It owns client eligibility, projected-return evaluation, appointment-status
rules, account-timezone conversion, and distinct-client counting. The service
does not write a snapshot itself, so it can serve both live reads and snapshot
writes. The snapshot writer calls it with the end-of-local-day cutoff; the live
read calls it for the account's current local date and the current instant.

Use this evaluator in all of the following paths:

- `GET /api/insights` for the current `at_risk_clients` headline metric;
- `GET /api/insights/at-risk-clients/attention` for the client-level detail;
- today's provisional bucket in `GET /api/insights/trends`;
- the daily snapshot service and historical backfill.

The Insight headline response should continue to expose the existing metric
shape, with a count sourced directly from the evaluator:

```json
{
  "id": "at_risk_clients",
  "unit": "count",
  "result": { "value": 3 }
}
```

The attention/detail endpoint must return clients from the same evaluation
result, not rerun a hand-written filter. Its number of distinct client IDs must
equal `result.value` for the same account and evaluation instant.

### Consistency requirements

- Share the evaluator module and calculation-version constant; do not copy its
  query into the Insights controller, the detail controller, the scheduler, or
  the backfill command.
- Use the same effective-dated projected-return settings and client/appointment
  status mapping in every caller.
- Evaluate the headline and attention detail from one request-scoped result (or
  the same read-consistency transaction) when both are requested together, so
  a concurrent booking cannot make the displayed count and detail list differ.
- Any cache for the live metric must be short-lived and invalidated by client,
  appointment, lifecycle, timezone, or projected-return-setting changes. A
  stale cache must never be used for a finalized snapshot.
- The completed-date trend value must equal the persisted snapshot. It is not
  recomputed at read time, except when repairing a documented missing snapshot.

### Alignment tests

- For a controlled account, the Insights headline equals the number of clients
  returned by the attention endpoint.
- Running the evaluator for a completed local date, then writing a snapshot,
  produces a snapshot count equal to the evaluator count.
- The trend endpoint returns that same stored count for the completed date.
- A newly scheduled/cancelled appointment and a projected-return setting change
  update the next live headline evaluation and invalidate any applicable cache.

## Evaluation time and timezone

Each point is evaluated at the end of the account's local business date, using
the account's configured IANA timezone. For a snapshot dated `2026-11-18`,
appointments are classified using their instant as it falls in that account's
local calendar date; UTC midnight must not be used as the boundary.

The live Insights value uses the same evaluator with the current local date.
The daily snapshot job evaluates the date that just ended. Historical backfills
must evaluate the requested local date, not the date the backfill runs.

## Eligible clients

A client is considered only when all of the following are true at the
evaluation date:

- The client belongs to the account.
- The client is not soft-deleted, merged into another client, or otherwise
  inactive according to the canonical client lifecycle state.
- The client has at least one completed appointment on or before the
  evaluation date.
- The canonical projected-return service can calculate an expected return date
  for that client.

No separate minimum visit count is applied here. If the projected-return
service requires more history to calculate a date, that service makes the
client ineligible until it can produce one. This keeps Insights, the client
profile's return-timing display, and rebooking automation on the same rule.

## Expected return date

The expected return date is supplied by the canonical projected-return / return
timing service, using the rules and account settings effective on the snapshot
date. Insights must not independently estimate a cadence from appointment
history or use a different default interval.

If the return-timing service exposes a reason that no date can be calculated,
the client is excluded rather than guessed into the metric.

## At-risk rule

An eligible client counts as at risk when both conditions are true:

1. Their expected return date is on or before the evaluation date in the
   account timezone.
2. They have no future appointment that is valid as of the evaluation date.

A valid future appointment is one for the same client with a local appointment
date after the evaluation date and a status that reserves an intended return:
`pending` or `scheduled`. Cancelled and no-show appointments never suppress
risk. Completed appointments do not qualify as future appointments.

The expected-return date itself is inclusive: a client becomes at risk on that
local date if they have not booked a valid future appointment. This is a
business rule, not a reminder-delivery rule; message opt-outs, automation
configuration, and delivery failures do not change the count.

## Counting and stored value

Each qualifying client contributes exactly one to the account's count,
regardless of the number of completed visits or future appointments. The
stored metric value is a non-negative integer. A day with no qualifying clients
stores `0`; it is never represented by a missing bucket.

The metric does not create a daily row for each client. The snapshot contains
only the daily aggregate count. Client-level detail may be recomputed on demand
using the same evaluator for the requested date.

## Historical correctness

Historical evaluation must use facts known as of the end of the snapshot date:

- appointments created, cancelled, or rescheduled after that date must not
  alter an already-finalized historical point unless the system supports an
  explicit correction/rebuild;
- client lifecycle changes after that date follow the same as-of rule where
  historical lifecycle data exists;
- projected-return configuration changes require a metric calculation version
  or effective-dated settings so a backfill is reproducible.

If the system cannot reconstruct an as-of value reliably, it must label the
point as estimated or omit it from a historical backfill; it must not present a
current-state calculation as a finalized historical snapshot.

## Examples

| Client state on the account's local date | Counted? |
| --- | --- |
| Expected return is today; no future booking | Yes |
| Expected return was 10 days ago; future appointment is scheduled | No |
| Expected return was 10 days ago; only a cancelled future appointment exists | Yes |
| One completed appointment, and the canonical service returns a projected date that is due | Yes |
| No completed appointments or no projected date available | No |
| Deleted or merged client | No |

## Acceptance criteria

- The live metric, daily snapshot job, at-risk detail endpoint, and rebooking
  automation use the same projected-return evaluator.
- The calculation counts unique clients and returns zero rather than no data.
- Every date in a requested Insights trend range has one account-local bucket.
- Boundary tests cover local midnight, daylight-saving changes, an expected
  return date equal to the evaluation date, and each appointment status.
