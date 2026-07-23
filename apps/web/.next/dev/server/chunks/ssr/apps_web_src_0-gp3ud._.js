module.exports = [
"[project]/apps/web/src/lib/config/public.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    return getAbsoluteOrigin("NEXT_PUBLIC_WEB_APP_URL", process.env.NEXT_PUBLIC_WEB_APP_URL, LOCAL_WEB_APP_ORIGIN);
}
function getMarketingOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_MARKETING_URL", process.env.NEXT_PUBLIC_MARKETING_URL, LOCAL_MARKETING_ORIGIN);
}
function getBrowserApiOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_API_BASE_URL", process.env.NEXT_PUBLIC_API_BASE_URL, LOCAL_BACKEND_API_ORIGIN);
}
function getSupabaseBrowserConfig() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
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
}),
"[project]/apps/web/src/lib/supabase.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSupabaseBrowserClient",
    ()=>getSupabaseBrowserClient,
    "hasSupabaseBrowserConfig",
    ()=>hasSupabaseBrowserConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/config/public.ts [app-ssr] (ecmascript)");
;
;
let browserClient = null;
function hasSupabaseBrowserConfig() {
    // Only NEXT_PUBLIC Supabase values belong in this client bundle; service-role
    // keys must stay server-side and are intentionally not referenced here.
    return Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseBrowserConfig"])());
}
function getSupabaseBrowserClient() {
    const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseBrowserConfig"])();
    const supabaseUrl = config?.url;
    const supabaseAnonKey = config?.anonKey;
    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    }
    // Reuse one browser client so auth subscriptions and session storage are not
    // duplicated across account/login screens.
    browserClient ??= (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
    return browserClient;
}
}),
"[project]/apps/web/src/components/auth/LoginScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginScreen",
    ()=>LoginScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/web/src/lib/config/public.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    return "Something went wrong.";
}
function LoginScreen({ initialMode, nextPath }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialMode);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isBusy, setIsBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasSupabaseBrowserConfig"])() ? "" : "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
    const title = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (mode === "sign-up") {
            return "Create your account";
        }
        if (mode === "reset") {
            return "Reset your password";
        }
        if (mode === "update-password") {
            return "Choose a new password";
        }
        return "Welcome back";
    }, [
        mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasSupabaseBrowserConfig"])()) {
            return;
        }
        // Supabase owns the browser session. This screen only redirects after a
        // valid session exists, and password recovery temporarily switches modes.
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])();
        void supabase.auth.getSession().then(({ data })=>{
            if (data.session && mode !== "update-password") {
                router.replace(nextPath);
            }
        });
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session)=>{
            if (event === "PASSWORD_RECOVERY") {
                setMode("update-password");
                return;
            }
            if (session && mode !== "update-password") {
                router.replace(nextPath);
            }
        });
        return ()=>subscription.unsubscribe();
    }, [
        mode,
        nextPath,
        router
    ]);
    async function handleSubmit(event) {
        event.preventDefault();
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hasSupabaseBrowserConfig"])()) {
            setErrorMessage("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.");
            return;
        }
        setIsBusy(true);
        setMessage("");
        setErrorMessage("");
        try {
            const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSupabaseBrowserClient"])();
            if (mode === "reset") {
                // Use same-origin redirects so Supabase recovery links return to this
                // frontend and preserve the sanitized next path.
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$web$2f$src$2f$lib$2f$config$2f$public$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAuthRecoveryUrl"])(nextPath)
                });
                if (error) {
                    throw error;
                }
                setMessage("Password reset email sent.");
                return;
            }
            if (mode === "update-password") {
                const { error } = await supabase.auth.updateUser({
                    password: newPassword
                });
                if (error) {
                    throw error;
                }
                setMessage("Password updated.");
                router.replace(nextPath);
                return;
            }
            const credentials = {
                email,
                password
            };
            // Auth is intentionally client-side with the public anon key; protected
            // app data is fetched later through API calls with the session token.
            const { data, error } = mode === "sign-up" ? await supabase.auth.signUp(credentials) : await supabase.auth.signInWithPassword(credentials);
            if (error) {
                throw error;
            }
            if (data.session) {
                router.replace(nextPath);
                return;
            }
            setMessage("Check your email to confirm your account.");
        } catch (error) {
            setErrorMessage(getErrorMessage(error));
        } finally{
            setIsBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex min-h-screen items-center justify-center px-4 py-10 text-foreground sm:px-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_28px_90px_rgba(17,17,17,0.12)] lg:grid-cols-[0.9fr_1.1fr]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex min-h-[22rem] flex-col justify-between bg-[#111111] px-6 py-7 text-white sm:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/branding/dripdesk-logo-wordmark-light.svg",
                                alt: "DripDesk",
                                width: 720,
                                height: 160,
                                priority: true,
                                className: "h-auto w-[190px]"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                lineNumber: 164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-8 max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl",
                                children: "The business side of beauty"
                            }, void 0, false, {
                                fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                    lineNumber: 162,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-7 sm:px-8 sm:py-9",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            children: [
                                "sign-in",
                                "sign-up",
                                "reset"
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setMode(item);
                                        setMessage("");
                                        setErrorMessage("");
                                    },
                                    className: [
                                        "h-10 rounded-2xl px-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/25",
                                        mode === item ? "bg-brand text-white" : "border border-border bg-surface-warm text-muted"
                                    ].join(" "),
                                    children: item === "sign-in" ? "Sign in" : item === "sign-up" ? "Sign up" : "Reset"
                                }, item, false, {
                                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                            lineNumber: 179,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-8 text-3xl font-semibold tracking-tight",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleSubmit,
                            className: "mt-6 grid gap-4",
                            children: [
                                mode !== "update-password" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: email,
                                            onChange: (event)=>setEmail(event.target.value),
                                            className: "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20",
                                            type: "email",
                                            autoComplete: "email",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                            lineNumber: 215,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this) : null,
                                mode === "sign-in" || mode === "sign-up" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]",
                                            children: "Password"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                            lineNumber: 228,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: password,
                                            onChange: (event)=>setPassword(event.target.value),
                                            className: "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20",
                                            type: "password",
                                            autoComplete: mode === "sign-up" ? "new-password" : "current-password",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                    lineNumber: 227,
                                    columnNumber: 15
                                }, this) : null,
                                mode === "update-password" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[#6B7280]",
                                            children: "New password"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                            lineNumber: 246,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: newPassword,
                                            onChange: (event)=>setNewPassword(event.target.value),
                                            className: "h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20",
                                            type: "password",
                                            autoComplete: "new-password",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this) : null,
                                message ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "rounded-2xl border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-3 text-sm font-semibold text-[#15803D]",
                                    children: message
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                    lineNumber: 261,
                                    columnNumber: 15
                                }, this) : null,
                                errorMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "rounded-2xl border border-[#FECACA] bg-[#FFF7F7] px-4 py-3 text-sm font-semibold text-[#B91C1C]",
                                    children: errorMessage
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                    lineNumber: 267,
                                    columnNumber: 15
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: isBusy,
                                    className: "mt-2 inline-flex h-12 items-center justify-center rounded-2xl bg-brand px-5 text-sm font-semibold text-white shadow-[0_16px_30px_rgba(183,121,61,0.23)] transition-transform hover:-translate-y-0.5 hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60",
                                    children: isBusy ? "Working..." : mode === "sign-up" ? "Create account" : mode === "reset" ? "Send reset email" : mode === "update-password" ? "Update password" : "Sign in"
                                }, void 0, false, {
                                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
            lineNumber: 161,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/web/src/components/auth/LoginScreen.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=apps_web_src_0-gp3ud._.js.map