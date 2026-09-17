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
    return getAbsoluteOrigin("NEXT_PUBLIC_WEB_APP_URL", ("TURBOPACK compile-time value", "http://localhost:3001"), getDefaultOrigin(LOCAL_WEB_APP_ORIGIN, PRODUCTION_WEB_APP_ORIGIN));
}
function getMarketingOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_MARKETING_URL", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_MARKETING_URL, getDefaultOrigin(LOCAL_MARKETING_ORIGIN, PRODUCTION_MARKETING_ORIGIN));
}
function getBrowserApiOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_API_BASE_URL", ("TURBOPACK compile-time value", "http://localhost:4010"), LOCAL_BACKEND_API_ORIGIN);
}
function getSupabaseBrowserConfig() {
    const url = ("TURBOPACK compile-time value", "http://localhost:4010")?.trim();
    const anonKey = ("TURBOPACK compile-time value", "e2e-anon-key")?.trim();
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/config/public.ts [app-client] (ecmascript)");
;
function getServerApiOrigin() {
    const candidate = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.API_BASE_URL?.trim() || ("TURBOPACK compile-time value", "http://localhost:4010")?.trim() || "http://localhost:3000";
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/account/booking-preview.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "buildBookingPreviewDraftOverrides",
    ()=>buildBookingPreviewDraftOverrides,
    "getBookingPreviewCreationError",
    ()=>getBookingPreviewCreationError
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
;
function normalizePreviewText(value) {
    return value.trim() ? value : null;
}
function getBookingPreviewCreationError(error) {
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
        switch(error.code){
            case "invalid_preview_draft":
                return {
                    message: "Some preview fields are invalid. Review the display name, Instagram handle, and bio, then try again."
                };
            case "preview_not_authorized":
                return {
                    message: "Your saved booking link needs to be refreshed before you can create a preview.",
                    canRefreshSettings: true
                };
            case "booking_slug_unavailable":
                return {
                    message: "Save or repair your booking link before creating a preview."
                };
            case "preview_rate_limited":
                return {
                    message: "Preview creation is temporarily limited. Wait a few seconds, then try again.",
                    cooldownSeconds: error.retryAfterSeconds ?? 5
                };
            case "preview_session_failed":
                return {
                    message: "We couldn't create the preview. Please try again."
                };
        }
    }
    return {
        message: "We couldn't create the preview. Please try again."
    };
}
function buildBookingPreviewDraftOverrides(form, persisted) {
    const overrides = {};
    const displayName = normalizePreviewText(form.display_name);
    const instagram = normalizePreviewText(form.instagram);
    const bio = normalizePreviewText(form.bio);
    if (displayName !== persisted.display_name) {
        overrides.display_name = displayName;
    }
    if (instagram !== persisted.instagram) {
        overrides.instagram = instagram;
    }
    if (bio !== persisted.bio) {
        overrides.bio = bio;
    }
    if (form.booking_request_form_enabled !== persisted.booking_request_form_enabled) {
        overrides.booking_request_form_enabled = form.booking_request_form_enabled;
    }
    return overrides;
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
"[project]/apps/web/src/lib/auth/password-recovery.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearPasswordRecoveryInProgress",
    ()=>clearPasswordRecoveryInProgress,
    "consumePasswordRecoveryCallback",
    ()=>consumePasswordRecoveryCallback,
    "isPasswordRecoveryCallback",
    ()=>isPasswordRecoveryCallback,
    "isPasswordRecoveryInProgress",
    ()=>isPasswordRecoveryInProgress,
    "setPasswordRecoveryInProgress",
    ()=>setPasswordRecoveryInProgress
]);
const PASSWORD_RECOVERY_STORAGE_KEY = "rootfoil.password-recovery";
function getRecoveryTokens(url) {
    const params = new URLSearchParams(url.hash.slice(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    return accessToken && refreshToken ? {
        accessToken,
        refreshToken
    } : null;
}
function isPasswordRecoveryCallback(url) {
    const parsed = new URL(url);
    return Boolean(parsed.searchParams.get("code") || getRecoveryTokens(parsed));
}
async function consumePasswordRecoveryCallback(client, url) {
    const parsed = new URL(url);
    const code = parsed.searchParams.get("code");
    let result;
    if (code) {
        result = await client.auth.exchangeCodeForSession(code);
    } else {
        const tokens = getRecoveryTokens(parsed);
        if (!tokens) {
            throw new Error("Invalid or expired password recovery link.");
        }
        result = await client.auth.setSession({
            access_token: tokens.accessToken,
            refresh_token: tokens.refreshToken
        });
    }
    if (result.error || !result.data.session) {
        throw result.error ?? new Error("Invalid or expired password recovery link.");
    }
    return result.data.session;
}
function setPasswordRecoveryInProgress() {
    if ("TURBOPACK compile-time truthy", 1) {
        window.sessionStorage.setItem(PASSWORD_RECOVERY_STORAGE_KEY, "true");
    }
}
function isPasswordRecoveryInProgress() {
    return ("TURBOPACK compile-time value", "object") !== "undefined" && window.sessionStorage.getItem(PASSWORD_RECOVERY_STORAGE_KEY) === "true";
}
function clearPasswordRecoveryInProgress() {
    if ("TURBOPACK compile-time truthy", 1) {
        window.sessionStorage.removeItem(PASSWORD_RECOVERY_STORAGE_KEY);
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/account/account-types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "accountNavItems",
    ()=>accountNavItems,
    "featureLabels",
    ()=>featureLabels,
    "planNotes",
    ()=>planNotes
]);
const accountNavItems = [
    {
        id: "dashboard",
        label: "Dashboard"
    },
    {
        id: "profile",
        label: "Profile"
    },
    {
        id: "clients",
        label: "Clients"
    },
    {
        id: "appointments",
        label: "Appointments"
    }
];
const planNotes = [
    {
        tier: "basic",
        name: "Basic",
        description: "Simple CRM, booking page access, and email reminders."
    },
    {
        tier: "pro",
        name: "Pro",
        description: "Adds SMS reminders, custom links, and calendar sync."
    },
    {
        tier: "premium",
        name: "Premium",
        description: "Advanced automation, exports, and weekly business recaps."
    }
];
const featureLabels = {
    bookingPage: "Booking page",
    crm: "Client CRM",
    emailReminders: "Email reminders",
    smsReminders: "SMS reminders",
    customCoverPhoto: "Custom cover photo",
    customSlug: "Custom booking link",
    googleCalendarSync: "Google Calendar sync",
    weeklyBusinessRecap: "Weekly business recap",
    clientExport: "Client export"
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/account/AccountPanels.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountSideNav",
    ()=>AccountSideNav,
    "AuthPanel",
    ()=>AuthPanel,
    "BlankTabPanel",
    ()=>BlankTabPanel,
    "CancelDialog",
    ()=>CancelDialog,
    "ClientsTabPanel",
    ()=>ClientsTabPanel,
    "DashboardTabPanel",
    ()=>DashboardTabPanel,
    "ErrorPanel",
    ()=>ErrorPanel,
    "LoadingPanel",
    ()=>LoadingPanel,
    "ProfileTabPanel",
    ()=>ProfileTabPanel,
    "ToastMessage",
    ()=>ToastMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$account$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/account/account-types.ts [app-client] (ecmascript)");
;
;
;
;
function AccountSideNav({ activeTab, onTabChange }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": "Account management",
        className: "bg-[#111111] p-4 text-white lg:flex lg:min-h-full lg:flex-col lg:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-5 flex items-center gap-3 lg:mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: "/assets/brand/dripdesk-chair-mark.png",
                        alt: "",
                        width: 416,
                        height: 473,
                        "aria-hidden": "true",
                        className: "h-8 w-auto object-contain"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-display text-2xl font-semibold text-white",
                        children: "DripDesk"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$account$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["accountNavItems"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>onTabChange(item.id),
                            "aria-current": activeTab === item.id ? "page" : undefined,
                            className: [
                                "flex h-11 w-full min-w-max items-center gap-3 rounded-[8px] px-4 text-left text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/35",
                                activeTab === item.id ? "bg-white/10 text-white" : "text-white/68 hover:bg-white/[0.06] hover:text-white"
                            ].join(" "),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountNavIcon, {
                                    id: item.id
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 62,
                                    columnNumber: 15
                                }, this),
                                item.label
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 51,
                            columnNumber: 13
                        }, this)
                    }, item.label, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = AccountSideNav;
function AccountNavIcon({ id }) {
    const commonProps = {
        className: "h-5 w-5 shrink-0",
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 1.8,
        viewBox: "0 0 24 24",
        "aria-hidden": true
    };
    if (id === "dashboard") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...commonProps,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 13h7V4H4v9Zm9 7h7V4h-7v16ZM4 20h7v-5H4v5Z"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 87,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 86,
            columnNumber: 7
        }, this);
    }
    if (id === "clients") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...commonProps,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.5 19c.6-3.1 2.1-5 4.5-5s3.9 1.9 4.5 5M11.5 19c.6-3.1 2.1-5 4.5-5s3.9 1.9 4.5 5"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 94,
            columnNumber: 7
        }, this);
    }
    if (id === "appointments") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            ...commonProps,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7 3v4M17 3v4M4 9h16M6 5h12a2 2 0 0 1 2 2v12H4V7a2 2 0 0 1 2-2Zm4 8h4m-4 4h7"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 103,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        ...commonProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20c.9-4.1 3.4-6 7.5-6s6.6 1.9 7.5 6"
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 110,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_c1 = AccountNavIcon;
function DashboardTabPanel({ profile, plan }) {
    const displayName = profile.full_name || profile.business_name || "Your chair";
    const metrics = [
        {
            label: "Revenue",
            value: "$1,165",
            detail: "+10% from last week"
        },
        {
            label: "Appointments",
            value: "24",
            detail: "+9% from last week"
        },
        {
            label: "Rebooking Rate",
            value: "81%",
            detail: "+12% from last week"
        },
        {
            label: "Upcoming Income",
            value: "$415.50",
            detail: "In next 7 days"
        }
    ];
    const appointments = [
        [
            "9:00 AM",
            "Jalen R."
        ],
        [
            "10:30 AM",
            "Marcus T."
        ],
        [
            "12:00 PM",
            "Derrick S."
        ],
        [
            "1:30 PM",
            "Chris B."
        ],
        [
            "3:00 PM",
            "DeAndre J."
        ]
    ];
    const bars = [
        32,
        50,
        66,
        48,
        60,
        88,
        56
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
                children: metrics.map((metric)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-extrabold text-[#1C1C1E]",
                                children: metric.label
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-3xl font-extrabold tracking-tight text-[#111111]",
                                children: metric.value
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-bold text-[#15803D]",
                                children: metric.detail
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 168,
                                columnNumber: 13
                            }, this)
                        ]
                    }, metric.label, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[0.9fr_1.1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-base font-extrabold text-[#111111]",
                                        children: "Upcoming Appointments"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold text-brand",
                                        children: "Preview"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 grid gap-3",
                                children: appointments.map(([time, client], index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-[2.5rem_1fr_auto] items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid h-10 w-10 place-items-center rounded-full bg-[#1C1C1E] text-xs font-extrabold text-brand-gold",
                                                children: index + 1
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                lineNumber: 192,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-extrabold text-[#1C1C1E]",
                                                        children: time
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xs font-semibold text-[#6B7280]",
                                                        children: client
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                lineNumber: 195,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "rounded-[8px] bg-[#ECFDF5] px-3 py-1 text-xs font-extrabold text-[#15803D]",
                                                children: "Confirmed"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, `${time}-${client}`, true, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 188,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "mt-6 inline-flex h-11 w-full items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-extrabold text-white shadow-[0_14px_28px_rgba(183,121,61,0.18)]",
                                children: "View Full Calendar"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-base font-extrabold text-[#111111]",
                                        children: "Revenue Overview"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "rounded-[8px] border border-[#E4D6C3] bg-[#FAF7F2] px-3 py-2 text-xs font-extrabold text-[#1C1C1E]",
                                        children: "This week"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 223,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 219,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 flex h-56 items-end gap-3 border-b border-l border-[#E4D6C3] px-4 pb-4",
                                children: bars.map((height, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-1 flex-col items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full rounded-t-[6px] bg-[linear-gradient(180deg,#D6A85A_0%,#B7793D_100%)]",
                                                style: {
                                                    height: `${height}%`
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                lineNumber: 231,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-bold text-[#6B7280]",
                                                children: [
                                                    "Mon",
                                                    "Tue",
                                                    "Wed",
                                                    "Thu",
                                                    "Fri",
                                                    "Sat",
                                                    "Sun"
                                                ][index]
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                lineNumber: 235,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, index, true, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 230,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 md:grid-cols-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-extrabold text-[#111111]",
                                children: "New Clients"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-3xl font-extrabold text-[#111111]",
                                children: "5"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-bold text-[#15803D]",
                                children: "+25% from last week"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-extrabold text-[#111111]",
                                children: "Returning Clients"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-3xl font-extrabold text-[#111111]",
                                children: "17"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-bold text-[#15803D]",
                                children: "+45% from last week"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-extrabold text-[#111111]",
                                children: "Workspace"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 262,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-4 text-lg font-extrabold text-[#111111]",
                                children: displayName
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-bold capitalize text-brand",
                                children: [
                                    plan.tier,
                                    " plan"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 266,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, this);
}
_c2 = DashboardTabPanel;
function ProfileTabPanel({ profile, plan, profileForm, publicForm, publicUrl, authBusy, newPassword, savingProfile, savingPublic, previewingPublic, previewError, previewCooldownSeconds, canUpgrade, onNewPasswordChange, onPasswordSubmit, onSignOut, onProfileFieldChange, onProfileSubmit, onPublicFieldChange, onBookingEnabledChange, onBookingRequestFormEnabledChange, onPublicSubmit, onPublicPreview, onPreviewSettingsRefresh, onCancel, onSoon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-6 xl:grid-cols-[1fr_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfileSection, {
                        email: profile.email,
                        form: profileForm,
                        isSaving: savingProfile,
                        onFieldChange: onProfileFieldChange,
                        onSubmit: onProfileSubmit
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 339,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PublicProfileSection, {
                        form: publicForm,
                        plan: plan,
                        publicUrl: publicUrl,
                        isSaving: savingPublic,
                        onFieldChange: onPublicFieldChange,
                        onBookingEnabledChange: onBookingEnabledChange,
                        onBookingRequestFormEnabledChange: onBookingRequestFormEnabledChange,
                        onSubmit: onPublicSubmit,
                        isPreviewing: previewingPublic,
                        previewError: previewError,
                        previewCooldownSeconds: previewCooldownSeconds,
                        onPreview: onPublicPreview,
                        onPreviewSettingsRefresh: onPreviewSettingsRefresh
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 338,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountSection, {
                plan: plan,
                canUpgrade: canUpgrade,
                onCancel: onCancel,
                onSoon: onSoon
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 363,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SessionPanel, {
                email: profile.email,
                isBusy: authBusy,
                newPassword: newPassword,
                onNewPasswordChange: onNewPasswordChange,
                onPasswordSubmit: onPasswordSubmit,
                onSignOut: onSignOut
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 369,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c3 = ProfileTabPanel;
function BlankTabPanel({ title }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "min-h-[22rem] rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-semibold tracking-tight text-[#111111]",
            children: title
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 384,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 383,
        columnNumber: 5
    }, this);
}
_c4 = BlankTabPanel;
function ClientsTabPanel({ clients, loadState, selectedClientId, referralStates, creatingReferralClientId, canNativeShare, onClientToggle, onCreateReferralLink, onReferralRetry, onMessage, onRetry }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "min-h-[22rem] rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold tracking-tight text-[#111111]",
                                children: "Clients"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm leading-6 text-[#6B7280]",
                                children: [
                                    "Customer list from ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        children: "/api/clients"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 424,
                                        columnNumber: 32
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 423,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this),
                    loadState.status === "ready" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-[#4B5563]",
                        children: [
                            clients.length,
                            " ",
                            clients.length === 1 ? "client" : "clients"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 428,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 418,
                columnNumber: 7
            }, this),
            loadState.status === "loading" || loadState.status === "idle" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-[18px] border border-[#E5E7EB] bg-[#FAF7F2] p-5 text-sm font-semibold text-[#4B5563]",
                children: "Loading clients..."
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 435,
                columnNumber: 9
            }, this) : null,
            loadState.status === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-[18px] border border-[#FECACA] bg-[#FFF7F7] p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-[#991B1B]",
                        children: "Clients could not load."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-6 text-[#7F1D1D]",
                        children: loadState.message
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 445,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onRetry,
                        className: "mt-4 inline-flex h-10 items-center justify-center rounded-[8px] bg-brand px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30",
                        children: "Retry"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 448,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 441,
                columnNumber: 9
            }, this) : null,
            loadState.status === "ready" && clients.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 rounded-[18px] border border-[#E5E7EB] bg-[#FAF7F2] p-5 text-sm leading-6 text-[#6B7280]",
                children: "No clients found."
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 459,
                columnNumber: 9
            }, this) : null,
            loadState.status === "ready" && clients.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 overflow-hidden rounded-[18px] border border-[#E5E7EB]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-full divide-y divide-[#E5E7EB] text-left text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            className: "px-4 py-3 sm:px-5",
                                            children: "Client name"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 470,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            className: "px-4 py-3 sm:px-5",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 473,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            className: "px-4 py-3 sm:px-5",
                                            children: "Phone number"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 476,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            scope: "col",
                                            className: "px-4 py-3 sm:px-5",
                                            children: "Referral"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 479,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 469,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 468,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                className: "divide-y divide-[#EEF0F3] bg-white",
                                children: clients.map((client)=>{
                                    const isSelected = selectedClientId === client.id;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: isSelected ? "bg-[#FFFBF5]" : undefined,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "whitespace-nowrap px-4 py-4 font-semibold text-[#111111] sm:px-5",
                                                        children: formatClientName(client)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                        lineNumber: 491,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "whitespace-nowrap px-4 py-4 text-[#4B5563] sm:px-5",
                                                        children: client.email ?? "None"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                        lineNumber: 494,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "whitespace-nowrap px-4 py-4 text-[#4B5563] sm:px-5",
                                                        children: client.phone ?? "None"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                        lineNumber: 497,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        className: "whitespace-nowrap px-4 py-4 sm:px-5",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>onClientToggle(client.id),
                                                            "aria-expanded": isSelected,
                                                            className: "inline-flex h-9 items-center justify-center rounded-[8px] border border-[#E4D6C3] bg-white px-3 text-xs font-bold text-[#1C1C1E] hover:bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-brand/25",
                                                            children: isSelected ? "Hide referral" : "View referral"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                            lineNumber: 501,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                        lineNumber: 500,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                lineNumber: 490,
                                                columnNumber: 23
                                            }, this),
                                            isSelected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    colSpan: 4,
                                                    className: "bg-[#FFFBF5] px-4 py-4 sm:px-5",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClientReferralPanel, {
                                                        client: client,
                                                        state: referralStates[client.id] ?? {
                                                            status: "idle"
                                                        },
                                                        isCreating: creatingReferralClientId === client.id,
                                                        canNativeShare: canNativeShare,
                                                        onCreate: ()=>onCreateReferralLink(client.id),
                                                        onRetry: ()=>onReferralRetry(client.id),
                                                        onMessage: onMessage
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                        lineNumber: 514,
                                                        columnNumber: 29
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                lineNumber: 512,
                                                columnNumber: 25
                                            }, this) : null
                                        ]
                                    }, client.id, true, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 489,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 484,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 467,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 466,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 465,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 417,
        columnNumber: 5
    }, this);
}
_c5 = ClientsTabPanel;
function ClientReferralPanel({ client, state, isCreating, canNativeShare, onCreate, onRetry, onMessage }) {
    if (state.status === "idle" || state.status === "loading") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[12px] border border-[#E5E7EB] bg-white p-4 text-sm font-semibold text-[#4B5563]",
            children: "Loading referral link..."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 561,
            columnNumber: 7
        }, this);
    }
    if (state.status === "error") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "rounded-[12px] border border-[#FECACA] bg-[#FFF7F7] p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-semibold text-[#991B1B]",
                    children: "Referral link could not load."
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 570,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 text-sm leading-6 text-[#7F1D1D]",
                    children: state.message
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 573,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onRetry,
                    className: "mt-4 inline-flex h-10 items-center justify-center rounded-[8px] bg-brand px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30",
                    children: "Retry"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 576,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 569,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-extrabold text-[#111111]",
                                children: "Referral link"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 591,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs font-semibold text-[#6B7280]",
                                children: [
                                    "Share this link when ",
                                    formatClientName(client),
                                    " sends someone your way."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 594,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 590,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReferralStatsSummary, {
                        stats: state.stats,
                        statsError: state.statsError
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 599,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 589,
                columnNumber: 7
            }, this),
            state.link ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReferralLinkActions, {
                link: state.link,
                canNativeShare: canNativeShare,
                onMessage: onMessage
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 603,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-col gap-3 rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] p-4 sm:flex-row sm:items-center sm:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-[#4B5563]",
                        children: "Create a referral link for this client."
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 610,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onCreate,
                        disabled: isCreating,
                        className: "inline-flex h-10 shrink-0 items-center justify-center rounded-[8px] bg-brand px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60",
                        children: isCreating ? "Creating..." : "Create referral link"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 613,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 609,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 588,
        columnNumber: 5
    }, this);
}
_c6 = ClientReferralPanel;
function ReferralLinkActions({ link, canNativeShare, onMessage }) {
    async function handleCopy() {
        if (!navigator.clipboard) {
            onMessage("Copy is not available in this browser.");
            return;
        }
        try {
            await navigator.clipboard.writeText(link.referral_url);
            onMessage("Referral link copied.");
        } catch  {
            onMessage("Referral link could not be copied.");
        }
    }
    async function handleShare() {
        if (!navigator.share) {
            onMessage("Sharing is not available in this browser.");
            return;
        }
        try {
            await navigator.share({
                title: "Referral link",
                url: link.referral_url
            });
        } catch (error) {
            if (error instanceof DOMException && error.name === "AbortError") {
                return;
            }
            onMessage("Referral link could not be shared.");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-4 rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]",
                children: "Referral link"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 672,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 break-all text-sm font-semibold text-[#111111]",
                children: link.referral_url
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 675,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleCopy,
                        className: "inline-flex h-10 items-center justify-center rounded-[8px] bg-brand px-4 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30",
                        children: "Copy"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 679,
                        columnNumber: 9
                    }, this),
                    canNativeShare ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleShare,
                        className: "inline-flex h-10 items-center justify-center rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm font-semibold text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-brand/25",
                        children: "Share"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 687,
                        columnNumber: 11
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 678,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 671,
        columnNumber: 5
    }, this);
}
_c7 = ReferralLinkActions;
function ReferralStatsSummary({ stats, statsError }) {
    if (!stats) {
        return statsError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-xs font-semibold text-[#92400E]",
            children: "Referral stats unavailable."
        }, void 0, false, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 709,
            columnNumber: 7
        }, this) : null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
        className: "grid grid-cols-2 gap-2 sm:min-w-64",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReferralStat, {
                label: "Opens",
                value: stats.opened_count
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 717,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReferralStat, {
                label: "Attributed bookings",
                value: stats.booking_attributed_count
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 718,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 716,
        columnNumber: 5
    }, this);
}
_c8 = ReferralStatsSummary;
function ReferralStat({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] px-3 py-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                className: "text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 729,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                className: "mt-1 text-lg font-extrabold text-[#111111]",
                children: value
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 732,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 728,
        columnNumber: 5
    }, this);
}
_c9 = ReferralStat;
function formatClientName(client) {
    return `${client.first_name} ${client.last_name}`.trim() || "Unnamed client";
}
function AuthPanel({ mode, email, password, isBusy, onModeChange, onEmailChange, onPasswordChange, onSubmit }) {
    const submitLabel = mode === "sign-in" ? "Sign in" : mode === "sign-up" ? "Create account" : "Send reset email";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-[12px] border border-border bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold tracking-tight text-[#111111]",
                children: mode === "sign-up" ? "Create your account" : mode === "reset" ? "Reset password" : "Sign in"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 769,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-6 text-[#6B7280]",
                children: "Supabase handles authentication and this app sends the active access token to the DripDesk API as a bearer token."
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 776,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 flex flex-wrap gap-2",
                children: [
                    "sign-in",
                    "sign-up",
                    "reset"
                ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onModeChange(item),
                        className: [
                            "h-10 rounded-[8px] px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/25",
                            mode === item ? "bg-brand text-white" : "border border-[#E4D6C3] bg-[#FAF7F2] text-[#4B5563]"
                        ].join(" "),
                        children: item === "sign-in" ? "Sign in" : item === "sign-up" ? "Sign up" : "Reset"
                    }, item, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 782,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 780,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                className: "mt-5 grid gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: email,
                        onChange: (event)=>onEmailChange(event.target.value),
                        className: "h-12 min-w-0 rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25",
                        placeholder: "Email",
                        type: "email",
                        autoComplete: "email",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 802,
                        columnNumber: 9
                    }, this),
                    mode !== "reset" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: password,
                        onChange: (event)=>onPasswordChange(event.target.value),
                        className: "h-12 min-w-0 rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25",
                        placeholder: "Password",
                        type: "password",
                        autoComplete: mode === "sign-up" ? "new-password" : "current-password",
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 812,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isBusy,
                        className: "inline-flex h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60",
                        children: isBusy ? "Working..." : submitLabel
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 824,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 801,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 768,
        columnNumber: 5
    }, this);
}
_c10 = AuthPanel;
function SessionPanel({ email, isBusy, newPassword, onNewPasswordChange, onPasswordSubmit, onSignOut }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold tracking-tight text-[#111111]",
                                children: "Signed in"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 855,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-sm leading-6 text-[#6B7280]",
                                children: email
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 858,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 854,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onSignOut,
                        disabled: isBusy,
                        className: "inline-flex h-11 items-center justify-center rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] px-5 text-sm font-semibold text-[#4B5563] focus:outline-none focus:ring-2 focus:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-60",
                        children: "Sign out"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 860,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 853,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onPasswordSubmit,
                className: "mt-5 flex flex-col gap-3 sm:flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: newPassword,
                        onChange: (event)=>onNewPasswordChange(event.target.value),
                        className: "h-12 min-w-0 flex-1 rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25",
                        placeholder: "New password",
                        type: "password",
                        autoComplete: "new-password"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 873,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isBusy,
                        className: "inline-flex h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60",
                        children: "Update password"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 881,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 869,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 852,
        columnNumber: 5
    }, this);
}
_c11 = SessionPanel;
function LoadingPanel() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-[12px] border border-[#E4D6C3] bg-white p-6 text-sm font-semibold text-[#4B5563] shadow-[0_12px_28px_rgba(17,17,17,0.045)]",
        children: "Loading account profile..."
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 895,
        columnNumber: 5
    }, this);
}
_c12 = LoadingPanel;
function ErrorPanel({ message, onRetry }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "rounded-[12px] border border-[#FECACA] bg-[#FFF7F7] p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-xl font-semibold tracking-tight text-[#991B1B]",
                children: "Account could not load"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 910,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-sm leading-6 text-[#7F1D1D]",
                children: message
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 913,
                columnNumber: 7
            }, this),
            onRetry ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onRetry,
                className: "mt-5 inline-flex h-11 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand/30",
                children: "Retry"
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 915,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 909,
        columnNumber: 5
    }, this);
}
_c13 = ErrorPanel;
function ProfileSection({ email, form, isSaving, onFieldChange, onSubmit }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "profile",
        className: "scroll-mt-6 rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold tracking-tight text-[#111111]",
                        children: "Private Profile"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 949,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-6 text-[#6B7280]",
                        children: [
                            "Account identity from ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "/api/settings/profile"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 953,
                                columnNumber: 33
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 952,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 948,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                className: "mt-6 grid gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Email",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: email,
                            readOnly: true,
                            className: "h-12 w-full rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] px-4 text-sm font-semibold text-[#6B7280]"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 959,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 958,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Full name",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: form.full_name,
                            onChange: (event)=>onFieldChange("full_name", event),
                            className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 966,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 965,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Business name",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: form.business_name,
                            onChange: (event)=>onFieldChange("business_name", event),
                            className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 973,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 972,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Phone number",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: form.phone_number,
                            onChange: (event)=>onFieldChange("phone_number", event),
                            className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 980,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 979,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Location",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: form.location_label,
                            onChange: (event)=>onFieldChange("location_label", event),
                            className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 987,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 986,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Timezone",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: form.timezone,
                            onChange: (event)=>onFieldChange("timezone", event),
                            className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25",
                            placeholder: "America/Denver"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 994,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 993,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Avatar image ID",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: form.avatar_image_id,
                            onChange: (event)=>onFieldChange("avatar_image_id", event),
                            className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1002,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1001,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        disabled: isSaving,
                        className: "mt-2 inline-flex h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60",
                        children: isSaving ? "Saving..." : "Save private profile"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1008,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 957,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 944,
        columnNumber: 5
    }, this);
}
_c14 = ProfileSection;
function PublicProfileSection({ form, plan, publicUrl, isSaving, onFieldChange, onBookingEnabledChange, onBookingRequestFormEnabledChange, onSubmit, isPreviewing, previewError, previewCooldownSeconds, onPreview, onPreviewSettingsRefresh }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "public-page",
        className: "scroll-mt-6 rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-semibold tracking-tight text-[#111111]",
                        children: "Public Booking Page"
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1058,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-sm leading-6 text-[#6B7280]",
                        children: [
                            "Public stylist identity from ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                children: "/api/settings/booking"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1062,
                                columnNumber: 40
                            }, this),
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1061,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 1057,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: onSubmit,
                className: "mt-6 grid gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Booking link",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[8px] border border-[#E5E7EB] bg-[#FAF7F2] px-4 py-3 text-sm font-semibold text-[#111111]",
                            children: publicUrl
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1068,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1067,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Slug",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.slug,
                                onChange: (event)=>onFieldChange("slug", event),
                                disabled: !plan.features.customSlug,
                                pattern: "[a-z0-9]+(?:-[a-z0-9]+)*",
                                className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25 disabled:bg-[#FAF7F2] disabled:text-[#6B7280]"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1073,
                                columnNumber: 11
                            }, this),
                            !plan.features.customSlug ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-semibold text-[#92400E]",
                                children: "Custom booking links are not included in this plan."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1081,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1072,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Display name",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: form.display_name,
                            onChange: (event)=>onFieldChange("display_name", event),
                            maxLength: 160,
                            className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1087,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1086,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Instagram",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.instagram,
                                onChange: (event)=>onFieldChange("instagram", event),
                                maxLength: 100,
                                autoCapitalize: "none",
                                autoCorrect: "off",
                                placeholder: "@yourhandle",
                                className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1095,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-semibold text-[#6B7280]",
                                children: "Your handle can include @; it is removed when saved."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1094,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Bio",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: form.bio,
                            onChange: (event)=>onFieldChange("bio", event),
                            maxLength: 2000,
                            className: "min-h-28 w-full resize-y rounded-[8px] border border-[#E4D6C3] bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/25"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1109,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Field, {
                        label: "Cover photo URL",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: form.cover_photo_url,
                                onChange: (event)=>onFieldChange("cover_photo_url", event),
                                disabled: !plan.features.customCoverPhoto,
                                className: "h-12 w-full rounded-[8px] border border-[#E4D6C3] bg-white px-4 text-sm outline-none focus:ring-2 focus:ring-brand/25 disabled:bg-[#FAF7F2] disabled:text-[#6B7280]",
                                placeholder: "https://..."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1117,
                                columnNumber: 11
                            }, this),
                            !plan.features.customCoverPhoto ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs font-semibold text-[#92400E]",
                                children: "Custom cover photos are not included in this plan."
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1125,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center justify-between gap-4 rounded-[8px] border border-[#E4D6C3] bg-[#FAF7F2] px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-sm font-semibold text-[#111111]",
                                        children: "Booking enabled"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 1132,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-1 block text-xs font-semibold text-[#6B7280]",
                                        children: "Customers can still preview an unavailable page when off."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 1135,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                checked: form.booking_enabled,
                                onChange: (event)=>onBookingEnabledChange(event.target.checked),
                                type: "checkbox",
                                className: "h-5 w-5 accent-brand"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex items-center justify-between gap-4 rounded-[8px] border border-[#E4D6C3] bg-[#FAF7F2] px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "block text-sm font-semibold text-[#111111]",
                                        children: "Booking request form enabled"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 1148,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mt-1 block text-xs font-semibold text-[#6B7280]",
                                        children: "Let customers submit booking requests from your public page."
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                        lineNumber: 1151,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1147,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                checked: form.booking_request_form_enabled,
                                onChange: (event)=>onBookingRequestFormEnabledChange(event.target.checked),
                                type: "checkbox",
                                className: "h-5 w-5 accent-brand"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1155,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1146,
                        columnNumber: 9
                    }, this),
                    previewError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "alert",
                        className: "rounded-[8px] border border-[#F5C2C7] bg-[#FFF5F5] px-4 py-3 text-sm leading-6 text-[#9B1C1C]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: previewError.message
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1169,
                                columnNumber: 13
                            }, this),
                            previewError.canRefreshSettings ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onPreviewSettingsRefresh,
                                className: "mt-2 font-semibold underline underline-offset-2",
                                children: "Refresh settings"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1171,
                                columnNumber: 15
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1165,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid gap-3 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isSaving || isPreviewing,
                                className: "inline-flex h-12 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60",
                                children: isSaving ? "Saving..." : "Save public profile"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onPreview,
                                disabled: isSaving || isPreviewing || previewCooldownSeconds > 0,
                                className: "inline-flex h-12 items-center justify-center rounded-[8px] border border-brand bg-white px-5 text-sm font-semibold text-brand transition-colors hover:bg-brand/5 focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60",
                                children: isPreviewing ? "Creating preview..." : previewCooldownSeconds > 0 ? `Try again in ${previewCooldownSeconds}s` : "Preview booking page"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                        lineNumber: 1181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 1066,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 1053,
        columnNumber: 5
    }, this);
}
_c15 = PublicProfileSection;
function AccountSection({ plan, canUpgrade, onCancel, onSoon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "plan",
        className: "scroll-mt-6 rounded-[12px] border border-[#E4D6C3] bg-white p-5 shadow-[0_12px_28px_rgba(17,17,17,0.045)] sm:p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid gap-6 lg:grid-cols-[0.9fr_1.1fr]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold tracking-tight text-[#111111]",
                            children: "Account Plan"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1225,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm leading-6 text-[#6B7280]",
                            children: [
                                "Tier and entitlement data from ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    children: "/api/account/plan"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1229,
                                    columnNumber: 44
                                }, this),
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 rounded-[22px] border border-[#E5E7EB] bg-[#FAF7F2] p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]",
                                    children: "Current plan"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1233,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 flex flex-wrap items-end gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl font-semibold tracking-tight text-[#111111]",
                                            children: plan.displayName
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 1237,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "pb-1 text-sm font-semibold capitalize text-brand",
                                            children: plan.status.replace("_", " ")
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 1240,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-sm leading-6 text-[#6B7280]",
                                    children: [
                                        "SMS usage: ",
                                        plan.smsUsedThisMonth,
                                        " used,",
                                        " ",
                                        plan.smsRemainingThisMonth,
                                        " remaining of ",
                                        plan.smsMonthlyLimit,
                                        "."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1244,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1232,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-5 flex flex-col gap-3 sm:flex-row",
                            children: [
                                canUpgrade ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>onSoon("Upgrade checkout coming soon."),
                                    className: "inline-flex h-12 flex-1 items-center justify-center rounded-[8px] bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30",
                                    children: "Upgrade"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1252,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "inline-flex h-12 flex-1 items-center justify-center rounded-[8px] bg-[#ECFDF5] px-5 text-sm font-semibold text-[#15803D]",
                                    children: "You're on the highest plan."
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1260,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onCancel,
                                    className: "inline-flex h-12 flex-1 items-center justify-center rounded-[8px] border border-[#FECACA] bg-[#FFF7F7] px-5 text-sm font-semibold text-[#B91C1C] transition-colors hover:bg-[#FEF2F2] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1264,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1250,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 1224,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-3",
                    children: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$account$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["planNotes"].map((planNote)=>{
                            const isCurrent = planNote.tier === plan.tier;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: [
                                    "rounded-[18px] border p-4",
                                    isCurrent ? "border-brand bg-brand-soft" : "border-[#EEF0F3] bg-white"
                                ].join(" "),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-[#111111]",
                                                    children: planNote.name
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                    lineNumber: 1290,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm leading-6 text-[#6B7280]",
                                                    children: planNote.description
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                    lineNumber: 1293,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 1289,
                                            columnNumber: 19
                                        }, this),
                                        isCurrent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "shrink-0 text-xs font-semibold text-brand",
                                            children: "Current"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 1298,
                                            columnNumber: 21
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1288,
                                    columnNumber: 17
                                }, this)
                            }, planNote.tier, false, {
                                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                lineNumber: 1279,
                                columnNumber: 15
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-[18px] border border-[#EEF0F3] bg-[#FAF7F2] p-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-[#111111]",
                                    children: "Features"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1307,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                    className: "mt-3 grid gap-2 sm:grid-cols-2",
                                    children: Object.entries(plan.features).map(([key, enabled])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between gap-3 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                    className: "text-[#4B5563]",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$account$2d$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featureLabels"][key]
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                    lineNumber: 1314,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                    className: [
                                                        "text-xs font-semibold",
                                                        enabled ? "text-[#15803D]" : "text-[#9CA3AF]"
                                                    ].join(" "),
                                                    children: enabled ? "Included" : "Locked"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                                    lineNumber: 1317,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, key, true, {
                                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                            lineNumber: 1310,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                                    lineNumber: 1308,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1306,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 1274,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 1223,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 1219,
        columnNumber: 5
    }, this);
}
_c16 = AccountSection;
function Field({ label, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "block",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                lineNumber: 1344,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 1343,
        columnNumber: 5
    }, this);
}
_c17 = Field;
function CancelDialog({ onClose, onSoon }) {
    function handleSoon(message) {
        onClose();
        onSoon(message);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-20 flex items-center justify-center bg-[#111827]/45 px-4 py-6",
        role: "presentation",
        onMouseDown: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "cancel-title",
            "aria-describedby": "cancel-description",
            className: "w-full max-w-lg rounded-[16px] border border-white/80 bg-white p-5 shadow-[0_30px_90px_rgba(17,24,39,0.22)] sm:p-6",
            onMouseDown: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    id: "cancel-title",
                    className: "text-2xl font-semibold tracking-tight text-[#111111]",
                    children: "Before you cancel"
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 1378,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    id: "cancel-description",
                    className: "mt-3 text-sm leading-6 text-[#6B7280]",
                    children: "Billing changes should use the hosted billing flow. Direct plan mutation is intentionally not exposed from this screen."
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 1384,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: onClose,
                            className: "inline-flex h-12 items-center justify-center rounded-[8px] border border-[#E4D6C3] bg-white px-5 text-sm font-semibold text-[#4B5563] transition-colors hover:bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-brand/25",
                            children: "Keep My Plan"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1393,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>handleSoon("Cancellation flow coming soon."),
                            className: "inline-flex h-12 items-center justify-center rounded-[8px] border border-[#FECACA] bg-[#FFF7F7] px-5 text-sm font-semibold text-[#B91C1C] transition-colors hover:bg-[#FEF2F2] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20",
                            children: "Continue to Cancel"
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                            lineNumber: 1400,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
                    lineNumber: 1392,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
            lineNumber: 1370,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 1365,
        columnNumber: 5
    }, this);
}
_c18 = CancelDialog;
function ToastMessage({ message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed right-4 bottom-4 z-30 max-w-[calc(100vw-2rem)] rounded-[8px] border border-[#E4D6C3] bg-white px-4 py-3 text-sm font-semibold text-[#111111] shadow-[0_18px_45px_rgba(17,24,39,0.16)]",
        role: "status",
        "aria-live": "polite",
        children: message
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/account/AccountPanels.tsx",
        lineNumber: 1415,
        columnNumber: 5
    }, this);
}
_c19 = ToastMessage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14, _c15, _c16, _c17, _c18, _c19;
__turbopack_context__.k.register(_c, "AccountSideNav");
__turbopack_context__.k.register(_c1, "AccountNavIcon");
__turbopack_context__.k.register(_c2, "DashboardTabPanel");
__turbopack_context__.k.register(_c3, "ProfileTabPanel");
__turbopack_context__.k.register(_c4, "BlankTabPanel");
__turbopack_context__.k.register(_c5, "ClientsTabPanel");
__turbopack_context__.k.register(_c6, "ClientReferralPanel");
__turbopack_context__.k.register(_c7, "ReferralLinkActions");
__turbopack_context__.k.register(_c8, "ReferralStatsSummary");
__turbopack_context__.k.register(_c9, "ReferralStat");
__turbopack_context__.k.register(_c10, "AuthPanel");
__turbopack_context__.k.register(_c11, "SessionPanel");
__turbopack_context__.k.register(_c12, "LoadingPanel");
__turbopack_context__.k.register(_c13, "ErrorPanel");
__turbopack_context__.k.register(_c14, "ProfileSection");
__turbopack_context__.k.register(_c15, "PublicProfileSection");
__turbopack_context__.k.register(_c16, "AccountSection");
__turbopack_context__.k.register(_c17, "Field");
__turbopack_context__.k.register(_c18, "CancelDialog");
__turbopack_context__.k.register(_c19, "ToastMessage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/web/src/components/account/AccountPageClient.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountPageClient",
    ()=>AccountPageClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$booking$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/account/booking-preview.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$password$2d$recovery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/auth/password-recovery.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/config/public.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/components/account/AccountPanels.tsx [app-client] (ecmascript)");
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
function showMessage(message, setToast) {
    setToast({
        id: Date.now(),
        message
    });
}
function toProfileForm(profile) {
    return {
        full_name: profile.full_name ?? "",
        phone_number: profile.phone_number ?? "",
        business_name: profile.business_name ?? "",
        location_label: profile.location_label ?? "",
        avatar_image_id: profile.avatar_image_id ?? "",
        timezone: profile.timezone
    };
}
function toPublicProfileForm(stylist) {
    return {
        slug: stylist.slug,
        display_name: stylist.display_name,
        bio: stylist.bio ?? "",
        instagram: stylist.instagram ?? "",
        cover_photo_url: stylist.cover_photo_url ?? "",
        booking_enabled: stylist.booking_enabled,
        booking_request_form_enabled: stylist.booking_request_form_enabled ?? false
    };
}
function normalizeOptionalText(value) {
    return value.trim() ? value : null;
}
function getErrorMessage(error) {
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"]) {
        return error.message;
    }
    if (error instanceof Error) {
        return error.message;
    }
    return "Something went wrong.";
}
async function loadAccountData(token) {
    // Fetch account bootstrap data in parallel after proving the token is accepted
    // by the API. The backend remains the source of entitlement truth.
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthenticatedUser"])(token);
    const [profile, stylist, plan] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountProfile"])(token),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStylistSettingsProfile"])(token),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAccountPlan"])(token)
    ]);
    return {
        profile,
        stylist,
        plan
    };
}
function AccountPageClient() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [accessToken, setAccessToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [authMode, setAuthMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("sign-in");
    const [authEmail, setAuthEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [authPassword, setAuthPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [authBusy, setAuthBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profile, setProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [stylist, setStylist] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [plan, setPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [clients, setClients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [clientsLoadState, setClientsLoadState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        status: "idle"
    });
    const [selectedClientId, setSelectedClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [clientReferralStates, setClientReferralStates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [creatingReferralClientId, setCreatingReferralClientId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [canNativeShare, setCanNativeShare] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profileForm, setProfileForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [publicForm, setPublicForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadState, setLoadState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AccountPageClient.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasSupabaseBrowserConfig"])() ? {
                status: "loading"
            } : {
                status: "config",
                message: "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY."
            }
    }["AccountPageClient.useState"]);
    const [savingProfile, setSavingProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [savingPublic, setSavingPublic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [previewingPublic, setPreviewingPublic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [previewError, setPreviewError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewCooldownUntil, setPreviewCooldownUntil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [previewCooldownSeconds, setPreviewCooldownSeconds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isCancelOpen, setIsCancelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("dashboard");
    const publicUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AccountPageClient.useMemo[publicUrl]": ()=>{
            if (!stylist?.slug) {
                return "";
            }
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWebAppUrl"])(`/book/${stylist.slug}`);
        }
    }["AccountPageClient.useMemo[publicUrl]"], [
        stylist?.slug
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPageClient.useEffect": ()=>{
            if (!previewCooldownUntil) {
                setPreviewCooldownSeconds(0);
                return;
            }
            const updateCountdown = {
                "AccountPageClient.useEffect.updateCountdown": ()=>{
                    const remaining = Math.max(0, Math.ceil((previewCooldownUntil - Date.now()) / 1000));
                    setPreviewCooldownSeconds(remaining);
                    if (!remaining) {
                        setPreviewCooldownUntil(null);
                    }
                }
            }["AccountPageClient.useEffect.updateCountdown"];
            updateCountdown();
            const intervalId = window.setInterval(updateCountdown, 250);
            return ({
                "AccountPageClient.useEffect": ()=>window.clearInterval(intervalId)
            })["AccountPageClient.useEffect"];
        }
    }["AccountPageClient.useEffect"], [
        previewCooldownUntil
    ]);
    const loadAccount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AccountPageClient.useCallback[loadAccount]": async (token)=>{
            if (!token) {
                setLoadState({
                    status: "auth"
                });
                router.replace("/login?next=/account");
                return;
            }
            setLoadState({
                status: "loading"
            });
            try {
                const { profile: nextProfile, stylist: nextStylist, plan: nextPlan } = await loadAccountData(token);
                setProfile(nextProfile);
                setStylist(nextStylist);
                setPlan(nextPlan);
                setProfileForm(toProfileForm(nextProfile));
                setPublicForm(toPublicProfileForm(nextStylist));
                setLoadState({
                    status: "ready"
                });
            } catch (error) {
                if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] && error.status === 401) {
                    // A stale Supabase access token can often be recovered without forcing
                    // the user back through the login form.
                    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])();
                    const { data } = await supabase.auth.refreshSession();
                    const refreshedToken = data.session?.access_token;
                    if (refreshedToken) {
                        try {
                            const { profile: nextProfile, stylist: nextStylist, plan: nextPlan } = await loadAccountData(refreshedToken);
                            setAccessToken(refreshedToken);
                            setProfile(nextProfile);
                            setStylist(nextStylist);
                            setPlan(nextPlan);
                            setProfileForm(toProfileForm(nextProfile));
                            setPublicForm(toPublicProfileForm(nextStylist));
                            setLoadState({
                                status: "ready"
                            });
                            return;
                        } catch  {
                        // Continue to sign out when the refreshed session is still unusable.
                        }
                    }
                    await supabase.auth.signOut();
                    setAccessToken("");
                    setLoadState({
                        status: "auth"
                    });
                    return;
                }
                setLoadState({
                    status: "error",
                    message: getErrorMessage(error)
                });
            }
        }
    }["AccountPageClient.useCallback[loadAccount]"], [
        router
    ]);
    const loadClients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AccountPageClient.useCallback[loadClients]": async (token)=>{
            if (!token) {
                setClients([]);
                setClientsLoadState({
                    status: "idle"
                });
                setSelectedClientId(null);
                setClientReferralStates({});
                setCreatingReferralClientId(null);
                return;
            }
            setClientsLoadState({
                status: "loading"
            });
            try {
                const nextClients = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClients"])(token);
                setClients(nextClients);
                setClientsLoadState({
                    status: "ready"
                });
                setSelectedClientId({
                    "AccountPageClient.useCallback[loadClients]": (currentClientId)=>currentClientId && nextClients.some({
                            "AccountPageClient.useCallback[loadClients]": (client)=>client.id === currentClientId
                        }["AccountPageClient.useCallback[loadClients]"]) ? currentClientId : null
                }["AccountPageClient.useCallback[loadClients]"]);
            } catch (error) {
                setClientsLoadState({
                    status: "error",
                    message: getErrorMessage(error)
                });
            }
        }
    }["AccountPageClient.useCallback[loadClients]"], []);
    const loadClientReferral = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AccountPageClient.useCallback[loadClientReferral]": async (clientId, token)=>{
            if (!token) {
                return;
            }
            setClientReferralStates({
                "AccountPageClient.useCallback[loadClientReferral]": (currentStates)=>({
                        ...currentStates,
                        [clientId]: {
                            status: "loading"
                        }
                    })
            }["AccountPageClient.useCallback[loadClientReferral]"]);
            try {
                const [link, statsResult] = await Promise.all([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientReferralLink"])(clientId, token),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientReferralStats"])(clientId, token).then({
                        "AccountPageClient.useCallback[loadClientReferral]": (stats)=>({
                                stats
                            })
                    }["AccountPageClient.useCallback[loadClientReferral]"]).catch({
                        "AccountPageClient.useCallback[loadClientReferral]": (error)=>({
                                stats: null,
                                error: getErrorMessage(error)
                            })
                    }["AccountPageClient.useCallback[loadClientReferral]"])
                ]);
                setClientReferralStates({
                    "AccountPageClient.useCallback[loadClientReferral]": (currentStates)=>({
                            ...currentStates,
                            [clientId]: {
                                status: "ready",
                                link,
                                stats: statsResult.stats,
                                statsError: statsResult.error
                            }
                        })
                }["AccountPageClient.useCallback[loadClientReferral]"]);
            } catch (error) {
                setClientReferralStates({
                    "AccountPageClient.useCallback[loadClientReferral]": (currentStates)=>({
                            ...currentStates,
                            [clientId]: {
                                status: "error",
                                message: getErrorMessage(error)
                            }
                        })
                }["AccountPageClient.useCallback[loadClientReferral]"]);
            }
        }
    }["AccountPageClient.useCallback[loadClientReferral]"], []);
    const handleClientToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AccountPageClient.useCallback[handleClientToggle]": (clientId)=>{
            const isClosing = selectedClientId === clientId;
            const nextClientId = isClosing ? null : clientId;
            setSelectedClientId(nextClientId);
            if (!isClosing && accessToken && !clientReferralStates[clientId]) {
                void loadClientReferral(clientId, accessToken);
            }
        }
    }["AccountPageClient.useCallback[handleClientToggle]"], [
        accessToken,
        clientReferralStates,
        loadClientReferral,
        selectedClientId
    ]);
    const handleCreateClientReferralLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AccountPageClient.useCallback[handleCreateClientReferralLink]": async (clientId)=>{
            if (!accessToken) {
                return;
            }
            const currentState = clientReferralStates[clientId];
            const currentStats = currentState?.status === "ready" ? currentState.stats : null;
            setCreatingReferralClientId(clientId);
            try {
                const link = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClientReferralLink"])(clientId, accessToken);
                const stats = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getClientReferralStats"])(clientId, accessToken).catch({
                    "AccountPageClient.useCallback[handleCreateClientReferralLink]": ()=>currentStats
                }["AccountPageClient.useCallback[handleCreateClientReferralLink]"]);
                setClientReferralStates({
                    "AccountPageClient.useCallback[handleCreateClientReferralLink]": (currentStates)=>({
                            ...currentStates,
                            [clientId]: {
                                status: "ready",
                                link,
                                stats
                            }
                        })
                }["AccountPageClient.useCallback[handleCreateClientReferralLink]"]);
                showMessage("Referral link created.", setToast);
            } catch (error) {
                showMessage(getErrorMessage(error), setToast);
            } finally{
                setCreatingReferralClientId({
                    "AccountPageClient.useCallback[handleCreateClientReferralLink]": (currentClientId)=>currentClientId === clientId ? null : currentClientId
                }["AccountPageClient.useCallback[handleCreateClientReferralLink]"]);
            }
        }
    }["AccountPageClient.useCallback[handleCreateClientReferralLink]"], [
        accessToken,
        clientReferralStates
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPageClient.useEffect": ()=>{
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hasSupabaseBrowserConfig"])()) {
                return;
            }
            // Guard async session callbacks so unmounted account screens do not update
            // state after navigation.
            let isActive = true;
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])();
            // A recovery session can update a password but must not bootstrap product
            // data. Keep the account API entirely paused until recovery finishes.
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$password$2d$recovery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPasswordRecoveryInProgress"])()) {
                router.replace("/reset-password");
                return ({
                    "AccountPageClient.useEffect": ()=>{
                        isActive = false;
                    }
                })["AccountPageClient.useEffect"];
            }
            void supabase.auth.getSession().then({
                "AccountPageClient.useEffect": ({ data, error })=>{
                    if (!isActive) {
                        return;
                    }
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$password$2d$recovery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPasswordRecoveryInProgress"])()) {
                        router.replace("/reset-password");
                        return;
                    }
                    if (error) {
                        setLoadState({
                            status: "error",
                            message: error.message
                        });
                        return;
                    }
                    const token = data.session?.access_token ?? "";
                    setAccessToken(token);
                    void loadAccount(token);
                }
            }["AccountPageClient.useEffect"]);
            const { data: { subscription } } = supabase.auth.onAuthStateChange({
                "AccountPageClient.useEffect": (event, session)=>{
                    if (!isActive) {
                        return;
                    }
                    if (event === "PASSWORD_RECOVERY" || (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$auth$2f$password$2d$recovery$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPasswordRecoveryInProgress"])()) {
                        router.replace("/reset-password");
                        return;
                    }
                    const token = session?.access_token ?? "";
                    setAccessToken(token);
                    if (!token) {
                        setProfile(null);
                        setStylist(null);
                        setPlan(null);
                        setClients([]);
                        setClientsLoadState({
                            status: "idle"
                        });
                        setSelectedClientId(null);
                        setClientReferralStates({});
                        setCreatingReferralClientId(null);
                        setProfileForm(null);
                        setPublicForm(null);
                        setLoadState({
                            status: "auth"
                        });
                        return;
                    }
                    void loadAccount(token);
                }
            }["AccountPageClient.useEffect"]);
            return ({
                "AccountPageClient.useEffect": ()=>{
                    isActive = false;
                    subscription.unsubscribe();
                }
            })["AccountPageClient.useEffect"];
        }
    }["AccountPageClient.useEffect"], [
        loadAccount,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPageClient.useEffect": ()=>{
            setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
        }
    }["AccountPageClient.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPageClient.useEffect": ()=>{
            if (activeTab !== "clients" || loadState.status !== "ready" || clientsLoadState.status !== "idle") {
                return;
            }
            // Defer the client list fetch until the tab is visible; the profile screen
            // remains lighter on first load and avoids exposing client data unnecessarily.
            const timeoutId = window.setTimeout({
                "AccountPageClient.useEffect.timeoutId": ()=>{
                    void loadClients(accessToken);
                }
            }["AccountPageClient.useEffect.timeoutId"], 0);
            return ({
                "AccountPageClient.useEffect": ()=>window.clearTimeout(timeoutId)
            })["AccountPageClient.useEffect"];
        }
    }["AccountPageClient.useEffect"], [
        accessToken,
        activeTab,
        clientsLoadState.status,
        loadClients,
        loadState.status
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPageClient.useEffect": ()=>{
            if (!toast) {
                return;
            }
            const timeoutId = window.setTimeout({
                "AccountPageClient.useEffect.timeoutId": ()=>setToast(null)
            }["AccountPageClient.useEffect.timeoutId"], 2600);
            return ({
                "AccountPageClient.useEffect": ()=>window.clearTimeout(timeoutId)
            })["AccountPageClient.useEffect"];
        }
    }["AccountPageClient.useEffect"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AccountPageClient.useEffect": ()=>{
            if (!isCancelOpen) {
                return;
            }
            function handleKeyDown(event) {
                if (event.key === "Escape") {
                    setIsCancelOpen(false);
                }
            }
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "AccountPageClient.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["AccountPageClient.useEffect"];
        }
    }["AccountPageClient.useEffect"], [
        isCancelOpen
    ]);
    async function handleAuthSubmit(event) {
        event.preventDefault();
        setAuthBusy(true);
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])();
            if (authMode === "reset") {
                const { error } = await supabase.auth.resetPasswordForEmail(authEmail, {
                    redirectTo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuthRecoveryUrl"])()
                });
                if (error) {
                    throw error;
                }
                showMessage("If an account exists for that email, we’ve sent a password-reset link.", setToast);
                return;
            }
            const credentials = {
                email: authEmail,
                password: authPassword
            };
            const { error } = authMode === "sign-up" ? await supabase.auth.signUp(credentials) : await supabase.auth.signInWithPassword(credentials);
            if (error) {
                throw error;
            }
            showMessage(authMode === "sign-up" ? "Check your email to confirm your account." : "Signed in.", setToast);
        } catch (error) {
            showMessage(getErrorMessage(error), setToast);
        } finally{
            setAuthBusy(false);
        }
    }
    async function handleUpdatePassword(event) {
        event.preventDefault();
        if (!newPassword.trim()) {
            showMessage("Enter a new password.", setToast);
            return;
        }
        setAuthBusy(true);
        try {
            const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])().auth.updateUser({
                password: newPassword
            });
            if (error) {
                throw error;
            }
            setNewPassword("");
            showMessage("Password updated.", setToast);
        } catch (error) {
            showMessage(getErrorMessage(error), setToast);
        } finally{
            setAuthBusy(false);
        }
    }
    async function handleSignOut() {
        setAuthBusy(true);
        try {
            const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])().auth.signOut();
            if (error) {
                throw error;
            }
            setAccessToken("");
            setLoadState({
                status: "auth"
            });
        } catch (error) {
            showMessage(getErrorMessage(error), setToast);
        } finally{
            setAuthBusy(false);
        }
    }
    async function handleProfileSubmit(event) {
        event.preventDefault();
        if (!profileForm || !accessToken) {
            return;
        }
        const body = {
            full_name: profileForm.full_name,
            phone_number: profileForm.phone_number,
            business_name: profileForm.business_name,
            location_label: profileForm.location_label,
            avatar_image_id: profileForm.avatar_image_id,
            timezone: profileForm.timezone
        };
        setSavingProfile(true);
        try {
            const nextProfile = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateAccountProfile"])(accessToken, body);
            setProfile(nextProfile);
            setProfileForm(toProfileForm(nextProfile));
            showMessage("Profile saved.", setToast);
        } catch (error) {
            showMessage(getErrorMessage(error), setToast);
        } finally{
            setSavingProfile(false);
        }
    }
    async function handlePublicSubmit(event) {
        event.preventDefault();
        if (!publicForm || !accessToken) {
            return;
        }
        // Only submit gated fields when the plan includes them; the backend should
        // still enforce entitlements, but this avoids confusing user-side changes.
        const body = {
            display_name: publicForm.display_name,
            bio: normalizeOptionalText(publicForm.bio),
            instagram: normalizeOptionalText(publicForm.instagram),
            booking_enabled: publicForm.booking_enabled,
            booking_request_form_enabled: publicForm.booking_request_form_enabled
        };
        if (plan?.features.customSlug) {
            body.slug = publicForm.slug;
        }
        if (plan?.features.customCoverPhoto) {
            body.cover_photo_url = normalizeOptionalText(publicForm.cover_photo_url);
        }
        setSavingPublic(true);
        try {
            const nextStylist = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateStylistSettingsProfile"])(accessToken, body);
            setStylist(nextStylist);
            setPublicForm(toPublicProfileForm(nextStylist));
            showMessage("Public profile saved.", setToast);
        } catch (error) {
            showMessage(getErrorMessage(error), setToast);
        } finally{
            setSavingPublic(false);
        }
    }
    async function handlePublicPreview() {
        if (!publicForm || !stylist || !accessToken || previewCooldownSeconds > 0) {
            return;
        }
        // Open synchronously from the click handler so browsers do not treat the
        // eventual capability URL navigation as a popup.
        const previewWindow = window.open("", "_blank");
        if (!previewWindow) {
            setPreviewError({
                message: "Your browser blocked the preview tab. Allow popups, then try again."
            });
            return;
        }
        setPreviewingPublic(true);
        setPreviewError(null);
        try {
            const previewSession = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBookingPreviewSession"])(accessToken, {
                // Preview ownership and slug authorization are resolved by the API.
                // Never use the editable slug field here; it may not be persisted yet.
                slug: stylist.slug,
                draft_overrides: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$booking$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildBookingPreviewDraftOverrides"])(publicForm, stylist),
                client_context: {
                    source: "booking-settings-preview",
                    schema_version: "booking_preview_draft.v1"
                }
            });
            // The preview URL is a short-lived bearer capability. It is passed only
            // to the newly opened tab and never placed in state, logs, or analytics.
            previewWindow.opener = null;
            previewWindow.location.replace(previewSession.preview_url);
        } catch (error) {
            previewWindow.close();
            const nextPreviewError = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$booking$2d$preview$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBookingPreviewCreationError"])(error);
            setPreviewError(nextPreviewError);
            if (nextPreviewError.cooldownSeconds) {
                setPreviewCooldownUntil(Date.now() + nextPreviewError.cooldownSeconds * 1000);
            }
        } finally{
            setPreviewingPublic(false);
        }
    }
    function handlePreviewSettingsRefresh() {
        setPreviewError(null);
        void loadAccount(accessToken);
    }
    function updateProfileField(field, event) {
        setProfileForm((current)=>current ? {
                ...current,
                [field]: event.target.value
            } : current);
    }
    function updatePublicField(field, event) {
        setPublicForm((current)=>current ? {
                ...current,
                [field]: event.target.value
            } : current);
    }
    const canUpgrade = plan ? plan.tier !== "premium" : false;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#FAF7F2] text-foreground",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid min-h-screen w-full bg-[#FAF7F2] lg:grid-cols-[17rem_1fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccountSideNav"], {
                        activeTab: activeTab,
                        onTabChange: setActiveTab
                    }, void 0, false, {
                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                        lineNumber: 784,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "min-w-0 bg-[#FAF7F2] px-4 py-5 sm:px-7 sm:py-8 lg:px-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                className: "mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                className: "text-2xl font-extrabold tracking-tight text-[#111111] sm:text-3xl",
                                                children: activeTab === "dashboard" ? `Good morning${profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}` : "Account Management"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                                lineNumber: 789,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-sm leading-6 text-[#6B7280]",
                                                children: activeTab === "dashboard" ? "Here's what's happening with your chair." : "Manage your private account details, public booking identity, and plan access."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                                lineNumber: 794,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 788,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex w-fit items-center gap-2 rounded-[8px] border border-[#E4D6C3] bg-white px-3 py-2 text-xs font-bold text-[#1C1C1E] shadow-[0_8px_22px_rgba(17,17,17,0.04)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "h-2 w-2 rounded-full bg-[#22C55E]"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                                lineNumber: 801,
                                                columnNumber: 15
                                            }, this),
                                            plan ? plan.displayName : "Account portal"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 800,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                lineNumber: 787,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-w-0 flex-col gap-6",
                                children: [
                                    loadState.status === "config" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorPanel"], {
                                        message: loadState.message
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 808,
                                        columnNumber: 15
                                    }, this) : null,
                                    loadState.status === "auth" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthPanel"], {
                                        mode: authMode,
                                        email: authEmail,
                                        password: authPassword,
                                        isBusy: authBusy,
                                        onModeChange: setAuthMode,
                                        onEmailChange: setAuthEmail,
                                        onPasswordChange: setAuthPassword,
                                        onSubmit: handleAuthSubmit
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 812,
                                        columnNumber: 15
                                    }, this) : null,
                                    loadState.status === "loading" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingPanel"], {}, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 824,
                                        columnNumber: 47
                                    }, this) : null,
                                    loadState.status === "error" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ErrorPanel"], {
                                        message: loadState.message,
                                        onRetry: ()=>void loadAccount(accessToken)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 827,
                                        columnNumber: 15
                                    }, this) : null,
                                    loadState.status === "ready" && profile && stylist && plan && profileForm && publicForm ? activeTab === "dashboard" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardTabPanel"], {
                                        profile: profile,
                                        plan: plan
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 840,
                                        columnNumber: 17
                                    }, this) : activeTab === "profile" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProfileTabPanel"], {
                                        profile: profile,
                                        plan: plan,
                                        profileForm: profileForm,
                                        publicForm: publicForm,
                                        publicUrl: publicUrl,
                                        authBusy: authBusy,
                                        newPassword: newPassword,
                                        savingProfile: savingProfile,
                                        savingPublic: savingPublic,
                                        previewingPublic: previewingPublic,
                                        previewError: previewError,
                                        previewCooldownSeconds: previewCooldownSeconds,
                                        canUpgrade: canUpgrade,
                                        onNewPasswordChange: setNewPassword,
                                        onPasswordSubmit: handleUpdatePassword,
                                        onSignOut: handleSignOut,
                                        onProfileFieldChange: updateProfileField,
                                        onProfileSubmit: handleProfileSubmit,
                                        onPublicFieldChange: updatePublicField,
                                        onBookingEnabledChange: (booking_enabled)=>setPublicForm((current)=>current ? {
                                                    ...current,
                                                    booking_enabled
                                                } : current),
                                        onBookingRequestFormEnabledChange: (booking_request_form_enabled)=>setPublicForm((current)=>current ? {
                                                    ...current,
                                                    booking_request_form_enabled
                                                } : current),
                                        onPublicSubmit: handlePublicSubmit,
                                        onPublicPreview: handlePublicPreview,
                                        onPreviewSettingsRefresh: handlePreviewSettingsRefresh,
                                        onCancel: ()=>setIsCancelOpen(true),
                                        onSoon: (message)=>showMessage(message, setToast)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 842,
                                        columnNumber: 17
                                    }, this) : activeTab === "clients" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ClientsTabPanel"], {
                                        clients: clients,
                                        loadState: clientsLoadState,
                                        selectedClientId: selectedClientId,
                                        referralStates: clientReferralStates,
                                        creatingReferralClientId: creatingReferralClientId,
                                        canNativeShare: canNativeShare,
                                        onClientToggle: handleClientToggle,
                                        onCreateReferralLink: handleCreateClientReferralLink,
                                        onReferralRetry: (clientId)=>void loadClientReferral(clientId, accessToken),
                                        onMessage: (message)=>showMessage(message, setToast),
                                        onRetry: ()=>void loadClients(accessToken)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 883,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlankTabPanel"], {
                                        title: "Appointments"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                        lineNumber: 899,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                                lineNumber: 806,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                        lineNumber: 786,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                lineNumber: 783,
                columnNumber: 7
            }, this),
            toast ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToastMessage"], {
                message: toast.message
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                lineNumber: 906,
                columnNumber: 16
            }, this) : null,
            isCancelOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$components$2f$account$2f$AccountPanels$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CancelDialog"], {
                onClose: ()=>setIsCancelOpen(false),
                onSoon: (message)=>showMessage(message, setToast)
            }, void 0, false, {
                fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
                lineNumber: 909,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/web/src/components/account/AccountPageClient.tsx",
        lineNumber: 782,
        columnNumber: 5
    }, this);
}
_s(AccountPageClient, "JbMIijkk4xv2UxkJWhXROinRRVc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AccountPageClient;
var _c;
__turbopack_context__.k.register(_c, "AccountPageClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_web_src_0_00_9.._.js.map