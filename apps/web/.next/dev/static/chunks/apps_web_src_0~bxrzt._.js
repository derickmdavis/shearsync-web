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
// The apex domain redirects to www in production, so callback URLs must use
// the hostname that actually serves this Next.js application.
const PRODUCTION_WEB_APP_ORIGIN = "https://www.rootfoil.app";
const PRODUCTION_MARKETING_ORIGIN = "https://rootfoil.com";
function getDefaultOrigin(localOrigin, productionOrigin) {
    return ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : localOrigin;
}
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
    return getAbsoluteOrigin("NEXT_PUBLIC_WEB_APP_URL", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WEB_APP_URL, getDefaultOrigin(LOCAL_WEB_APP_ORIGIN, PRODUCTION_WEB_APP_ORIGIN));
}
function getMarketingOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_MARKETING_URL", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_MARKETING_URL, getDefaultOrigin(LOCAL_MARKETING_ORIGIN, PRODUCTION_MARKETING_ORIGIN));
}
function getBrowserApiOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_API_BASE_URL", ("TURBOPACK compile-time value", "https://shearsync-production.up.railway.app"), LOCAL_BACKEND_API_ORIGIN);
}
function getSupabaseBrowserConfig() {
    const url = ("TURBOPACK compile-time value", "https://salcfwupnblpgnqogfgl.supabase.co")?.trim();
    const anonKey = ("TURBOPACK compile-time value", "sb_publishable_vWzs6SpqDOMZCYUpnztErA_2URwtOmi")?.trim();
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
function getAuthRecoveryUrl() {
    return getWebAppUrl("/reset-password");
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
    "captureBookingAttributionContext",
    ()=>captureBookingAttributionContext,
    "createBookingPreviewSession",
    ()=>createBookingPreviewSession,
    "createClient",
    ()=>createClient,
    "createClientReferralLink",
    ()=>createClientReferralLink,
    "createPublicBooking",
    ()=>createPublicBooking,
    "createPublicBookingInquiry",
    ()=>createPublicBookingInquiry,
    "createPublicBookingInquirySession",
    ()=>createPublicBookingInquirySession,
    "createPublicBookingInquiryUploadIntent",
    ()=>createPublicBookingInquiryUploadIntent,
    "createPublicBookingIntake",
    ()=>createPublicBookingIntake,
    "createPublicReferencePhotoUploadIntent",
    ()=>createPublicReferencePhotoUploadIntent,
    "deleteClient",
    ()=>deleteClient,
    "fetchWithTimeout",
    ()=>fetchWithTimeout,
    "finalizePublicBookingInquiryUpload",
    ()=>finalizePublicBookingInquiryUpload,
    "finalizePublicReferencePhoto",
    ()=>finalizePublicReferencePhoto,
    "getAccountAccess",
    ()=>getAccountAccess,
    "getAccountPlan",
    ()=>getAccountPlan,
    "getAccountProfile",
    ()=>getAccountProfile,
    "getAuthenticatedUser",
    ()=>getAuthenticatedUser,
    "getClientDetail",
    ()=>getClientDetail,
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
    "resolveBookingInquiryHandoff",
    ()=>resolveBookingInquiryHandoff,
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
    "updateClient",
    ()=>updateClient,
    "updateStylistSettingsProfile",
    ()=>updateStylistSettingsProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/config/public.ts [app-client] (ecmascript)");
;
function getServerApiOrigin() {
    const candidate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_BASE_URL?.trim() || ("TURBOPACK compile-time value", "https://shearsync-production.up.railway.app")?.trim() || "http://localhost:3000";
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
async function requestAuthenticatedApi(path, accessToken, { init, preferProxy = false, unwrap = true } = {}) {
    const headers = new Headers(init?.headers);
    // Authenticated account/settings calls use the Supabase access token as a
    // bearer token; the backend still owns authorization decisions.
    headers.set("Authorization", `Bearer ${accessToken}`);
    if (init?.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
    let response;
    try {
        response = await fetchWithTimeout(`${getRequestBaseUrl(preferProxy)}${path}`, {
            ...init,
            headers,
            cache: "no-store"
        });
    } catch (error) {
        throw new ApiError(error instanceof Error ? isAbortError(error) ? "The account service timed out. Please try again." : isFetchNetworkError(error) ? "Unable to reach the account service. Please try again." : error.message : "A network error occurred while contacting the account service.", 0);
    }
    // DELETE endpoints commonly return 204. Do not attempt JSON parsing for an
    // intentionally empty response body.
    if (response.status === 204) {
        return undefined;
    }
    const payload = await parseResponseBody(response);
    if (!response.ok) {
        throw new ApiError(extractApiErrorMessage(payload, "Request failed."), response.status, payload && typeof payload === "object" ? payload.error?.details : undefined, payload && typeof payload === "object" ? payload.error?.code : undefined, getRetryAfterSeconds(response));
    }
    return unwrap ? unwrapPayload(payload) : payload;
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
async function captureBookingAttributionContext(handoffToken) {
    return requestPublicApi("/api/public/booking-attribution-contexts/capture", {
        init: {
            method: "POST",
            body: JSON.stringify({
                booking_attribution_handoff_token: handoffToken
            })
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
async function createPublicBookingInquirySession(stylist_slug) {
    return requestPublicApi("/api/public/booking-inquiries/sessions", {
        init: {
            method: "POST",
            body: JSON.stringify({
                stylist_slug
            })
        }
    });
}
async function createPublicBookingInquiry(body) {
    return requestPublicApi("/api/public/booking-inquiries", {
        init: {
            method: "POST",
            body: JSON.stringify(body)
        }
    });
}
async function resolveBookingInquiryHandoff(bookingInquiryToken) {
    return requestPublicApi("/api/public/booking-inquiry-handoffs/resolve", {
        init: {
            method: "POST",
            body: JSON.stringify({
                booking_inquiry_token: bookingInquiryToken
            })
        }
    });
}
async function createPublicBookingInquiryUploadIntent(body) {
    return requestPublicApi("/api/public/booking-inquiry-uploads/upload-intent", {
        init: {
            method: "POST",
            body: JSON.stringify(body)
        }
    });
}
async function finalizePublicBookingInquiryUpload(body) {
    return requestPublicApi("/api/public/booking-inquiry-uploads/finalize", {
        init: {
            method: "POST",
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
    return requestAuthenticatedApi("/api/settings/profile", accessToken, {
        preferProxy: true
    });
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
async function getAccountAccess(accessToken) {
    return requestAuthenticatedApi("/api/account/access", accessToken, {
        preferProxy: true
    });
}
function normalizeTotalSpend(value) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }
    if (typeof value === "string" && value.trim()) {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
}
function normalizeClientRow(client) {
    return {
        ...client,
        total_spend: normalizeTotalSpend(client.total_spend)
    };
}
async function getClients(accessToken, query = {}, options = {}) {
    const params = new URLSearchParams();
    const search = query.search?.trim();
    if (search) {
        params.set("search", search);
    }
    params.set("page", String(query.page ?? 1));
    params.set("pageSize", String(query.pageSize ?? 25));
    params.set("sort", query.sort ?? "updated_at");
    params.set("direction", query.direction ?? "desc");
    params.set("filter", query.filter ?? "all");
    const response = await requestAuthenticatedApi(`/api/clients?${params.toString()}`, accessToken, {
        preferProxy: true,
        unwrap: false,
        init: {
            signal: options.signal
        }
    });
    return {
        ...response,
        data: response.data.map(normalizeClientRow)
    };
}
async function createClient(accessToken, body) {
    const client = await requestAuthenticatedApi("/api/clients", accessToken, {
        preferProxy: true,
        init: {
            method: "POST",
            body: JSON.stringify(body)
        }
    });
    return normalizeClientRow(client);
}
async function updateClient(clientId, accessToken, body) {
    const client = await requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}`, accessToken, {
        preferProxy: true,
        init: {
            method: "PATCH",
            body: JSON.stringify(body)
        }
    });
    return normalizeClientRow(client);
}
async function deleteClient(clientId, accessToken) {
    await requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}`, accessToken, {
        preferProxy: true,
        init: {
            method: "DELETE"
        }
    });
}
async function getClientDetail(clientId, accessToken, options = {}) {
    const detail = await requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}/detail`, accessToken, {
        preferProxy: true,
        init: {
            signal: options.signal
        }
    });
    return {
        ...detail,
        client: normalizeClientRow(detail.client)
    };
}
async function getClientReferralLink(clientId, accessToken) {
    return requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}/referral-link`, accessToken, {
        preferProxy: true
    });
}
async function createClientReferralLink(clientId, accessToken) {
    return requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}/referral-link`, accessToken, {
        preferProxy: true,
        init: {
            method: "POST"
        }
    });
}
async function getClientReferralStats(clientId, accessToken) {
    return requestAuthenticatedApi(`/api/clients/${encodeURIComponent(clientId)}/referral-stats`, accessToken, {
        preferProxy: true
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/BookingAttributionGate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookingAttributionGate",
    ()=>BookingAttributionGate,
    "clearStoredBookingAttribution",
    ()=>clearStoredBookingAttribution,
    "getStoredBookingAttribution",
    ()=>getStoredBookingAttribution,
    "saveStoredBookingAttribution",
    ()=>saveStoredBookingAttribution,
    "useBookingAttribution",
    ()=>useBookingAttribution,
    "useClearBookingAttribution",
    ()=>useClearBookingAttribution
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
const HANDOFF_PARAM = "booking_attribution_handoff_token";
const PENDING_HANDOFF_STORAGE_KEY = "rf.pending_attribution_handoff";
const ATTRIBUTION_STORAGE_KEY = "rf.booking_attribution.v1";
const MAX_STORED_ATTRIBUTIONS = 10;
const BookingAttributionContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    attribution: null,
    clearAttribution: ()=>{}
});
// A handoff is single-use, so concurrent Strict Mode effects or route remounts
// share its in-flight request. Settled entries are removed immediately to avoid
// retaining bearer values in browser memory for the life of the tab.
const capturePromises = new Map();
function BookingAttributionGate({ stylistSlug, children }) {
    _s();
    const [ready, setReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [attribution, setAttribution] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const clearAttribution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingAttributionGate.useCallback[clearAttribution]": ()=>{
            clearStoredBookingAttribution(stylistSlug);
            setAttribution(null);
        }
    }["BookingAttributionGate.useCallback[clearAttribution]"], [
        stylistSlug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLayoutEffect"])({
        "BookingAttributionGate.useLayoutEffect": ()=>{
            const pendingHandoff = takeAttributionHandoff(stylistSlug);
            let active = true;
            if (!pendingHandoff) {
                setAttribution(getStoredBookingAttribution(stylistSlug));
                setReady(true);
                return ({
                    "BookingAttributionGate.useLayoutEffect": ()=>{
                        active = false;
                    }
                })["BookingAttributionGate.useLayoutEffect"];
            }
            if (pendingHandoff.retryAttempted) {
                // A previous page instance already made the one permitted retry. Do not
                // turn reloads into unbounded capture attempts; discard the handoff and
                // continue with an unattributed normal booking flow.
                clearPendingAttributionHandoff();
                setAttribution(null);
                setReady(true);
                return ({
                    "BookingAttributionGate.useLayoutEffect": ()=>{
                        active = false;
                    }
                })["BookingAttributionGate.useLayoutEffect"];
            }
            void captureAttributionWithRetry(pendingHandoff).then({
                "BookingAttributionGate.useLayoutEffect": (captured)=>{
                    if (!active) {
                        return;
                    }
                    const storedAttribution = {
                        token: captured.bookingAttributionToken,
                        expiresAt: captured.expiresAt,
                        stylistSlug
                    };
                    clearPendingAttributionHandoff();
                    saveStoredBookingAttribution(storedAttribution);
                    // This page-scoped value remains authoritative for the active tab,
                    // even if another tab later updates the last-known local record.
                    setAttribution(storedAttribution);
                }
            }["BookingAttributionGate.useLayoutEffect"]).catch({
                "BookingAttributionGate.useLayoutEffect": (error)=>{
                    // Invalid and malformed handoffs cannot recover. Other failures are
                    // allowed to continue into the normal booking flow with the pending
                    // handoff retained for no more than one controlled retry.
                    if (isTerminalHandoffFailure(error)) {
                        clearPendingAttributionHandoff();
                    }
                }
            }["BookingAttributionGate.useLayoutEffect"]).finally({
                "BookingAttributionGate.useLayoutEffect": ()=>{
                    if (active) {
                        setReady(true);
                    }
                }
            }["BookingAttributionGate.useLayoutEffect"]);
            return ({
                "BookingAttributionGate.useLayoutEffect": ()=>{
                    active = false;
                }
            })["BookingAttributionGate.useLayoutEffect"];
        }
    }["BookingAttributionGate.useLayoutEffect"], [
        stylistSlug
    ]);
    if (!ready) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex min-h-[240px] items-center justify-center px-4 py-12",
            role: "status",
            "aria-live": "polite",
            "aria-busy": "true",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto h-8 w-8 animate-spin rounded-full border-2 border-brand/25 border-t-brand",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingAttributionGate.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-4 text-sm font-medium text-foreground",
                        children: "Preparing your booking"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingAttributionGate.tsx",
                        lineNumber: 133,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-muted",
                        children: "Just a moment…"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingAttributionGate.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/BookingAttributionGate.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/BookingAttributionGate.tsx",
            lineNumber: 122,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BookingAttributionContext.Provider, {
        value: {
            attribution,
            clearAttribution
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/BookingAttributionGate.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_s(BookingAttributionGate, "Ca1WyUmVcwLBdTJvcfOTKuT/NQM=");
_c = BookingAttributionGate;
function useBookingAttribution() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BookingAttributionContext).attribution;
}
_s1(useBookingAttribution, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function useClearBookingAttribution() {
    _s2();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(BookingAttributionContext).clearAttribution;
}
_s2(useClearBookingAttribution, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function takeAttributionHandoff(stylistSlug) {
    const url = new URL(window.location.href);
    const handoff = url.searchParams.get(HANDOFF_PARAM);
    if (url.searchParams.has(HANDOFF_PARAM)) {
        const pending = handoff ? {
            handoff,
            stylistSlug,
            retryAttempted: false
        } : null;
        if (pending) {
            savePendingAttributionHandoff(pending);
        }
        url.searchParams.delete(HANDOFF_PARAM);
        window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
        return pending;
    }
    const pending = readPendingAttributionHandoff();
    if (pending && pending.stylistSlug !== stylistSlug) {
        clearPendingAttributionHandoff();
        return null;
    }
    return pending;
}
function readPendingAttributionHandoff() {
    try {
        const raw = sessionStorage.getItem(PENDING_HANDOFF_STORAGE_KEY);
        if (!raw) {
            return null;
        }
        try {
            const parsed = JSON.parse(raw);
            if (isRecord(parsed) && typeof parsed.handoff === "string" && parsed.handoff && typeof parsed.stylistSlug === "string" && parsed.stylistSlug && typeof parsed.retryAttempted === "boolean") {
                return {
                    handoff: parsed.handoff,
                    stylistSlug: parsed.stylistSlug,
                    retryAttempted: parsed.retryAttempted
                };
            }
        } catch  {
        // Fall through to remove an unreadable pending capability.
        }
        clearPendingAttributionHandoff();
        return null;
    } catch  {
        return null;
    }
}
function savePendingAttributionHandoff(pending) {
    try {
        sessionStorage.setItem(PENDING_HANDOFF_STORAGE_KEY, JSON.stringify(pending));
    } catch  {
    // The initial capture can still proceed from the in-memory value.
    }
}
function captureAttributionWithRetry(pending) {
    const existing = capturePromises.get(pending.handoff);
    if (existing) {
        return existing;
    }
    const capture = (async ()=>{
        try {
            return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureBookingAttributionContext"])(pending.handoff);
        } catch (error) {
            if (!isRetryableCaptureFailure(error) || pending.retryAttempted) {
                throw error;
            }
            savePendingAttributionHandoff({
                ...pending,
                retryAttempted: true
            });
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["captureBookingAttributionContext"])(pending.handoff);
        }
    })();
    capturePromises.set(pending.handoff, capture);
    void capture.finally(()=>{
        // Do not let an older completion remove a newer request for the same
        // opaque value.
        if (capturePromises.get(pending.handoff) === capture) {
            capturePromises.delete(pending.handoff);
        }
    }).catch(()=>{
    // The caller owns the capture failure path; this branch only prevents
    // the cleanup chain from becoming an unhandled rejected promise.
    });
    return capture;
}
function isTerminalHandoffFailure(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && (error.status === 404 && error.code === "booking_attribution_handoff_invalid" || error.status === 400 && error.code === "validation_failed");
}
function isRetryableCaptureFailure(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && error.status === 0;
}
function clearPendingAttributionHandoff() {
    try {
        sessionStorage.removeItem(PENDING_HANDOFF_STORAGE_KEY);
    } catch  {
    // Storage cleanup must not interrupt booking.
    }
}
function getStoredBookingAttribution(stylistSlug) {
    return readStoredAttributions().get(stylistSlug) ?? null;
}
function saveStoredBookingAttribution(attribution) {
    if (!isStoredAttribution(attribution) || attribution.stylistSlug !== attribution.stylistSlug.trim()) {
        return;
    }
    const records = readStoredAttributions();
    records.delete(attribution.stylistSlug);
    records.set(attribution.stylistSlug, attribution);
    while(records.size > MAX_STORED_ATTRIBUTIONS){
        const oldestSlug = records.keys().next().value;
        if (!oldestSlug) {
            break;
        }
        records.delete(oldestSlug);
    }
    writeStoredAttributions(records);
}
function clearStoredBookingAttribution(stylistSlug) {
    const records = readStoredAttributions();
    records.delete(stylistSlug);
    writeStoredAttributions(records);
}
function readStoredAttributions() {
    const records = new Map();
    try {
        const raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
        if (!raw) {
            return records;
        }
        const parsed = JSON.parse(raw);
        if (!isRecord(parsed)) {
            localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
            return records;
        }
        for (const [slug, value] of Object.entries(parsed)){
            if (isStoredAttribution(value) && value.stylistSlug === slug) {
                records.set(slug, value);
            }
        }
        while(records.size > MAX_STORED_ATTRIBUTIONS){
            const oldestSlug = records.keys().next().value;
            if (!oldestSlug) {
                break;
            }
            records.delete(oldestSlug);
        }
        writeStoredAttributions(records);
        return records;
    } catch  {
        try {
            localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
        } catch  {
        // Storage may be unavailable; continue without persisted attribution.
        }
        return records;
    }
}
function writeStoredAttributions(records) {
    try {
        if (records.size === 0) {
            localStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
            return;
        }
        localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(Object.fromEntries(records)));
    } catch  {
    // Persisted attribution is optional and must never interrupt booking.
    }
}
function isStoredAttribution(value) {
    return isRecord(value) && typeof value.token === "string" && Boolean(value.token) && typeof value.expiresAt === "string" && Date.parse(value.expiresAt) > Date.now() && typeof value.stylistSlug === "string" && Boolean(value.stylistSlug);
}
function isRecord(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
var _c;
__turbopack_context__.k.register(_c, "BookingAttributionGate");
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
    browserClient ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            // Recovery URLs are consumed explicitly by /reset-password. Leaving
            // automatic detection enabled would risk consuming an auth code twice.
            detectSessionInUrl: false
        }
    });
    return browserClient;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookingInquiryPhotoUpload",
    ()=>BookingInquiryPhotoUpload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const MAX = 5;
function BookingInquiryPhotoUpload({ sessionId, disabled, onChange, onBusyChange }) {
    _s();
    const input = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [photos, setPhotos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const updatePhotos = (updater)=>setPhotos(updater);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingInquiryPhotoUpload.useEffect": ()=>{
            onChange(photos.filter({
                "BookingInquiryPhotoUpload.useEffect": (photo)=>photo.status === "ready"
            }["BookingInquiryPhotoUpload.useEffect"]).map({
                "BookingInquiryPhotoUpload.useEffect": (photo)=>photo.id
            }["BookingInquiryPhotoUpload.useEffect"]));
            onBusyChange?.(photos.some({
                "BookingInquiryPhotoUpload.useEffect": (photo)=>photo.status === "uploading"
            }["BookingInquiryPhotoUpload.useEffect"]));
        }
    }["BookingInquiryPhotoUpload.useEffect"], [
        onBusyChange,
        onChange,
        photos
    ]);
    async function addFiles(event) {
        const files = Array.from(event.target.files ?? []).slice(0, MAX - photos.length);
        event.target.value = "";
        for (const file of files){
            if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 5 * 1024 * 1024 || !sessionId) continue;
            const localId = crypto.randomUUID();
            const entry = {
                id: localId,
                url: URL.createObjectURL(file),
                name: file.name,
                status: "uploading",
                file
            };
            updatePhotos((current)=>[
                    ...current,
                    entry
                ]);
            try {
                const display = await resize(file, 1600);
                const thumb = await resize(file, 400);
                const intent = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicBookingInquiryUploadIntent"])({
                    inquiry_session_id: sessionId,
                    original_filename: file.name || null,
                    content_type: display.type,
                    input_size_bytes: display.blob.size,
                    display_content_type: display.type,
                    thumbnail_content_type: thumb.type
                });
                const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])().storage.from("appointment-images");
                const [displayUpload, thumbUpload] = await Promise.all([
                    storage.uploadToSignedUrl(intent.signed_upload_urls.display.path, intent.signed_upload_urls.display.token, display.blob, {
                        contentType: display.type,
                        upsert: true
                    }),
                    storage.uploadToSignedUrl(intent.signed_upload_urls.thumbnail.path, intent.signed_upload_urls.thumbnail.token, thumb.blob, {
                        contentType: thumb.type,
                        upsert: true
                    })
                ]);
                if (displayUpload.error || thumbUpload.error) throw new Error("Upload failed");
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["finalizePublicBookingInquiryUpload"])({
                    inquiry_session_id: sessionId,
                    upload_id: intent.id,
                    storage_path: intent.storage_path,
                    thumbnail_path: intent.thumbnail_path,
                    original_filename: file.name || null,
                    content_type: display.type,
                    file_size_bytes: display.blob.size,
                    thumbnail_size_bytes: thumb.blob.size,
                    width: display.width,
                    height: display.height,
                    thumbnail_width: thumb.width,
                    thumbnail_height: thumb.height
                });
                updatePhotos((current)=>current.map((photo)=>photo.id === localId ? {
                            ...photo,
                            id: intent.id,
                            status: "ready"
                        } : photo));
            } catch (cause) {
                const message = cause instanceof Error ? cause.message : "Upload failed. Please try again.";
                updatePhotos((current)=>current.map((photo)=>photo.id === localId ? {
                            ...photo,
                            status: "failed",
                            error: message
                        } : photo));
                console.error("booking_inquiry_photo_upload_failed", cause);
            }
        }
    }
    function remove(id) {
        const item = photos.find((photo)=>photo.id === id);
        if (item) URL.revokeObjectURL(item.url);
        updatePhotos((current)=>current.filter((photo)=>photo.id !== id));
    }
    const pending = photos.some((photo)=>photo.status === "uploading");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: input,
                className: "sr-only",
                type: "file",
                accept: "image/jpeg,image/png,image/webp",
                multiple: true,
                onChange: (event)=>void addFiles(event)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
                lineNumber: 48,
                columnNumber: 32
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: disabled || !sessionId || photos.length >= MAX || pending,
                onClick: ()=>input.current?.click(),
                className: "flex min-h-24 w-full items-center justify-center rounded-xl border border-dashed border-brand/40 bg-brand-soft/30 px-4 text-sm font-semibold text-brand disabled:opacity-60",
                children: pending ? "Uploading photos…" : "Add photos"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
                lineNumber: 49,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-xs text-muted",
                children: "JPG, PNG, or WebP. Up to 5 photos."
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
                lineNumber: 50,
                columnNumber: 5
            }, this),
            photos.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "mt-3 grid grid-cols-5 gap-2",
                children: photos.map((photo)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: photo.url,
                                alt: photo.name,
                                className: "h-14 w-full rounded-lg object-cover"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
                                lineNumber: 51,
                                columnNumber: 129
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>remove(photo.id),
                                "aria-label": `Remove ${photo.name}`,
                                className: "absolute -right-1 -top-1 rounded-full bg-white px-1 text-xs shadow",
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
                                lineNumber: 51,
                                columnNumber: 217
                            }, this),
                            photo.status === "failed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                role: "alert",
                                className: "block text-[10px] text-red-600",
                                children: photo.error ?? "Upload failed. Please try again."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
                                lineNumber: 51,
                                columnNumber: 426
                            }, this) : null
                        ]
                    }, photo.id, true, {
                        fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
                        lineNumber: 51,
                        columnNumber: 89
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
                lineNumber: 51,
                columnNumber: 22
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx",
        lineNumber: 48,
        columnNumber: 10
    }, this);
}
_s(BookingInquiryPhotoUpload, "jGtlyytdM8+o/Z9czntza2nMvy8=");
_c = BookingInquiryPhotoUpload;
async function resize(file, max) {
    const image = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(image.width, image.height));
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Unable to prepare image");
    context.drawImage(image, 0, 0, width, height);
    image.close();
    const type = file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
    const blob = await new Promise((resolve, reject)=>canvas.toBlob((value)=>value ? resolve(value) : reject(new Error("Unable to prepare image")), type, 0.82));
    if (blob.size > 2 * 1024 * 1024) throw new Error("Image is too large");
    return {
        blob,
        type: type,
        width,
        height
    };
}
var _c;
__turbopack_context__.k.register(_c, "BookingInquiryPhotoUpload");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/BookingInquiryCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookingInquiryCard",
    ()=>BookingInquiryCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingInquiryPhotoUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookingInquiryPhotoUpload.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function BookingInquiryCard({ slug, config, enabled: enabledByStylist, contact, validateContact, previewMode = false, variant = "details" }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(config);
    const [sessionId, setSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [desiredOutcome, setDesiredOutcome] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [hairHistory, setHairHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [success, setSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [photoIds, setPhotoIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [photosBusy, setPhotosBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const closeButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const enabled = enabledByStylist && form?.enabled === true;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingInquiryCard.useEffect": ()=>{
            if (open) closeButtonRef.current?.focus();
        }
    }["BookingInquiryCard.useEffect"], [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingInquiryCard.useEffect": ()=>{
            const onKeyDown = {
                "BookingInquiryCard.useEffect.onKeyDown": (event)=>{
                    if (event.key === "Escape") setOpen(false);
                }
            }["BookingInquiryCard.useEffect.onKeyDown"];
            if (open) window.addEventListener("keydown", onKeyDown);
            return ({
                "BookingInquiryCard.useEffect": ()=>window.removeEventListener("keydown", onKeyDown)
            })["BookingInquiryCard.useEffect"];
        }
    }["BookingInquiryCard.useEffect"], [
        open
    ]);
    if (!enabled) return null;
    async function openInquiry() {
        if (!validateContact()) return;
        setError(null);
        setOpen(true);
        if (previewMode) return;
        if (sessionId) return;
        try {
            const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicBookingInquirySession"])(slug);
            setSessionId(session.inquiry_session_id);
            setForm(session.booking_request_form);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "We couldn't start your inquiry. Please try again.");
        }
    }
    async function submit() {
        if (!validateContact() || !sessionId && !previewMode) return;
        const desired = desiredOutcome.trim();
        const history = hairHistory.trim();
        if (!desired || !history) {
            setError("Please answer the first two questions.");
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            if (previewMode) {
                setSuccess(true);
                return;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicBookingInquiry"])({
                inquiry_session_id: sessionId,
                guest_first_name: contact.firstName.trim(),
                guest_last_name: contact.lastName.trim(),
                guest_phone: contact.phone.trim(),
                guest_email: contact.email.trim(),
                inquiry_answers: {
                    desired_outcome: desired,
                    hair_history: history,
                    optional_photo_upload_ids: photoIds
                }
            });
            setSuccess(true);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "We couldn't send your inquiry. Please try again.");
        } finally{
            setSubmitting(false);
        }
    }
    const prompt = (id)=>form?.questions.find((question)=>question.id === id)?.prompt;
    const serviceEntry = variant === "services";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "rounded-2xl border border-[#b7bba9] bg-[#eef0e6] p-5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white font-display text-[27px] text-brand",
                            "aria-hidden": "true",
                            children: serviceEntry ? "?" : "✦"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                            lineNumber: 102,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0 flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-display text-[25px] leading-6 font-medium text-foreground",
                                    children: serviceEntry ? "Need help choosing?" : "Booking inquiry"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 104,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm leading-5 text-muted",
                                    children: serviceEntry ? "Send a booking inquiry." : "Not sure what to book? I’d like help choosing."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 105,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                            lineNumber: 103,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>void openInquiry(),
                            "aria-label": "Open booking inquiry",
                            className: "flex h-10 w-10 shrink-0 items-center justify-center text-2xl text-brand transition-transform hover:translate-x-0.5",
                            children: "›"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                            lineNumber: 107,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                    lineNumber: 101,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                lineNumber: 100,
                columnNumber: 5
            }, this),
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-end bg-black/45 p-0 sm:items-center sm:justify-center sm:p-6",
                role: "presentation",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "booking-inquiry-title",
                    className: "max-h-[94dvh] w-full overflow-y-auto rounded-t-3xl bg-card p-6 shadow-2xl sm:max-w-xl sm:rounded-3xl sm:p-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold tracking-[0.16em] text-brand uppercase",
                                            children: "Booking inquiry"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                            lineNumber: 112,
                                            columnNumber: 70
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "booking-inquiry-title",
                                            className: "mt-5 font-display text-[41px] leading-[0.92] font-medium tracking-[-0.04em] text-foreground",
                                            children: "Tell me what you’re looking for"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                            lineNumber: 112,
                                            columnNumber: 165
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 font-display text-[20px] leading-6 text-muted",
                                            children: "A few details will help me recommend the right service."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                            lineNumber: 112,
                                            columnNumber: 336
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 112,
                                    columnNumber: 65
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    ref: closeButtonRef,
                                    type: "button",
                                    onClick: ()=>setOpen(false),
                                    "aria-label": "Close booking inquiry",
                                    className: "min-h-10 min-w-10 rounded-full text-2xl text-brand hover:bg-black/5",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 112,
                                    columnNumber: 467
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                            lineNumber: 112,
                            columnNumber: 9
                        }, this),
                        success ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-display text-[34px] leading-none font-medium text-foreground",
                                    children: "Your inquiry is on its way."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 113,
                                    columnNumber: 43
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-sm leading-6 text-muted",
                                    children: "Thanks for sharing what you’re looking for. The stylist will follow up using the contact details you provided. This does not reserve an appointment."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 113,
                                    columnNumber: 157
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setOpen(false),
                                    className: "mt-8 min-h-12 w-full rounded-xl bg-brand px-5 font-display text-[21px] text-white",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 113,
                                    columnNumber: 358
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                            lineNumber: 113,
                            columnNumber: 20
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-9 space-y-7",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InquiryTextarea, {
                                    number: "1",
                                    label: prompt("desired_outcome") ?? "What are you hoping to achieve with your hair?",
                                    value: desiredOutcome,
                                    onChange: setDesiredOutcome
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 114,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InquiryTextarea, {
                                    number: "2",
                                    label: prompt("hair_history") ?? "Describe your current hair and any recent coloring.",
                                    value: hairHistory,
                                    onChange: setHairHistory
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 115,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-display text-[26px] leading-7 font-medium text-foreground",
                                            children: "Add inspiration photos (optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                            lineNumber: 116,
                                            columnNumber: 16
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-sm text-muted",
                                            children: prompt("optional_photos") ?? "Add photos to provide more context."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                            lineNumber: 116,
                                            columnNumber: 131
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingInquiryPhotoUpload$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookingInquiryPhotoUpload"], {
                                            sessionId: sessionId,
                                            disabled: submitting || previewMode,
                                            onChange: setPhotoIds,
                                            onBusyChange: setPhotosBusy
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                            lineNumber: 116,
                                            columnNumber: 242
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 116,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm leading-6 text-muted",
                                    children: "I’ll follow up using the contact details you provided."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 117,
                                    columnNumber: 11
                                }, this),
                                error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    role: "alert",
                                    className: "text-sm text-red-600",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 118,
                                    columnNumber: 20
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: submitting || photosBusy || !sessionId && !previewMode,
                                    onClick: ()=>void submit(),
                                    className: "min-h-14 w-full rounded-xl bg-brand px-5 font-display text-[23px] text-white disabled:opacity-60",
                                    children: submitting ? "Sending inquiry..." : photosBusy ? "Finishing photos…" : "Send inquiry"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                                    lineNumber: 119,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                            lineNumber: 113,
                            columnNumber: 528
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                    lineNumber: 111,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                lineNumber: 110,
                columnNumber: 13
            }, this) : null
        ]
    }, void 0, true);
}
_s(BookingInquiryCard, "UvEuSh1ozWBZw80BgdtZYPvVHOI=");
_c = BookingInquiryCard;
function InquiryTextarea({ number, label, value, onChange }) {
    const id = `booking-inquiry-${number}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        htmlFor: id,
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-display text-[26px] leading-7 font-medium text-foreground",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                lineNumber: 128,
                columnNumber: 48
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                id: id,
                value: value,
                maxLength: 2000,
                onChange: (event)=>onChange(event.target.value),
                className: "mt-3 min-h-32 w-full rounded-xl border border-border/70 bg-white p-4 text-base leading-6 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
                lineNumber: 128,
                columnNumber: 143
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/BookingInquiryCard.tsx",
        lineNumber: 128,
        columnNumber: 10
    }, this);
}
_c1 = InquiryTextarea;
var _c, _c1;
__turbopack_context__.k.register(_c, "BookingInquiryCard");
__turbopack_context__.k.register(_c1, "InquiryTextarea");
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
const MAX_INPUT_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_DISPLAY_FILE_SIZE_BYTES = 2 * 1024 * 1024;
const MAX_THUMBNAIL_FILE_SIZE_BYTES = 300 * 1024;
const MAX_TIMEOUT_MS = 2_147_483_647;
function PublicReferencePhotoUpload({ referenceToken, tokenExpiresAt, initialFile, onInitialFileConsumed, allowManualSelection = true }) {
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
                        maxLongEdge: 1600,
                        maxSizeBytes: MAX_DISPLAY_FILE_SIZE_BYTES
                    }),
                    resizeImage(file, {
                        maxLongEdge: 400,
                        maxSizeBytes: MAX_THUMBNAIL_FILE_SIZE_BYTES
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
                    thumbnail_width: thumbnail.width,
                    thumbnail_height: thumbnail.height,
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
        if (file.size > MAX_INPUT_FILE_SIZE_BYTES) {
            setState({
                status: "failed",
                message: "Please choose a photo smaller than 5 MB.",
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
    // A photo selected during review can finish uploading here after a booking
    // succeeds, but confirmation must not offer another place to select one.
    if (!allowManualSelection && !selectedFile && state.status === "idle") {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-8 text-left",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm font-semibold text-foreground",
                        children: allowManualSelection ? "Add an inspiration/reference photo" : "Reference photo"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-6 text-muted",
                        children: "This photo is private and shared only with your stylist for this appointment."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 272,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 266,
                columnNumber: 7
            }, this),
            allowManualSelection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: "image/jpeg,image/jpg,image/pjpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
                className: "sr-only",
                onChange: (event)=>void handleFileChange(event)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this) : null,
            state.status === "success" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-2xl border border-success/30 bg-success/10 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex h-10 w-10 items-center justify-center rounded-full bg-success text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 292,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                            lineNumber: 291,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-foreground",
                                    children: "Reference photo added"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                    lineNumber: 295,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-xs text-muted",
                                    children: "Your stylist will see it with this appointment."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                    lineNumber: 298,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                            lineNumber: 294,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                    lineNumber: 290,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 289,
                columnNumber: 9
            }, this) : allowManualSelection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
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
                                            lineNumber: 314,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                        lineNumber: 313,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-sm font-semibold text-foreground",
                                                children: busy ? "Uploading reference photo" : "Add a reference photo"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                                lineNumber: 317,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-1 block text-xs text-muted",
                                                children: "JPG, PNG, or WebP up to 5 MB"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                                lineNumber: 320,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                        lineNumber: 316,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 312,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shrink-0 rounded-full border border-brand/50 px-4 py-2 text-xs font-semibold text-brand",
                                children: "Choose Photo"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 325,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 306,
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
                                    lineNumber: 333,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 332,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-medium text-muted",
                                children: state.status === "processing" ? "Preparing your photo..." : "Uploading securely..."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 343,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 331,
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
                                    lineNumber: 355,
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
                                            lineNumber: 362,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs leading-5 text-muted",
                                            children: state.message
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                            lineNumber: 365,
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
                                                    lineNumber: 370,
                                                    columnNumber: 23
                                                }, this) : null,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: handleRemove,
                                                    className: "text-xs font-semibold text-muted hover:text-foreground",
                                                    children: "Remove"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                                    lineNumber: 378,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                            lineNumber: 368,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                    lineNumber: 361,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                            lineNumber: 353,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 352,
                        columnNumber: 13
                    }, this) : null
                ]
            }, void 0, true) : busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            lineNumber: 394,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 393,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs font-medium text-muted",
                        children: state.status === "processing" ? "Preparing your photo..." : "Uploading securely..."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 402,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 392,
                columnNumber: 9
            }, this) : selectedFile && state.status === "failed" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 rounded-2xl border border-border bg-white p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-foreground",
                        children: selectedFile.name
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 410,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs leading-5 text-muted",
                        children: state.message
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 413,
                        columnNumber: 11
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
                                lineNumber: 416,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: handleRemove,
                                className: "text-xs font-semibold text-muted hover:text-foreground",
                                children: "Remove"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                                lineNumber: 424,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                        lineNumber: 414,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 409,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
        lineNumber: 265,
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
async function resizeImage(file, { maxLongEdge, maxSizeBytes }) {
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
    const blob = await canvasToBoundedBlob(canvas, contentType, maxSizeBytes);
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
async function canvasToBoundedBlob(canvas, contentType, maxSizeBytes) {
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
        if (blob.size <= maxSizeBytes) {
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
                lineNumber: 655,
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
                lineNumber: 665,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "9",
                cy: "9",
                r: "1.25",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
                lineNumber: 673,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
        lineNumber: 654,
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
            lineNumber: 681,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/PublicReferencePhotoUpload.tsx",
        lineNumber: 680,
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
        className: "text-left",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_20px_35px_rgba(176,122,62,0.22)]",
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
                className: "mt-6 font-display text-[41px] leading-[0.92] font-medium tracking-[-0.045em] text-foreground",
                children: scheduled ? "You’re booked." : "Request received"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 font-display text-[20px] leading-6 text-muted",
                children: scheduled ? "Your appointment is confirmed." : "Your appointment request is awaiting approval."
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 rounded-2xl border border-border/70 bg-surface-warm p-5 text-left",
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
                onInitialFileConsumed: onInitialReferencePhotoConsumed,
                allowManualSelection: false
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: handleAddToCalendar,
                className: "mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 font-display text-[23px] font-medium text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark",
                children: "Add to Calendar"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onDone,
                className: "mt-3 w-full rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground",
                children: "Done"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 132,
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
                lineNumber: 140,
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
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-right font-semibold text-foreground",
                children: value
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
        lineNumber: 149,
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
            lineNumber: 159,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/BookedStep.tsx",
        lineNumber: 158,
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
        label: "Service"
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
        className: "mb-11 px-1",
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
                                        "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors",
                                        isComplete || isActive ? "bg-black text-white shadow-[0_8px_18px_rgba(17,17,17,0.16)]" : "border border-border/70 bg-white text-muted"
                                    ].join(" "),
                                    children: isComplete ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                                        lineNumber: 32,
                                        columnNumber: 33
                                    }, this) : stepNumber
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                                    lineNumber: 24,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: [
                                        "text-[10px] font-semibold tracking-wide",
                                        isActive || isComplete ? "text-foreground" : "text-muted"
                                    ].join(" "),
                                    children: step.label
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                                    lineNumber: 34,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                            lineNumber: 23,
                            columnNumber: 15
                        }, this),
                        index < steps.length - 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-3 mb-7 h-px flex-1 bg-black/75"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                            lineNumber: 44,
                            columnNumber: 17
                        }, this) : null
                    ]
                }, step.label, true, {
                    fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
                    lineNumber: 22,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
            lineNumber: 15,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
        lineNumber: 14,
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
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/BookingStepper.tsx",
        lineNumber: 56,
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
    "isBookingIdentityRequiredError",
    ()=>isBookingIdentityRequiredError,
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
    return Boolean(values.fullName.trim()) && Boolean(parsedName.lastName) && Boolean(values.phone.trim()) && Boolean(values.email.trim()) && isValidEmail(values.email.trim());
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
function isBookingIdentityRequiredError(error) {
    return error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && error.code === "booking_identity_required";
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
function ConfirmStep({ stylist, services, slot, fullName, email, phone, notes, smsOptIn, referencePhotoFile, referencePhotoPreviewUrl, submitting, previewMode = false, error, timezone, onNotesChange, onSmsOptInChange, onReferencePhotoSelect, onReferencePhotoRemove, onEdit, onSubmit }) {
    _s();
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [referencePhotoError, setReferencePhotoError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const totalDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServiceDurations"])(services);
    const totalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServicePrices"])(services);
    const serviceSummary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatServiceNames"])(services);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-display text-[40px] leading-[0.92] font-medium tracking-[-0.045em] text-foreground sm:text-[47px]",
                        children: "Review your appointment"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 font-display text-[20px] leading-6 text-muted",
                        children: "Please check your details below before booking."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-7 space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCard, {
                        title: "Your appointment",
                        action: ()=>onEdit(2),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-display text-[23px] leading-6 font-medium text-foreground",
                                            children: serviceSummary
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-muted",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildSummaryName"])(stylist)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-display text-[20px] font-medium text-foreground",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])(totalDuration)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-muted",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalPrice)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 94,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 90,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCard, {
                        title: "Date & time",
                        action: ()=>onEdit(3),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display text-[23px] leading-6 font-medium text-foreground",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatLongDate"])(slot.start, timezone)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-muted",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(slot.start, timezone)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 103,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-muted",
                                children: timezone
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 106,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReviewCard, {
                        title: "Your details",
                        action: ()=>onEdit(1),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-display text-[24px] leading-6 text-foreground",
                                children: fullName
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm text-muted",
                                children: phone
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            email ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-sm text-muted",
                                children: email
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 111,
                                columnNumber: 20
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 81,
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
                        lineNumber: 116,
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
                        lineNumber: 119,
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
                        lineNumber: 126,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 115,
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
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-6 text-muted",
                        children: "Share an inspiration photo, current hair photo, or style reference to help your stylist prepare."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: "image/jpeg,image/jpg,image/pjpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp",
                        className: "sr-only",
                        disabled: previewMode,
                        onChange: handleReferencePhotoChange
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 138,
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
                                    lineNumber: 151,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-brand/20 text-brand",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageIcon, {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                        lineNumber: 160,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 159,
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
                                            lineNumber: 164,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-muted",
                                            children: "Ready to upload after booking"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 167,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                    lineNumber: 163,
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
                                    lineNumber: 171,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 148,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>fileInputRef.current?.click(),
                        disabled: previewMode,
                        className: "mt-4 flex min-h-24 w-full items-center justify-between gap-4 rounded-2xl border border-dashed border-brand/40 bg-white px-4 py-4 text-left transition hover:border-brand hover:bg-brand/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/30 text-brand",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageIcon, {}, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                            lineNumber: 192,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                        lineNumber: 191,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-sm font-semibold text-foreground",
                                                children: "Add a reference photo"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-1 block text-xs text-muted",
                                                children: "JPG, PNG, or WebP up to 5 MB"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                        lineNumber: 194,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 190,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "shrink-0 rounded-full border border-brand/50 px-4 py-2 text-xs font-semibold text-brand",
                                children: "Upload Photo"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this),
                    referencePhotoError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm text-red-500",
                        children: referencePhotoError
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-sm text-red-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 214,
                columnNumber: 16
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "mt-5 rounded-2xl border border-border bg-surface-warm p-4 text-left",
                "aria-labelledby": "sms-consent-label",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "appointment-sms-consent",
                                type: "checkbox",
                                name: "appointment-sms-consent",
                                checked: smsOptIn,
                                disabled: submitting,
                                "aria-describedby": "sms-consent-details sms-consent-policy-links",
                                onChange: (event)=>onSmsOptInChange(event.target.checked),
                                className: "mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-brand focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 221,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                id: "sms-consent-label",
                                htmlFor: "appointment-sms-consent",
                                className: "cursor-pointer text-sm font-semibold text-foreground",
                                children: "Receive appointment text updates"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 231,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "sms-consent-details",
                        className: "mt-2 text-xs leading-5 text-muted",
                        children: "By checking this box, you agree to receive appointment-related text messages from Root & Foil LLC on behalf of your stylist. Messages may include booking confirmations, appointment reminders, rescheduling or cancellation updates, and customer service responses."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs leading-5 text-muted",
                        children: "Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "sms-consent-policy-links",
                        className: "mt-2 text-xs leading-5 text-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://www.rootfoil.com/privacy-policy",
                                target: "_blank",
                                rel: "noreferrer",
                                className: "font-semibold text-foreground underline decoration-brand/60 underline-offset-2 hover:text-brand",
                                children: "Privacy Policy"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "aria-hidden": "true",
                                children: " · "
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "https://www.rootfoil.com/terms-of-service",
                                target: "_blank",
                                rel: "noreferrer",
                                className: "font-semibold text-foreground underline decoration-brand/60 underline-offset-2 hover:text-brand",
                                children: "Terms of Service"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                disabled: submitting || previewMode,
                onClick: onSubmit,
                className: "mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 font-display text-[23px] font-medium text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70",
                children: [
                    previewMode ? "Booking is disabled in preview" : submitting ? "Booking..." : "Confirm appointment",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
        lineNumber: 71,
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
        className: "rounded-2xl border border-border/70 bg-surface-warm p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-display text-[24px] leading-6 font-medium text-foreground",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: action,
                        className: "text-sm font-semibold text-brand",
                        children: "Edit"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                        lineNumber: 353,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3",
                children: children
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
        lineNumber: 350,
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
            lineNumber: 369,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
        lineNumber: 368,
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
                lineNumber: 384,
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
                lineNumber: 394,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "9",
                cy: "9",
                r: "1.25",
                fill: "currentColor"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
                lineNumber: 402,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/ConfirmStep.tsx",
        lineNumber: 383,
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
            "flex w-full items-start gap-4 py-5 text-left transition-all",
            selected ? "bg-brand-soft/45" : "hover:bg-surface-warm/65"
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            className: "font-display text-[26px] leading-6 font-medium tracking-tight text-foreground",
                                            children: service.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                            lineNumber: 33,
                                            columnNumber: 15
                                        }, this),
                                        highlighted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand",
                                            children: "Recommended"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                            lineNumber: 35,
                                            columnNumber: 17
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, this),
                                service.description ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-[15px] leading-6 text-muted",
                                    children: service.description
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                    lineNumber: 41,
                                    columnNumber: 15
                                }, this) : null
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: [
                                "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
                                selected ? "border-brand bg-brand text-white" : "border-border bg-white text-transparent"
                            ].join(" "),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-4 flex items-center gap-3 text-sm text-muted",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])(service.durationMinutes)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "h-1 w-1 rounded-full bg-border"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-medium text-foreground",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(service.price)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
            lineNumber: 29,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_c = ServiceCard;
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
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/ServiceCard.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_c1 = CheckIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "ServiceCard");
__turbopack_context__.k.register(_c1, "CheckIcon");
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
function DetailsStep({ mode = "details", values, errors, services, intake, intakeLoading, servicesLoading, selectedServices, serviceError, canBeginServiceSelection, showServicePicker, recommendedServiceId, inquiryCallout, onChange, onToggleService, onBack, onContinue }) {
    const isServiceStep = mode === "services";
    const heading = isServiceStep ? "Select service" : "Your details";
    const description = isServiceStep ? "Choose a service for this appointment." : "Share your contact information to get started.";
    const disableSubmit = intakeLoading || servicesLoading || !showServicePicker && !canBeginServiceSelection;
    const totalDuration = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServiceDurations"])(selectedServices);
    const totalPrice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sumServicePrices"])(selectedServices);
    const serviceGroups = groupServicesByCategory(services);
    const showCategoryHeadings = services.some((service)=>service.category?.trim());
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: (event)=>{
            event.preventDefault();
            onContinue();
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-display text-[40px] leading-[0.92] font-medium tracking-[-0.045em] text-foreground sm:text-[47px]",
                        children: heading
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 font-display text-[20px] leading-6 text-muted",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            !isServiceStep ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-9 space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        id: "fullName",
                        name: "fullName",
                        label: "Full name",
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
                        lineNumber: 101,
                        columnNumber: 11
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
                        lineNumber: 114,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        id: "email",
                        name: "email",
                        label: "Email",
                        type: "email",
                        placeholder: "you@email.com",
                        value: values.email,
                        error: errors.email,
                        onChange: (value)=>onChange("email", value),
                        autoComplete: "email",
                        autoCapitalize: "none",
                        autoCorrect: "off",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, this) : null,
            intake ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IntakeMessage, {
                intake: intake,
                selectedServiceIds: selectedServices.map((service)=>service.id)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 145,
                columnNumber: 9
            }, this) : null,
            showServicePicker && inquiryCallout ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-7",
                children: inquiryCallout
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 151,
                columnNumber: 46
            }, this) : null,
            showServicePicker ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: servicesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                        message: "Refreshing the services you can book right now..."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 157,
                        columnNumber: 15
                    }, this) : services.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-6",
                                children: serviceGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        "aria-label": group.name,
                                        children: [
                                            showCategoryHeadings ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "mb-4 rounded-xl bg-surface-warm px-4 py-3 text-sm font-semibold tracking-[0.22em] text-[#705640] uppercase",
                                                children: group.name
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                lineNumber: 164,
                                                columnNumber: 25
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "divide-y divide-border/55",
                                                children: group.services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ServiceCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ServiceCard"], {
                                                        service: service,
                                                        highlighted: service.id === recommendedServiceId,
                                                        selected: selectedServices.some((selectedService)=>selectedService.id === service.id),
                                                        onSelect: onToggleService
                                                    }, service.id, false, {
                                                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                        lineNumber: 170,
                                                        columnNumber: 27
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                lineNumber: 168,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, group.name, true, {
                                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                        lineNumber: 162,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                lineNumber: 160,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-6 rounded-2xl border border-border/60 bg-surface-warm p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between text-sm text-muted",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Total Duration"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                lineNumber: 187,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-foreground",
                                                children: selectedServices.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatDuration"])(totalDuration) : "--"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                lineNumber: 188,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                        lineNumber: 186,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 flex items-center justify-between text-sm text-muted",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Total Price"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                lineNumber: 193,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-semibold text-foreground",
                                                children: selectedServices.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatCurrency"])(totalPrice) : "--"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                                lineNumber: 194,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                        lineNumber: 192,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                                lineNumber: 185,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyState, {
                        message: "No services are currently available for online booking."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 201,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 154,
                columnNumber: 9
            }, this) : null,
            serviceError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-sm text-red-500",
                children: serviceError
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 207,
                columnNumber: 23
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                disabled: disableSubmit,
                className: "mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 font-display text-[23px] font-medium text-white shadow-[0_18px_32px_rgba(183,121,61,0.24)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-55",
                children: [
                    intakeLoading ? "Checking..." : servicesLoading ? "Loading services..." : showServicePicker ? "Continue" : "Select a service",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 221,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            isServiceStep && onBack ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onBack,
                className: "mt-3 w-full rounded-2xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground",
                children: "Back"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 225,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c = DetailsStep;
function groupServicesByCategory(services) {
    const hasCategories = services.some((service)=>service.category?.trim());
    if (!hasCategories) {
        return [
            {
                name: "Services",
                services
            }
        ];
    }
    const groups = new Map();
    for (const service of services){
        const category = service.category?.trim() || "Other services";
        const groupedServices = groups.get(category);
        if (groupedServices) {
            groupedServices.push(service);
        } else {
            groups.set(category, [
                service
            ]);
        }
    }
    return Array.from(groups, ([name, groupedServices])=>({
            name,
            services: groupedServices
        }));
}
function IntakeMessage({ intake, selectedServiceIds }) {
    if (intake.matchStatus === "not_found") {
        return null;
    }
    const title = intake.matchStatus === "matched" ? `Welcome back, ${intake.client?.firstName || "there"}` : "We need one more check";
    const toneClass = intake.matchStatus === "matched" ? "border-emerald-200 bg-emerald-50 text-emerald-950" : "border-amber-200 bg-amber-50 text-amber-950";
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
                lineNumber: 285,
                columnNumber: 7
            }, this),
            intake.matchStatus !== "matched" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm leading-6",
                children: intake.bookingBehavior.message
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 287,
                columnNumber: 9
            }, this) : null,
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
                        lineNumber: 292,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 290,
                columnNumber: 9
            }, this) : null,
            intake.matchStatus === "ambiguous" && intake.candidateCount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-6",
                children: "We found more than one possible match, so we'll use safe new-client rules unless you confirm more information later."
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 300,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 284,
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
                lineNumber: 312,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-6 text-muted",
                children: message
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 311,
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
                className: "mb-2 block text-base font-medium text-foreground",
                children: [
                    label,
                    required ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-brand",
                        children: " *"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                        lineNumber: 361,
                        columnNumber: 21
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 359,
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
                    "h-14 w-full rounded-xl border bg-white px-4 text-base text-foreground outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 focus:ring-brand/20",
                    error ? "border-red-400" : "border-border focus:border-brand"
                ].join(" ")
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm text-red-500",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
                lineNumber: 380,
                columnNumber: 16
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 358,
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
            lineNumber: 388,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/DetailsStep.tsx",
        lineNumber: 387,
        columnNumber: 5
    }, this);
}
_c4 = ArrowIcon;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "DetailsStep");
__turbopack_context__.k.register(_c1, "IntakeMessage");
__turbopack_context__.k.register(_c2, "EmptyState");
__turbopack_context__.k.register(_c3, "Field");
__turbopack_context__.k.register(_c4, "ArrowIcon");
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
        className: "pb-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-display text-[40px] leading-[0.92] font-medium tracking-[-0.045em] text-foreground sm:text-[47px]",
                        children: "Choose a time"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-3 font-display text-[20px] leading-6 text-muted",
                        children: "Select a date and appointment time."
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
                className: "mt-8",
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
                        className: "border-y border-[#d7be94] py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setCalendarWeekStart((currentWeekStart)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToDate"])(currentWeekStart, -7)),
                                        disabled: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToDate"])(calendarWeekStart, -7) < (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["startOfWeek"])(today),
                                        className: "inline-flex h-9 w-9 items-center justify-center text-[#a36b2f] transition-colors hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40",
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
                                        className: "font-display text-[27px] font-medium text-foreground",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMonthLabel"])(calendarWeekStart, timezone)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setCalendarWeekStart((currentWeekStart)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToDate"])(currentWeekStart, 7)),
                                        className: "inline-flex h-9 w-9 items-center justify-center text-[#a36b2f] transition-colors hover:bg-white/20",
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
                                className: "mt-6 grid grid-cols-7 gap-1 min-[430px]:gap-2",
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
                                            "flex h-[64px] min-w-0 flex-col items-center justify-center rounded-[22px] px-0.5 py-2 text-center transition-colors min-[430px]:px-2",
                                            isSelected ? "border border-[#f7b416] bg-[#bb7d31] text-white shadow-[0_2px_0_rgba(255,255,255,0.6)_inset]" : isPastDate ? "text-black/35" : "text-foreground hover:bg-white/30"
                                        ].join(" "),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-[10px] leading-none font-bold uppercase tracking-[0.02em] min-[430px]:text-[11px] min-[430px]:tracking-[0.04em]",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatShortWeekday"])(date, timezone)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                lineNumber: 161,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mt-1 block text-[15px] leading-none font-bold min-[430px]:text-[16px]",
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
                    !loading && !error && waitlistCta ? waitlistCta : null,
                    !loading && !error && !showEmptyState ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "mt-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-display text-[32px] leading-8 font-medium text-foreground",
                                    children: selectedDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatMonthDay"])(selectedDate, timezone) : "Available times"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                    lineNumber: 178,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 177,
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
                                            "border-b border-[#d7be94] py-4 transition-colors last:border-b-0",
                                            isSelectedDate ? "bg-white/25" : ""
                                        ].join(" "),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[16px] leading-5 font-bold text-foreground",
                                                                children: formatAvailabilityDay(day.date, timezone)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                                lineNumber: 203,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "inline-flex h-[28px] shrink-0 items-center rounded-full bg-white/60 px-[11px] text-[12px] font-bold text-muted",
                                                            children: [
                                                                day.slots.length,
                                                                " ",
                                                                day.slots.length === 1 ? "timeslot" : "timeslots"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                            lineNumber: 207,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 flex min-w-0 flex-col gap-2.5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-3 gap-2 xl:grid-cols-4",
                                                        children: [
                                                            previewSlots.map((slot)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TimeSlotPill, {
                                                                    slot: slot,
                                                                    selected: selectedSlot?.start === slot.start,
                                                                    timeZone: timezone,
                                                                    onSelect: ()=>handleSlotSelection(day.date, slot)
                                                                }, slot.start, false, {
                                                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                                    lineNumber: 216,
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
                                                                lineNumber: 226,
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
                                                                lineNumber: 239,
                                                                columnNumber: 29
                                                            }, this) : null
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                        lineNumber: 214,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                                    lineNumber: 213,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                            lineNumber: 200,
                                            columnNumber: 21
                                        }, this)
                                    }, day.date, false, {
                                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                        lineNumber: 191,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 176,
                        columnNumber: 11
                    }, this) : null,
                    showEmptyState ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(InfoCard, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xl font-semibold tracking-tight text-foreground",
                                children: "No available times"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm leading-6 text-muted",
                                children: "Choose a different date or check back later."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 261,
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
                className: "mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#b77a2e] px-5 font-display text-[23px] font-medium text-white shadow-[0_18px_32px_rgba(141,91,30,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[#9e641f] disabled:cursor-not-allowed disabled:transform-none disabled:opacity-50 disabled:shadow-none",
                children: [
                    loading ? "Checking..." : "Continue",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowIcon, {}, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onBack,
                className: "mt-3 flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground",
                children: "Back"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                lineNumber: 284,
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
        lineNumber: 297,
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
            "inline-flex h-[54px] w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-xl border border-[#e5cda9] bg-white/25 px-[10px] font-display text-[19px] leading-none font-medium text-[#b17131] transition-all",
            selected ? "border-[#b77a2e] bg-[#b77a2e] text-white" : "hover:bg-white/50 active:bg-white/60"
        ].join(" "),
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTime"])(slot.start, timeZone)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 317,
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
        lineNumber: 341,
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
                    lineNumber: 356,
                    columnNumber: 11
                }, this)
            }, index, false, {
                fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
                lineNumber: 355,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 353,
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
            lineNumber: 370,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/TimeStep.tsx",
        lineNumber: 365,
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
function formatAvailabilityDay(date, timeZone) {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
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
        if (!email.trim()) {
            nextErrors.email = "Email is required.";
        } else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidEmail"])(email.trim())) {
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
    function resetDetails() {
        const emptyValues = {
            fullName: "",
            email: "",
            phone: ""
        };
        // Keep the ref in sync immediately because async callbacks use it rather
        // than waiting for React state to commit.
        contactValuesRef.current = emptyValues;
        setFullName(emptyValues.fullName);
        setEmail(emptyValues.email);
        setPhone(emptyValues.phone);
        setDetailsErrors({});
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
        resetDetails,
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
function WaitlistCallout({ slug, selectedDate, selectedServiceId, selectedService, defaultClientName, defaultClientEmail, defaultClientPhone }) {
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
                                lineNumber: 46,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                            lineNumber: 45,
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
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm leading-6 text-muted",
                                    children: "No time that works? We’ll email you if a matching opening becomes available."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setOpen(true),
                                    className: "mt-3 inline-flex h-11 items-center justify-center rounded-2xl bg-brand px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(183,121,61,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/25",
                                    children: "Join waitlist"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                            lineNumber: 48,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WaitlistDialog, {
                slug: slug,
                selectedDate: selectedDate,
                selectedServiceId: selectedServiceId,
                selectedService: selectedService,
                defaultClientName: defaultClientName,
                defaultClientEmail: defaultClientEmail,
                defaultClientPhone: defaultClientPhone,
                onClose: ()=>setOpen(false)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true);
}
_s(WaitlistCallout, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = WaitlistCallout;
function WaitlistDialog({ slug, selectedDate, selectedServiceId, selectedService, defaultClientName, defaultClientEmail, defaultClientPhone, onClose }) {
    _s1();
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTodayDateValue"])();
    const [requestedDates, setRequestedDates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        selectedDate
    ]);
    const [dateToAdd, setDateToAdd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [clientName, setClientName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultClientName);
    const [clientEmail, setClientEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultClientEmail);
    const [clientPhone, setClientPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultClientPhone);
    const [timePreference, setTimePreference] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("anytime");
    const [requestedStartTime, setRequestedStartTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("09:00");
    const [requestedEndTime, setRequestedEndTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("17:00");
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
        if (!requestedDates.length) {
            nextErrors.requestedDates = "Choose at least one date.";
        } else if (requestedDates.some((date)=>date < today)) {
            nextErrors.requestedDates = "Dates must be today or later.";
        }
        if (!clientName.trim()) {
            nextErrors.clientName = "Name is required.";
        }
        if (!trimmedEmail) {
            nextErrors.clientEmail = "Email is required.";
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
            requestedDates,
            serviceId: selectedServiceId || "",
            clientName: clientName.trim(),
            clientEmail: clientEmail.trim(),
            clientPhone: clientPhone.trim() || null,
            timePreference,
            requestedStartTime: timePreference === "range" ? requestedStartTime : null,
            requestedEndTime: timePreference === "range" ? requestedEndTime : null,
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
                        lineNumber: 198,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        id: "waitlist-description",
                        className: "mt-3 text-sm leading-6 text-muted",
                        children: "We’ll email you if a matching opening becomes available. Everyone waiting for that opening may be notified; the first person to book gets it."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 204,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onClose,
                        className: "mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(183,121,61,0.22)]",
                        children: "Done"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 210,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                lineNumber: 197,
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
                                        lineNumber: 222,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        id: "waitlist-description",
                                        className: "mt-2 text-sm leading-6 text-muted",
                                        children: "Choose up to 3 days that work for you. We’ll email you if a matching opening becomes available."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 228,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 221,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface-warm",
                                "aria-label": "Close waitlist form",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CloseIcon, {}, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                    lineNumber: 241,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 235,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 220,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "mt-5 space-y-4",
                        onSubmit: handleSubmit,
                        children: [
                            selectedService ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl bg-surface-warm px-4 py-3 text-sm text-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: selectedService.name
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 246,
                                        columnNumber: 113
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-muted",
                                        children: [
                                            selectedService.durationMinutes,
                                            " min · $",
                                            selectedService.price
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 246,
                                        columnNumber: 152
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 246,
                                columnNumber: 34
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "Days that work",
                                htmlFor: "waitlist-requested-date",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-wrap gap-2",
                                        children: requestedDates.map((date)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "inline-flex h-10 items-center gap-2 rounded-xl border border-brand/30 bg-brand-soft px-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: new Intl.DateTimeFormat(undefined, {
                                                            weekday: "short",
                                                            month: "short",
                                                            day: "numeric"
                                                        }).format(new Date(`${date}T12:00:00`))
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 175
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        "aria-label": `Remove ${date}`,
                                                        onClick: ()=>setRequestedDates((dates)=>dates.filter((value)=>value !== date)),
                                                        children: "×"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 315
                                                    }, this)
                                                ]
                                            }, date, true, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 249,
                                                columnNumber: 49
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 248,
                                        columnNumber: 17
                                    }, this),
                                    requestedDates.length < 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "waitlist-requested-date",
                                                type: "date",
                                                min: today,
                                                value: dateToAdd,
                                                onChange: (event)=>setDateToAdd(event.target.value),
                                                className: "h-11 flex-1 rounded-xl border border-border px-3 text-sm"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 251,
                                                columnNumber: 79
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    if (dateToAdd && !requestedDates.includes(dateToAdd)) {
                                                        setRequestedDates((dates)=>[
                                                                ...dates,
                                                                dateToAdd
                                                            ]);
                                                        setDateToAdd("");
                                                    }
                                                },
                                                className: "rounded-xl border border-brand px-3 text-sm font-semibold text-brand",
                                                children: "+ Add another day"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 251,
                                                columnNumber: 282
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 251,
                                        columnNumber: 46
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-2 text-xs text-muted",
                                        children: "You can add up to 3 days."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this),
                                    errors.requestedDates ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                                        children: errors.requestedDates
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 253,
                                        columnNumber: 42
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 247,
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
                                        lineNumber: 256,
                                        columnNumber: 17
                                    }, this),
                                    errors.clientName ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                                        children: errors.clientName
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 269,
                                        columnNumber: 38
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 255,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                        label: "Email (required)",
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
                                                lineNumber: 274,
                                                columnNumber: 19
                                            }, this),
                                            errors.clientEmail ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorText, {
                                                children: errors.clientEmail
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 288,
                                                columnNumber: 41
                                            }, this) : null
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 273,
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
                                            lineNumber: 292,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 291,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 272,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                                label: "What times work?",
                                htmlFor: "waitlist-anytime",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "waitlist-anytime",
                                                type: "radio",
                                                checked: timePreference === "anytime",
                                                onChange: ()=>setTimePreference("anytime")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 308,
                                                columnNumber: 68
                                            }, this),
                                            " Any time that day"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "mt-3 flex items-center gap-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "radio",
                                                checked: timePreference === "range",
                                                onChange: ()=>setTimePreference("range")
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 309,
                                                columnNumber: 73
                                            }, this),
                                            " Choose a time range"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 309,
                                        columnNumber: 17
                                    }, this),
                                    timePreference === "range" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs text-muted",
                                                children: [
                                                    "Earliest time",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        "aria-label": "Earliest time",
                                                        type: "time",
                                                        value: requestedStartTime,
                                                        onChange: (event)=>setRequestedStartTime(event.target.value),
                                                        className: "mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 143
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 310,
                                                columnNumber: 92
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs text-muted",
                                                children: [
                                                    "Latest time",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        "aria-label": "Latest time",
                                                        type: "time",
                                                        value: requestedEndTime,
                                                        onChange: (event)=>setRequestedEndTime(event.target.value),
                                                        className: "mt-1 h-11 w-full rounded-xl border border-border px-3 text-sm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 412
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                                lineNumber: 310,
                                                columnNumber: 363
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                        lineNumber: 310,
                                        columnNumber: 47
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 307,
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
                                    lineNumber: 314,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 313,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-2xl bg-surface-warm px-4 py-3 text-xs leading-5 text-muted",
                                children: "If an opening becomes available, we’ll email everyone waiting for that time. Appointments are first come, first served and are not held."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 324,
                                columnNumber: 15
                            }, this),
                            submitError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600",
                                children: submitError
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 329,
                                columnNumber: 17
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: submitting,
                                className: "flex h-12 w-full items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(183,121,61,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark disabled:cursor-not-allowed disabled:transform-none disabled:opacity-60 disabled:shadow-none",
                                children: submitting ? "Joining waitlist..." : "Join waitlist"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                                lineNumber: 334,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
                        lineNumber: 245,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
            lineNumber: 188,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 183,
        columnNumber: 5
    }, this);
}
_s1(WaitlistDialog, "zyo962EhsKk3Y51PE8bUdPrSLGI=");
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
                lineNumber: 360,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 359,
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
        lineNumber: 372,
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
            lineNumber: 417,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 416,
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
            lineNumber: 432,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/WaitlistCallout.tsx",
        lineNumber: 431,
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
"[project]/apps/web/src/components/booking/PublicBookingProfile.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PublicBookingProfile",
    ()=>PublicBookingProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function formatInstagramHandle(value) {
    if (!value) return null;
    return `@${value.replace(/^@+/, "")}`;
}
function getInstagramUrl(value) {
    if (!value) return null;
    return `https://instagram.com/${value.replace(/^@+/, "")}`;
}
function PublicBookingProfile({ stylist }) {
    const instagramHandle = formatInstagramHandle(stylist.instagram);
    const instagramUrl = getInstagramUrl(stylist.instagram);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "border-b border-border/55 pb-7 lg:sticky lg:top-8 lg:self-start lg:border-b-0 lg:border-r lg:pr-8",
        children: [
            stylist.cover_photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "-mx-6 -mt-6 mb-5 h-28 rounded-t-[30px] bg-zinc-100 bg-cover bg-center sm:-mx-8 sm:-mt-8 lg:mx-0 lg:mt-0 lg:h-48 lg:rounded-3xl",
                style: {
                    backgroundImage: `url(${stylist.cover_photo_url})`
                }
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicBookingProfile.tsx",
                lineNumber: 24,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-display text-[34px] leading-none font-medium italic text-foreground",
                        children: stylist.display_name
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/PublicBookingProfile.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    stylist.business_name || instagramHandle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm",
                        children: [
                            stylist.business_name ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted",
                                children: stylist.business_name
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicBookingProfile.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this) : null,
                            instagramHandle && instagramUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                className: "font-medium text-foreground underline decoration-border underline-offset-4 transition hover:text-muted",
                                href: instagramUrl,
                                target: "_blank",
                                rel: "noreferrer",
                                children: instagramHandle
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/PublicBookingProfile.tsx",
                                lineNumber: 40,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/PublicBookingProfile.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/PublicBookingProfile.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            stylist.bio ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-5 text-sm leading-6 text-muted",
                children: stylist.bio
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/PublicBookingProfile.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/PublicBookingProfile.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_c = PublicBookingProfile;
var _c;
__turbopack_context__.k.register(_c, "PublicBookingProfile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/BookingFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookingFlow",
    ()=>BookingFlow,
    "getBookingAttributionErrorCode",
    ()=>getBookingAttributionErrorCode,
    "getUsableBookingAttributionToken",
    ()=>getUsableBookingAttributionToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingAttributionGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookingAttributionGate.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingInquiryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookingInquiryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookedStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookedStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingStepper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookingStepper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/booking-flow-utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ConfirmStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/ConfirmStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$DetailsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/DetailsStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$TimeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/TimeStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$useBookingDetails$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/useBookingDetails.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$WaitlistCallout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/WaitlistCallout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$PublicBookingProfile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/PublicBookingProfile.tsx [app-client] (ecmascript)");
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
;
;
;
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
function getUsableBookingAttributionToken(attribution, stylistSlug) {
    const expiresAt = attribution ? Date.parse(attribution.expiresAt) : Number.NaN;
    if (!attribution?.token.trim() || attribution.stylistSlug !== stylistSlug || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
        return undefined;
    }
    return attribution.token;
}
function getBookingAttributionErrorCode(error) {
    if (!(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"])) {
        return null;
    }
    switch(error.code){
        case "booking_attribution_context_stylist_mismatch":
        case "booking_attribution_context_unavailable":
            return error.code;
        default:
            return null;
    }
}
function normalizePrefillValues(values) {
    return Array.from(new Set((values ?? []).map((value)=>value.trim()).filter(Boolean)));
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
function removeBookingInquiryTokenFromUrl() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has("booking_inquiry_token")) {
        return;
    }
    url.searchParams.delete("booking_inquiry_token");
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
}
function toHandoffService(handoff) {
    return {
        id: handoff.service.id,
        name: handoff.service.name,
        durationMinutes: handoff.service.duration_minutes,
        price: handoff.service.price,
        isActive: true,
        isDefault: false,
        sortOrder: 0
    };
}
function toHandoffIntake(handoff) {
    return {
        matchStatus: "matched",
        clientFound: true,
        isExistingClient: true,
        bookingContextToken: handoff.booking_context_token,
        bookingEnabled: true,
        client: null,
        submittedContact: {
            fullName: "",
            firstName: "",
            lastName: "",
            phoneNormalized: "",
            email: null
        },
        recommendedService: null,
        bookingBehavior: {
            requiresApproval: false,
            restrictedToNewClientRules: false,
            canUseReturningClientRules: true,
            message: ""
        }
    };
}
function BookingFlow({ slug, stylist, initialReferralCode, initialServiceIds, initialSuggestedDates, initialBookingInquiryToken }) {
    _s();
    const bookingAttribution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingAttributionGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookingAttribution"])();
    const clearBookingAttribution = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingAttributionGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearBookingAttribution"])();
    const [referralCode, setReferralCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "BookingFlow.useState": ()=>normalizeReferralCode(initialReferralCode) ?? readStoredReferralCode(slug)
    }["BookingFlow.useState"]);
    const bookingInquiryToken = initialBookingInquiryToken ?? null;
    const [handoffState, setHandoffState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(bookingInquiryToken ? {
        status: "loading"
    } : {
        status: "idle"
    });
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [smsOptIn, setSmsOptIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
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
    const activeHandoff = handoffState.status === "ready" ? handoffState.data : null;
    const isDirectHandoff = activeHandoff?.next_step === "select_datetime";
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
    !isDirectHandoff && canShowWaitlist && selectedServiceIds.length > 0 && Boolean(selectedDate) && availabilityLoaded && !availabilityLoading && !slotsError && slots.length === 0;
    const upcomingAvailabilityDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BookingFlow.useMemo[upcomingAvailabilityDays]": ()=>{
            const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTodayDateValue"])();
            const orderedDates = Array.from(new Set([
                ...dateOptions,
                selectedDate
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
    const initialServiceIdsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(normalizePrefillValues(initialServiceIds));
    const initialSuggestedDatesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(normalizePrefillValues(initialSuggestedDates));
    const initialServicePrefillAttemptedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const handoffResolutionPromiseRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
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
    const discardDirectHandoff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[discardDirectHandoff]": (message, { clearPrefills = true } = {})=>{
            setHandoffState({
                status: "fallback",
                ...message ? {
                    message
                } : {}
            });
            setIntakeState({
                status: "idle"
            });
            setServices([]);
            setServicesLoadedToken(null);
            setSelectedServices([]);
            if (clearPrefills) {
                initialServiceIdsRef.current = [];
                initialSuggestedDatesRef.current = [];
                initialServicePrefillAttemptedRef.current = true;
            }
            clearAvailabilityState();
            setCurrentStep(1);
            setServiceError(message ?? null);
            setConfirmError(null);
        }
    }["BookingFlow.useCallback[discardDirectHandoff]"], [
        clearAvailabilityState
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingFlow.useEffect": ()=>{
            if (!bookingInquiryToken) {
                return;
            }
            removeBookingInquiryTokenFromUrl();
            const resolution = handoffResolutionPromiseRef.current ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveBookingInquiryHandoff"])(bookingInquiryToken);
            handoffResolutionPromiseRef.current = resolution;
            let active = true;
            void resolution.then({
                "BookingFlow.useEffect": (handoff)=>{
                    if (!active) return;
                    if (handoff.next_step !== "select_datetime") {
                        discardDirectHandoff(undefined, {
                            clearPrefills: false
                        });
                        return;
                    }
                    const service = toHandoffService(handoff);
                    clearAvailabilityState();
                    initialServiceIdsRef.current = [
                        service.id
                    ];
                    initialSuggestedDatesRef.current = handoff.suggested_dates;
                    initialServicePrefillAttemptedRef.current = true;
                    setHandoffState({
                        status: "ready",
                        data: handoff
                    });
                    setIntakeState({
                        status: "ready",
                        data: toHandoffIntake(handoff)
                    });
                    setServices([
                        service
                    ]);
                    setServicesLoadedToken(handoff.booking_context_token);
                    setSelectedServices([
                        service
                    ]);
                    setServiceError(null);
                    setCurrentStep(3);
                }
            }["BookingFlow.useEffect"]).catch({
                "BookingFlow.useEffect": ()=>{
                    if (active) {
                        discardDirectHandoff("We couldn't use that recommendation link. Please continue with your contact details.", {
                            clearPrefills: false
                        });
                    }
                }
            }["BookingFlow.useEffect"]);
            return ({
                "BookingFlow.useEffect": ()=>{
                    active = false;
                }
            })["BookingFlow.useEffect"];
        }
    }["BookingFlow.useEffect"], [
        bookingInquiryToken,
        clearAvailabilityState,
        discardDirectHandoff
    ]);
    const { contactValues, contactValuesRef, detailsErrors, email, fullName, handleDetailsChange, parsedName, phone, resetDetails, validateDetails } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$useBookingDetails$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookingDetails"])({
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
                    email: currentValues.email.trim()
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
                    const initialServiceId = !initialServicePrefillAttemptedRef.current && initialServiceIdsRef.current.length === 1 ? initialServiceIdsRef.current[0] : null;
                    const prefilledService = initialServiceId ? nextServices.find({
                        "BookingFlow.useCallback[loadServicesForIntake].applyServices": (service)=>service.id === initialServiceId
                    }["BookingFlow.useCallback[loadServicesForIntake].applyServices"]) ?? null : null;
                    initialServicePrefillAttemptedRef.current = true;
                    const recommendedService = nextSelectedServices.length === 0 && !prefilledService && nextIntake.recommendedService?.serviceId ? nextServices.find({
                        "BookingFlow.useCallback[loadServicesForIntake].applyServices": (service)=>service.id === nextIntake.recommendedService?.serviceId
                    }["BookingFlow.useCallback[loadServicesForIntake].applyServices"]) ?? null : null;
                    const resolvedSelectedServices = prefilledService ? [
                        prefilledService
                    ] : recommendedService ? [
                        recommendedService
                    ] : nextSelectedServices;
                    const selectionChanged = currentSelectedServices.length !== resolvedSelectedServices.length || currentSelectedServices.some({
                        "BookingFlow.useCallback[loadServicesForIntake].applyServices": (service, index)=>resolvedSelectedServices[index]?.id !== service.id
                    }["BookingFlow.useCallback[loadServicesForIntake].applyServices"]);
                    setSelectedServices(resolvedSelectedServices);
                    if (initialServiceId && !prefilledService) {
                        setServiceError("The suggested service is no longer available. Please choose another service.");
                    }
                    if (selectionChanged) {
                        clearAvailabilityState();
                        if (currentSelectedServices.length > 0) {
                            setCurrentStep(2);
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
                    if (isDirectHandoff) {
                        discardDirectHandoff("Your recommendation link expired. Please continue with your contact details.");
                        return null;
                    }
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
        discardDirectHandoff,
        handleBookingContextRecoveryFailure,
        isDirectHandoff,
        refreshBookingContext,
        slug
    ]);
    const handleSelectedServiceUnavailable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "BookingFlow.useCallback[handleSelectedServiceUnavailable]": async (intakeOverride)=>{
            const activeIntake = intakeOverride ?? (intakeState.status === "ready" ? intakeState.data : null);
            setSelectedServices([]);
            clearAvailabilityState();
            setCurrentStep(2);
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
                            if (isDirectHandoff) {
                                discardDirectHandoff("That recommended service is no longer available. Please choose another service.");
                                return null;
                            }
                            await handleSelectedServiceUnavailable(activeIntake);
                            return null;
                        }
                        if (allowTokenRefresh && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingContextExpiredError"])(error)) {
                            if (isDirectHandoff) {
                                discardDirectHandoff("Your recommendation link expired. Please continue with your contact details.");
                                return null;
                            }
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
        discardDirectHandoff,
        handleBookingContextRecoveryFailure,
        handleSelectedServiceUnavailable,
        intakeState,
        isDirectHandoff,
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
                    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTodayDateValue"])();
                    const suggestedDates = initialSuggestedDatesRef.current.filter({
                        "BookingFlow.useEffect.loadAvailability.suggestedDates": (date)=>date >= today
                    }["BookingFlow.useEffect.loadAvailability.suggestedDates"]);
                    const candidateDates = Array.from(new Set([
                        ...suggestedDates,
                        ...nextDates
                    ]));
                    let nextTimezone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extractAvailabilityTimezone"])(availability) ?? stylist.timezone ?? null;
                    let nextSelectedDate = candidateDates[0] ?? "";
                    let nextSlots = [];
                    for (const date of candidateDates){
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
                    setDateOptions(candidateDates);
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
            setCurrentStep(2);
            return;
        }
        if (!sortedServices.length) {
            setServiceError("No services are currently available for online booking.");
            return;
        }
        setServiceError(null);
        setCurrentStep(2);
    }
    function handleContinueFromServices() {
        if (!selectedServices.length) {
            setServiceError("Please select at least one service to continue.");
            return;
        }
        setServiceError(null);
        setCurrentStep(3);
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
        setCurrentStep(4);
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
                setCurrentStep(3);
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
            const bookingRequestBase = {
                stylist_slug: slug,
                service_id: primarySelectedService.id,
                requested_datetime: verifiedSlot.start,
                referral_code: referralCodeRef.current || undefined,
                booking_attribution_token: getUsableBookingAttributionToken(bookingAttribution, slug),
                sms_opt_in: smsOptIn,
                notes: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBookingNotes"])(selectedServices, notes)
            };
            const bookingRequest = isDirectHandoff ? {
                ...bookingRequestBase,
                booking_context_token: bookingContextToken
            } : {
                ...bookingRequestBase,
                guest_first_name: parsedName.firstName,
                guest_last_name: parsedName.lastName,
                guest_email: email.trim(),
                guest_phone: phone.trim(),
                booking_context_token: bookingContextToken,
                booking_inquiry_token: bookingInquiryToken ?? undefined
            };
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPublicBooking"])(bookingRequest, {
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
                // Keep browser diagnostics to structured, non-customer identifiers.
                // Backend messages and reasons can include untrusted capability values.
                status: error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.status : undefined,
                code: error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? error.code : undefined,
                requested_datetime: selectedSlot.start,
                service_id: primarySelectedService.id,
                stylist_slug: slug
            };
            console.error(`Booking submit failed ${JSON.stringify(debugPayload)}`);
            const attributionErrorCode = getBookingAttributionErrorCode(error);
            if (attributionErrorCode) {
                // These API codes are returned before appointment creation. Clear the
                // rejected opaque context and leave the customer on confirmation so a
                // deliberate retry submits the unchanged booking without attribution.
                clearBookingAttribution();
                setConfirmError("We couldn't apply that booking link. Please try booking again.");
            } else if (isDirectHandoff && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingIdentityRequiredError"])(error) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isBookingContextExpiredError"])(error) || error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && error.code === "booking_inquiry_handoff_unavailable")) {
                discardDirectHandoff("Please confirm your contact details before finishing this booking.");
            } else if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSlotConflictError"])(error, message)) {
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
                setCurrentStep(3);
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
        // A completed booking must return to a genuinely fresh flow rather than
        // leaving the completed customer's choices ready to submit again.
        initialServiceIdsRef.current = [];
        initialSuggestedDatesRef.current = [];
        initialServicePrefillAttemptedRef.current = true;
        setHandoffState({
            status: "idle"
        });
        invalidateBookingContext();
        resetDetails();
        setNotes("");
        setSmsOptIn(false);
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
            className: "mx-auto max-w-[620px] bg-transparent p-6 sm:rounded-[30px] sm:border sm:border-white/80 sm:bg-card sm:p-8 sm:shadow-[0_24px_80px_rgba(17,24,39,0.08)]",
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
                lineNumber: 1683,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
            lineNumber: 1682,
            columnNumber: 7
        }, this);
    }
    if (handoffState.status === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[620px] rounded-[30px] border border-white/80 bg-card p-8 text-center shadow-[0_24px_80px_rgba(17,24,39,0.08)]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "text-2xl font-semibold tracking-tight text-foreground",
                    children: "Preparing your recommendation"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                    lineNumber: 1699,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-sm leading-6 text-muted",
                    children: "Loading the service and available appointment times…"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                    lineNumber: 1702,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
            lineNumber: 1698,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "bg-transparent p-6 sm:rounded-[30px] sm:border sm:border-white/80 sm:bg-card sm:p-8 sm:shadow-[0_24px_80px_rgba(17,24,39,0.08)]",
            currentStep === 3 ? "mx-auto max-w-[430px]" : "lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8"
        ].join(" "),
        children: [
            currentStep !== 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$PublicBookingProfile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicBookingProfile"], {
                stylist: stylist
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                lineNumber: 1716,
                columnNumber: 28
            }, this) : null,
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
                            lineNumber: 1721,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-sm leading-6 text-muted",
                            children: "Online booking is currently unavailable."
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1724,
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
                            lineNumber: 1728,
                            columnNumber: 13
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                    lineNumber: 1720,
                    columnNumber: 9
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        currentStep !== 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 lg:mt-0",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingStepper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookingStepper"], {
                                currentStep: currentStep
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                lineNumber: 1737,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1736,
                            columnNumber: 13
                        }, this) : null,
                        currentStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$DetailsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DetailsStep"], {
                            intro: stylist.intro,
                            introDescription: stylist.intro_description,
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
                            showServicePicker: false,
                            recommendedServiceId: intakeData?.recommendedService?.serviceId ?? null,
                            onChange: handleDetailsChange,
                            onToggleService: handleToggleService,
                            onContinue: handleContinueFromDetails,
                            inquiryCallout: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingInquiryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookingInquiryCard"], {
                                slug: slug,
                                config: stylist.booking_request_form,
                                enabled: stylist.booking_request_form_enabled === true,
                                contact: {
                                    firstName: intakeData?.submittedContact.firstName ?? parsedName.firstName,
                                    lastName: intakeData?.submittedContact.lastName ?? parsedName.lastName,
                                    phone: intakeData?.submittedContact.phoneNormalized ?? phone,
                                    email: intakeData?.submittedContact.email ?? email
                                },
                                validateContact: validateDetails,
                                variant: "details"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                lineNumber: 1759,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1742,
                            columnNumber: 13
                        }, this) : null,
                        currentStep === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$DetailsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DetailsStep"], {
                            mode: "services",
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
                            showServicePicker: true,
                            recommendedServiceId: intakeData?.recommendedService?.serviceId ?? null,
                            onChange: handleDetailsChange,
                            onToggleService: handleToggleService,
                            onBack: ()=>setCurrentStep(1),
                            onContinue: handleContinueFromServices,
                            inquiryCallout: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingInquiryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookingInquiryCard"], {
                                slug: slug,
                                config: stylist.booking_request_form,
                                enabled: stylist.booking_request_form_enabled === true,
                                contact: {
                                    firstName: intakeData?.submittedContact.firstName ?? parsedName.firstName,
                                    lastName: intakeData?.submittedContact.lastName ?? parsedName.lastName,
                                    phone: intakeData?.submittedContact.phoneNormalized ?? phone,
                                    email: intakeData?.submittedContact.email ?? email
                                },
                                validateContact: validateDetails,
                                variant: "services"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                lineNumber: 1793,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1776,
                            columnNumber: 13
                        }, this) : null,
                        currentStep === 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$TimeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimeStep"], {
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
                                selectedService: primarySelectedService,
                                defaultClientName: fullName,
                                defaultClientEmail: email,
                                defaultClientPhone: phone
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                                lineNumber: 1819,
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
                            onBack: ()=>{
                                if (isDirectHandoff) {
                                    discardDirectHandoff();
                                } else {
                                    setCurrentStep(2);
                                }
                            },
                            onContinue: handleContinueFromTime
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1810,
                            columnNumber: 13
                        }, this) : null,
                        currentStep === 4 && selectedServices.length && selectedSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ConfirmStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmStep"], {
                            stylist: stylist,
                            services: selectedServices,
                            slot: selectedSlot,
                            fullName: activeHandoff?.customer.display_name ?? fullName.trim(),
                            email: activeHandoff?.customer.email_masked ?? email.trim(),
                            phone: activeHandoff?.customer.phone_masked ?? phone.trim(),
                            notes: notes,
                            smsOptIn: smsOptIn,
                            referencePhotoFile: referencePhotoFile,
                            referencePhotoPreviewUrl: referencePhotoPreviewUrl,
                            submitting: submitting,
                            error: confirmError,
                            timezone: activeTimezone,
                            onNotesChange: setNotes,
                            onSmsOptInChange: setSmsOptIn,
                            onReferencePhotoSelect: handleReferencePhotoSelect,
                            onReferencePhotoRemove: clearReferencePhotoSelection,
                            onEdit: (step)=>{
                                if (isDirectHandoff && (step === 1 || step === 2)) {
                                    discardDirectHandoff();
                                } else {
                                    setCurrentStep(step);
                                }
                            },
                            onSubmit: handleSubmitBooking
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1852,
                            columnNumber: 13
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 text-xs font-medium text-muted",
                            children: canShowTimeStep ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatTimezoneLabel"])(activeTimezone) : null
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                            lineNumber: 1881,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
                lineNumber: 1718,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/BookingFlow.tsx",
        lineNumber: 1710,
        columnNumber: 5
    }, this);
}
_s(BookingFlow, "NKYrdQekqawLpRnhAA8qHc0AeRI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingAttributionGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBookingAttribution"],
        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingAttributionGate$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearBookingAttribution"],
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
"[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BookingPreviewFlow",
    ()=>BookingPreviewFlow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/booking-format.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingStepper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookingStepper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ConfirmStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/ConfirmStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$DetailsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/DetailsStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$PublicBookingProfile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/PublicBookingProfile.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$TimeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/TimeStep.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingInquiryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/BookingInquiryCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/booking/booking-flow-utils.ts [app-client] (ecmascript)");
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
const buildPreviewAvailability = ()=>{
    const firstDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToDate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTodayDateValue"])(), 1);
    const secondDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$booking$2d$format$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addDaysToDate"])(firstDate, 2);
    return [
        {
            date: firstDate,
            slots: [
                {
                    start: `${firstDate}T10:00:00`,
                    end: `${firstDate}T11:00:00`
                },
                {
                    start: `${firstDate}T13:00:00`,
                    end: `${firstDate}T14:00:00`
                },
                {
                    start: `${firstDate}T16:00:00`,
                    end: `${firstDate}T17:00:00`
                }
            ]
        },
        {
            date: secondDate,
            slots: [
                {
                    start: `${secondDate}T09:30:00`,
                    end: `${secondDate}T10:30:00`
                },
                {
                    start: `${secondDate}T12:30:00`,
                    end: `${secondDate}T13:30:00`
                }
            ]
        }
    ];
};
function BookingPreviewFlow({ preview, stylist, previewToken }) {
    _s();
    const [serviceState, setServiceState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        status: "loading"
    });
    const [currentStep, setCurrentStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [details, setDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        fullName: "",
        phone: "",
        email: ""
    });
    const [detailsErrors, setDetailsErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [selectedServices, setSelectedServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const previewAvailability = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BookingPreviewFlow.useMemo[previewAvailability]": ()=>buildPreviewAvailability()
    }["BookingPreviewFlow.useMemo[previewAvailability]"], []);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(previewAvailability[0]?.date);
    const [selectedSlot, setSelectedSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [smsOptIn, setSmsOptIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const capabilities = preview.preview_capabilities;
    const canReadPublicData = preview.preview_mode === true && capabilities.allow_public_reads === true;
    const intro = preview.profile.intro ?? "Let's get to know you";
    const introDescription = preview.profile.intro_description ?? "Start with your contact details so we can check whether you're a returning client before you pick a service.";
    const services = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "BookingPreviewFlow.useMemo[services]": ()=>serviceState.status === "ready" ? [
                ...serviceState.services
            ].sort({
                "BookingPreviewFlow.useMemo[services]": (left, right)=>left.sortOrder - right.sortOrder
            }["BookingPreviewFlow.useMemo[services]"]) : []
    }["BookingPreviewFlow.useMemo[services]"], [
        serviceState
    ]);
    const servicesLoading = canReadPublicData && serviceState.status === "loading";
    const servicesUnavailable = !canReadPublicData || serviceState.status === "error";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingPreviewFlow.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveBookingPreviewToken"])(previewToken);
            return ({
                "BookingPreviewFlow.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setActiveBookingPreviewToken"])(null);
                }
            })["BookingPreviewFlow.useEffect"];
        }
    }["BookingPreviewFlow.useEffect"], [
        previewToken
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BookingPreviewFlow.useEffect": ()=>{
            if (!canReadPublicData) {
                return;
            }
            let cancelled = false;
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPublicServices"])(preview.slug).then({
                "BookingPreviewFlow.useEffect": (nextServices)=>{
                    if (!cancelled) {
                        setServiceState({
                            status: "ready",
                            services: nextServices
                        });
                    }
                }
            }["BookingPreviewFlow.useEffect"]).catch({
                "BookingPreviewFlow.useEffect": ()=>{
                    if (!cancelled) {
                        setServiceState({
                            status: "error"
                        });
                    }
                }
            }["BookingPreviewFlow.useEffect"]);
            return ({
                "BookingPreviewFlow.useEffect": ()=>{
                    cancelled = true;
                }
            })["BookingPreviewFlow.useEffect"];
        }
    }["BookingPreviewFlow.useEffect"], [
        canReadPublicData,
        preview.slug
    ]);
    const updateDetails = (field, value)=>{
        setDetails((current)=>({
                ...current,
                [field]: value
            }));
        setDetailsErrors((current)=>({
                ...current,
                [field]: undefined
            }));
    };
    const toggleService = (service)=>{
        setSelectedServices((current)=>current.some((selected)=>selected.id === service.id) ? current.filter((selected)=>selected.id !== service.id) : [
                service
            ]);
        setSelectedSlot(null);
    };
    const continueFromDetails = ()=>{
        const errors = {};
        if (!details.fullName.trim()) errors.fullName = "Enter a name to continue the preview.";
        if (!details.phone.trim()) errors.phone = "Enter a phone number to continue the preview.";
        if (!details.email.trim()) errors.email = "Enter an email to continue the preview.";
        else if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidEmail"])(details.email.trim())) errors.email = "Enter a valid email address.";
        if (Object.keys(errors).length > 0) {
            setDetailsErrors(errors);
            return;
        }
        setCurrentStep(2);
    };
    const continueFromServices = ()=>{
        if (selectedServices.length > 0) {
            setCurrentStep(3);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-label": "Preview status",
                className: "flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-brand/20 bg-brand-soft/60 px-3 py-2 text-xs leading-5 text-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold uppercase tracking-[0.08em] text-brand",
                        children: "Preview"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-semibold text-foreground",
                        children: "Booking is disabled"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "aria-hidden": "true",
                        children: "·"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Booking cannot be submitted; preview changes stay in this browser."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: [
                    "bg-transparent p-6 sm:rounded-[30px] sm:border sm:border-white/80 sm:bg-card sm:p-8 sm:shadow-[0_24px_80px_rgba(17,24,39,0.08)]",
                    currentStep === 3 ? "mx-auto max-w-[430px]" : "lg:grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8"
                ].join(" "),
                children: [
                    currentStep !== 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$PublicBookingProfile$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PublicBookingProfile"], {
                        stylist: stylist
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                        lineNumber: 200,
                        columnNumber: 30
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 lg:mt-0 lg:min-w-0",
                        children: [
                            currentStep !== 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingStepper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookingStepper"], {
                                currentStep: currentStep
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                                lineNumber: 203,
                                columnNumber: 32
                            }, this) : null,
                            currentStep === 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$DetailsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DetailsStep"], {
                                    intro: intro,
                                    introDescription: introDescription,
                                    values: details,
                                    errors: detailsErrors,
                                    services: services,
                                    intake: null,
                                    intakeLoading: false,
                                    servicesLoading: servicesLoading,
                                    selectedServices: selectedServices,
                                    serviceError: servicesUnavailable ? "Services could not be loaded for this preview." : null,
                                    canBeginServiceSelection: !servicesLoading && !servicesUnavailable,
                                    showServicePicker: false,
                                    onChange: updateDetails,
                                    onToggleService: toggleService,
                                    onContinue: continueFromDetails,
                                    inquiryCallout: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$BookingInquiryCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BookingInquiryCard"], {
                                        slug: preview.slug,
                                        config: preview.profile.booking_request_form,
                                        enabled: preview.profile.booking_request_form_enabled === true,
                                        contact: {
                                            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitFullName"])(details.fullName),
                                            phone: details.phone,
                                            email: details.email
                                        },
                                        previewMode: true,
                                        validateContact: ()=>{
                                            const parsedName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["splitFullName"])(details.fullName);
                                            const valid = Boolean(parsedName.firstName && parsedName.lastName && details.phone.trim() && (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidEmail"])(details.email.trim()));
                                            if (!valid) {
                                                setDetailsErrors({
                                                    fullName: !parsedName.lastName ? "Enter a full name to preview." : undefined,
                                                    phone: !details.phone.trim() ? "Enter a phone number to preview." : undefined,
                                                    email: !(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$booking$2d$flow$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidEmail"])(details.email.trim()) ? "Enter a valid email to preview." : undefined
                                                });
                                            }
                                            return valid;
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                                        lineNumber: 227,
                                        columnNumber: 33
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                                    lineNumber: 207,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false) : null,
                            currentStep === 2 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$DetailsStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DetailsStep"], {
                                        mode: "services",
                                        values: details,
                                        errors: detailsErrors,
                                        services: services,
                                        intake: null,
                                        intakeLoading: false,
                                        servicesLoading: servicesLoading,
                                        selectedServices: selectedServices,
                                        serviceError: servicesUnavailable ? "Services could not be loaded for this preview." : null,
                                        canBeginServiceSelection: !servicesLoading && !servicesUnavailable,
                                        showServicePicker: true,
                                        onChange: updateDetails,
                                        onToggleService: toggleService,
                                        onBack: ()=>setCurrentStep(1),
                                        onContinue: continueFromServices
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                                        lineNumber: 261,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-xs text-muted",
                                        children: "Services are live public data. Contact details stay only in this browser preview."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                                        lineNumber: 282,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : null,
                            currentStep === 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mb-4 text-xs text-muted",
                                        children: "Sample times illustrate the booking flow and are not live availability."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$TimeStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimeStep"], {
                                        selectedDate: selectedDate,
                                        selectedSlot: selectedSlot,
                                        upcomingDays: previewAvailability,
                                        loading: false,
                                        timezone: stylist.timezone,
                                        onDateSelect: (date)=>{
                                            setSelectedDate(date);
                                            setSelectedSlot(null);
                                        },
                                        onSlotSelect: setSelectedSlot,
                                        onBack: ()=>setCurrentStep(2),
                                        onContinue: ()=>{
                                            if (selectedSlot) setCurrentStep(4);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : null,
                            currentStep === 4 && selectedSlot ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$booking$2f$ConfirmStep$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfirmStep"], {
                                stylist: stylist,
                                services: selectedServices,
                                slot: selectedSlot,
                                fullName: details.fullName.trim(),
                                email: details.email.trim(),
                                phone: details.phone.trim(),
                                notes: notes,
                                smsOptIn: smsOptIn,
                                submitting: false,
                                previewMode: true,
                                timezone: stylist.timezone,
                                onNotesChange: setNotes,
                                onSmsOptInChange: setSmsOptIn,
                                onReferencePhotoSelect: ()=>undefined,
                                onReferencePhotoRemove: ()=>undefined,
                                onEdit: setCurrentStep,
                                onSubmit: ()=>undefined
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                                lineNumber: 313,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/booking/BookingPreviewFlow.tsx",
        lineNumber: 179,
        columnNumber: 5
    }, this);
}
_s(BookingPreviewFlow, "uKj11N2u9EpD8t4jWix3vYWQ4IM=");
_c = BookingPreviewFlow;
var _c;
__turbopack_context__.k.register(_c, "BookingPreviewFlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/PreviewRetryButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreviewRetryButton",
    ()=>PreviewRetryButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function PreviewRetryButton() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>window.location.reload(),
        className: "mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30",
        children: "Retry preview"
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/booking/PreviewRetryButton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
_c = PreviewRetryButton;
var _c;
__turbopack_context__.k.register(_c, "PreviewRetryButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/booking/PreviewUrlCleanup.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreviewUrlCleanup",
    ()=>PreviewUrlCleanup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function PreviewUrlCleanup() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PreviewUrlCleanup.useEffect": ()=>{
            const url = new URL(window.location.href);
            url.searchParams.delete("preview");
            const nextUrl = `${url.pathname}${url.search}${url.hash}`;
            window.history.replaceState(window.history.state, "", nextUrl);
        }
    }["PreviewUrlCleanup.useEffect"], []);
    return null;
}
_s(PreviewUrlCleanup, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PreviewUrlCleanup;
var _c;
__turbopack_context__.k.register(_c, "PreviewUrlCleanup");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_0~bxrzt._.js.map