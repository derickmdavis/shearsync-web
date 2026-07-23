(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/web/src/lib/config/public.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuthRecoveryUrl",
    ()=>getAuthRecoveryUrl,
    "getBrowserApiOrigin",
    ()=>getBrowserApiOrigin,
    "getMarketingOrigin",
    ()=>getMarketingOrigin,
    "getSupabaseBrowserConfig",
    ()=>getSupabaseBrowserConfig,
    "getWebAppOrigin",
    ()=>getWebAppOrigin,
    "getWebAppUrl",
    ()=>getWebAppUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const LOCAL_WEB_APP_ORIGIN = "http://localhost:3001";
const LOCAL_MARKETING_ORIGIN = "http://localhost:3000";
const LOCAL_BACKEND_API_ORIGIN = "http://localhost:3000";
function getAbsoluteOrigin(name, value, fallback) {
    const candidate = value?.trim() || fallback;
    try {
        const url = new URL(candidate);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            throw new Error("unsupported protocol");
        }
        return url.origin;
    } catch  {
        throw new Error(`${name} must be a valid absolute HTTP(S) URL.`);
    }
}
function joinOriginAndPath(origin, path = "/") {
    return new URL(path.startsWith("/") ? path : `/${path}`, `${origin}/`).toString();
}
function getWebAppOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_WEB_APP_URL", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WEB_APP_URL, LOCAL_WEB_APP_ORIGIN);
}
function getMarketingOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_MARKETING_URL", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_MARKETING_URL, LOCAL_MARKETING_ORIGIN);
}
function getBrowserApiOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_API_BASE_URL", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL, LOCAL_BACKEND_API_ORIGIN);
}
function getSupabaseBrowserConfig() {
    const url = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const anonKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
    if (!url || !anonKey) {
        return null;
    }
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            throw new Error("unsupported protocol");
        }
    } catch  {
        throw new Error("NEXT_PUBLIC_SUPABASE_URL must be a valid absolute HTTP(S) URL.");
    }
    return {
        url,
        anonKey
    };
}
function getWebAppUrl(path = "/") {
    return joinOriginAndPath(getWebAppOrigin(), path);
}
function getAuthRecoveryUrl(nextPath) {
    const params = new URLSearchParams({
        mode: "update-password"
    });
    if (nextPath) {
        params.set("next", nextPath);
    }
    return getWebAppUrl(`/login?${params.toString()}`);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_BASE_URL",
    ()=>API_BASE_URL,
    "ApiError",
    ()=>ApiError,
    "DEFAULT_FETCH_TIMEOUT_MS",
    ()=>DEFAULT_FETCH_TIMEOUT_MS,
    "cancelManagedAppointment",
    ()=>cancelManagedAppointment,
    "createClientReferralLink",
    ()=>createClientReferralLink,
    "createPublicBooking",
    ()=>createPublicBooking,
    "createPublicBookingIntake",
    ()=>createPublicBookingIntake,
    "createPublicReferencePhotoUploadIntent",
    ()=>createPublicReferencePhotoUploadIntent,
    "fetchWithTimeout",
    ()=>fetchWithTimeout,
    "finalizePublicReferencePhoto",
    ()=>finalizePublicReferencePhoto,
    "getAccountPlan",
    ()=>getAccountPlan,
    "getAccountProfile",
    ()=>getAccountProfile,
    "getAuthenticatedUser",
    ()=>getAuthenticatedUser,
    "getClientReferralLink",
    ()=>getClientReferralLink,
    "getClientReferralStats",
    ()=>getClientReferralStats,
    "getClients",
    ()=>getClients,
    "getManagedAppointment",
    ()=>getManagedAppointment,
    "getPublicAvailability",
    ()=>getPublicAvailability,
    "getPublicServices",
    ()=>getPublicServices,
    "getPublicSlots",
    ()=>getPublicSlots,
    "getPublicStylist",
    ()=>getPublicStylist,
    "getStylistSettingsProfile",
    ()=>getStylistSettingsProfile,
    "joinWaitlist",
    ()=>joinWaitlist,
    "rescheduleManagedAppointment",
    ()=>rescheduleManagedAppointment,
    "resolvePublicReferral",
    ()=>resolvePublicReferral,
    "updateAccountProfile",
    ()=>updateAccountProfile,
    "updateStylistSettingsProfile",
    ()=>updateStylistSettingsProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/config/public.ts [app-client] (ecmascript)");
;
function getServerApiOrigin() {
    const candidate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_BASE_URL?.trim() || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_BASE_URL?.trim() || "http://localhost:3000";
    try {
        const url = new URL(candidate);
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            throw new Error("unsupported protocol");
        }
        return url.origin;
    } catch  {
        throw new Error("API_BASE_URL must be a valid absolute HTTP(S) URL.");
    }
}
const API_BASE_URL = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBrowserApiOrigin"])();
const DEFAULT_FETCH_TIMEOUT_MS = 15000;
class ApiError extends Error {
    status;
    details;
    constructor(message, status, details){
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}
async function fetchWithTimeout(input, init = {}, timeoutMs = DEFAULT_FETCH_TIMEOUT_MS) {
    const controller = new AbortController();
    const timeoutId = setTimeout(()=>controller.abort(), timeoutMs);
    const upstreamSignal = init.signal;
    function handleUpstreamAbort() {
        controller.abort();
    }
    if (upstreamSignal?.aborted) {
        controller.abort();
    } else {
        upstreamSignal?.addEventListener("abort", handleUpstreamAbort, {
            once: true
        });
    }
    try {
        return await fetch(input, {
            ...init,
            signal: controller.signal
        });
    } finally{
        clearTimeout(timeoutId);
        upstreamSignal?.removeEventListener("abort", handleUpstreamAbort);
    }
}
function isAbortError(error) {
    return error instanceof DOMException && error.name === "AbortError";
}
function isFetchNetworkError(error) {
    if (!(error instanceof Error)) {
        return false;
    }
    return /^(fetch failed|failed to fetch|load failed|networkerror)$/i.test(error.message.trim());
}
function isBrowser() {
    return ("TURBOPACK compile-time value", "object") !== "undefined";
}
function getRequestBaseUrl(preferProxy) {
    // Browser public calls prefer same-origin Next route handlers so RLS-sensitive
    // public mutations, like waitlist joins, go through the backend API instead
    // of directly touching Supabase from an anonymous client.
    if (preferProxy && isBrowser()) {
        return "";
    }
    return API_BASE_URL;
}
async function parseResponseBody(response) {
    const contentType = response.headers.get("content-type") ?? "";
    // Some backend/proxy errors return text, so parse defensively rather than
    // assuming every response is JSON.
    if (contentType.includes("application/json")) {
        return response.json();
    }
    const text = await response.text();
    if (!text) {
        return null;
    }
    try {
        return JSON.parse(text);
    } catch  {
        return text;
    }
}
function unwrapPayload(payload) {
    // Prefer the backend's data field when present, but keep bare-object support
    // for endpoints that have not adopted the envelope yet.
    if (payload && typeof payload === "object" && "data" in payload) {
        return payload.data;
    }
    return payload;
}
function normalizePublicService(service) {
    return {
        ...service,
        durationMinutes: service.durationMinutes ?? service.duration_minutes ?? 0,
        isActive: service.isActive ?? service.is_active ?? true,
        isDefault: service.isDefault ?? service.is_default ?? false,
        sortOrder: service.sortOrder ?? service.sort_order ?? Number.MAX_SAFE_INTEGER
    };
}
function extractApiErrorMessage(payload, fallback) {
    if (payload && typeof payload === "object") {
        const error = payload.error;
        if (error?.message) {
            return error.message;
        }
    }
    if (typeof payload === "string" && payload.trim()) {
        return payload;
    }
    return fallback;
}
async function requestPublicApi(path, { init, preferProxy = true } = {}) {
    const baseUrl = getRequestBaseUrl(preferProxy);
    const headers = new Headers(init?.headers);
    // Any request with a body is JSON by convention unless the caller explicitly
    // supplies a different Content-Type.
    if (init?.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    let response;
    try {
        response = await fetchWithTimeout(`${baseUrl}${path}`, {
            ...init,
            headers,
            cache: "no-store"
        });
    } catch (error) {
        throw new ApiError(error instanceof Error ? isAbortError(error) ? "The booking service timed out. Please try again." : isFetchNetworkError(error) ? "Unable to reach the booking service. Please try again." : error.message : "A network error occurred while contacting the booking service.", 0);
    }
    const payload = await parseResponseBody(response);
    if (!response.ok) {
        throw new ApiError(extractApiErrorMessage(payload, "Request failed."), response.status, payload && typeof payload === "object" ? payload.error?.details : undefined);
    }
    return unwrapPayload(payload);
}
async function requestAuthenticatedApi(path, accessToken, { init } = {}) {
    const headers = new Headers(init?.headers);
    // Authenticated account/settings calls use the Supabase access token as a
    // bearer token; the backend still owns authorization decisions.
    headers.set("Authorization", `Bearer ${accessToken}`);
    if (init?.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    let response;
    try {
        response = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
            ...init,
            headers,
            cache: "no-store"
        });
    } catch (error) {
        throw new ApiError(error instanceof Error ? isAbortError(error) ? "The account service timed out. Please try again." : isFetchNetworkError(error) ? "Unable to reach the account service. Please try again." : error.message : "A network error occurred while contacting the account service.", 0);
    }
    const payload = await parseResponseBody(response);
    if (!response.ok) {
        throw new ApiError(extractApiErrorMessage(payload, "Request failed."), response.status, payload && typeof payload === "object" ? payload.error?.details : undefined);
    }
    return unwrapPayload(payload);
}
async function getAuthenticatedUser(accessToken) {
    return requestAuthenticatedApi("/me", accessToken);
}
async function getPublicStylist(slug) {
    return requestPublicApi(`/api/public/stylists/${slug}`, {
        preferProxy: false
    });
}
async function getPublicServices(slug, bookingContextToken, options = {}) {
    const params = new URLSearchParams();
    if (bookingContextToken?.trim()) {
        params.set("booking_context_token", bookingContextToken);
    }
    const search = params.toString();
    const services = await requestPublicApi(`/api/public/services/${slug}${search ? `?${search}` : ""}`, {
        init: {
            signal: options.signal
        }
    });
    return services.map(normalizePublicService);
}
async function getPublicAvailability(slug, bookingContextToken, options = {}) {
    const params = new URLSearchParams();
    if (bookingContextToken?.trim()) {
        params.set("booking_context_token", bookingContextToken);
    }
    const search = params.toString();
    return requestPublicApi(`/api/public/availability/${slug}${search ? `?${search}` : ""}`, {
        init: {
            signal: options.signal
        }
    });
}
async function getPublicSlots(slug, serviceIds, date, bookingContextToken, options = {}) {
    const normalizedServiceIds = Array.isArray(serviceIds) ? serviceIds.filter(Boolean) : [
        serviceIds
    ];
    const params = new URLSearchParams({
        date
    });
    if (normalizedServiceIds[0]) {
        params.set("service_id", normalizedServiceIds[0]);
    }
    if (bookingContextToken?.trim()) {
        params.set("booking_context_token", bookingContextToken);
    }
    return requestPublicApi(`/api/public/availability/${slug}/slots?${params.toString()}`, {
        init: {
            signal: options.signal
        }
    });
}
async function createPublicBookingIntake(body) {
    return requestPublicApi("/api/public/booking-intake", {
        init: {
            method: "POST",
            body: JSON.stringify(body)
        }
    });
}
async function createPublicBooking(body, options = {}) {
    const headers = new Headers();
    if (options.idempotencyKey) {
        headers.set("Idempotency-Key", options.idempotencyKey);
    }
    return requestPublicApi("/api/public/bookings", {
        init: {
            method: "POST",
            headers,
            signal: options.signal,
            body: JSON.stringify(body)
        }
    });
}
async function resolvePublicReferral(referralCode) {
    return requestPublicApi(`/api/public/referrals/${encodeURIComponent(referralCode)}`);
}
async function createPublicReferencePhotoUploadIntent(body) {
    return requestPublicApi("/api/public/appointment-reference-photos/upload-intent", {
        init: {
            method: "POST",
            body: JSON.stringify(body)
        }
    });
}
async function finalizePublicReferencePhoto(body) {
    return requestPublicApi("/api/public/appointment-reference-photos", {
        init: {
            method: "POST",
            body: JSON.stringify(body)
        }
    });
}
async function joinWaitlist(slug, input) {
    // Public waitlist creation must go through the backend endpoint so anonymous
    // visitors never need direct table insert permissions.
    return requestPublicApi(`/api/public/stylists/${slug}/waitlist`, {
        init: {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
        }
    });
}
function getManagedAppointmentPath(token, source = "legacy-token") {
    const encodedToken = encodeURIComponent(token);
    return source === "short-code" ? `/api/public/appointment-links/${encodedToken}` : `/api/public/appointments/manage/${encodedToken}`;
}
function normalizeManagedAppointmentResponse(payload) {
    if (payload && typeof payload === "object" && "valid" in payload) {
        if (!payload.valid) {
            throw new ApiError(payload.message || "This appointment link is invalid or expired.", 401, payload.reason ? {
                reason: payload.reason
            } : undefined);
        }
        const appointment = payload.appointment;
        const stylist = payload.stylist;
        const client = payload.client;
        const allowedActions = payload.allowedActions;
        const policy = payload.policy;
        if (!appointment || !stylist) {
            throw new ApiError("Unable to load this appointment link.", 502);
        }
        return {
            appointment_id: appointment.appointment_id ?? appointment.id ?? "",
            client_id: client?.client_id ?? client?.id ?? "",
            stylist_id: stylist.stylist_id ?? stylist.id ?? "",
            stylist_slug: stylist.slug ?? "",
            stylist_display_name: stylist.displayName ?? stylist.display_name ?? "Your stylist",
            business_name: stylist.businessName ?? stylist.business_name ?? null,
            client_name: client?.displayName ?? client?.display_name ?? client?.name ?? client?.firstName ?? client?.first_name ?? "Client",
            service_name: appointment.serviceName ?? appointment.service_name ?? "",
            service_duration_minutes: appointment.durationMinutes ?? appointment.duration_minutes ?? appointment.serviceDurationMinutes ?? appointment.service_duration_minutes ?? 0,
            service_price: appointment.price ?? appointment.servicePrice ?? appointment.service_price ?? 0,
            appointment_date: appointment.appointmentDate ?? appointment.appointment_date ?? "",
            appointment_end: appointment.appointmentEnd ?? appointment.appointment_end ?? null,
            business_timezone: stylist.timezone ?? stylist.business_timezone ?? null,
            status: appointment.status ?? "scheduled",
            can_cancel: allowedActions?.canCancel ?? allowedActions?.can_cancel ?? false,
            can_reschedule: allowedActions?.canReschedule ?? allowedActions?.can_reschedule ?? false,
            cancel_disabled_reason: allowedActions?.cancelDisabledReason ?? allowedActions?.cancel_disabled_reason ?? null,
            reschedule_disabled_reason: allowedActions?.rescheduleDisabledReason ?? allowedActions?.reschedule_disabled_reason ?? null,
            cancellation_policy_text: policy?.cancellationPolicyText ?? policy?.cancellation_policy_text ?? null,
            reschedule_policy_text: policy?.reschedulePolicyText ?? policy?.reschedule_policy_text ?? null
        };
    }
    return payload;
}
async function getManagedAppointment(token, source = "legacy-token") {
    const appointment = await requestPublicApi(getManagedAppointmentPath(token, source));
    return normalizeManagedAppointmentResponse(appointment);
}
async function cancelManagedAppointment(token, source = "legacy-token") {
    const appointment = await requestPublicApi(`${getManagedAppointmentPath(token, source)}/cancel`, {
        init: {
            method: "POST"
        }
    });
    return normalizeManagedAppointmentResponse(appointment);
}
async function rescheduleManagedAppointment(token, source, body) {
    const requestedDateTime = body.newAppointmentDate ?? body.requested_datetime;
    if (!requestedDateTime) {
        throw new ApiError("Please choose a new appointment time.", 400);
    }
    const requestBody = source === "short-code" ? {
        newAppointmentDate: requestedDateTime,
        service_id: body.service_id
    } : {
        requested_datetime: requestedDateTime,
        service_id: body.service_id
    };
    const appointment = await requestPublicApi(`${getManagedAppointmentPath(token, source)}/reschedule`, {
        init: {
            method: "POST",
            body: JSON.stringify(requestBody)
        }
    });
    return normalizeManagedAppointmentResponse(appointment);
}
async function getAccountProfile(accessToken) {
    return requestAuthenticatedApi("/api/settings/profile", accessToken);
}
async function updateAccountProfile(accessToken, body) {
    return requestAuthenticatedApi("/api/settings/profile", accessToken, {
        init: {
            method: "PATCH",
            body: JSON.stringify(body)
        }
    });
}
async function getStylistSettingsProfile(accessToken) {
    return requestAuthenticatedApi("/api/settings/booking", accessToken);
}
async function updateStylistSettingsProfile(accessToken, body) {
    return requestAuthenticatedApi("/api/settings/booking", accessToken, {
        init: {
            method: "PATCH",
            body: JSON.stringify(body)
        }
    });
}
async function getAccountPlan(accessToken) {
    return requestAuthenticatedApi("/api/account/plan", accessToken);
}
async function getClients(accessToken) {
    const clients = await requestAuthenticatedApi("/api/clients", accessToken);
    return [
        ...clients
    ].sort((clientA, clientB)=>{
        const nameA = `${clientA.first_name} ${clientA.last_name}`.trim();
        const nameB = `${clientB.first_name} ${clientB.last_name}`.trim();
        return nameA.localeCompare(nameB, undefined, {
            sensitivity: "base",
            numeric: true
        });
    });
}
async function getClientReferralLink(clientId, accessToken) {
    return requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}/referral-link`, accessToken);
}
async function createClientReferralLink(clientId, accessToken) {
    return requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}/referral-link`, accessToken, {
        init: {
            method: "POST"
        }
    });
}
async function getClientReferralStats(clientId, accessToken) {
    return requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}/referral-stats`, accessToken);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addDaysToDate",
    ()=>addDaysToDate,
    "buildAvailabilityDateOptions",
    ()=>buildAvailabilityDateOptions,
    "buildBookingIcs",
    ()=>buildBookingIcs,
    "buildBookingNotes",
    ()=>buildBookingNotes,
    "buildFallbackDateOptions",
    ()=>buildFallbackDateOptions,
    "buildSummaryName",
    ()=>buildSummaryName,
    "buildWeekDateOptions",
    ()=>buildWeekDateOptions,
    "extractAvailabilityDates",
    ()=>extractAvailabilityDates,
    "extractAvailabilityRows",
    ()=>extractAvailabilityRows,
    "extractAvailabilityTimezone",
    ()=>extractAvailabilityTimezone,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDuration",
    ()=>formatDuration,
    "formatLongDate",
    ()=>formatLongDate,
    "formatMonthDay",
    ()=>formatMonthDay,
    "formatMonthLabel",
    ()=>formatMonthLabel,
    "formatServiceNames",
    ()=>formatServiceNames,
    "formatShortWeekday",
    ()=>formatShortWeekday,
    "formatTime",
    ()=>formatTime,
    "formatTimezoneLabel",
    ()=>formatTimezoneLabel,
    "getTodayDateValue",
    ()=>getTodayDateValue,
    "startOfWeek",
    ()=>startOfWeek,
    "sumServiceDurations",
    ()=>sumServiceDurations,
    "sumServicePrices",
    ()=>sumServicePrices
]);
function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(amount);
}
function formatDuration(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (!hours) {
        return `${minutes}m`;
    }
    if (!minutes) {
        return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
}
function sumServiceDurations(services) {
    return services.reduce((total, service)=>total + service.durationMinutes, 0);
}
function sumServicePrices(services) {
    return services.reduce((total, service)=>total + service.price, 0);
}
function formatServiceNames(services) {
    return services.map((service)=>service.name).join(", ");
}
function formatLongDate(dateTime, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: timeZone ?? undefined
    }).format(new Date(dateTime));
}
function formatTime(dateTime, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: timeZone ?? undefined
    }).format(new Date(dateTime));
}
function formatTimezoneLabel(timezone) {
    if (!timezone) {
        return "Local timezone";
    }
    return `Times shown in ${timezone}`;
}
function extractAvailabilityDates(availability) {
    // The API may return either summarized dates or raw recurring rows; this
    // helper normalizes the summary shape while row handling stays separate.
    if (Array.isArray(availability)) {
        return [];
    }
    const dates = availability?.available_dates ?? availability?.dates ?? availability?.next_available_dates ?? [];
    return dates.filter(Boolean);
}
function extractAvailabilityRows(availability) {
    if (!Array.isArray(availability)) {
        return [];
    }
    return availability.filter((row)=>row.is_active);
}
function buildAvailabilityDateOptions(rows, { startDate = getTodayDateValue(), count = 21, scanDays = 84 } = {}) {
    // When the backend only returns recurring weekly availability, scan forward
    // from today and produce concrete date strings for the booking UI.
    const activeDays = new Set(rows.filter((row)=>row.is_active).map((row)=>row.day_of_week));
    if (!activeDays.size) {
        return [];
    }
    const dates = [];
    for(let offset = 0; offset < scanDays && dates.length < count; offset += 1){
        const date = addDaysToDate(startDate, offset);
        if (activeDays.has(new Date(`${date}T12:00:00`).getDay())) {
            dates.push(date);
        }
    }
    return dates;
}
function extractAvailabilityTimezone(availability) {
    if (!availability || Array.isArray(availability)) {
        return null;
    }
    return availability.timezone ?? null;
}
function buildFallbackDateOptions(count = 7) {
    const options = [];
    const now = new Date();
    for(let index = 0; index < count; index += 1){
        options.push(addDaysToDate(formatDateValue(now), index));
    }
    return options;
}
function getTodayDateValue() {
    return formatDateValue(new Date());
}
function addDaysToDate(date, days) {
    const targetDate = parseDateValue(date);
    targetDate.setDate(targetDate.getDate() + days);
    return formatDateValue(targetDate);
}
function startOfWeek(date) {
    const targetDate = parseDateValue(date);
    const dayOffset = (targetDate.getDay() + 6) % 7;
    targetDate.setDate(targetDate.getDate() - dayOffset);
    return formatDateValue(targetDate);
}
function buildWeekDateOptions(weekStart, count = 7) {
    return Array.from({
        length: count
    }, (_, index)=>addDaysToDate(weekStart, index));
}
function formatShortWeekday(date, timeZone) {
    const targetDate = new Date(`${date}T12:00:00`);
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        timeZone: timeZone ?? undefined
    }).format(targetDate);
}
function formatMonthDay(date, timeZone) {
    const targetDate = new Date(`${date}T12:00:00`);
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        timeZone: timeZone ?? undefined
    }).format(targetDate);
}
function formatMonthLabel(date, timeZone) {
    const targetDate = new Date(`${date}T12:00:00`);
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
        timeZone: timeZone ?? undefined
    }).format(targetDate);
}
function buildSummaryName(stylist) {
    return stylist.business_name || stylist.display_name;
}
function buildBookingIcs(confirmation, stylist, services, slot) {
    // Generate a small client-side .ics file from the confirmation payload so the
    // user can save the appointment without another backend round trip.
    const selectedServices = services.length ? services : [
        {
            id: confirmation.service_id,
            name: confirmation.service_name,
            durationMinutes: confirmation.service_duration_minutes,
            price: confirmation.service_price,
            isActive: true,
            isDefault: true,
            sortOrder: 0
        }
    ];
    const serviceNames = formatServiceNames(selectedServices);
    const dtStart = toIcsDate(slot.start);
    const dtEnd = toIcsDate(confirmation.appointment_end || slot.end);
    const title = `${serviceNames} with ${stylist.display_name}`;
    const description = [
        `Business: ${buildSummaryName(stylist)}`,
        `Stylist: ${stylist.display_name}`,
        `Service: ${serviceNames}`
    ].join("\\n");
    return [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//DripDesk//Public Booking//EN",
        "BEGIN:VEVENT",
        `UID:${confirmation.appointment_id ?? `${stylist.slug}-${slot.start}`}`,
        `DTSTAMP:${toIcsDate(new Date().toISOString())}`,
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${escapeIcsText(title)}`,
        `DESCRIPTION:${escapeIcsText(description)}`,
        `LOCATION:${escapeIcsText(buildSummaryName(stylist))}`,
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\r\n");
}
function buildBookingNotes(services, notes) {
    // Multi-service bookings still send a primary service_id for compatibility,
    // so include the full service list in notes for backend/operator visibility.
    const trimmedNotes = notes.trim();
    if (services.length <= 1) {
        return trimmedNotes || undefined;
    }
    const serviceSummary = `Selected services: ${formatServiceNames(services)}`;
    return trimmedNotes ? `${serviceSummary}\n${trimmedNotes}` : serviceSummary;
}
function toIcsDate(value) {
    return value.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}
function escapeIcsText(value) {
    return value.replaceAll("\\", "\\\\").replaceAll(",", "\\,").replaceAll(";", "\\;").replaceAll("\n", "\\n");
}
function parseDateValue(value) {
    // Noon avoids accidental date rollover around daylight-saving boundaries when
    // converting date-only strings through the local Date constructor.
    return new Date(`${value}T12:00:00`);
}
function formatDateValue(value) {
    const year = value.getFullYear();
    const month = `${value.getMonth() + 1}`.padStart(2, "0");
    const day = `${value.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/lib/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSupabaseBrowserClient",
    ()=>getSupabaseBrowserClient,
    "hasSupabaseBrowserConfig",
    ()=>hasSupabaseBrowserConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/config/public.ts [app-client] (ecmascript)");
;
;
let browserClient = null;
function hasSupabaseBrowserConfig() {
    // Only NEXT_PUBLIC Supabase values belong in this client bundle; service-role
    // keys must stay server-side and are intentionally not referenced here.
    return Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserConfig"])());
}
function getSupabaseBrowserClient() {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserConfig"])();
    const supabaseUrl = config?.url;
    const supabaseAnonKey = config?.anonKey;
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    }
    // Reuse one browser client so auth subscriptions and session storage are not
    // duplicated across account/login screens.
    browserClient ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
    return browserClient;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PublicReferencePhotoUpload",
    ()=>PublicReferencePhotoUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const ACCEPTED_INPUT_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/pjpeg",
    "image/png",
    "image/webp"
];
const ACCEPTED_IMAGE_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
];
const APPOINTMENT_IMAGE_BUCKET = "appointment-images";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_TIMEOUT_MS = 2_147_483_647;
function PublicReferencePhotoUpload({ referenceToken, tokenExpiresAt, initialFile, onInitialFileConsumed }) {
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const autoUploadStartedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const [state, setState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        status: "idle"
    });
    const [selectedFile, setSelectedFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewUrl, setPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const canUpload = useTokenIsActive(referenceToken, tokenExpiresAt);
    const setPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PublicReferencePhotoUpload.useCallback[setPreview]": (nextUrl)=>{
            setPreviewUrl({
                "PublicReferencePhotoUpload.useCallback[setPreview]": (currentUrl)=>{
                    if (currentUrl) {
                        URL.revokeObjectURL(currentUrl);
                    }
                    return nextUrl;
                }
            }["PublicReferencePhotoUpload.useCallback[setPreview]"]);
        }
    }["PublicReferencePhotoUpload.useCallback[setPreview]"], []);
    const uploadReferencePhoto = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PublicReferencePhotoUpload.useCallback[uploadReferencePhoto]": async (file)=>{
            if (!referenceToken) {
                return;
            }
            try {
                setState({
                    status: "processing"
                });
                const [display, thumbnail] = await Promise.all([
                    resizeImage(file, {
                        maxLongEdge: 1600
                    }),
                    resizeImage(file, {
                        maxLongEdge: 520
                    })
                ]);
                setState({
                    status: "uploading",
                    progress: 20
                });
                const intent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicReferencePhotoUploadIntent"])({
                    reference_photo_upload_token: referenceToken,
                    original_filename: file.name || null,
                    content_type: display.contentType,
                    input_size_bytes: display.sizeBytes,
                    display_content_type: display.contentType,
                    thumbnail_content_type: thumbnail.contentType
                });
                setState({
                    status: "uploading",
                    progress: 45
                });
                const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])();
                const displayUpload = await supabase.storage.from(APPOINTMENT_IMAGE_BUCKET).uploadToSignedUrl(intent.signed_upload_urls.display.path, intent.signed_upload_urls.display.token, display.blob, {
                    contentType: display.contentType,
                    upsert: true
                });
                if (displayUpload.error) {
                    throw displayUpload.error;
                }
                setState({
                    status: "uploading",
                    progress: 70
                });
                const thumbnailUpload = await supabase.storage.from(APPOINTMENT_IMAGE_BUCKET).uploadToSignedUrl(intent.signed_upload_urls.thumbnail.path, intent.signed_upload_urls.thumbnail.token, thumbnail.blob, {
                    contentType: thumbnail.contentType,
                    upsert: true
                });
                if (thumbnailUpload.error) {
                    throw thumbnailUpload.error;
                }
                setState({
                    status: "uploading",
                    progress: 90
                });
                const finalized = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["finalizePublicReferencePhoto"])({
                    reference_photo_upload_token: referenceToken,
                    image_id: intent.id,
                    storage_path: intent.storage_path,
                    thumbnail_path: intent.thumbnail_path,
                    original_filename: file.name || null,
                    content_type: display.contentType,
                    file_size_bytes: display.sizeBytes,
                    thumbnail_size_bytes: thumbnail.sizeBytes,
                    width: display.width,
                    height: display.height,
                    caption: null
                });
                setState({
                    status: "success",
                    imageId: finalized.id ?? intent.id
                });
            } catch (error) {
                setState({
                    status: "failed",
                    message: getUploadErrorMessage(error),
                    canRetry: true
                });
            }
        }
    }["PublicReferencePhotoUpload.useCallback[uploadReferencePhoto]"], [
        referenceToken
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PublicReferencePhotoUpload.useEffect": ()=>{
            return ({
                "PublicReferencePhotoUpload.useEffect": ()=>{
                    if (previewUrl) {
                        URL.revokeObjectURL(previewUrl);
                    }
                }
            })["PublicReferencePhotoUpload.useEffect"];
        }
    }["PublicReferencePhotoUpload.useEffect"], [
        previewUrl
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PublicReferencePhotoUpload.useEffect": ()=>{
            if (!canUpload || !initialFile || autoUploadStartedRef.current) {
                return;
            }
            autoUploadStartedRef.current = true;
            setSelectedFile(initialFile);
            setPreview(URL.createObjectURL(initialFile));
            onInitialFileConsumed?.();
            void uploadReferencePhoto(initialFile);
        }
    }["PublicReferencePhotoUpload.useEffect"], [
        canUpload,
        initialFile,
        onInitialFileConsumed,
        setPreview,
        uploadReferencePhoto
    ]);
    if (!canUpload) {
        return null;
    }
    async function handleFileChange(event) {
        const file = event.target.files?.[0] ?? null;
        event.target.value = "";
        if (!file) {
            return;
        }
        if (!isAcceptedImage(file)) {
            setState({
                status: "failed",
                message: "We couldn't upload that photo. Please try another image.",
                canRetry: false
            });
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        await uploadReferencePhoto(file);
    }
    function handleRetry() {
        if (selectedFile && state.status === "failed" && state.canRetry) {
            void uploadReferencePhoto(selectedFile);
        }
    }
    function handleRemove() {
        setSelectedFile(null);
        setPreview(null);
        setState({
            status: "idle"
        });
    }
    const busy = state.status === "processing" || state.status === "uploading";
    const uploadDisabled = busy || state.status === "success";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-8 text-left",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-foreground",
                        children: "Add an inspiration/reference photo"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-6 text-muted",
                        children: "This photo is private and shared only with your stylist for this appointment."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 237,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: "image/jpeg,image/jpg,image/pjpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
                className: "sr-only",
                onChange: (event)=>void handleFileChange(event)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            state.status === "success" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-2xl border border-success/30 bg-success/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex h-10 w-10 items-center justify-center rounded-full bg-success text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-foreground",
                                    children: "Reference photo added"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-muted",
                                    children: "Your stylist will see it with this appointment."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                    lineNumber: 265,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                            lineNumber: 261,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                    lineNumber: 257,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 256,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: uploadDisabled,
                        onClick: ()=>fileInputRef.current?.click(),
                        className: "mt-4 flex min-h-24 w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-brand/40 bg-white px-4 py-4 text-left transition hover:border-brand hover:bg-brand/5 disabled:cursor-not-allowed disabled:opacity-70",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 text-brand",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageIcon, {}, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                            lineNumber: 281,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                        lineNumber: 280,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-sm font-semibold text-foreground",
                                                children: busy ? "Uploading reference photo" : "Add a reference photo"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                                lineNumber: 284,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-1 block text-xs text-muted",
                                                children: "JPG, PNG, or WebP up to 5 MB"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                                lineNumber: 287,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                        lineNumber: 283,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 279,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shrink-0 rounded-full border border-brand/50 px-4 py-2 text-xs font-semibold text-brand",
                                children: "Choose Photo"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this),
                    busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-2 overflow-hidden rounded-full bg-zinc-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-full rounded-full bg-brand transition-all",
                                    style: {
                                        width: state.status === "uploading" ? `${state.progress}%` : "12%"
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                    lineNumber: 300,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 299,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-medium text-muted",
                                children: state.status === "processing" ? "Preparing your photo..." : "Uploading securely..."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 310,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 298,
                        columnNumber: 13
                    }, this) : null,
                    selectedFile && state.status === "failed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-2xl border border-border bg-white p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-3",
                            children: [
                                previewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    className: "h-16 w-16 shrink-0 rounded-xl bg-cover bg-center",
                                    style: {
                                        backgroundImage: `url(${previewUrl})`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                    lineNumber: 322,
                                    columnNumber: 19
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-sm font-semibold text-foreground",
                                            children: selectedFile.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                            lineNumber: 329,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs leading-5 text-muted",
                                            children: state.message
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                            lineNumber: 332,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex flex-wrap gap-3",
                                            children: [
                                                state.canRetry ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleRetry,
                                                    className: "text-xs font-semibold text-brand hover:text-brand-dark",
                                                    children: "Retry"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                                    lineNumber: 337,
                                                    columnNumber: 23
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleRemove,
                                                    className: "text-xs font-semibold text-muted hover:text-foreground",
                                                    children: "Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                                    lineNumber: 345,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                            lineNumber: 335,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                    lineNumber: 328,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                            lineNumber: 320,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 319,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
        lineNumber: 236,
        columnNumber: 5
    }, this);
}
_s(PublicReferencePhotoUpload, "FpAFHjOzoL3oijesNGh4XMEGkjw=", false, function() {
    return [
        useTokenIsActive
    ];
});
_c = PublicReferencePhotoUpload;
function useTokenIsActive(referenceToken, tokenExpiresAt) {
    _s1();
    const subscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTokenIsActive.useCallback[subscribe]": (notify)=>{
            if (!referenceToken || !tokenExpiresAt) {
                return ({
                    "useTokenIsActive.useCallback[subscribe]": ()=>{}
                })["useTokenIsActive.useCallback[subscribe]"];
            }
            const expiryTime = new Date(tokenExpiresAt).getTime();
            const millisecondsUntilExpiry = expiryTime - Date.now();
            if (!Number.isFinite(expiryTime) || millisecondsUntilExpiry <= 0) {
                window.setTimeout(notify, 0);
                return ({
                    "useTokenIsActive.useCallback[subscribe]": ()=>{}
                })["useTokenIsActive.useCallback[subscribe]"];
            }
            let timeoutId = null;
            const schedule = {
                "useTokenIsActive.useCallback[subscribe].schedule": ()=>{
                    const remaining = expiryTime - Date.now();
                    if (remaining <= 0) {
                        notify();
                        return;
                    }
                    timeoutId = window.setTimeout({
                        "useTokenIsActive.useCallback[subscribe].schedule": ()=>{
                            notify();
                            schedule();
                        }
                    }["useTokenIsActive.useCallback[subscribe].schedule"], Math.min(remaining, MAX_TIMEOUT_MS));
                }
            }["useTokenIsActive.useCallback[subscribe].schedule"];
            schedule();
            return ({
                "useTokenIsActive.useCallback[subscribe]": ()=>{
                    if (timeoutId !== null) {
                        window.clearTimeout(timeoutId);
                    }
                }
            })["useTokenIsActive.useCallback[subscribe]"];
        }
    }["useTokenIsActive.useCallback[subscribe]"], [
        referenceToken,
        tokenExpiresAt
    ]);
    const getSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useTokenIsActive.useCallback[getSnapshot]": ()=>{
            if (!referenceToken || !tokenExpiresAt) {
                return false;
            }
            const expiryTime = new Date(tokenExpiresAt).getTime();
            return Number.isFinite(expiryTime) && expiryTime > Date.now();
        }
    }["useTokenIsActive.useCallback[getSnapshot]"], [
        referenceToken,
        tokenExpiresAt
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, {
        "useTokenIsActive.useSyncExternalStore": ()=>false
    }["useTokenIsActive.useSyncExternalStore"]);
}
_s1(useTokenIsActive, "rUsu0urmp2LB4luW/6H994MS1H4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
function isAcceptedImage(file) {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    return ACCEPTED_INPUT_IMAGE_TYPES.some((contentType)=>contentType === type) || ACCEPTED_IMAGE_EXTENSIONS.some((extension)=>name.endsWith(extension));
}
async function resizeImage(file, { maxLongEdge }) {
    const source = await loadImageSource(file);
    const scale = Math.min(1, maxLongEdge / Math.max(source.width, source.height));
    const width = Math.max(1, Math.round(source.width * scale));
    const height = Math.max(1, Math.round(source.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
        cleanupImageSource(source.image);
        throw new Error("Unable to prepare this image.");
    }
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, width, height);
    context.drawImage(source.image, 0, 0, width, height);
    cleanupImageSource(source.image);
    const contentType = getOutputContentType(file.type);
    const blob = await canvasToBoundedBlob(canvas, contentType);
    return {
        blob,
        contentType,
        sizeBytes: blob.size,
        width,
        height
    };
}
async function loadImageSource(file) {
    if ("createImageBitmap" in window) {
        const image = await createImageBitmap(file);
        return {
            image,
            width: image.width,
            height: image.height
        };
    }
    const url = URL.createObjectURL(file);
    try {
        const image = await new Promise((resolve, reject)=>{
            const img = new Image();
            img.onload = ()=>resolve(img);
            img.onerror = ()=>reject(new Error("Unable to read this image."));
            img.src = url;
        });
        return {
            image,
            width: image.naturalWidth,
            height: image.naturalHeight
        };
    } finally{
        URL.revokeObjectURL(url);
    }
}
function cleanupImageSource(image) {
    if ("close" in image && typeof image.close === "function") {
        image.close();
    }
}
function getOutputContentType(value) {
    return value === "image/webp" ? "image/webp" : "image/jpeg";
}
async function canvasToBoundedBlob(canvas, contentType) {
    const qualities = contentType === "image/jpeg" ? [
        0.86,
        0.74,
        0.62,
        0.5
    ] : [
        0.82,
        0.7,
        0.58
    ];
    for (const quality of qualities){
        const blob = await canvasToBlob(canvas, contentType, quality);
        if (blob.size <= MAX_FILE_SIZE_BYTES) {
            return blob;
        }
    }
    throw new Error("We couldn't upload that photo. Please try another image.");
}
function canvasToBlob(canvas, contentType, quality) {
    return new Promise((resolve, reject)=>{
        canvas.toBlob((blob)=>{
            if (blob) {
                resolve(blob);
                return;
            }
            reject(new Error("Unable to prepare this image."));
        }, contentType, quality);
    });
}
function getUploadErrorMessage(error) {
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
        if (error.status === 409) {
            return "A reference photo has already been added for this appointment.";
        }
        if (error.status === 400) {
            return "We couldn't upload that photo. Please try another image.";
        }
        if (error.status === 410) {
            return "Upload expired. Please try again.";
        }
    }
    if (error instanceof Error && error.message) {
        if (error.message.includes("couldn't upload")) {
            return error.message;
        }
    }
    return "Upload failed. Please try again.";
}
function ImageIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        className: "h-6 w-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3.5",
                y: "4.5",
                width: "17",
                height: "15",
                rx: "2.5",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 573,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m6.5 16 3.2-3.4 2.4 2.3 2.6-3.1L18 16",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.8"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 583,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "9",
                cy: "9",
                r: "1.25",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 591,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
        lineNumber: 572,
        columnNumber: 5
    }, this);
}
_c1 = ImageIcon;
function CheckIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        className: "h-5 w-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5.5 12.5 10 17l8.5-9",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2.2"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
            lineNumber: 599,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
        lineNumber: 598,
        columnNumber: 5
    }, this);
}
_c2 = CheckIcon;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "PublicReferencePhotoUpload");
__turbopack_context__.k.register(_c1, "ImageIcon");
__turbopack_context__.k.register(_c2, "CheckIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/BookedStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookedStep",
    ()=>BookedStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$PublicReferencePhotoUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
"use client";
;
;
;
function BookedStep({ confirmation, stylist, services, slot, initialReferencePhotoFile, onInitialReferencePhotoConsumed, onDone }) {
    const scheduled = confirmation.status === "scheduled";
    const serviceNames = services.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatServiceNames"])(services) : confirmation.service_name;
    const totalDuration = services.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServiceDurations"])(services)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])(confirmation.service_duration_minutes);
    const totalPrice = services.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServicePrices"])(services)) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(confirmation.service_price);
    function handleAddToCalendar() {
        const file = new Blob([
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBookingIcs"])(confirmation, stylist, services, slot)
        ], {
            type: "text/calendar;charset=utf-8"
        });
        const url = URL.createObjectURL(file);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = `dripdesk-${stylist.slug}-booking.ics`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success text-white shadow-[0_20px_35px_rgba(16,185,129,0.22)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                    fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-6 text-[34px] font-semibold tracking-tight text-foreground",
                children: scheduled ? "You're All Set!" : "Request Received"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm leading-6 text-muted",
                children: scheduled ? "Your appointment is confirmed." : "Your appointment request is awaiting approval."
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 rounded-3xl border border-border bg-white p-5 text-left shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4 text-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Date",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLongDate"])(confirmation.appointment_date, confirmation.business_timezone)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Time",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(confirmation.appointment_date, confirmation.business_timezone)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Service",
                            value: serviceNames
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Duration",
                            value: totalDuration
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                            lineNumber: 101,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Price",
                            value: totalPrice
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Business",
                            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSummaryName"])(stylist)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Row, {
                            label: "Timezone",
                            value: confirmation.business_timezone || stylist.timezone || "--"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$PublicReferencePhotoUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicReferencePhotoUpload"], {
                referenceToken: confirmation.reference_photo_upload_token ?? confirmation.referencePhotoUploadToken,
                tokenExpiresAt: confirmation.reference_photo_upload_token_expires_at ?? confirmation.referencePhotoUploadTokenExpiresAt,
                initialFile: initialReferencePhotoFile,
                onInitialFileConsumed: onInitialReferencePhotoConsumed
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleAddToCalendar,
                className: "mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark",
                children: "Add to Calendar"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onDone,
                className: "mt-3 w-full rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground",
                children: "Done"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-8 text-xs text-muted",
                children: [
                    "Powered by ",
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSummaryName"])(stylist)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_c = BookedStep;
function Row({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-muted",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-right font-semibold text-foreground",
                children: value
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_c1 = Row;
function CheckIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        className: "h-8 w-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5.5 12.5 10 17l8.5-9",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2.2"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
            lineNumber: 158,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_c2 = CheckIcon;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "BookedStep");
__turbopack_context__.k.register(_c1, "Row");
__turbopack_context__.k.register(_c2, "CheckIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/BookingStepper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookingStepper",
    ()=>BookingStepper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const steps = [
    {
        label: "Details"
    },
    {
        label: "Time"
    },
    {
        label: "Confirm"
    }
];
function BookingStepper({ currentStep }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center",
            children: steps.map((step, index)=>{
                const stepNumber = index + 1;
                const isComplete = currentStep > stepNumber;
                const isActive = currentStep === stepNumber;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: [
                                        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                                        isComplete ? "bg-[#111111] text-white" : isActive ? "bg-brand text-white" : "bg-zinc-100 text-zinc-500"
                                    ].join(" "),
                                    children: isComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                                        lineNumber: 33,
                                        columnNumber: 33
                                    }, this) : stepNumber
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                                    lineNumber: 23,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: [
                                        "text-[11px] font-semibold",
                                        isActive ? "text-foreground" : "text-muted"
                                    ].join(" "),
                                    children: step.label
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                                    lineNumber: 35,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                            lineNumber: 22,
                            columnNumber: 15
                        }, this),
                        index < steps.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-2 mb-6 h-px flex-1 bg-border"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                            lineNumber: 45,
                            columnNumber: 17
                        }, this) : null
                    ]
                }, step.label, true, {
                    fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                    lineNumber: 21,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
            lineNumber: 14,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = BookingStepper;
function CheckIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: "h-4 w-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5 10.5 8.2 13.7 15 7",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
            lineNumber: 58,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
        lineNumber: 57,
        columnNumber: 5
    }, this);
}
_c1 = CheckIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "BookingStepper");
__turbopack_context__.k.register(_c1, "CheckIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/booking-flow-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildBookingServiceUnavailableMessage",
    ()=>buildBookingServiceUnavailableMessage,
    "detailsAreValid",
    ()=>detailsAreValid,
    "getApiErrorReason",
    ()=>getApiErrorReason,
    "isBookingContextExpiredError",
    ()=>isBookingContextExpiredError,
    "isBookingDisabledError",
    ()=>isBookingDisabledError,
    "isBookingSchemaMismatch",
    ()=>isBookingSchemaMismatch,
    "isSelectedServiceUnavailableError",
    ()=>isSelectedServiceUnavailableError,
    "isSlotConflictError",
    ()=>isSlotConflictError,
    "isValidEmail",
    ()=>isValidEmail,
    "sortServices",
    ()=>sortServices,
    "splitFullName",
    ()=>splitFullName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
;
function sortServices(services) {
    // Preserve backend order as a stable tiebreaker when services do not define
    // sortOrder, preventing cards from jumping between renders.
    return services.map((service, index)=>({
            service,
            index
        })).sort((left, right)=>{
        const leftSortOrder = left.service.sortOrder ?? Number.MAX_SAFE_INTEGER;
        const rightSortOrder = right.service.sortOrder ?? Number.MAX_SAFE_INTEGER;
        if (leftSortOrder !== rightSortOrder) {
            return leftSortOrder - rightSortOrder;
        }
        return left.index - right.index;
    }).map(({ service })=>service);
}
function detailsAreValid(values) {
    // The intake endpoint needs enough identity information to decide whether
    // returning-client rules apply before exposing service options.
    const parsedName = splitFullName(values.fullName);
    return Boolean(values.fullName.trim()) && Boolean(parsedName.lastName) && Boolean(values.phone.trim()) && (!values.email.trim() || isValidEmail(values.email.trim()));
}
function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
function splitFullName(value) {
    const parts = value.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
        return {
            firstName: "",
            lastName: ""
        };
    }
    if (parts.length === 1) {
        return {
            firstName: parts[0],
            lastName: ""
        };
    }
    return {
        firstName: parts[0],
        lastName: parts.slice(1).join(" ")
    };
}
function isSlotConflictError(error, message) {
    if (!(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"])) {
        return false;
    }
    const details = getApiErrorDetails(error);
    const normalizedMessage = message.trim().toLowerCase();
    const normalizedReason = details?.reason?.trim().toLowerCase();
    return error.status === 409 || normalizedMessage === "requested time is no longer available" || normalizedMessage === "this time slot is already booked." || normalizedReason === "requested time is no longer available" || normalizedReason === "this time slot is already booked.";
}
function isBookingSchemaMismatch(error) {
    // This handles a known backend migration mismatch so users see a graceful
    // fallback instead of a database-shaped error.
    if (!(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"])) {
        return false;
    }
    const details = getApiErrorDetails(error);
    const normalizedMessage = error.message.trim().toLowerCase();
    const normalizedDetailsMessage = details?.message?.trim().toLowerCase();
    return details?.code === "PGRST204" && (normalizedMessage === "unable to create appointment" || normalizedDetailsMessage?.includes("booking_source column"));
}
function isBookingDisabledError(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && error.status === 400 && normalizeApiErrorMessage(error) === "online booking is not enabled for this stylist";
}
function isBookingContextExpiredError(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && error.status === 400 && normalizeApiErrorMessage(error) === "booking context is invalid or expired";
}
function isSelectedServiceUnavailableError(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && error.status === 400 && normalizeApiErrorMessage(error) === "selected service is not available";
}
function buildBookingServiceUnavailableMessage(stylist) {
    if (stylist.phone_number?.trim()) {
        return `Online booking is temporarily unavailable. Please call ${stylist.phone_number} to finish your appointment.`;
    }
    return "Online booking is temporarily unavailable. Please contact the business to finish your appointment.";
}
function getApiErrorReason(error) {
    const reason = getApiErrorDetails(error)?.reason?.trim();
    return reason || null;
}
function getApiErrorDetails(error) {
    if (!(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) || !error.details || typeof error.details !== "object") {
        return null;
    }
    return error.details;
}
function normalizeApiErrorMessage(error) {
    return error.message.trim().toLowerCase();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/ConfirmStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfirmStep",
    ()=>ConfirmStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function ConfirmStep({ stylist, services, slot, fullName, email, phone, notes, referencePhotoFile, referencePhotoPreviewUrl, submitting, error, timezone, bookingBehavior, onNotesChange, onReferencePhotoSelect, onReferencePhotoRemove, onEdit, onSubmit }) {
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [referencePhotoError, setReferencePhotoError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const totalDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServiceDurations"])(services);
    const totalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServicePrices"])(services);
    const serviceSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatServiceNames"])(services);
    const bookingPreviewMessage = bookingBehavior?.requiresApproval ? "New client appointments require approval." : bookingBehavior?.message;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[30px] font-semibold tracking-tight text-foreground",
                        children: "Review your booking"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-muted",
                        children: "Almost done. Please confirm your details."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 73,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 space-y-4",
                children: [
                    bookingBehavior ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-border bg-surface-warm p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-foreground",
                                children: "Booking preview"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm leading-6 text-muted",
                                children: bookingPreviewMessage
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this),
                            bookingBehavior.requiresApproval ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm leading-6 text-muted",
                                children: "Please watch your email for a final confirmation."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCard, {
                        title: "Your Details",
                        action: ()=>onEdit(1),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-foreground",
                                children: fullName
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-muted",
                                children: phone
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 101,
                                columnNumber: 11
                            }, this),
                            email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-muted",
                                children: email
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 102,
                                columnNumber: 20
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCard, {
                        title: "Your Services",
                        action: ()=>onEdit(1),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-foreground",
                                            children: serviceSummary
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-muted",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSummaryName"])(stylist)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 107,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-foreground",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])(totalDuration)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-muted",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalPrice)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCard, {
                        title: "Date & Time",
                        action: ()=>onEdit(2),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium text-foreground",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLongDate"])(slot.start, timezone)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 123,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-muted",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(slot.start, timezone)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-muted",
                                children: timezone
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mt-5 block",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mb-2 block text-sm font-semibold text-foreground",
                        children: "Add a note (optional)"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: notes,
                        onChange: (event)=>onNotesChange(event.target.value.slice(0, 250)),
                        rows: 4,
                        placeholder: "Anything we should know?",
                        className: "w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:border-brand focus:ring-2 focus:ring-brand/20"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-right text-xs text-muted",
                        children: [
                            notes.length,
                            "/250"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-5 text-left",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-foreground",
                        children: "Add a reference photo (optional)"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-6 text-muted",
                        children: "Share an inspiration photo, current hair photo, or style reference to help your stylist prepare."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: "image/jpeg,image/jpg,image/pjpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
                        className: "sr-only",
                        onChange: handleReferencePhotoChange
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    referencePhotoFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 rounded-2xl border border-border bg-white p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                referencePhotoPreviewUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "aria-hidden": "true",
                                    className: "h-16 w-16 shrink-0 rounded-xl bg-cover bg-center",
                                    style: {
                                        backgroundImage: `url(${referencePhotoPreviewUrl})`
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 168,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-brand/20 text-brand",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageIcon, {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                        lineNumber: 177,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 176,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate text-sm font-semibold text-foreground",
                                            children: referencePhotoFile.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-muted",
                                            children: "Ready to upload after booking"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setReferencePhotoError(null);
                                        onReferencePhotoRemove();
                                    },
                                    className: "shrink-0 text-sm font-semibold text-brand",
                                    children: "Remove"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 188,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                            lineNumber: 166,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 165,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>fileInputRef.current?.click(),
                        className: "mt-4 flex min-h-24 w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-brand/40 bg-white px-4 py-4 text-left transition hover:border-brand hover:bg-brand/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 text-brand",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageIcon, {}, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 208,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-sm font-semibold text-foreground",
                                                children: "Add a reference photo"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                                lineNumber: 211,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-1 block text-xs text-muted",
                                                children: "JPG, PNG, or WebP up to 5 MB"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                                lineNumber: 214,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                        lineNumber: 210,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shrink-0 rounded-full border border-brand/50 px-4 py-2 text-xs font-semibold text-brand",
                                children: "Upload Photo"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    referencePhotoError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-red-500",
                        children: referencePhotoError
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-sm text-red-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 230,
                columnNumber: 16
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: submitting,
                onClick: onSubmit,
                className: "mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70",
                children: [
                    submitting ? "Booking..." : "Book Appointment",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
        lineNumber: 72,
        columnNumber: 5
    }, this);
    //TURBOPACK unreachable
    ;
    function handleReferencePhotoChange(event) {
        const file = event.target.files?.[0] ?? null;
        event.target.value = "";
        if (!file) {
            return;
        }
        if (!isAcceptedReferencePhoto(file)) {
            setReferencePhotoError("We couldn't use that photo. Please choose a JPG, PNG, or WebP image.");
            return;
        }
        if (!isReferencePhotoSizeAllowed(file)) {
            setReferencePhotoError("Please choose a photo smaller than 5 MB.");
            return;
        }
        setReferencePhotoError(null);
        onReferencePhotoSelect(file);
    }
}
_s(ConfirmStep, "0gFkLQp8fiQL0roxX9lJ+QvD0e0=");
_c = ConfirmStep;
const MAX_REFERENCE_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_REFERENCE_PHOTO_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/pjpeg",
    "image/png",
    "image/webp"
];
const ACCEPTED_REFERENCE_PHOTO_EXTENSIONS = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
];
function isAcceptedReferencePhoto(file) {
    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();
    return ACCEPTED_REFERENCE_PHOTO_TYPES.some((contentType)=>contentType === type) || ACCEPTED_REFERENCE_PHOTO_EXTENSIONS.some((extension)=>name.endsWith(extension));
}
function isReferencePhotoSizeAllowed(file) {
    return file.size <= MAX_REFERENCE_PHOTO_SIZE_BYTES;
}
function ReviewCard({ title, children, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-border bg-white p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: action,
                        className: "text-sm font-semibold text-brand",
                        children: "Edit"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 315,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 323,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
        lineNumber: 312,
        columnNumber: 5
    }, this);
}
_c1 = ReviewCard;
function ArrowIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: "h-4 w-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 10h12m-4-4 4 4-4 4",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.7"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
            lineNumber: 331,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
        lineNumber: 330,
        columnNumber: 5
    }, this);
}
_c2 = ArrowIcon;
function ImageIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        className: "h-6 w-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                x: "3.5",
                y: "4.5",
                width: "17",
                height: "15",
                rx: "2.5",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 346,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "m6.5 16 3.2-3.4 2.4 2.3 2.6-3.1L18 16",
                fill: "none",
                stroke: "currentColor",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "1.8"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 356,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "9",
                cy: "9",
                r: "1.25",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 364,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
        lineNumber: 345,
        columnNumber: 5
    }, this);
}
_c3 = ImageIcon;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "ConfirmStep");
__turbopack_context__.k.register(_c1, "ReviewCard");
__turbopack_context__.k.register(_c2, "ArrowIcon");
__turbopack_context__.k.register(_c3, "ImageIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/ServiceCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ServiceCard",
    ()=>ServiceCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
;
;
function ServiceCard({ service, highlighted = false, selected, onSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>onSelect(service),
        "aria-pressed": selected,
        className: [
            "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all",
            selected ? "border-brand bg-brand-soft shadow-[0_12px_24px_rgba(183,121,61,0.14)]" : "border-border bg-white hover:border-brand/35"
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScissorsIcon, {}, void 0, false, {
                    fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-semibold text-foreground",
                                                children: service.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                                lineNumber: 36,
                                                columnNumber: 15
                                            }, this),
                                            highlighted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand",
                                                children: "Recommended"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                                lineNumber: 38,
                                                columnNumber: 17
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this),
                                    service.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 line-clamp-2 text-sm leading-5 text-muted",
                                        children: service.description
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                        lineNumber: 44,
                                        columnNumber: 15
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: [
                                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border",
                                    selected ? "border-brand bg-brand text-white" : "border-border bg-white text-transparent"
                                ].join(" "),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex items-center gap-3 text-sm text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])(service.durationMinutes)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                lineNumber: 61,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-1 w-1 rounded-full bg-border"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                lineNumber: 62,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-foreground",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(service.price)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                        lineNumber: 60,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = ServiceCard;
function ScissorsIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        className: "h-5 w-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M6 6a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm0 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM20 5l-8.4 6L20 19M20 5l-4.5 3.2M20 19l-4.5-3.2",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.7"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_c1 = ScissorsIcon;
function CheckIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: "h-3.5 w-3.5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M5 10.5 8.2 13.7 15 7",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "2"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_c2 = CheckIcon;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ServiceCard");
__turbopack_context__.k.register(_c1, "ScissorsIcon");
__turbopack_context__.k.register(_c2, "CheckIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/DetailsStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DetailsStep",
    ()=>DetailsStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ServiceCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/ServiceCard.tsx [app-client] (ecmascript)");
;
;
;
function DetailsStep({ values, errors, services, intake, intakeLoading, servicesLoading, selectedServices, serviceError, canBeginServiceSelection, showServicePicker, recommendedServiceId, onChange, onToggleService, onContinue }) {
    const disableSubmit = intakeLoading || servicesLoading || !showServicePicker && !canBeginServiceSelection;
    const totalDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServiceDurations"])(selectedServices);
    const totalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServicePrices"])(selectedServices);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: (event)=>{
            event.preventDefault();
            onContinue();
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[30px] font-semibold tracking-tight text-foreground",
                        children: "Let's get to know you"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 69,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-muted",
                        children: "Start with your contact details so we can check whether you're a returning client before you pick a service."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        id: "fullName",
                        name: "fullName",
                        label: "Full Name",
                        type: "text",
                        placeholder: "Enter your full name",
                        value: values.fullName,
                        error: errors.fullName,
                        onChange: (value)=>onChange("fullName", value),
                        autoComplete: "name",
                        autoCapitalize: "words",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        id: "phone",
                        name: "phone",
                        label: "Phone",
                        type: "tel",
                        placeholder: "(555) 123-4567",
                        value: values.phone,
                        error: errors.phone,
                        onChange: (value)=>onChange("phone", value),
                        autoComplete: "tel",
                        inputMode: "tel",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        id: "email",
                        name: "email",
                        label: "Email (Optional)",
                        type: "email",
                        placeholder: "you@email.com",
                        value: values.email,
                        error: errors.email,
                        onChange: (value)=>onChange("email", value),
                        autoComplete: "email",
                        autoCapitalize: "none",
                        autoCorrect: "off"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            intake ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IntakeMessage, {
                intake: intake,
                selectedServiceIds: selectedServices.map((service)=>service.id)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 121,
                columnNumber: 9
            }, this) : null,
            showServicePicker ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 overflow-hidden rounded-3xl border border-border bg-surface-warm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between gap-4 px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-base font-semibold text-foreground",
                                        children: "Select your service"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-muted",
                                        children: "Choose a service for this appointment."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-8 w-8 items-center justify-center rounded-full bg-white text-muted",
                                    "aria-hidden": "true",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChevronIcon, {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                        lineNumber: 143,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-border px-5 py-5",
                        children: servicesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            message: "Refreshing the services you can book right now..."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                            lineNumber: 150,
                            columnNumber: 15
                        }, this) : services.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-3 xl:grid-cols-2",
                                    children: services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ServiceCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServiceCard"], {
                                            service: service,
                                            highlighted: service.id === recommendedServiceId,
                                            selected: selectedServices.some((selectedService)=>selectedService.id === service.id),
                                            onSelect: onToggleService
                                        }, service.id, false, {
                                            fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                            lineNumber: 155,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                    lineNumber: 153,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-5 rounded-2xl bg-white p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between text-sm text-muted",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Total Duration"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-foreground",
                                                    children: selectedServices.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])(totalDuration) : "--"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex items-center justify-between text-sm text-muted",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Total Price"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                    lineNumber: 175,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-semibold text-foreground",
                                                    children: selectedServices.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalPrice) : "--"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                            lineNumber: 174,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                            message: "No services are currently available for online booking."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                            lineNumber: 183,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this) : null,
            serviceError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-sm text-red-500",
                children: serviceError
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 189,
                columnNumber: 23
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: disableSubmit,
                className: "mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-55",
                children: [
                    intakeLoading ? "Checking..." : servicesLoading ? "Loading services..." : showServicePicker ? "Continue" : "Select Services",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_c = DetailsStep;
function IntakeMessage({ intake, selectedServiceIds }) {
    const title = intake.matchStatus === "matched" ? `Welcome back, ${intake.client?.firstName || "there"}` : intake.matchStatus === "ambiguous" ? "We need one more check" : "New client booking";
    const toneClass = intake.matchStatus === "matched" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : intake.matchStatus === "ambiguous" ? "border-amber-200 bg-amber-50 text-amber-950" : "border-sky-200 bg-sky-50 text-sky-950";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "mt-6 rounded-2xl border px-4 py-4",
            toneClass
        ].join(" "),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-semibold",
                children: title
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm leading-6",
                children: intake.bookingBehavior.message
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            intake.recommendedService ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-6",
                children: [
                    "Same as last time?",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        children: selectedServiceIds.includes(intake.recommendedService.serviceId) ? `${intake.recommendedService.serviceName} selected` : intake.recommendedService.serviceName
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 234,
                columnNumber: 9
            }, this) : null,
            intake.matchStatus === "ambiguous" && intake.candidateCount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-6",
                children: "We found more than one possible match, so we'll use safe new-client rules unless you confirm more information later."
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 244,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 230,
        columnNumber: 5
    }, this);
}
_c1 = IntakeMessage;
function EmptyState({ message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-3xl border border-dashed border-border bg-white px-5 py-10 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-lg font-semibold text-foreground",
                children: "Nothing to book yet"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-6 text-muted",
                children: message
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
_c2 = EmptyState;
function Field({ id, name, label, type, placeholder, value, error, required, autoComplete, autoCapitalize, autoCorrect, inputMode, onChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        htmlFor: id,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-2 block text-sm font-semibold text-foreground",
                children: [
                    label,
                    required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-brand",
                        children: " *"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 305,
                        columnNumber: 21
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 303,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: id,
                name: name,
                type: type,
                value: value,
                onChange: (event)=>onChange(event.target.value),
                placeholder: placeholder,
                autoComplete: autoComplete,
                autoCapitalize: autoCapitalize,
                autoCorrect: autoCorrect,
                inputMode: inputMode,
                "aria-invalid": error ? true : undefined,
                className: [
                    "h-14 w-full rounded-2xl border bg-white px-4 text-sm text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-brand/20",
                    error ? "border-red-400" : "border-border focus:border-brand"
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 307,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-red-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 324,
                columnNumber: 16
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 302,
        columnNumber: 5
    }, this);
}
_c3 = Field;
function ArrowIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: "h-4 w-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 10h12m-4-4 4 4-4 4",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.7"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
            lineNumber: 332,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 331,
        columnNumber: 5
    }, this);
}
_c4 = ArrowIcon;
function ChevronIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: "h-4 w-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m5 7.5 5 5 5-5",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.7"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
            lineNumber: 347,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 346,
        columnNumber: 5
    }, this);
}
_c5 = ChevronIcon;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "DetailsStep");
__turbopack_context__.k.register(_c1, "IntakeMessage");
__turbopack_context__.k.register(_c2, "EmptyState");
__turbopack_context__.k.register(_c3, "Field");
__turbopack_context__.k.register(_c4, "ArrowIcon");
__turbopack_context__.k.register(_c5, "ChevronIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/TimeStep.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimeStep",
    ()=>TimeStep
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function TimeStep({ selectedDate, selectedSlot, upcomingDays, loading, error, timezone, waitlistCta, onDateSelect, onSlotSelect, onBack, onContinue }) {
    _s();
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimeStep.useMemo[today]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTodayDateValue"])()
    }["TimeStep.useMemo[today]"], []);
    const [expandedDays, setExpandedDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const nextAvailableDay = upcomingDays[0] ?? null;
    const [calendarWeekStart, setCalendarWeekStart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "TimeStep.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(selectedDate || nextAvailableDay?.date || today)
    }["TimeStep.useState"]);
    const calendarDates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimeStep.useMemo[calendarDates]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildWeekDateOptions"])(calendarWeekStart)
    }["TimeStep.useMemo[calendarDates]"], [
        calendarWeekStart
    ]);
    const visibleUpcomingDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TimeStep.useMemo[visibleUpcomingDays]": ()=>{
            const defaultDays = upcomingDays.slice(0, 3);
            const selectedDay = selectedDate ? upcomingDays.find({
                "TimeStep.useMemo[visibleUpcomingDays]": (day)=>day.date === selectedDate
            }["TimeStep.useMemo[visibleUpcomingDays]"]) : null;
            if (selectedDay && !defaultDays.some({
                "TimeStep.useMemo[visibleUpcomingDays]": (day)=>day.date === selectedDay.date
            }["TimeStep.useMemo[visibleUpcomingDays]"])) {
                return [
                    ...defaultDays,
                    selectedDay
                ];
            }
            return defaultDays;
        }
    }["TimeStep.useMemo[visibleUpcomingDays]"], [
        selectedDate,
        upcomingDays
    ]);
    const showEmptyState = !loading && !error && upcomingDays.length === 0;
    function handleSlotSelection(date, slot) {
        onDateSelect(date);
        onSlotSelect(slot);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-[30px] font-semibold tracking-tight text-foreground",
                        children: "Choose a date & time"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-muted",
                        children: "Browse upcoming availability or jump to a different date."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 87,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-7",
                children: [
                    loading && !nextAvailableDay ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LoadingState, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 93,
                        columnNumber: 41
                    }, this) : null,
                    error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm leading-6 text-red-500",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 96,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 rounded-[16px] border border-border bg-white p-4 shadow-[0_2px_10px_rgba(17,17,17,0.035)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setCalendarWeekStart((currentWeekStart)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToDate"])(currentWeekStart, -7)),
                                        disabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToDate"])(calendarWeekStart, -7) < (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(today),
                                        className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-warm disabled:cursor-not-allowed disabled:opacity-40",
                                        "aria-label": "Show previous week",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {
                                            direction: "left"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                            lineNumber: 114,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[15px] font-bold text-foreground",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMonthLabel"])(calendarWeekStart, timezone)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setCalendarWeekStart((currentWeekStart)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToDate"])(currentWeekStart, 7)),
                                        className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-warm",
                                        "aria-label": "Show next week",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {}, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                            lineNumber: 131,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 grid grid-cols-7 gap-1 min-[430px]:gap-2",
                                children: calendarDates.map((date)=>{
                                    const isSelected = date === selectedDate;
                                    const isPastDate = date < today;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            if (isPastDate) {
                                                return;
                                            }
                                            onDateSelect(date);
                                        },
                                        disabled: isPastDate,
                                        className: [
                                            "flex h-[72px] min-w-0 flex-col items-center justify-center rounded-[12px] border px-0.5 py-2 text-center transition-colors min-[430px]:px-2",
                                            isSelected ? "border-brand bg-brand text-white" : isPastDate ? "border-[#E5E7EB] bg-zinc-50 text-zinc-400" : "border-border bg-white text-foreground hover:border-brand hover:bg-brand-soft"
                                        ].join(" "),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-[10px] leading-none font-semibold uppercase tracking-[0.02em] min-[430px]:text-[11px] min-[430px]:tracking-[0.04em]",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatShortWeekday"])(date, timezone)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                lineNumber: 161,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-1 block text-[14px] leading-none font-bold min-[430px]:text-[15px]",
                                                children: formatDayNumber(date, timezone)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                lineNumber: 164,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, date, true, {
                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    !loading && !error && !showEmptyState ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-3",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-[24px] leading-[30px] font-bold text-foreground",
                                    children: "Upcoming"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                    lineNumber: 176,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: visibleUpcomingDays.map((day)=>{
                                    const isSelectedDate = day.date === selectedDate;
                                    const isExpanded = expandedDays[day.date] ?? false;
                                    const previewSlots = isExpanded ? day.slots : day.slots.slice(0, 5);
                                    const hiddenCount = Math.max(day.slots.length - previewSlots.length, 0);
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: [
                                            "mb-3 rounded-[16px] border border-border bg-white p-4 shadow-[0_2px_10px_rgba(17,17,17,0.035)] transition-colors active:bg-surface-warm",
                                            isSelectedDate ? "bg-brand-soft" : ""
                                        ].join(" "),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[15px] leading-5 font-bold text-foreground",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatShortWeekday"])(day.date, timezone)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                                    lineNumber: 201,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[15px] leading-5 font-bold text-foreground",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMonthDay"])(day.date, timezone)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                                    lineNumber: 204,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "inline-flex h-[26px] shrink-0 items-center rounded-full bg-surface-warm px-[10px] text-[12px] font-bold text-muted",
                                                            children: [
                                                                day.slots.length,
                                                                " ",
                                                                day.slots.length === 1 ? "timeslot" : "timeslots"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                            lineNumber: 208,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                    lineNumber: 199,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 flex min-w-0 flex-col gap-2.5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-3 gap-[6px] xl:grid-cols-4",
                                                        children: [
                                                            previewSlots.map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TimeSlotPill, {
                                                                    slot: slot,
                                                                    selected: selectedSlot?.start === slot.start,
                                                                    timeZone: timezone,
                                                                    onSelect: ()=>handleSlotSelection(day.date, slot)
                                                                }, slot.start, false, {
                                                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                                    lineNumber: 217,
                                                                    columnNumber: 29
                                                                }, this)),
                                                            hiddenCount > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TogglePill, {
                                                                onClick: ()=>setExpandedDays((currentDays)=>({
                                                                            ...currentDays,
                                                                            [day.date]: true
                                                                        })),
                                                                children: [
                                                                    "+",
                                                                    hiddenCount,
                                                                    " more"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                                lineNumber: 227,
                                                                columnNumber: 29
                                                            }, this) : null,
                                                            isExpanded && day.slots.length > 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TogglePill, {
                                                                onClick: ()=>setExpandedDays((currentDays)=>({
                                                                            ...currentDays,
                                                                            [day.date]: false
                                                                        })),
                                                                children: "Show less"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                                lineNumber: 240,
                                                                columnNumber: 29
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                    lineNumber: 214,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                            lineNumber: 198,
                                            columnNumber: 21
                                        }, this)
                                    }, day.date, false, {
                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                        lineNumber: 189,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 181,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this) : null,
                    !loading && !error && waitlistCta ? waitlistCta : null,
                    showEmptyState ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold tracking-tight text-foreground",
                                children: "No available times"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm leading-6 text-muted",
                                children: "Choose a different date or check back later."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 264,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onContinue,
                disabled: loading || !selectedSlot,
                "aria-disabled": loading || !selectedSlot,
                className: "mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-brand px-5 text-base font-semibold text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50 disabled:shadow-none",
                children: [
                    loading ? "Checking..." : "Continue",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 284,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onBack,
                className: "mt-3 flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground",
                children: "Back"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                lineNumber: 287,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 82,
        columnNumber: 5
    }, this);
}
_s(TimeStep, "v08sNtVxDrM5g7s5Pkg0SyYrhMI=");
_c = TimeStep;
function InfoCard({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[16px] border border-border bg-white p-4 shadow-[0_2px_10px_rgba(17,17,17,0.035)]",
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 300,
        columnNumber: 5
    }, this);
}
_c1 = InfoCard;
function TimeSlotPill({ slot, selected, timeZone, onSelect }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onSelect,
        "aria-pressed": selected,
        className: [
            "inline-flex h-8 w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-[12px] border px-[10px] text-[13px] leading-none font-semibold transition-all",
            selected ? "border-brand bg-brand text-white" : "border-brand/20 bg-brand-soft text-brand hover:bg-[rgba(183,121,61,0.12)] active:bg-[rgba(183,121,61,0.16)]"
        ].join(" "),
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(slot.start, timeZone)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 320,
        columnNumber: 5
    }, this);
}
_c2 = TimeSlotPill;
function TogglePill({ children, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: "inline-flex h-8 w-full items-center justify-center rounded-[10px] bg-surface-warm px-[10px] text-[13px] font-bold text-muted transition-colors hover:bg-brand-soft active:bg-brand-soft",
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 344,
        columnNumber: 5
    }, this);
}
_c3 = TogglePill;
function LoadingState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: Array.from({
            length: 3
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-20 animate-pulse rounded-2xl bg-zinc-50"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                    lineNumber: 359,
                    columnNumber: 11
                }, this)
            }, index, false, {
                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                lineNumber: 358,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 356,
        columnNumber: 5
    }, this);
}
_c4 = LoadingState;
function ArrowIcon({ direction = "right" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: [
            "h-4 w-4",
            direction === "left" ? "rotate-180" : ""
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M4 10h12m-4-4 4 4-4 4",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.7"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
            lineNumber: 373,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 368,
        columnNumber: 5
    }, this);
}
_c5 = ArrowIcon;
function formatDayNumber(date, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        timeZone: timeZone ?? undefined
    }).format(new Date(`${date}T12:00:00`));
}
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "TimeStep");
__turbopack_context__.k.register(_c1, "InfoCard");
__turbopack_context__.k.register(_c2, "TimeSlotPill");
__turbopack_context__.k.register(_c3, "TogglePill");
__turbopack_context__.k.register(_c4, "LoadingState");
__turbopack_context__.k.register(_c5, "ArrowIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/useBookingDetails.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useBookingDetails",
    ()=>useBookingDetails
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/booking-flow-utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useBookingDetails({ onDetailsChanged }) {
    _s();
    const [fullName, setFullName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [detailsErrors, setDetailsErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const parsedName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "useBookingDetails.useMemo[parsedName]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitFullName"])(fullName)
    }["useBookingDetails.useMemo[parsedName]"], [
        fullName
    ]);
    // Async booking/intake callbacks read the latest contact values through this
    // ref to avoid stale closures after field edits.
    const contactValuesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        fullName,
        email,
        phone
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useBookingDetails.useEffect": ()=>{
            contactValuesRef.current = {
                fullName,
                email,
                phone
            };
        }
    }["useBookingDetails.useEffect"], [
        email,
        fullName,
        phone
    ]);
    function validateDetails() {
        const nextErrors = {};
        if (!fullName.trim()) {
            nextErrors.fullName = "Full name is required.";
        } else if (!parsedName.lastName) {
            nextErrors.fullName = "Please include a last name.";
        }
        if (!phone.trim()) {
            nextErrors.phone = "Phone is required.";
        }
        if (email.trim() && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidEmail"])(email.trim())) {
            nextErrors.email = "Enter a valid email address.";
        }
        setDetailsErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }
    function handleDetailsChange(field, value) {
        // Changing identity details invalidates downstream intake/service context in
        // the parent flow because availability is scoped to that context token.
        setDetailsErrors((currentErrors)=>({
                ...currentErrors,
                [field]: undefined
            }));
        if (field === "fullName") {
            setFullName(value);
        }
        if (field === "email") {
            setEmail(value);
        }
        if (field === "phone") {
            setPhone(value);
        }
        onDetailsChanged();
    }
    return {
        contactValues: {
            fullName,
            email,
            phone
        },
        contactValuesRef,
        detailsErrors,
        email,
        fullName,
        handleDetailsChange,
        parsedName,
        phone,
        validateDetails
    };
}
_s(useBookingDetails, "4TcLikZIBGANzv6IBdtRDmr67Vs=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/WaitlistCallout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WaitlistCallout",
    ()=>WaitlistCallout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/booking-flow-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function WaitlistCallout({ slug, selectedDate, selectedServiceId, defaultClientName, defaultClientEmail, defaultClientPhone }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-[16px] border border-brand/20 bg-brand-soft p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-[0_2px_8px_rgba(17,24,39,0.06)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CalendarIcon, {}, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "text-[15px] font-bold text-foreground",
                                    children: "No availability for the day you need?"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 47,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm leading-6 text-muted",
                                    children: "Join the waitlist and the pro can contact you if something opens."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 50,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setOpen(true),
                                    className: "mt-3 inline-flex h-11 items-center justify-center rounded-2xl bg-brand px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(183,121,61,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/25",
                                    children: "Join waitlist"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 54,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WaitlistDialog, {
                slug: slug,
                selectedDate: selectedDate,
                selectedServiceId: selectedServiceId,
                defaultClientName: defaultClientName,
                defaultClientEmail: defaultClientEmail,
                defaultClientPhone: defaultClientPhone,
                onClose: ()=>setOpen(false)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true);
}
_s(WaitlistCallout, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = WaitlistCallout;
function WaitlistDialog({ slug, selectedDate, selectedServiceId, defaultClientName, defaultClientEmail, defaultClientPhone, onClose }) {
    _s1();
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTodayDateValue"])();
    const [requestedDate, setRequestedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(selectedDate);
    const [clientName, setClientName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultClientName);
    const [clientEmail, setClientEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultClientEmail);
    const [clientPhone, setClientPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultClientPhone);
    const [requestedTimePreference, setRequestedTimePreference] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [submitError, setSubmitError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WaitlistDialog.useEffect": ()=>{
            // The dialog is rendered as an overlay rather than a routed page, so it
            // owns its Escape-key close behavior while mounted.
            function handleKeyDown(event) {
                if (event.key === "Escape") {
                    onClose();
                }
            }
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "WaitlistDialog.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["WaitlistDialog.useEffect"];
        }
    }["WaitlistDialog.useEffect"], [
        onClose
    ]);
    function validate() {
        // Client-side validation improves UX only; the backend still validates
        // feature access, duplicate entries, and final payload shape.
        const nextErrors = {};
        const trimmedEmail = clientEmail.trim();
        const trimmedPhone = clientPhone.trim();
        if (!requestedDate) {
            nextErrors.requestedDate = "Requested date is required.";
        } else if (requestedDate < today) {
            nextErrors.requestedDate = "Requested date must be today or later.";
        }
        if (!clientName.trim()) {
            nextErrors.clientName = "Name is required.";
        }
        if (!trimmedEmail && !trimmedPhone) {
            nextErrors.contact = "Please provide either an email address or phone number.";
        }
        if (trimmedEmail && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidEmail"])(trimmedEmail)) {
            nextErrors.clientEmail = "Enter a valid email address.";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitError(null);
        if (!validate()) {
            return;
        }
        const payload = {
            // This shape mirrors POST /api/public/stylists/:slug/waitlist.
            requestedDate,
            serviceId: selectedServiceId || null,
            clientName: clientName.trim(),
            clientEmail: clientEmail.trim() || null,
            clientPhone: clientPhone.trim() || null,
            requestedTimePreference: requestedTimePreference.trim() || null,
            note: note.trim() || null
        };
        setSubmitting(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["joinWaitlist"])(slug, payload);
            setSubmitted(true);
        } catch (error) {
            setSubmitError(getWaitlistErrorMessage(error));
        } finally{
            setSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-30 flex items-end justify-center bg-[#111827]/45 px-4 py-4 sm:items-center sm:py-6",
        role: "presentation",
        onMouseDown: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "waitlist-title",
            "aria-describedby": "waitlist-description",
            className: "max-h-[calc(100vh-2rem)] w-full max-w-[430px] overflow-y-auto rounded-[28px] border border-white/80 bg-white p-5 shadow-[0_30px_90px_rgba(17,24,39,0.22)] sm:p-6",
            onMouseDown: (event)=>event.stopPropagation(),
            children: submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "waitlist-title",
                        className: "text-2xl font-semibold tracking-tight text-foreground",
                        children: "You're on the waitlist"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 190,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "waitlist-description",
                        className: "mt-3 text-sm leading-6 text-muted",
                        children: "The pro can contact you if something opens. Joining the waitlist does not reserve an appointment time."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 196,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        className: "mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(183,121,61,0.22)]",
                        children: "Done"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 203,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                lineNumber: 189,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "waitlist-title",
                                        className: "text-2xl font-semibold tracking-tight text-foreground",
                                        children: "Join the waitlist"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 215,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "waitlist-description",
                                        className: "mt-2 text-sm leading-6 text-muted",
                                        children: "Tell us what day works for you. The pro can contact you if something opens."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 221,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 214,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-warm",
                                "aria-label": "Close waitlist form",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseIcon, {}, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 235,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 229,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 213,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "mt-5 space-y-4",
                        onSubmit: handleSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Requested date",
                                htmlFor: "waitlist-requested-date",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "waitlist-requested-date",
                                        type: "date",
                                        min: today,
                                        value: requestedDate,
                                        onChange: (event)=>{
                                            setRequestedDate(event.target.value);
                                            setErrors((current)=>({
                                                    ...current,
                                                    requestedDate: undefined
                                                }));
                                        },
                                        className: "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 241,
                                        columnNumber: 17
                                    }, this),
                                    errors.requestedDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                                        children: errors.requestedDate
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 255,
                                        columnNumber: 41
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 240,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Name",
                                htmlFor: "waitlist-client-name",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        id: "waitlist-client-name",
                                        type: "text",
                                        value: clientName,
                                        onChange: (event)=>{
                                            setClientName(event.target.value);
                                            setErrors((current)=>({
                                                    ...current,
                                                    clientName: undefined
                                                }));
                                        },
                                        className: "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 259,
                                        columnNumber: 17
                                    }, this),
                                    errors.clientName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                                        children: errors.clientName
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 272,
                                        columnNumber: 38
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 258,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Email",
                                        htmlFor: "waitlist-client-email",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "waitlist-client-email",
                                                type: "email",
                                                value: clientEmail,
                                                onChange: (event)=>{
                                                    setClientEmail(event.target.value);
                                                    setErrors((current)=>({
                                                            ...current,
                                                            clientEmail: undefined,
                                                            contact: undefined
                                                        }));
                                                },
                                                className: "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 277,
                                                columnNumber: 19
                                            }, this),
                                            errors.clientEmail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                                                children: errors.clientEmail
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 291,
                                                columnNumber: 41
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 276,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Phone",
                                        htmlFor: "waitlist-client-phone",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "waitlist-client-phone",
                                            type: "tel",
                                            value: clientPhone,
                                            onChange: (event)=>{
                                                setClientPhone(event.target.value);
                                                setErrors((current)=>({
                                                        ...current,
                                                        contact: undefined
                                                    }));
                                            },
                                            className: "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                            lineNumber: 295,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 294,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 275,
                                columnNumber: 15
                            }, this),
                            errors.contact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                                children: errors.contact
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 310,
                                columnNumber: 33
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Preferred time",
                                htmlFor: "waitlist-time-preference",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "waitlist-time-preference",
                                    type: "text",
                                    value: requestedTimePreference,
                                    onChange: (event)=>setRequestedTimePreference(event.target.value),
                                    placeholder: "Morning preferred",
                                    className: "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm text-foreground outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-brand focus:ring-2 focus:ring-brand/20"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 313,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 312,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Note",
                                htmlFor: "waitlist-note",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    id: "waitlist-note",
                                    value: note,
                                    onChange: (event)=>setNote(event.target.value),
                                    placeholder: "Anything the pro should know?",
                                    rows: 3,
                                    className: "w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-[#9CA3AF] focus:border-brand focus:ring-2 focus:ring-brand/20"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 324,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 323,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-2xl bg-surface-warm px-4 py-3 text-xs leading-5 text-muted",
                                children: "Joining the waitlist does not reserve an appointment time."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 334,
                                columnNumber: 15
                            }, this),
                            submitError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600",
                                children: submitError
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 339,
                                columnNumber: 17
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: submitting,
                                className: "flex h-12 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(183,121,61,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:transform-none disabled:opacity-60 disabled:shadow-none",
                                children: submitting ? "Joining waitlist..." : "Join waitlist"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 344,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 239,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
            lineNumber: 180,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s1(WaitlistDialog, "Gp6Qz2/BEYY3mLh70ouesjlaCzk=");
_c1 = WaitlistDialog;
function Field({ children, htmlFor, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: htmlFor,
                className: "mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                lineNumber: 370,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 369,
        columnNumber: 5
    }, this);
}
_c2 = Field;
function ErrorText({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "mt-2 text-sm leading-5 text-red-600",
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 382,
        columnNumber: 10
    }, this);
}
_c3 = ErrorText;
function getWaitlistErrorMessage(error) {
    // Map backend statuses to customer-friendly copy while preserving useful 400
    // validation messages from the API contract.
    const message = error instanceof Error ? error.message : "";
    const normalizedMessage = message.trim().toLowerCase();
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
        if (error.status === 403) {
            return "Waitlist is not available for this stylist.";
        }
        if (error.status === 404) {
            return "This booking page could not be found.";
        }
        if (error.status === 409) {
            return "You're already on the waitlist for this date.";
        }
        if (error.status === 400) {
            if (normalizedMessage === "please provide either an email address or phone number.") {
                return "Please provide either an email address or phone number.";
            }
            if (message.trim()) {
                return message;
            }
            return "Please check your waitlist details and try again.";
        }
    }
    if (normalizedMessage === "waitlist is not available for this stylist.") {
        return "Waitlist is not available for this stylist.";
    }
    return "We couldn't add you to the waitlist. Please try again.";
}
function CalendarIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: "h-5 w-5",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M6 3v3m8-3v3M4.5 8.5h11M5 5h10a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 15 16H5a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 5 5Z",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "1.7"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
            lineNumber: 427,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 426,
        columnNumber: 5
    }, this);
}
_c4 = CalendarIcon;
function CloseIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 20 20",
        "aria-hidden": "true",
        className: "h-4 w-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m6 6 8 8M14 6l-8 8",
            fill: "none",
            stroke: "currentColor",
            strokeLinecap: "round",
            strokeWidth: "1.8"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
            lineNumber: 442,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 441,
        columnNumber: 5
    }, this);
}
_c5 = CloseIcon;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "WaitlistCallout");
__turbopack_context__.k.register(_c1, "WaitlistDialog");
__turbopack_context__.k.register(_c2, "Field");
__turbopack_context__.k.register(_c3, "ErrorText");
__turbopack_context__.k.register(_c4, "CalendarIcon");
__turbopack_context__.k.register(_c5, "CloseIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/BookingFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookingFlow",
    ()=>BookingFlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookedStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookedStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingStepper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookingStepper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/booking-flow-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ConfirmStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/ConfirmStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$DetailsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/DetailsStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$TimeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/TimeStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$useBookingDetails$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/useBookingDetails.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$WaitlistCallout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/WaitlistCallout.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function formatInstagramHandle(value) {
    if (!value) return null;
    return `@${value.replace(/^@+/, "")}`;
}
function getInstagramUrl(value) {
    if (!value) return null;
    return `https://instagram.com/${value.replace(/^@+/, "")}`;
}
function filterRejectedSlots(slots, rejectedStarts) {
    if (!rejectedStarts.length) {
        return slots;
    }
    const rejectedStartSet = new Set(rejectedStarts);
    return slots.filter((slot)=>!rejectedStartSet.has(slot.start));
}
function getBookableSlots(response) {
    const slotMap = new Map();
    [
        ...response.slots ?? [],
        ...response.moreSlots ?? []
    ].forEach((slot)=>{
        slotMap.set(slot.start, slot);
    });
    return Array.from(slotMap.values());
}
function normalizeReferralCode(value) {
    return value?.trim() || null;
}
function getReferralStorageKey(slug) {
    return `referral:${slug}`;
}
function getSlotCacheKey({ bookingContextToken, date, serviceIds }) {
    return [
        bookingContextToken,
        date,
        [
            ...serviceIds
        ].sort().join("|")
    ].join("::");
}
function createBookingIdempotencyKey() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function readStoredReferralCode(slug) {
    if (typeof sessionStorage === "undefined") {
        return null;
    }
    try {
        return normalizeReferralCode(sessionStorage.getItem(getReferralStorageKey(slug)));
    } catch  {
        return null;
    }
}
function clearStoredReferralCode(slug) {
    if (typeof sessionStorage === "undefined") {
        return;
    }
    try {
        sessionStorage.removeItem(getReferralStorageKey(slug));
    } catch  {
    // Referral cleanup should never block a completed booking.
    }
}
function BookingFlow({ slug, stylist, initialReferralCode }) {
    _s();
    const [referralCode, setReferralCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BookingFlow.useState": ()=>normalizeReferralCode(initialReferralCode) ?? readStoredReferralCode(slug)
    }["BookingFlow.useState"]);
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [intakeState, setIntakeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        status: "idle"
    });
    const [bookingDisabledByFlow, setBookingDisabledByFlow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [intakeRefreshing, setIntakeRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [servicesLoading, setServicesLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [servicesLoadedToken, setServicesLoadedToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [serviceError, setServiceError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedServices, setSelectedServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dateOptions, setDateOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [slots, setSlots] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadedSlotsDate, setLoadedSlotsDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [slotPreviews, setSlotPreviews] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectedSlot, setSelectedSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rejectedSlotStarts, setRejectedSlotStarts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [availabilityLoading, setAvailabilityLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [slotsError, setSlotsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [availabilityTimezone, setAvailabilityTimezone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(stylist.timezone ?? null);
    const [confirmError, setConfirmError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [confirmation, setConfirmation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [referencePhotoFile, setReferencePhotoFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [referencePhotoPreviewUrl, setReferencePhotoPreviewUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Intake is the gatekeeper for booking rules: it tells the UI whether booking
    // is allowed and provides a short-lived context token for services/slots.
    const intakeData = intakeState.status === "ready" ? intakeState.data : null;
    const bookingContextToken = intakeData?.bookingContextToken ?? null;
    const bookingDisabled = !stylist.booking_enabled || bookingDisabledByFlow || intakeData?.bookingEnabled === false;
    const canShowWaitlist = stylist.booking_enabled === true && stylist.features?.waitlistEnabled === true;
    const servicesAreSynced = Boolean(bookingContextToken) && servicesLoadedToken === bookingContextToken;
    const sortedServices = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BookingFlow.useMemo[sortedServices]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sortServices"])(services)
    }["BookingFlow.useMemo[sortedServices]"], [
        services
    ]);
    const activeTimezone = availabilityTimezone || stylist.timezone || null;
    const pageName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSummaryName"])(stylist);
    const instagramHandle = formatInstagramHandle(stylist.instagram);
    const instagramUrl = getInstagramUrl(stylist.instagram);
    const showServicePicker = !bookingDisabled && intakeState.status === "ready" && Boolean(intakeData?.bookingEnabled);
    const selectedServiceIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BookingFlow.useMemo[selectedServiceIds]": ()=>selectedServices.map({
                "BookingFlow.useMemo[selectedServiceIds]": (service)=>service.id
            }["BookingFlow.useMemo[selectedServiceIds]"])
    }["BookingFlow.useMemo[selectedServiceIds]"], [
        selectedServices
    ]);
    const primarySelectedService = selectedServices[0] ?? null;
    const canShowTimeStep = Boolean(selectedServices.length && selectedDate);
    const availabilityLoaded = Boolean(selectedDate) && loadedSlotsDate === selectedDate;
    const shouldShowWaitlistCta = // Waitlist is intentionally feature-gated by public stylist metadata and
    // only appears after an actual empty-slot result for the selected date.
    canShowWaitlist && selectedServiceIds.length > 0 && Boolean(selectedDate) && availabilityLoaded && !availabilityLoading && !slotsError && slots.length === 0;
    const upcomingAvailabilityDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BookingFlow.useMemo[upcomingAvailabilityDays]": ()=>{
            const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTodayDateValue"])();
            const orderedDates = Array.from(new Set([
                selectedDate,
                ...dateOptions
            ].filter(Boolean))).filter({
                "BookingFlow.useMemo[upcomingAvailabilityDays].orderedDates": (date)=>date >= today
            }["BookingFlow.useMemo[upcomingAvailabilityDays].orderedDates"]);
            return orderedDates.map({
                "BookingFlow.useMemo[upcomingAvailabilityDays]": (date)=>({
                        date,
                        slots: filterRejectedSlots(slotPreviews[date] ?? (date === selectedDate && loadedSlotsDate === selectedDate && slots.length ? slots : []), rejectedSlotStarts)
                    })
            }["BookingFlow.useMemo[upcomingAvailabilityDays]"]).filter({
                "BookingFlow.useMemo[upcomingAvailabilityDays]": (day)=>day.slots.length > 0
            }["BookingFlow.useMemo[upcomingAvailabilityDays]"]);
        }
    }["BookingFlow.useMemo[upcomingAvailabilityDays]"], [
        dateOptions,
        loadedSlotsDate,
        rejectedSlotStarts,
        selectedDate,
        slotPreviews,
        slots
    ]);
    const selectedServicesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(selectedServices);
    const referralCodeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(referralCode);
    const submittingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    // Token refreshes can be triggered by several concurrent availability calls;
    // share one in-flight refresh to avoid duplicate intake requests.
    const tokenRefreshPromiseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const slotResponseCacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const slotRequestCacheRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingFlow.useEffect": ()=>{
            referralCodeRef.current = referralCode;
        }
    }["BookingFlow.useEffect"], [
        referralCode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingFlow.useEffect": ()=>{
            const storageKey = getReferralStorageKey(slug);
            const nextReferralCode = normalizeReferralCode(initialReferralCode);
            let timeoutId = null;
            function scheduleReferralCodeUpdate(value) {
                timeoutId = window.setTimeout({
                    "BookingFlow.useEffect.scheduleReferralCodeUpdate": ()=>{
                        setReferralCode(value);
                    }
                }["BookingFlow.useEffect.scheduleReferralCodeUpdate"], 0);
            }
            if (nextReferralCode) {
                scheduleReferralCodeUpdate(nextReferralCode);
                try {
                    sessionStorage.setItem(storageKey, nextReferralCode);
                } catch  {
                // Referral attribution should never block booking if storage is unavailable.
                }
                return ({
                    "BookingFlow.useEffect": ()=>{
                        if (timeoutId !== null) {
                            window.clearTimeout(timeoutId);
                        }
                    }
                })["BookingFlow.useEffect"];
            }
            scheduleReferralCodeUpdate(readStoredReferralCode(slug));
            return ({
                "BookingFlow.useEffect": ()=>{
                    if (timeoutId !== null) {
                        window.clearTimeout(timeoutId);
                    }
                }
            })["BookingFlow.useEffect"];
        }
    }["BookingFlow.useEffect"], [
        initialReferralCode,
        slug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingFlow.useEffect": ()=>{
            selectedServicesRef.current = selectedServices;
        }
    }["BookingFlow.useEffect"], [
        selectedServices
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingFlow.useEffect": ()=>{
            return ({
                "BookingFlow.useEffect": ()=>{
                    if (referencePhotoPreviewUrl) {
                        URL.revokeObjectURL(referencePhotoPreviewUrl);
                    }
                }
            })["BookingFlow.useEffect"];
        }
    }["BookingFlow.useEffect"], [
        referencePhotoPreviewUrl
    ]);
    const clearAvailabilityState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[clearAvailabilityState]": ()=>{
            // Service/contact changes invalidate every date and slot derived from the
            // previous booking context token.
            slotResponseCacheRef.current.clear();
            slotRequestCacheRef.current.clear();
            setDateOptions([]);
            setSelectedDate("");
            setSlots([]);
            setLoadedSlotsDate("");
            setSlotPreviews({});
            setSelectedSlot(null);
            setRejectedSlotStarts([]);
            setSlotsError(null);
            setAvailabilityTimezone(stylist.timezone ?? null);
        }
    }["BookingFlow.useCallback[clearAvailabilityState]"], [
        stylist.timezone
    ]);
    const disableBookingFlow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[disableBookingFlow]": ()=>{
            setBookingDisabledByFlow(true);
            setServices([]);
            setServicesLoadedToken(null);
            setSelectedServices([]);
            clearAvailabilityState();
            setCurrentStep(1);
            setServiceError(null);
            setConfirmError(null);
        }
    }["BookingFlow.useCallback[disableBookingFlow]"], [
        clearAvailabilityState
    ]);
    const invalidateBookingContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[invalidateBookingContext]": ()=>{
            setIntakeState({
                status: "idle"
            });
            setServices([]);
            setServicesLoadedToken(null);
            setSelectedServices([]);
            clearAvailabilityState();
            setCurrentStep(1);
            setServiceError(null);
            setConfirmError(null);
        }
    }["BookingFlow.useCallback[invalidateBookingContext]"], [
        clearAvailabilityState
    ]);
    const { contactValues, contactValuesRef, detailsErrors, email, fullName, handleDetailsChange, parsedName, phone, validateDetails } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$useBookingDetails$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookingDetails"])({
        onDetailsChanged: {
            "BookingFlow.useBookingDetails": ()=>{
                if (intakeState.status !== "idle" || services.length || servicesLoadedToken) {
                    invalidateBookingContext();
                }
            }
        }["BookingFlow.useBookingDetails"]
    });
    const canBeginServiceSelection = Boolean(contactValues.fullName.trim()) && Boolean(contactValues.phone.trim());
    const handleBookingContextRecoveryFailure = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[handleBookingContextRecoveryFailure]": (message)=>{
            clearAvailabilityState();
            setCurrentStep(1);
            setServiceError(message);
            setConfirmError(null);
        }
    }["BookingFlow.useCallback[handleBookingContextRecoveryFailure]"], [
        clearAvailabilityState
    ]);
    const runIntake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[runIntake]": async ({ background = false } = {})=>{
            const currentValues = contactValuesRef.current;
            // Avoid calling intake until client-side validation says the backend has
            // enough data to match returning-client booking rules.
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detailsAreValid"])(currentValues)) {
                return null;
            }
            if (background) {
                setIntakeRefreshing(true);
            } else {
                setIntakeState({
                    status: "loading"
                });
                setServiceError(null);
            }
            try {
                const intake = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicBookingIntake"])({
                    stylist_slug: slug,
                    full_name: currentValues.fullName.trim(),
                    phone: currentValues.phone.trim(),
                    email: currentValues.email.trim() || undefined
                });
                setIntakeState({
                    status: "ready",
                    data: intake
                });
                if (!intake.bookingEnabled) {
                    disableBookingFlow();
                }
                return intake;
            } catch (error) {
                const message = error instanceof Error ? error.message : "We couldn't check your booking details right now.";
                setIntakeState({
                    status: "error",
                    message
                });
                if (!background) {
                    setServiceError(message);
                }
                return null;
            } finally{
                if (background) {
                    setIntakeRefreshing(false);
                }
            }
        }
    }["BookingFlow.useCallback[runIntake]"], [
        contactValuesRef,
        disableBookingFlow,
        slug
    ]);
    const refreshBookingContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[refreshBookingContext]": async ()=>{
            if (tokenRefreshPromiseRef.current) {
                return tokenRefreshPromiseRef.current;
            }
            const refreshPromise = ({
                "BookingFlow.useCallback[refreshBookingContext].refreshPromise": async ()=>{
                    const refreshedIntake = await runIntake({
                        background: true
                    });
                    if (!refreshedIntake) {
                        return null;
                    }
                    return refreshedIntake;
                }
            })["BookingFlow.useCallback[refreshBookingContext].refreshPromise"]();
            tokenRefreshPromiseRef.current = refreshPromise.finally({
                "BookingFlow.useCallback[refreshBookingContext]": ()=>{
                    tokenRefreshPromiseRef.current = null;
                }
            }["BookingFlow.useCallback[refreshBookingContext]"]);
            return tokenRefreshPromiseRef.current;
        }
    }["BookingFlow.useCallback[refreshBookingContext]"], [
        runIntake
    ]);
    const loadServicesForIntake = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[loadServicesForIntake]": async (intake, { allowTokenRefresh = true } = {})=>{
            setServicesLoading(true);
            setServiceError(null);
            const applyServices = {
                "BookingFlow.useCallback[loadServicesForIntake].applyServices": (nextServices, nextIntake)=>{
                    // Keep any still-valid user selections after a context refresh, and
                    // auto-select the backend recommendation only when nothing is selected.
                    setServices(nextServices);
                    setServicesLoadedToken(nextIntake.bookingContextToken);
                    const currentSelectedServices = selectedServicesRef.current;
                    const nextSelectedServices = currentSelectedServices.filter({
                        "BookingFlow.useCallback[loadServicesForIntake].applyServices.nextSelectedServices": (service)=>nextServices.some({
                                "BookingFlow.useCallback[loadServicesForIntake].applyServices.nextSelectedServices": (availableService)=>availableService.id === service.id
                            }["BookingFlow.useCallback[loadServicesForIntake].applyServices.nextSelectedServices"])
                    }["BookingFlow.useCallback[loadServicesForIntake].applyServices.nextSelectedServices"]);
                    const recommendedService = nextSelectedServices.length === 0 && nextIntake.recommendedService?.serviceId ? nextServices.find({
                        "BookingFlow.useCallback[loadServicesForIntake].applyServices": (service)=>service.id === nextIntake.recommendedService?.serviceId
                    }["BookingFlow.useCallback[loadServicesForIntake].applyServices"]) ?? null : null;
                    const resolvedSelectedServices = recommendedService ? [
                        recommendedService
                    ] : nextSelectedServices;
                    const selectionChanged = currentSelectedServices.length !== resolvedSelectedServices.length || currentSelectedServices.some({
                        "BookingFlow.useCallback[loadServicesForIntake].applyServices": (service, index)=>resolvedSelectedServices[index]?.id !== service.id
                    }["BookingFlow.useCallback[loadServicesForIntake].applyServices"]);
                    setSelectedServices(resolvedSelectedServices);
                    if (selectionChanged) {
                        clearAvailabilityState();
                        if (currentSelectedServices.length > 0) {
                            setCurrentStep(1);
                            setServiceError("Your available services changed. Please choose again.");
                        }
                    }
                }
            }["BookingFlow.useCallback[loadServicesForIntake].applyServices"];
            try {
                const nextServices = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicServices"])(slug, intake.bookingContextToken);
                applyServices(nextServices, intake);
                return nextServices;
            } catch (error) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingDisabledError"])(error)) {
                    setServices([]);
                    setServicesLoadedToken(null);
                    disableBookingFlow();
                    return null;
                }
                if (allowTokenRefresh && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingContextExpiredError"])(error)) {
                    const refreshedIntake = await refreshBookingContext();
                    if (!refreshedIntake) {
                        setServices([]);
                        setServicesLoadedToken(null);
                        handleBookingContextRecoveryFailure("Please confirm your contact details to refresh your booking options.");
                        return null;
                    }
                    if (!refreshedIntake.bookingEnabled) {
                        setServices([]);
                        setServicesLoadedToken(null);
                        disableBookingFlow();
                        return null;
                    }
                    try {
                        const refreshedServices = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicServices"])(slug, refreshedIntake.bookingContextToken);
                        applyServices(refreshedServices, refreshedIntake);
                        return refreshedServices;
                    } catch (retryError) {
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingDisabledError"])(retryError)) {
                            setServices([]);
                            setServicesLoadedToken(null);
                            disableBookingFlow();
                            return null;
                        }
                        const retryMessage = retryError instanceof Error ? retryError.message : "Unable to load services for online booking.";
                        setServices([]);
                        setServicesLoadedToken(null);
                        setServiceError(retryMessage);
                        return null;
                    }
                }
                const message = error instanceof Error ? error.message : "Unable to load services for online booking.";
                setServices([]);
                setServicesLoadedToken(null);
                setServiceError(message);
                return null;
            } finally{
                setServicesLoading(false);
            }
        }
    }["BookingFlow.useCallback[loadServicesForIntake]"], [
        clearAvailabilityState,
        disableBookingFlow,
        handleBookingContextRecoveryFailure,
        refreshBookingContext,
        slug
    ]);
    const handleSelectedServiceUnavailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[handleSelectedServiceUnavailable]": async (intakeOverride)=>{
            const activeIntake = intakeOverride ?? (intakeState.status === "ready" ? intakeState.data : null);
            setSelectedServices([]);
            clearAvailabilityState();
            setCurrentStep(1);
            setConfirmError(null);
            if (activeIntake?.bookingContextToken) {
                await loadServicesForIntake(activeIntake);
            } else {
                setServices([]);
                setServicesLoadedToken(null);
            }
            setServiceError("Selected service is not available. Please choose another service.");
        }
    }["BookingFlow.useCallback[handleSelectedServiceUnavailable]"], [
        clearAvailabilityState,
        intakeState,
        loadServicesForIntake
    ]);
    const getAvailabilityForCurrentContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[getAvailabilityForCurrentContext]": async ({ allowTokenRefresh = true, signal } = {})=>{
            const activeIntake = intakeState.status === "ready" ? intakeState.data : null;
            if (!activeIntake?.bookingContextToken) {
                return null;
            }
            try {
                return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicAvailability"])(slug, activeIntake.bookingContextToken, {
                    signal
                });
            } catch (error) {
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingDisabledError"])(error)) {
                    disableBookingFlow();
                    return null;
                }
                if (allowTokenRefresh && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingContextExpiredError"])(error)) {
                    const refreshedIntake = await refreshBookingContext();
                    if (!refreshedIntake) {
                        handleBookingContextRecoveryFailure("Please confirm your contact details to refresh availability.");
                        return null;
                    }
                    if (!refreshedIntake.bookingEnabled) {
                        disableBookingFlow();
                        return null;
                    }
                    const refreshedServices = await loadServicesForIntake(refreshedIntake, {
                        allowTokenRefresh: false
                    });
                    if (!refreshedServices || !selectedServicesRef.current.length) {
                        handleBookingContextRecoveryFailure("Your available services changed. Please select a service again.");
                        return null;
                    }
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicAvailability"])(slug, refreshedIntake.bookingContextToken, {
                        signal
                    });
                }
                throw error;
            }
        }
    }["BookingFlow.useCallback[getAvailabilityForCurrentContext]"], [
        disableBookingFlow,
        handleBookingContextRecoveryFailure,
        intakeState,
        loadServicesForIntake,
        refreshBookingContext,
        slug
    ]);
    const getSlotsForDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[getSlotsForDate]": async (date, { allowTokenRefresh = true, forceRefresh = false, signal } = {})=>{
            const activeIntake = intakeState.status === "ready" ? intakeState.data : null;
            const activeSelectedServiceIds = selectedServicesRef.current.map({
                "BookingFlow.useCallback[getSlotsForDate].activeSelectedServiceIds": (service)=>service.id
            }["BookingFlow.useCallback[getSlotsForDate].activeSelectedServiceIds"]);
            if (!activeIntake?.bookingContextToken || !activeSelectedServiceIds.length) {
                return null;
            }
            const cacheKey = getSlotCacheKey({
                bookingContextToken: activeIntake.bookingContextToken,
                date,
                serviceIds: activeSelectedServiceIds
            });
            if (forceRefresh) {
                slotResponseCacheRef.current.delete(cacheKey);
                slotRequestCacheRef.current.delete(cacheKey);
            } else {
                const cachedResponse = slotResponseCacheRef.current.get(cacheKey);
                if (cachedResponse) {
                    return cachedResponse;
                }
                const inFlightRequest = slotRequestCacheRef.current.get(cacheKey);
                if (inFlightRequest) {
                    return inFlightRequest;
                }
            }
            const requestPromise = ({
                "BookingFlow.useCallback[getSlotsForDate].requestPromise": async ()=>{
                    try {
                        // Slots are always requested with every selected service id so the
                        // backend can calculate the combined appointment duration.
                        return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicSlots"])(slug, activeSelectedServiceIds, date, activeIntake.bookingContextToken, {
                            signal
                        });
                    } catch (error) {
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingDisabledError"])(error)) {
                            disableBookingFlow();
                            return null;
                        }
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelectedServiceUnavailableError"])(error)) {
                            await handleSelectedServiceUnavailable(activeIntake);
                            return null;
                        }
                        if (allowTokenRefresh && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingContextExpiredError"])(error)) {
                            const refreshedIntake = await refreshBookingContext();
                            if (!refreshedIntake) {
                                handleBookingContextRecoveryFailure("Please confirm your contact details to refresh availability.");
                                return null;
                            }
                            if (!refreshedIntake.bookingEnabled) {
                                disableBookingFlow();
                                return null;
                            }
                            const refreshedServices = await loadServicesForIntake(refreshedIntake, {
                                allowTokenRefresh: false
                            });
                            if (!refreshedServices || !selectedServicesRef.current.length) {
                                handleBookingContextRecoveryFailure("Your available services changed. Please select a service again.");
                                return null;
                            }
                            try {
                                return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicSlots"])(slug, selectedServicesRef.current.map({
                                    "BookingFlow.useCallback[getSlotsForDate].requestPromise": (service)=>service.id
                                }["BookingFlow.useCallback[getSlotsForDate].requestPromise"]), date, refreshedIntake.bookingContextToken, {
                                    signal
                                });
                            } catch (retryError) {
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingDisabledError"])(retryError)) {
                                    disableBookingFlow();
                                    return null;
                                }
                                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSelectedServiceUnavailableError"])(retryError)) {
                                    await handleSelectedServiceUnavailable(refreshedIntake);
                                    return null;
                                }
                                throw retryError;
                            }
                        }
                        throw error;
                    }
                }
            })["BookingFlow.useCallback[getSlotsForDate].requestPromise"]();
            slotRequestCacheRef.current.set(cacheKey, requestPromise);
            try {
                const response = await requestPromise;
                const requestIsStillCurrent = slotRequestCacheRef.current.get(cacheKey) === requestPromise;
                if (response && requestIsStillCurrent) {
                    slotResponseCacheRef.current.set(cacheKey, response);
                }
                return response;
            } finally{
                if (slotRequestCacheRef.current.get(cacheKey) === requestPromise) {
                    slotRequestCacheRef.current.delete(cacheKey);
                }
            }
        }
    }["BookingFlow.useCallback[getSlotsForDate]"], [
        disableBookingFlow,
        handleBookingContextRecoveryFailure,
        handleSelectedServiceUnavailable,
        intakeState,
        loadServicesForIntake,
        refreshBookingContext,
        slug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingFlow.useEffect": ()=>{
            let cancelled = false;
            const abortController = new AbortController();
            async function loadAvailability() {
                // Initial availability load picks the first future date with actual slots,
                // falling back to generated date options so users can still inspect dates.
                if (!selectedServiceIds.length || bookingDisabled || !bookingContextToken || !servicesAreSynced) {
                    setSlotPreviews({});
                    return;
                }
                setAvailabilityLoading(true);
                setSlotsError(null);
                try {
                    const availability = await getAvailabilityForCurrentContext({
                        signal: abortController.signal
                    });
                    if (cancelled) {
                        return;
                    }
                    if (!availability) {
                        return;
                    }
                    const dates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractAvailabilityDates"])(availability);
                    const recurringDates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildAvailabilityDateOptions"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractAvailabilityRows"])(availability));
                    const fallbackDates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFallbackDateOptions"])();
                    const nextDates = Array.from(new Set(dates.length ? dates : recurringDates.length ? recurringDates : fallbackDates));
                    let nextTimezone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractAvailabilityTimezone"])(availability) ?? stylist.timezone ?? null;
                    let nextSelectedDate = nextDates[0] ?? "";
                    let nextSlots = [];
                    for (const date of nextDates){
                        const response = await getSlotsForDate(date, {
                            signal: abortController.signal
                        });
                        if (cancelled) {
                            return;
                        }
                        if (!response) {
                            return;
                        }
                        nextTimezone = response.timezone ?? nextTimezone;
                        const responseSlots = getBookableSlots(response);
                        if (responseSlots.length > 0) {
                            nextSelectedDate = date;
                            nextSlots = responseSlots;
                            break;
                        }
                    }
                    setAvailabilityTimezone(nextTimezone);
                    setDateOptions(nextDates);
                    setSelectedDate(nextSelectedDate);
                    setSlotPreviews(nextSlots.length ? {
                        [nextSelectedDate]: nextSlots
                    } : {});
                    setSlots(nextSlots);
                    setLoadedSlotsDate(nextSelectedDate);
                } catch (error) {
                    if (cancelled) {
                        return;
                    }
                    const fallbackDates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFallbackDateOptions"])();
                    setDateOptions(fallbackDates);
                    setSelectedDate({
                        "BookingFlow.useEffect.loadAvailability": (currentDate)=>currentDate || fallbackDates[0] || ""
                    }["BookingFlow.useEffect.loadAvailability"]);
                    setSlotPreviews({});
                    setSlots([]);
                    setLoadedSlotsDate("");
                    setSelectedSlot(null);
                    setSlotsError(error instanceof Error ? error.message : "Unable to load availability right now.");
                } finally{
                    if (!cancelled) {
                        setAvailabilityLoading(false);
                    }
                }
            }
            void loadAvailability();
            return ({
                "BookingFlow.useEffect": ()=>{
                    cancelled = true;
                    abortController.abort();
                }
            })["BookingFlow.useEffect"];
        }
    }["BookingFlow.useEffect"], [
        bookingContextToken,
        bookingDisabled,
        getAvailabilityForCurrentContext,
        getSlotsForDate,
        selectedServiceIds,
        servicesAreSynced,
        stylist.timezone
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingFlow.useEffect": ()=>{
            let cancelled = false;
            const abortController = new AbortController();
            async function loadSlots() {
                if (!selectedServiceIds.length || !selectedDate || bookingDisabled || !bookingContextToken || !servicesAreSynced) {
                    return;
                }
                setSlotsError(null);
                try {
                    const response = await getSlotsForDate(selectedDate, {
                        signal: abortController.signal
                    });
                    if (cancelled) {
                        return;
                    }
                    if (!response) {
                        return;
                    }
                    const nextSlots = filterRejectedSlots(getBookableSlots(response), rejectedSlotStarts);
                    setAvailabilityTimezone(response.timezone ?? activeTimezone);
                    setSlots(nextSlots);
                    setLoadedSlotsDate(selectedDate);
                    setSlotPreviews({
                        "BookingFlow.useEffect.loadSlots": (currentPreviews)=>({
                                ...currentPreviews,
                                [selectedDate]: nextSlots
                            })
                    }["BookingFlow.useEffect.loadSlots"]);
                    setSelectedSlot({
                        "BookingFlow.useEffect.loadSlots": (currentSlot)=>nextSlots.find({
                                "BookingFlow.useEffect.loadSlots": (slot)=>slot.start === currentSlot?.start
                            }["BookingFlow.useEffect.loadSlots"]) ?? null
                    }["BookingFlow.useEffect.loadSlots"]);
                } catch (error) {
                    if (cancelled) {
                        return;
                    }
                    setSlots([]);
                    setLoadedSlotsDate("");
                    setSelectedSlot(null);
                    setSlotsError(error instanceof Error ? error.message : "Unable to load time slots for this date.");
                }
            }
            void loadSlots();
            return ({
                "BookingFlow.useEffect": ()=>{
                    cancelled = true;
                    abortController.abort();
                }
            })["BookingFlow.useEffect"];
        }
    }["BookingFlow.useEffect"], [
        activeTimezone,
        bookingContextToken,
        bookingDisabled,
        getSlotsForDate,
        rejectedSlotStarts,
        selectedDate,
        selectedServiceIds,
        servicesAreSynced
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingFlow.useEffect": ()=>{
            let cancelled = false;
            const abortController = new AbortController();
            async function loadSlotPreviews() {
                // Previewing multiple days is intentionally capped so the first time-step
                // render does not fan out into weeks of parallel slot requests.
                if (!selectedServiceIds.length || !dateOptions.length || bookingDisabled || !bookingContextToken || !servicesAreSynced) {
                    setSlotPreviews({});
                    return;
                }
                const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTodayDateValue"])();
                const previewDates = Array.from(new Set(dateOptions.filter({
                    "BookingFlow.useEffect.loadSlotPreviews.previewDates": (date)=>date >= today
                }["BookingFlow.useEffect.loadSlotPreviews.previewDates"]))).slice(0, 10);
                if (!previewDates.length) {
                    setSlotPreviews({});
                    return;
                }
                const previewEntries = await Promise.all(previewDates.map({
                    "BookingFlow.useEffect.loadSlotPreviews": async (date)=>{
                        try {
                            const response = await getSlotsForDate(date, {
                                allowTokenRefresh: false,
                                signal: abortController.signal
                            });
                            return [
                                date,
                                response ? getBookableSlots(response) : []
                            ];
                        } catch  {
                            return [
                                date,
                                []
                            ];
                        }
                    }
                }["BookingFlow.useEffect.loadSlotPreviews"]));
                if (cancelled) {
                    return;
                }
                setSlotPreviews({
                    "BookingFlow.useEffect.loadSlotPreviews": (currentPreviews)=>({
                            ...currentPreviews,
                            ...Object.fromEntries(previewEntries)
                        })
                }["BookingFlow.useEffect.loadSlotPreviews"]);
            }
            void loadSlotPreviews();
            return ({
                "BookingFlow.useEffect": ()=>{
                    cancelled = true;
                    abortController.abort();
                }
            })["BookingFlow.useEffect"];
        }
    }["BookingFlow.useEffect"], [
        bookingContextToken,
        bookingDisabled,
        dateOptions,
        getSlotsForDate,
        selectedServiceIds,
        servicesAreSynced
    ]);
    async function handleContinueFromDetails() {
        if (!validateDetails()) {
            return;
        }
        if (servicesLoading) {
            return;
        }
        let nextIntake = intakeState.status === "ready" ? intakeState.data : null;
        if (!nextIntake) {
            nextIntake = await runIntake();
            if (!nextIntake) {
                return;
            }
        }
        if (!nextIntake.bookingEnabled) {
            disableBookingFlow();
            return;
        }
        if (!servicesAreSynced || servicesLoadedToken !== nextIntake.bookingContextToken) {
            const loadedServices = await loadServicesForIntake(nextIntake);
            if (!loadedServices) {
                return;
            }
            return;
        }
        if (!sortedServices.length) {
            setServiceError("No services are currently available for online booking.");
            return;
        }
        if (!selectedServices.length) {
            setServiceError("Please select at least one service to continue.");
            return;
        }
        setServiceError(null);
        setCurrentStep(2);
    }
    async function handleContinueFromTime() {
        if (!selectedSlot) {
            setSlotsError("Please select a time to continue.");
            return;
        }
        const verifiedSlot = await revalidateSelectedSlot();
        if (!verifiedSlot) {
            return;
        }
        setSlotsError(null);
        setCurrentStep(3);
    }
    async function refreshSlotsForSelectedDate({ clearSelection = true, rejectedSlotStart } = {}) {
        if (!selectedServiceIds.length || !selectedDate) {
            return null;
        }
        try {
            const response = await getSlotsForDate(selectedDate, {
                forceRefresh: true
            });
            if (!response) {
                return null;
            }
            const rawSlots = getBookableSlots(response);
            const startsToExclude = rejectedSlotStart ? [
                ...rejectedSlotStarts,
                rejectedSlotStart
            ] : rejectedSlotStarts;
            const nextSlots = filterRejectedSlots(rawSlots, startsToExclude);
            setSlots(nextSlots);
            setLoadedSlotsDate(selectedDate);
            setSlotPreviews((currentPreviews)=>({
                    ...currentPreviews,
                    [selectedDate]: nextSlots
                }));
            if (clearSelection) {
                setSelectedSlot(null);
            }
            setAvailabilityTimezone(response.timezone ?? activeTimezone);
            return {
                rawSlots,
                slots: nextSlots
            };
        } catch  {
            setSlots([]);
            setLoadedSlotsDate("");
            if (clearSelection) {
                setSelectedSlot(null);
            }
            return null;
        }
    }
    async function revalidateSelectedSlot() {
        if (!selectedSlot) {
            setSlotsError("Please select a time to continue.");
            return null;
        }
        setAvailabilityLoading(true);
        setSlotsError(null);
        try {
            const refreshedSlots = await refreshSlotsForSelectedDate({
                clearSelection: false
            });
            const verifiedSlot = refreshedSlots?.slots.find((slot)=>slot.start === selectedSlot.start) ?? null;
            if (!verifiedSlot) {
                setSelectedSlot(null);
                setSlotsError("That time just became unavailable. Please choose another time.");
                setConfirmError(null);
                setCurrentStep(2);
                return null;
            }
            setSelectedSlot(verifiedSlot);
            return verifiedSlot;
        } finally{
            setAvailabilityLoading(false);
        }
    }
    async function handleSubmitBooking() {
        if (submittingRef.current) {
            return;
        }
        if (!primarySelectedService || !selectedSlot || !bookingContextToken) {
            return;
        }
        submittingRef.current = true;
        setSubmitting(true);
        setConfirmError(null);
        try {
            const idempotencyKey = createBookingIdempotencyKey();
            const verifiedSlot = await revalidateSelectedSlot();
            if (!verifiedSlot) {
                return;
            }
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicBooking"])({
                stylist_slug: slug,
                service_id: primarySelectedService.id,
                requested_datetime: verifiedSlot.start,
                guest_first_name: parsedName.firstName,
                guest_last_name: parsedName.lastName,
                guest_email: email.trim() || undefined,
                guest_phone: phone.trim(),
                booking_context_token: bookingContextToken,
                referral_code: referralCodeRef.current || undefined,
                notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBookingNotes"])(selectedServices, notes)
            }, {
                idempotencyKey
            });
            clearStoredReferralCode(slug);
            referralCodeRef.current = null;
            setReferralCode(null);
            setConfirmation(response);
            setCurrentStep(5);
        } catch (error) {
            const apiReason = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiErrorReason"])(error);
            const message = apiReason ?? (error instanceof Error ? error.message : "Unable to submit your booking right now.");
            const debugPayload = {
                // Keep failure diagnostics scoped to booking identifiers and API error
                // metadata; do not log guest contact details or notes here.
                status: error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.status : undefined,
                message,
                reason: apiReason ?? undefined,
                details: error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.details : undefined,
                requested_datetime: selectedSlot.start,
                service_id: primarySelectedService.id,
                stylist_slug: slug
            };
            console.error(`Booking submit failed ${JSON.stringify(debugPayload)}`);
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSlotConflictError"])(error, message)) {
                const rejectedSlotStart = selectedSlot.start;
                setRejectedSlotStarts((currentStarts)=>currentStarts.includes(rejectedSlotStart) ? currentStarts : [
                        ...currentStarts,
                        rejectedSlotStart
                    ]);
                const refreshedSlots = await refreshSlotsForSelectedDate({
                    rejectedSlotStart
                });
                const slotStillReturnedByAvailabilityEndpoint = Boolean(refreshedSlots?.rawSlots.some((slot)=>slot.start === rejectedSlotStart));
                console.error(`Booking conflict refresh diagnostics ${JSON.stringify({
                    requested_datetime: rejectedSlotStart,
                    service_id: primarySelectedService.id,
                    stylist_slug: slug,
                    slotStillReturnedByAvailabilityEndpoint,
                    refreshedSlotCount: refreshedSlots?.slots.length ?? null,
                    rawRefreshedSlotCount: refreshedSlots?.rawSlots.length ?? null
                })}`);
                setSlotsError("That time just became unavailable. Please choose another time.");
                setConfirmError(null);
                setCurrentStep(2);
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingSchemaMismatch"])(error)) {
                setConfirmError((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBookingServiceUnavailableMessage"])(stylist));
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingDisabledError"])(error)) {
                disableBookingFlow();
            } else {
                setConfirmError(message);
            }
        } finally{
            submittingRef.current = false;
            setSubmitting(false);
        }
    }
    function handleReset() {
        setCurrentStep(1);
        setSelectedSlot(null);
        setNotes("");
        setConfirmError(null);
        setConfirmation(null);
        clearReferencePhotoSelection();
    }
    function handleReferencePhotoSelect(file) {
        setReferencePhotoFile(file);
        setReferencePhotoPreviewUrl((currentUrl)=>{
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
            return URL.createObjectURL(file);
        });
    }
    function clearReferencePhotoSelection() {
        setReferencePhotoFile(null);
        setReferencePhotoPreviewUrl((currentUrl)=>{
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
            return null;
        });
    }
    function handleToggleService(service) {
        setSelectedServices((currentServices)=>{
            const alreadySelected = currentServices.some((currentService)=>currentService.id === service.id);
            if (alreadySelected) {
                return currentServices.filter((currentService)=>currentService.id !== service.id);
            }
            return [
                service
            ];
        });
        clearAvailabilityState();
        setConfirmError(null);
        setServiceError(null);
    }
    if (confirmation && selectedServices.length && selectedSlot) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[620px] rounded-[30px] border border-white/80 bg-card p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] sm:p-8",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookedStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookedStep"], {
                confirmation: confirmation,
                stylist: stylist,
                services: selectedServices,
                slot: selectedSlot,
                initialReferencePhotoFile: referencePhotoFile,
                onInitialReferencePhotoConsumed: ()=>setReferencePhotoFile(null),
                onDone: handleReset
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                lineNumber: 1416,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
            lineNumber: 1415,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[30px] border border-white/80 bg-card p-6 shadow-[0_24px_80px_rgba(17,24,39,0.08)] sm:p-8 lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "lg:sticky lg:top-8 lg:self-start",
                children: [
                    stylist.cover_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "-mx-6 -mt-6 mb-5 h-28 rounded-t-[30px] bg-zinc-100 bg-cover bg-center sm:-mx-8 sm:-mt-8 lg:mx-0 lg:mt-0 lg:h-48 lg:rounded-3xl",
                        style: {
                            backgroundImage: `url(${stylist.cover_photo_url})`
                        }
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                        lineNumber: 1433,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display text-4xl font-semibold italic text-foreground",
                                children: stylist.display_name
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                lineNumber: 1440,
                                columnNumber: 11
                            }, this),
                            stylist.business_name || instagramHandle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm",
                                children: [
                                    stylist.business_name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted",
                                        children: stylist.business_name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                        lineNumber: 1446,
                                        columnNumber: 17
                                    }, this) : null,
                                    instagramHandle && instagramUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        className: "font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-muted",
                                        href: instagramUrl,
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: instagramHandle
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                        lineNumber: 1449,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                lineNumber: 1444,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                        lineNumber: 1439,
                        columnNumber: 9
                    }, this),
                    stylist.bio ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-5 rounded-2xl bg-zinc-50 px-4 py-3 text-sm leading-6 text-muted",
                        children: stylist.bio
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                        lineNumber: 1463,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                lineNumber: 1431,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:min-w-0",
                children: bookingDisabled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 rounded-3xl border border-border bg-zinc-50 p-6 lg:mt-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-2xl font-semibold tracking-tight text-foreground",
                            children: pageName
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1472,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm leading-6 text-muted",
                            children: "Online booking is currently unavailable."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1475,
                            columnNumber: 11
                        }, this),
                        stylist.phone_number ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-sm font-medium text-foreground",
                            children: [
                                "Contact: ",
                                stylist.phone_number
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1479,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                    lineNumber: 1471,
                    columnNumber: 9
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 lg:mt-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingStepper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookingStepper"], {
                                currentStep: currentStep
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                lineNumber: 1487,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1486,
                            columnNumber: 11
                        }, this),
                        currentStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$DetailsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DetailsStep"], {
                            values: {
                                fullName,
                                email,
                                phone
                            },
                            errors: detailsErrors,
                            services: sortedServices,
                            intake: intakeData,
                            intakeLoading: intakeState.status === "loading",
                            servicesLoading: servicesLoading || intakeRefreshing,
                            selectedServices: selectedServices,
                            serviceError: serviceError,
                            canBeginServiceSelection: canBeginServiceSelection,
                            showServicePicker: showServicePicker,
                            recommendedServiceId: intakeData?.recommendedService?.serviceId ?? null,
                            onChange: handleDetailsChange,
                            onToggleService: handleToggleService,
                            onContinue: handleContinueFromDetails
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1491,
                            columnNumber: 13
                        }, this) : null,
                        currentStep === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$TimeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimeStep"], {
                            selectedDate: selectedDate,
                            selectedSlot: selectedSlot,
                            upcomingDays: upcomingAvailabilityDays,
                            loading: availabilityLoading,
                            error: slotsError,
                            timezone: activeTimezone,
                            waitlistCta: shouldShowWaitlistCta ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$WaitlistCallout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WaitlistCallout"], {
                                slug: slug,
                                selectedDate: selectedDate,
                                selectedServiceId: primarySelectedService?.id ?? null,
                                defaultClientName: fullName,
                                defaultClientEmail: email,
                                defaultClientPhone: phone
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                lineNumber: 1519,
                                columnNumber: 19
                            }, this) : null,
                            onDateSelect: (date)=>{
                                setSelectedDate(date);
                                setSelectedSlot(null);
                                setSlotsError(null);
                            },
                            onSlotSelect: (slot)=>{
                                setSelectedSlot(slot);
                                setSlotsError(null);
                                setConfirmError(null);
                            },
                            onBack: ()=>setCurrentStep(1),
                            onContinue: handleContinueFromTime
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1510,
                            columnNumber: 13
                        }, this) : null,
                        currentStep === 3 && selectedServices.length && selectedSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ConfirmStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmStep"], {
                            stylist: stylist,
                            services: selectedServices,
                            slot: selectedSlot,
                            fullName: fullName.trim(),
                            email: email.trim(),
                            phone: phone.trim(),
                            notes: notes,
                            referencePhotoFile: referencePhotoFile,
                            referencePhotoPreviewUrl: referencePhotoPreviewUrl,
                            submitting: submitting,
                            error: confirmError,
                            timezone: activeTimezone,
                            bookingBehavior: intakeData?.bookingBehavior ?? null,
                            onNotesChange: setNotes,
                            onReferencePhotoSelect: handleReferencePhotoSelect,
                            onReferencePhotoRemove: clearReferencePhotoSelection,
                            onEdit: (step)=>setCurrentStep(step),
                            onSubmit: handleSubmitBooking
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1545,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 text-xs font-medium text-muted",
                            children: canShowTimeStep ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTimezoneLabel"])(activeTimezone) : null
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1567,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                lineNumber: 1469,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
        lineNumber: 1430,
        columnNumber: 5
    }, this);
}
_s(BookingFlow, "qo3Jk96shxsYEWk5aMasSW4VGTw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$useBookingDetails$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookingDetails"]
    ];
});
_c = BookingFlow;
var _c;
__turbopack_context__.k.register(_c, "BookingFlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_02.pe9i._.js.map