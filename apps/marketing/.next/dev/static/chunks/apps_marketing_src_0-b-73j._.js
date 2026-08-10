(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/marketing/src/lib/urls.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMarketingOrigin",
    ()=>getMarketingOrigin,
    "getWebAppOrigin",
    ()=>getWebAppOrigin,
    "getWebAppUrl",
    ()=>getWebAppUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const LOCAL_MARKETING_ORIGIN = "http://localhost:3000";
const LOCAL_WEB_APP_ORIGIN = "http://localhost:3001";
const PRODUCTION_MARKETING_ORIGIN = "https://rootfoil.com";
const PRODUCTION_WEB_APP_ORIGIN = "https://rootfoil.app";
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
function getMarketingOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_MARKETING_URL", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_MARKETING_URL, getDefaultOrigin(LOCAL_MARKETING_ORIGIN, PRODUCTION_MARKETING_ORIGIN));
}
function getWebAppOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_WEB_APP_URL", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WEB_APP_URL, getDefaultOrigin(LOCAL_WEB_APP_ORIGIN, PRODUCTION_WEB_APP_ORIGIN));
}
function getWebAppUrl(path = "/") {
    return joinOriginAndPath(getWebAppOrigin(), path);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/marketing/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$marketing$2f$src$2f$lib$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/marketing/src/lib/urls.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const MONTHLY_PRICE = "$25";
const loginHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$marketing$2f$src$2f$lib$2f$urls$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getWebAppUrl"])("/login");
const productPillars = [
    {
        icon: "/assets/icons/icon-calendar-bronze.svg",
        title: "Stay booked.",
        body: "Make it effortless for clients to book and keep coming back",
        bullets: [
            "Online booking that’s always open",
            "Automated reminders that reduce no-shows",
            "Waitlist support to fill last-minute openings",
            "Re-book nudges to keep clients coming back"
        ],
        screenshot: "/assets/home/root-and-foil-phone-calendar.png",
        alt: "Root & Foil calendar screen showing appointments, open time, and booking controls"
    },
    {
        icon: "/assets/icons/icon-client-bronze.svg",
        title: "Remember every client.",
        body: "Give every client a personal, consistent experience",
        bullets: [
            "Client notes, preferences, and service history",
            "Color formulas for roots, toners, lighteners, developers, and more",
            "Before-and-after photos tied to each client",
            "Appointment history and rebooking patterns"
        ],
        screenshot: "/assets/home/root-and-foil-phone-clients.png",
        alt: "Root & Foil clients screen showing client list, notes, and client history"
    },
    {
        icon: "/assets/icons/icon-analytics-bronze.svg",
        title: "Grow with clarity",
        body: "Understand your client behavior and trends so you can grow with confidence.",
        bullets: [
            "Revenue, retention, and re-booking at a glance",
            "Average ticket, top services, and add-ons",
            "Trends and insights to guide your next move"
        ],
        screenshot: "/assets/home/root-and-foil-phone-insights.png",
        alt: "Root & Foil dashboard screen showing business snapshot and revenue insights"
    }
];
const philosophyItems = [
    {
        label: "Focused",
        icon: "user"
    },
    {
        label: "Built for you",
        icon: "sparkle"
    },
    {
        label: "No upgrades",
        icon: "heart"
    }
];
const corePricingItems = [
    "Every feature included",
    "No tiers, no add-ons",
    "Cancel anytime"
];
const includedFeatureColumns = [
    [
        "Online booking & custom rules",
        "Waitlist",
        "Client profiles & history",
        "Formula notes & photos",
        "Automated follow-ups"
    ],
    [
        "Business insights & reporting",
        "Rebooking nudges",
        "Referral tracking",
        "Calendar sync",
        "And more"
    ]
];
const footerGroups = [
    {
        title: "Product",
        links: [
            {
                label: "Product",
                href: "#product"
            },
            {
                label: "What’s Included",
                href: "#product"
            },
            {
                label: "Pricing",
                href: "#pricing"
            },
            {
                label: "Login",
                href: loginHref
            }
        ]
    },
    {
        title: "Company",
        links: [
            {
                label: "About",
                href: "#top"
            },
            {
                label: "Contact",
                href: "#"
            }
        ]
    },
    {
        title: "Legal",
        links: [
            {
                label: "Privacy Policy",
                href: "/privacy-policy"
            },
            {
                label: "Terms of Service",
                href: "/terms-of-service"
            }
        ]
    }
];
function MarketingLink({ href, children, variant = "primary", className = "" }) {
    const styles = {
        primary: "border border-[rgba(138,85,40,0.65)] bg-gradient-to-b from-[#C98A44] via-[#B07A3E] to-[#A96A32] text-white shadow-[0_18px_38px_rgba(176,122,62,0.20)] hover:border-brand-dark hover:from-[#B97939] hover:to-[#996534]",
        secondary: "border border-[#B07A3E] bg-transparent text-[#4A3728] hover:bg-[rgba(200,164,107,0.10)] hover:text-[#4A3728]",
        nav: "border border-[rgba(138,85,40,0.55)] bg-gradient-to-b from-[#C98A44] to-[#B07A3E] text-white shadow-[0_12px_28px_rgba(176,122,62,0.20)] hover:border-brand-dark hover:from-[#996534] hover:to-[#996534]"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: [
            "inline-flex h-11 items-center justify-center rounded-[8px] px-6 font-display text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#F6F1E8]",
            styles[variant],
            className
        ].join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c = MarketingLink;
function MarketingButton({ children, onClick, variant = "primary", className = "" }) {
    const styles = {
        primary: "border border-[rgba(138,85,40,0.65)] bg-gradient-to-b from-[#C98A44] via-[#B07A3E] to-[#A96A32] text-white shadow-[0_18px_38px_rgba(176,122,62,0.20)] hover:border-brand-dark hover:from-[#B97939] hover:to-[#996534]",
        nav: "border border-[rgba(138,85,40,0.55)] bg-gradient-to-b from-[#C98A44] to-[#B07A3E] text-white shadow-[0_12px_28px_rgba(176,122,62,0.20)] hover:border-brand-dark hover:from-[#996534] hover:to-[#996534]"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        className: [
            "inline-flex h-11 items-center justify-center rounded-[8px] px-6 font-display text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#F6F1E8]",
            styles[variant],
            className
        ].join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, this);
}
_c1 = MarketingButton;
function BrandLogo() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: "#top",
        className: "shrink-0 focus:outline-none focus:ring-2 focus:ring-brand/35",
        "aria-label": "Root & Foil",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            src: "/assets/brand/root-and-foil-navigation-logo.png",
            alt: "Root & Foil",
            width: 952,
            height: 1094,
            priority: true,
            className: "h-11 w-auto object-contain sm:h-12"
        }, void 0, false, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 185,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 180,
        columnNumber: 5
    }, this);
}
_c2 = BrandLogo;
function HomeNav({ onJoinWaitlist }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "relative z-20 mx-auto flex max-w-[1180px] flex-col items-start justify-between gap-4 px-5 py-5 sm:h-[76px] sm:flex-row sm:items-center sm:px-8 sm:py-0",
        "aria-label": "Primary",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandLogo, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "#product",
                        className: "font-display text-xs font-semibold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm",
                        children: "Product"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "#pricing",
                        className: "font-display text-xs font-semibold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm",
                        children: "Pricing"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: loginHref,
                        className: "font-display text-xs font-semibold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm",
                        children: "Login"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketingButton, {
                        onClick: onJoinWaitlist,
                        variant: "nav",
                        className: "h-9 px-4 text-xs sm:h-10 sm:px-5 sm:text-sm",
                        children: "Join Waitlist"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
_c3 = HomeNav;
function HomeHero({ onJoinWaitlist }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "top",
        className: "relative isolate overflow-hidden bg-[#F6F1E8] text-[#111111]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[radial-gradient(circle_at_12%_24%,rgba(232,211,163,0.42)_0%,rgba(232,211,163,0.12)_28%,transparent_54%),radial-gradient(circle_at_92%_18%,rgba(214,187,133,0.35)_0%,rgba(214,187,133,0.10)_34%,transparent_62%),linear-gradient(135deg,#F6F1E8_0%,#FFF8E8_48%,#F6F1E8_100%)]"
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.32)_44%,transparent_56%),linear-gradient(300deg,transparent_0%,rgba(200,164,107,0.12)_42%,transparent_65%)] opacity-60"
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeNav, {
                onJoinWaitlist: onJoinWaitlist
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto grid max-w-[1180px] gap-8 px-5 pb-12 pt-7 sm:px-8 lg:min-h-[610px] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-0 lg:pt-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[560px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "inline-flex items-center gap-2 rounded-[4px] border border-[#C8A46B] bg-[#FFFDF8]/35 px-3 py-1 text-[9px] font-extrabold uppercase tracking-[0.07em] text-brand sm:whitespace-nowrap",
                                children: "Designed for independent stylists and barbers"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-6 max-w-[530px] font-display text-[54px] font-bold leading-[0.9] tracking-normal text-[#111111] sm:text-[72px] lg:text-[78px]",
                                children: "Growth starts at the roots."
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-5 max-w-[520px] font-display text-[28px] font-bold leading-tight text-brand sm:text-[32px]",
                                children: "You built the roots - we add the lift."
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-5 max-w-[520px] text-[16px] leading-7 text-[#4F4A45] sm:text-[17px]",
                                children: "Root & Foil helps you stay booked, remember every client detail, and understand your business. Built only for independent hair professionals, Root & Foil gives you the tools you need without the complexity you don't, at a price that makes sense."
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 flex flex-col gap-3 sm:flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketingButton, {
                                        onClick: onJoinWaitlist,
                                        className: "w-full sm:w-auto",
                                        children: "Join Waitlist"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 268,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketingLink, {
                                        href: "#product",
                                        variant: "secondary",
                                        className: "w-full !font-sans !text-sm !font-semibold sm:w-auto",
                                        children: "See What's Included"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 274,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative -mr-5 min-h-[390px] sm:-mr-8 sm:min-h-[500px] lg:-mr-[calc((100vw-1180px)/2)] lg:h-[610px] lg:min-h-0 lg:self-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                src: "/marketing/stylist-hero.png",
                                alt: "Female stylist using a tablet in a salon",
                                fill: true,
                                priority: true,
                                sizes: "(min-width: 1180px) 660px, (min-width: 1024px) 56vw, 100vw",
                                className: "object-cover object-[58%_center]"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 286,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#F6F1E8] via-[#F6F1E8]/72 to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 238,
        columnNumber: 5
    }, this);
}
_c4 = HomeHero;
function HomeProductPillars() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "product",
        className: "border-t border-[rgba(200,164,107,0.30)] bg-transparent px-5 py-20 text-[#111111] sm:px-8 sm:py-24 lg:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1240px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[860px] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-[38px] font-bold leading-[1.02] tracking-normal sm:text-[48px] lg:text-[56px]",
                            children: "Everything you need to grow."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 309,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#4F4A45] sm:text-base",
                            children: "Root & Foil brings your clients, booking, formulas, follow-ups, and business insights together in one focused system designed to help independent hair professionals grow."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 312,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 308,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-11 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7",
                    children: productPillars.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "flex overflow-hidden rounded-[14px] border border-[rgba(176,122,62,0.35)] bg-[#FFFDF8]/80 shadow-[0_18px_45px_rgba(80,52,25,0.08)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-h-full w-full flex-col px-6 pb-0 pt-6 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid h-12 w-12 place-items-center rounded-full border border-[rgba(176,122,62,0.30)] bg-[rgba(214,168,90,0.12)]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: card.icon,
                                            alt: "",
                                            width: 24,
                                            height: 24,
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 327,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 326,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-6 font-display text-[30px] font-bold leading-[1.02] tracking-normal text-[#111111]",
                                        children: card.title
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 335,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-sm leading-7 text-[#4F4A45]",
                                        children: card.body
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 338,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 h-px w-12 bg-[#B07A3E]"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 341,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-6 grid gap-3",
                                        children: card.bullets.map((bullet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex gap-3 text-[13px] font-bold leading-5 text-[#4F4A45]",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-extrabold leading-none text-white",
                                                        "aria-hidden": "true",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                        lineNumber: 348,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: bullet
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, bullet, true, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 344,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 342,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-auto flex justify-center pt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            src: card.screenshot,
                                            alt: card.alt,
                                            width: 1122,
                                            height: 1402,
                                            sizes: "(min-width: 1024px) 300px, (min-width: 768px) 34vw, 78vw",
                                            className: "h-auto max-h-[360px] w-auto object-contain sm:max-h-[380px] lg:max-h-[410px]"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 359,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 358,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 325,
                                columnNumber: 15
                            }, this)
                        }, card.title, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 321,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 319,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 307,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 303,
        columnNumber: 5
    }, this);
}
_c5 = HomeProductPillars;
function PhilosophyIcon({ type }) {
    const className = "h-6 w-6";
    if (type === "user") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.7",
            className: className,
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "12",
                    cy: "8",
                    r: "4"
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 383,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M4.5 20c.8-4.1 3.3-6.2 7.5-6.2s6.7 2.1 7.5 6.2"
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 384,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 382,
            columnNumber: 7
        }, this);
    }
    if (type === "sparkle") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.7",
            className: className,
            "aria-hidden": "true",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 392,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "m19 3 .6 2.1L22 6l-2.4.9L19 9l-.6-2.1L16 6l2.4-.9L19 3Z"
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 393,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 391,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.7",
        className: className,
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M20.8 4.9a5.2 5.2 0 0 0-7.4 0L12 6.3l-1.4-1.4a5.2 5.2 0 0 0-7.4 7.4L12 21l8.8-8.7a5.2 5.2 0 0 0 0-7.4Z"
        }, void 0, false, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 400,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 399,
        columnNumber: 5
    }, this);
}
_c6 = PhilosophyIcon;
function CheckIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "grid h-5 w-5 shrink-0 place-items-center rounded-full border border-brand text-[11px] font-bold leading-none text-brand",
        "aria-hidden": "true",
        children: "✓"
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 407,
        columnNumber: 5
    }, this);
}
_c7 = CheckIcon;
function PhilosophyMessage({ index }) {
    if (index === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-display text-[27px] font-bold leading-[1.05] text-[#111111] sm:text-[30px]",
                    children: "We chose to focus."
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 417,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-sm leading-7 text-[#4F4A45]",
                    children: [
                        "Root & Foil is built specifically for independent hair professionals.",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        "Not restaurants. Not gyms.",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 422,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-brand",
                            children: "Just yours."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 418,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    if (index === 1) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-display text-[27px] font-bold leading-[1.05] text-[#111111] sm:text-[30px]",
                    children: "Every decision starts with you."
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 432,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-sm leading-7 text-[#4F4A45]",
                    children: [
                        "We build with one question in mind:",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "font-bold text-brand",
                            children: "Will this make it easier to run and grow"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 435,
                            columnNumber: 11
                        }, this),
                        " ",
                        "an independent hair business?"
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 433,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "font-display text-[27px] font-bold leading-[1.05] text-[#111111] sm:text-[30px]",
                children: "Our best ideas aren't upgrades."
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 444,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-4 text-sm leading-7 text-[#4F4A45]",
                children: [
                    "When Root & Foil gets better, every member gets the",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-bold text-brand",
                        children: "better"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this),
                    " product."
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 445,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c8 = PhilosophyMessage;
function HomePricing({ onJoinWaitlist }) {
    _s();
    const [activePhilosophy, setActivePhilosophy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "pricing",
        className: "border-t border-[rgba(200,164,107,0.30)] bg-transparent px-5 py-20 text-[#111111] sm:px-8 sm:py-24 lg:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1180px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[860px] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-[38px] font-bold leading-[1.02] tracking-normal sm:text-[48px] lg:text-[56px]",
                            children: [
                                "Why Root & Foil feels ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-brand",
                                    children: "different."
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 461,
                                    columnNumber: 39
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 460,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-5 max-w-[780px] text-[15px] leading-7 text-[#4F4A45] sm:text-base",
                            children: "We chose to focus so we can build what independent hair professionals actually need and leave out the rest."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 463,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 459,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 hidden lg:grid lg:grid-cols-3 lg:divide-x lg:divide-[rgba(200,164,107,0.38)]",
                    children: philosophyItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "px-10 text-center first:pl-0 last:pr-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto grid h-[82px] w-[82px] place-items-center rounded-full border border-[rgba(176,122,62,0.12)] bg-[rgba(214,168,90,0.12)] text-brand",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhilosophyIcon, {
                                        type: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 472,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 471,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mt-6 max-w-[270px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhilosophyMessage, {
                                        index: index
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 475,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 474,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, item.label, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 470,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 468,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-9 lg:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 overflow-hidden rounded-full border border-[rgba(176,122,62,0.38)] p-1",
                            role: "tablist",
                            "aria-label": "Why Root & Foil feels different",
                            children: philosophyItems.map((item, index)=>{
                                const selected = activePhilosophy === index;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "tab",
                                    id: `philosophy-tab-${index}`,
                                    "aria-selected": selected,
                                    "aria-controls": "philosophy-panel",
                                    onClick: ()=>setActivePhilosophy(index),
                                    className: `flex min-h-12 items-center justify-center gap-1 rounded-full px-1 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35 ${selected ? "border border-[rgba(176,122,62,0.32)] bg-[#FFFDF8] text-brand" : "text-[#4F4A45]"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhilosophyIcon, {
                                                type: item.icon
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 496,
                                                columnNumber: 46
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 496,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "leading-tight",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 497,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, item.label, true, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 486,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 482,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            id: "philosophy-panel",
                            role: "tabpanel",
                            "aria-labelledby": `philosophy-tab-${activePhilosophy}`,
                            className: "mt-5 rounded-[20px] border border-[rgba(200,164,107,0.32)] bg-[#FFFDF8]/50 px-6 py-8 text-center sm:px-10",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto grid h-16 w-16 place-items-center rounded-full border border-[rgba(176,122,62,0.12)] bg-[rgba(214,168,90,0.12)] text-brand",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhilosophyIcon, {
                                        type: philosophyItems[activePhilosophy].icon
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 505,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 504,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mt-5 max-w-[360px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhilosophyMessage, {
                                        index: activePhilosophy
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 508,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 507,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex justify-center gap-3",
                                    "aria-label": `Showing ${philosophyItems[activePhilosophy].label}`,
                                    children: philosophyItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `h-2 w-2 rounded-full ${index === activePhilosophy ? "bg-brand" : "bg-[#DDD6CF]"}`,
                                            "aria-hidden": "true"
                                        }, item.label, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 512,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 510,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 503,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 481,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 overflow-hidden rounded-[18px] border border-[rgba(200,164,107,0.48)] bg-[#FFFDF8]/75 sm:mt-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid lg:grid-cols-[0.86fr_1.14fr]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-display text-[34px] font-bold leading-[1.02] text-[#111111] sm:text-[42px]",
                                            children: "One straightforward price."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 521,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 flex items-end gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-display text-[68px] font-bold leading-none text-brand sm:text-[82px]",
                                                    children: MONTHLY_PRICE
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 523,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "pb-2 text-base font-bold text-[#1F1A17]",
                                                    children: "/month"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 524,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 522,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 h-px w-36 bg-[rgba(200,164,107,0.62)]"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 526,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-7 grid gap-4",
                                            children: corePricingItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-center gap-3 text-sm font-medium text-[#4F4A45]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                            lineNumber: 530,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: item
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                            lineNumber: 531,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, item, true, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 529,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 527,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 520,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-[rgba(200,164,107,0.38)] px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "max-w-[390px] font-display text-[28px] font-bold leading-[1.08] text-[#111111] sm:text-[34px]",
                                            children: "Everything you need to run and grow your hair business."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 538,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-7 grid grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-8",
                                            children: includedFeatureColumns.map((column, columnIndex)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "grid content-start gap-4",
                                                    children: column.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start gap-2 text-[11px] font-medium leading-5 text-[#4F4A45] sm:gap-3 sm:text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CheckIcon, {}, void 0, false, {
                                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                                    lineNumber: 544,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: feature
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                                    lineNumber: 545,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, feature, true, {
                                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                            lineNumber: 543,
                                                            columnNumber: 23
                                                        }, this))
                                                }, columnIndex, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 541,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 539,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 537,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 519,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-6 pb-8 sm:px-10 sm:pb-10 lg:pb-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketingButton, {
                                onClick: onJoinWaitlist,
                                className: "h-14 w-full !border-[#111111] !bg-[#111111] !px-8 !font-sans !text-base !text-white !shadow-none hover:!bg-[#2A2522] sm:mx-auto sm:w-[352px]",
                                children: "Join the waitlist"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 555,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 554,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 518,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 458,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 457,
        columnNumber: 5
    }, this);
}
_s(HomePricing, "Vuhsf6YSQOYBHUSpXhOqGJUHa0o=");
_c9 = HomePricing;
function WaitlistModal({ open, onClose }) {
    _s1();
    const modalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const closeButtonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const previousFocusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [fullName, setFullName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WaitlistModal.useEffect": ()=>{
            if (!open) {
                return;
            }
            previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            window.setTimeout({
                "WaitlistModal.useEffect": ()=>closeButtonRef.current?.focus()
            }["WaitlistModal.useEffect"], 0);
            return ({
                "WaitlistModal.useEffect": ()=>{
                    document.body.style.overflow = originalOverflow;
                    previousFocusRef.current?.focus();
                }
            })["WaitlistModal.useEffect"];
        }
    }["WaitlistModal.useEffect"], [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WaitlistModal.useEffect": ()=>{
            if (!open) {
                return;
            }
            function handleKeyDown(event) {
                if (event.key === "Escape") {
                    onClose();
                    return;
                }
                if (event.key !== "Tab" || !modalRef.current) {
                    return;
                }
                const focusableElements = modalRef.current.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])');
                if (focusableElements.length === 0) {
                    return;
                }
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                if (event.shiftKey && document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                } else if (!event.shiftKey && document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
            document.addEventListener("keydown", handleKeyDown);
            return ({
                "WaitlistModal.useEffect": ()=>document.removeEventListener("keydown", handleKeyDown)
            })["WaitlistModal.useEffect"];
        }
    }["WaitlistModal.useEffect"], [
        onClose,
        open
    ]);
    if (!open) {
        return null;
    }
    const validate = ()=>{
        const nextErrors = {};
        const trimmedName = fullName.trim();
        const trimmedEmail = email.trim();
        if (!trimmedName) {
            nextErrors.fullName = "Please enter your full name.";
        }
        if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            nextErrors.email = "Please enter a valid email address.";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };
    async function handleSubmit(event) {
        event.preventDefault();
        if (!validate()) {
            return;
        }
        setSubmitting(true);
        setErrors({});
        try {
            const response = await fetch("/api/waitlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    full_name: fullName.trim(),
                    email: email.trim(),
                    source: "homepage_waitlist"
                })
            });
            if (!response.ok) {
                throw new Error("Unable to submit waitlist request.");
            }
            setSubmitted(true);
        } catch  {
            setErrors({
                form: "We couldn't join the waitlist right now. Please try again."
            });
        } finally{
            setSubmitting(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex min-h-dvh items-start justify-center overflow-y-auto bg-[#111111]/62 px-3 py-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-[3px] sm:px-6 sm:py-6 lg:items-center",
        onMouseDown: (event)=>{
            if (event.target === event.currentTarget) {
                onClose();
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: modalRef,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": submitted ? "waitlist-success-title" : "waitlist-title",
            className: "relative w-full max-w-[940px] overflow-hidden rounded-[16px] border border-[rgba(214,168,90,0.50)] bg-[#FFFDF8] text-[#111111] shadow-[0_32px_95px_rgba(17,17,17,0.34)] sm:rounded-[22px] lg:my-auto",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    ref: closeButtonRef,
                    type: "button",
                    onClick: onClose,
                    className: "fixed right-4 top-[max(0.75rem,env(safe-area-inset-top))] z-[60] grid h-11 w-11 place-items-center rounded-full border border-[rgba(176,122,62,0.24)] bg-[#FFFDF8]/95 text-2xl leading-none text-[#111111] shadow-[0_10px_30px_rgba(17,17,17,0.18)] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand/35 sm:absolute sm:right-4 sm:top-4 sm:h-9 sm:w-9 sm:border-0 sm:bg-transparent sm:shadow-none sm:hover:bg-[#111111]/5",
                    "aria-label": "Close waitlist form",
                    children: "×"
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 720,
                    columnNumber: 9
                }, this),
                submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WaitlistSuccessState, {}, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 731,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid lg:grid-cols-[1.02fr_0.98fr]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative overflow-hidden bg-[radial-gradient(circle_at_18%_8%,rgba(214,168,90,0.25),transparent_32%),linear-gradient(145deg,#FFFDF8_0%,#FAF7F2_100%)] px-5 pb-6 pt-14 sm:px-10 sm:py-9 lg:px-12 lg:py-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    src: "/assets/brand/root-and-foil-chair-mark.png",
                                    alt: "",
                                    width: 416,
                                    height: 473,
                                    "aria-hidden": "true",
                                    className: "h-9 w-auto object-contain sm:h-12"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 735,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "waitlist-title",
                                    className: "mt-5 max-w-[360px] font-display text-[38px] font-bold leading-[0.95] tracking-normal text-[#111111] sm:mt-7 sm:text-[58px]",
                                    children: [
                                        "Request",
                                        " ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[#B7793D]",
                                            children: "early access"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 748,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 743,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-[420px] text-sm leading-6 text-[#4F4A45] sm:mt-6 sm:text-[15px] sm:leading-7",
                                    children: "Root & Foil is opening to a small group of independent stylists and barbers before public launch."
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 750,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 max-w-[420px] text-sm font-bold leading-6 text-[#1C1C1E] sm:mt-4",
                                    children: "Join the list and we'll reach out when we're ready."
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 754,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-5 grid gap-3 sm:mt-8 sm:gap-4",
                                    children: [
                                        "Built for independent stylists & barbers",
                                        "Simple to use. Powerful results.",
                                        "Be among the first to get access"
                                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-3 text-sm font-bold leading-5 text-[#4F4A45] sm:items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "aria-hidden": "true",
                                                    className: "grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[#D6A85A] bg-[#D6A85A]/15 text-sm leading-none text-[#B7793D]",
                                                    children: "✓"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 768,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 774,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, item, true, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 764,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 758,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 h-px w-20 bg-[#D6A85A] sm:mt-9"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 779,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#B7793D] sm:mt-4",
                                    children: "Thank you for your interest!"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 780,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 734,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative overflow-hidden px-5 py-6 sm:px-10 sm:py-9 lg:px-12 lg:py-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(214,168,90,0.24),transparent_30%),linear-gradient(160deg,rgba(250,247,242,0.82),rgba(255,255,255,0.96))]"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 786,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        className: "grid gap-4 sm:gap-5",
                                        onSubmit: handleSubmit,
                                        noValidate: true,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WaitlistField, {
                                                id: "waitlist-full-name",
                                                label: "Full name",
                                                value: fullName,
                                                placeholder: "Your full name",
                                                autoComplete: "name",
                                                error: errors.fullName,
                                                onChange: (value)=>{
                                                    setFullName(value);
                                                    if (errors.fullName) {
                                                        setErrors((current)=>({
                                                                ...current,
                                                                fullName: undefined
                                                            }));
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 789,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WaitlistField, {
                                                id: "waitlist-email",
                                                label: "Email address",
                                                type: "email",
                                                value: email,
                                                placeholder: "you@example.com",
                                                autoComplete: "email",
                                                error: errors.email,
                                                onChange: (value)=>{
                                                    setEmail(value);
                                                    if (errors.email) {
                                                        setErrors((current)=>({
                                                                ...current,
                                                                email: undefined
                                                            }));
                                                    }
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 806,
                                                columnNumber: 19
                                            }, this),
                                            errors.form ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700",
                                                children: errors.form
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 826,
                                                columnNumber: 21
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: submitting,
                                                className: "mt-1 inline-flex h-12 w-full items-center justify-center rounded-[8px] border border-[rgba(138,85,40,0.65)] bg-gradient-to-b from-[#C98A44] via-[#B07A3E] to-[#A96A32] px-6 font-display text-sm font-semibold text-white shadow-[0_18px_38px_rgba(176,122,62,0.20)] transition hover:border-brand-dark hover:from-[#B97939] hover:to-[#996534] focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#FFFDF8] disabled:cursor-not-allowed disabled:opacity-70",
                                                children: submitting ? "Joining..." : "Join the waitlist"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 831,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center text-xs leading-5 text-[#6B7280]",
                                                children: "We respect your privacy. We'll only use your email for Root & Foil updates."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 839,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 788,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 787,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 785,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 733,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 713,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 705,
        columnNumber: 5
    }, this);
}
_s1(WaitlistModal, "9BG2rvZb6FkQj7nAGZwMT7btm9M=");
_c10 = WaitlistModal;
function WaitlistField({ id, label, value, placeholder, onChange, autoComplete, error, type = "text" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1C1C1E]",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 874,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                id: id,
                type: type,
                value: value,
                placeholder: placeholder,
                autoComplete: autoComplete,
                "aria-invalid": Boolean(error),
                "aria-describedby": error ? `${id}-error` : undefined,
                onChange: (event)=>onChange(event.target.value),
                className: "mt-2 h-12 w-full rounded-[8px] border border-[rgba(176,122,62,0.28)] bg-white px-4 text-sm text-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition placeholder:text-[#8A7E72] focus:border-[#B7793D] focus:ring-4 focus:ring-[#D6A85A]/20"
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 880,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `${id}-error`,
                className: "mt-2 text-sm font-semibold text-red-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 892,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 873,
        columnNumber: 5
    }, this);
}
_c11 = WaitlistField;
function WaitlistSuccessState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative grid min-h-[520px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(214,168,90,0.26),transparent_28%),linear-gradient(145deg,#FFFDF8_0%,#FAF7F2_100%)] px-7 py-14 text-center sm:px-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#D6A85A]/12 blur-3xl"
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 903,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative mx-auto max-w-[430px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto grid h-20 w-20 place-items-center rounded-full border-2 border-[#B7793D] bg-white/60 text-4xl text-[#B7793D]",
                        children: "✓"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 905,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "waitlist-success-title",
                        className: "mt-8 font-display text-[44px] font-bold leading-none text-[#111111] sm:text-[54px]",
                        children: "You're on the list!"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 908,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mx-auto mt-5 max-w-[320px] text-[15px] leading-7 text-[#4F4A45]",
                        children: "Thanks - we'll be in touch when early access to Root & Foil is ready."
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 914,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": "true",
                        className: "mx-auto mt-10 grid h-24 w-28 place-items-center rounded-[14px] border border-[#D6A85A] bg-white/45 text-5xl text-[#B7793D] shadow-[0_18px_45px_rgba(80,52,25,0.08)]",
                        children: "✉"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 917,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 904,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 902,
        columnNumber: 5
    }, this);
}
_c12 = WaitlistSuccessState;
function HomeFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t border-[rgba(200,164,107,0.30)] bg-[#FFFDF8]/55 px-5 py-10 text-[#111111] sm:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1.15fr_2fr_auto]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandLogo, {}, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 933,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 max-w-[280px] text-sm leading-6 text-[#4F4A45]",
                            children: "Built for independent beauty pros. Designed to help you grow."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 934,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 932,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-6 sm:grid-cols-3",
                    children: footerGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xs font-extrabold uppercase tracking-[0.1em] text-[#111111]",
                                    children: group.title
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 942,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-3 grid gap-2",
                                    children: group.links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm font-semibold text-[#4F4A45] transition-colors hover:text-brand",
                                                children: link.label
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 948,
                                                columnNumber: 21
                                            }, this)
                                        }, link.label, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 947,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 945,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, group.title, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 941,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 939,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-semibold text-[#4F4A45] md:text-right",
                    children: [
                        "© 2026 Root & Foil",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 963,
                            columnNumber: 11
                        }, this),
                        "All rights reserved."
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 961,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 931,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 930,
        columnNumber: 5
    }, this);
}
_c13 = HomeFooter;
function HomePage() {
    _s2();
    const [waitlistOpen, setWaitlistOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const openWaitlist = ()=>setWaitlistOpen(true);
    const closeWaitlist = ()=>setWaitlistOpen(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#F6F1E8] text-[#111111]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeHero, {
                onJoinWaitlist: openWaitlist
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 978,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeProductPillars, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 979,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomePricing, {
                onJoinWaitlist: openWaitlist
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 980,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeFooter, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 981,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WaitlistModal, {
                open: waitlistOpen,
                onClose: closeWaitlist
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 982,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 977,
        columnNumber: 5
    }, this);
}
_s2(HomePage, "r4I0S87DDyME7xFX6YtosScUcBY=");
_c14 = HomePage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "MarketingLink");
__turbopack_context__.k.register(_c1, "MarketingButton");
__turbopack_context__.k.register(_c2, "BrandLogo");
__turbopack_context__.k.register(_c3, "HomeNav");
__turbopack_context__.k.register(_c4, "HomeHero");
__turbopack_context__.k.register(_c5, "HomeProductPillars");
__turbopack_context__.k.register(_c6, "PhilosophyIcon");
__turbopack_context__.k.register(_c7, "CheckIcon");
__turbopack_context__.k.register(_c8, "PhilosophyMessage");
__turbopack_context__.k.register(_c9, "HomePricing");
__turbopack_context__.k.register(_c10, "WaitlistModal");
__turbopack_context__.k.register(_c11, "WaitlistField");
__turbopack_context__.k.register(_c12, "WaitlistSuccessState");
__turbopack_context__.k.register(_c13, "HomeFooter");
__turbopack_context__.k.register(_c14, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_marketing_src_0-b-73j._.js.map