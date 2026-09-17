module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/apps/web/src/lib/api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
    "createBookingPreviewSession",
    ()=>createBookingPreviewSession,
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
    "normalizePublicAppointmentLink",
    ()=>normalizePublicAppointmentLink,
    "rescheduleManagedAppointment",
    ()=>rescheduleManagedAppointment,
    "resolveBookingPreviewSession",
    ()=>resolveBookingPreviewSession,
    "resolvePublicAppointmentLink",
    ()=>resolvePublicAppointmentLink,
    "resolvePublicReferral",
    ()=>resolvePublicReferral,
    "setActiveBookingPreviewToken",
    ()=>setActiveBookingPreviewToken,
    "updateAccountProfile",
    ()=>updateAccountProfile,
    "updateStylistSettingsProfile",
    ()=>updateStylistSettingsProfile
]);
;
function getServerApiOrigin() {
    const candidate = process.env.API_BASE_URL?.trim() || ("TURBOPACK compile-time value", "http://localhost:4010")?.trim() || "http://localhost:3000";
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
const API_BASE_URL = ("TURBOPACK compile-time truthy", 1) ? getServerApiOrigin() : "TURBOPACK unreachable";
const DEFAULT_FETCH_TIMEOUT_MS = 15000;
// Preview URLs are short-lived bearer capabilities. This browser-memory value
// is deliberately not persisted; while it is active, every public API request
// carries the header that lets the backend reject protected mutations early.
let activeBookingPreviewToken = null;
function setActiveBookingPreviewToken(token) {
    activeBookingPreviewToken = token?.trim() || null;
}
class ApiError extends Error {
    status;
    details;
    code;
    retryAfterSeconds;
    constructor(message, status, details, code, retryAfterSeconds){
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.details = details;
        this.code = code;
        this.retryAfterSeconds = retryAfterSeconds;
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
    return ("TURBOPACK compile-time value", "undefined") !== "undefined";
}
function getRequestBaseUrl(preferProxy) {
    // Browser public calls prefer same-origin Next route handlers so RLS-sensitive
    // public mutations, like waitlist joins, go through the backend API instead
    // of directly touching Supabase from an anonymous client.
    if (preferProxy && isBrowser()) //TURBOPACK unreachable
    ;
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
function getRetryAfterSeconds(response) {
    const value = response.headers.get("Retry-After")?.trim();
    if (!value) {
        return undefined;
    }
    const delaySeconds = Number(value);
    if (Number.isFinite(delaySeconds) && delaySeconds > 0) {
        return Math.ceil(delaySeconds);
    }
    const retryAt = Date.parse(value);
    if (!Number.isNaN(retryAt)) {
        return Math.max(1, Math.ceil((retryAt - Date.now()) / 1000));
    }
    return undefined;
}
async function requestPublicApi(path, { init, preferProxy = true } = {}) {
    const baseUrl = getRequestBaseUrl(preferProxy);
    const headers = new Headers(init?.headers);
    if (activeBookingPreviewToken) {
        headers.set("X-Booking-Preview-Token", activeBookingPreviewToken);
    }
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
        throw new ApiError(extractApiErrorMessage(payload, "Request failed."), response.status, payload && typeof payload === "object" ? payload.error?.details : undefined, payload && typeof payload === "object" ? payload.error?.code : undefined, getRetryAfterSeconds(response));
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
        throw new ApiError(extractApiErrorMessage(payload, "Request failed."), response.status, payload && typeof payload === "object" ? payload.error?.details : undefined, payload && typeof payload === "object" ? payload.error?.code : undefined, getRetryAfterSeconds(response));
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
async function resolveBookingPreviewSession(previewToken, slug) {
    const search = new URLSearchParams({
        slug
    });
    return requestPublicApi(`/api/public/booking-preview-sessions/${encodeURIComponent(previewToken)}?${search.toString()}`);
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
async function resolvePublicAppointmentLink(shortCode) {
    return requestPublicApi(getManagedAppointmentPath(shortCode, "short-code"));
}
function normalizePublicAppointmentLink(response) {
    return normalizeManagedAppointmentResponse(response);
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
        newAppointmentDate: requestedDateTime
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
async function createBookingPreviewSession(accessToken, body) {
    return requestAuthenticatedApi("/api/settings/booking-preview-sessions", accessToken, {
        init: {
            method: "POST",
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
}),
"[project]/apps/web/src/app/api/public/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-route] (ecmascript)");
;
const LOG_BODY_LIMIT = 1000;
const SENSITIVE_LOG_KEYS = new Set([
    "authorization",
    "email",
    "guest_email",
    "guest_phone",
    "clientEmail",
    "clientPhone",
    "clientName",
    "full_name",
    "guest_first_name",
    "guest_last_name",
    "name",
    "note",
    "notes",
    "phone",
    "reference_photo_upload_token",
    "reference_photo_upload_token_expires_at",
    "token",
    "preview",
    "preview_token",
    "x-booking-preview-token"
]);
const UNSAFE_PROXY_RESPONSE_HEADERS = new Set([
    "connection",
    "content-encoding",
    "content-length",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade"
]);
async function forwardRequest(request, context) {
    const { path } = await context.params;
    // This route is a browser-safe proxy: public booking UI calls same-origin
    // /api/public/* paths, while the backend remains responsible for writes,
    // RLS-sensitive mutations, and validation.
    const target = new URL(`/api/public/${path.join("/")}`, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["API_BASE_URL"]);
    const requestUrl = new URL(request.url);
    // Route handlers receive a one-shot body stream, so non-GET requests are
    // materialized before forwarding. Keep payload size in mind if this proxy
    // ever accepts file uploads or large request bodies.
    const requestBody = request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();
    target.search = requestUrl.search;
    const headers = new Headers(request.headers);
    // The upstream API should see its own host, not the public web app host.
    headers.delete("host");
    const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchWithTimeout"])(target, {
        method: request.method,
        headers,
        body: requestBody,
        cache: "no-store"
    });
    if (response.status >= 500) {
        // Log enough context to diagnose backend failures without dumping the full
        // booking payload. The response body may still contain backend diagnostics,
        // so production logging should be treated as sensitive.
        const isSensitiveCapabilityRequest = path[0] === "appointment-links" || path[0] === "booking-preview-sessions";
        const requestSummary = !isSensitiveCapabilityRequest && path.join("/") === "bookings" && requestBody ? summarizeBookingRequest(requestBody) : undefined;
        // Appointment link codes and preview tokens are bearer credentials. Do not
        // include their path segment, target URL, request body, or response body in
        // logs, even when the backend is failing.
        console.error(`Public API proxy received 5xx response ${JSON.stringify({
            path: isSensitiveCapabilityRequest ? `/api/public/${path[0]}/[redacted]` : `/api/public/${path.join("/")}`,
            target: isSensitiveCapabilityRequest ? "[redacted]" : target.toString(),
            method: request.method,
            status: response.status,
            requestSummary: isSensitiveCapabilityRequest ? "[redacted]" : requestSummary,
            responseBody: isSensitiveCapabilityRequest ? "[redacted]" : redactAndTruncateLogText(await response.clone().text())
        })}`);
    }
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: buildProxyResponseHeaders(response.headers)
    });
}
function buildProxyResponseHeaders(upstreamHeaders) {
    const headers = new Headers();
    upstreamHeaders.forEach((value, key)=>{
        if (!UNSAFE_PROXY_RESPONSE_HEADERS.has(key.toLowerCase())) {
            headers.set(key, value);
        }
    });
    return headers;
}
function summarizeBookingRequest(rawBody) {
    try {
        const payload = JSON.parse(rawBody);
        return {
            stylist_slug: payload.stylist_slug,
            service_id: payload.service_id,
            requested_datetime: payload.requested_datetime
        };
    } catch  {
        return "unparseable booking payload";
    }
}
function redactAndTruncateLogText(value) {
    const redacted = redactLogText(value);
    if (redacted.length <= LOG_BODY_LIMIT) {
        return redacted;
    }
    return `${redacted.slice(0, LOG_BODY_LIMIT)}...[truncated]`;
}
function redactLogText(value) {
    try {
        return JSON.stringify(redactLogValue(JSON.parse(value)));
    } catch  {
        return redactPreviewTokens(value.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]").replace(/\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/g, "[redacted-phone]").replace(/\bBearer\s+[A-Za-z0-9._~+/=-]+/gi, "Bearer [redacted]"));
    }
}
function redactLogValue(value) {
    if (Array.isArray(value)) {
        return value.map(redactLogValue);
    }
    if (typeof value === "string") {
        return redactPreviewTokens(value);
    }
    if (!value || typeof value !== "object") {
        return value;
    }
    return Object.fromEntries(Object.entries(value).map(([key, nestedValue])=>[
            key,
            SENSITIVE_LOG_KEYS.has(key) ? "[redacted]" : redactLogValue(nestedValue)
        ]));
}
function redactPreviewTokens(value) {
    return value.replace(/\bPVW_[A-Za-z0-9._~-]+\b/g, "[redacted-preview-token]");
}
function publicProxyFailureResponse() {
    // Fetch errors can serialize a caller URL containing a capability token.
    return Response.json({
        error: {
            message: "Unable to reach the booking service."
        }
    }, {
        status: 502
    });
}
async function GET(request, context) {
    try {
        return await forwardRequest(request, context);
    } catch  {
        return publicProxyFailureResponse();
    }
}
async function POST(request, context) {
    try {
        return await forwardRequest(request, context);
    } catch  {
        return publicProxyFailureResponse();
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0vldy7b._.js.map