module.exports = [
"[project]/apps/marketing/src/lib/urls.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getMarketingOrigin",
    ()=>getMarketingOrigin,
    "getWebAppOrigin",
    ()=>getWebAppOrigin,
    "getWebAppUrl",
    ()=>getWebAppUrl
]);
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
    return getAbsoluteOrigin("NEXT_PUBLIC_MARKETING_URL", process.env.NEXT_PUBLIC_MARKETING_URL, getDefaultOrigin(LOCAL_MARKETING_ORIGIN, PRODUCTION_MARKETING_ORIGIN));
}
function getWebAppOrigin() {
    return getAbsoluteOrigin("NEXT_PUBLIC_WEB_APP_URL", process.env.NEXT_PUBLIC_WEB_APP_URL, getDefaultOrigin(LOCAL_WEB_APP_ORIGIN, PRODUCTION_WEB_APP_ORIGIN));
}
function getWebAppUrl(path = "/") {
    return joinOriginAndPath(getWebAppOrigin(), path);
}
}),
"[project]/apps/marketing/src/app/barber/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BarberLandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$marketing$2f$src$2f$lib$2f$urls$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/apps/marketing/src/lib/urls.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const loginHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$marketing$2f$src$2f$lib$2f$urls$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWebAppUrl"])("/login");
const signUpHref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$apps$2f$marketing$2f$src$2f$lib$2f$urls$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getWebAppUrl"])("/login?mode=sign-up");
const MONTHLY_PRICE = "$25";
const barberValueCards = [
    {
        icon: "/assets/icons/icon-calendar-bronze.svg",
        title: "Stay booked.",
        body: "Make it effortless for clients to book and keep coming back",
        bullets: [
            "24/7 online booking that works around your schedule.",
            "Automated reminders to reduce no-shows",
            "Smart outreach nudges + waitlists to keep your chair full"
        ],
        screenshot: "/assets/home/root-foil-calendar-iphone-refined.png",
        alt: "Root & Foil calendar screen showing appointments, open time, and booking controls"
    },
    {
        icon: "/assets/icons/icon-client-bronze.svg",
        title: "Remember every client.",
        body: "Give every client a personal, consistent experience",
        bullets: [
            "Notes, preferences, photos + complete service history",
            "Color formulas saved to each client profile",
            "Appointment history and rebooking patterns at a glance"
        ],
        screenshot: "/assets/home/root-foil-clients-iphone-refined.png",
        alt: "Root & Foil clients screen showing client list, notes, and client history"
    },
    {
        icon: "/assets/icons/icon-analytics-bronze.svg",
        title: "Grow with clarity.",
        body: "Understand your client behavior and trends so you can grow with confidence.",
        bullets: [
            "Client insights — retention, rebooking, and visit patterns",
            "Revenue insights — average ticket, top services, and trends",
            "Scheduling insights — booking patterns, gaps, and opportunities"
        ],
        screenshot: "/assets/home/root-foil-insights-iphone-refined.png",
        alt: "Root & Foil dashboard screen showing business snapshot and revenue insights"
    }
];
const philosophyItems = [
    {
        label: "Simple",
        icon: "user"
    },
    {
        label: "Tailored",
        icon: "sparkle"
    },
    {
        label: "All-Access",
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
        "Automated follow-ups",
        "SMS Appt. reminders"
    ],
    [
        "Business insights & reporting",
        "Rebooking nudges",
        "Referral tracking",
        "Calendar sync",
        "Custom email campaigns",
        "And more"
    ]
];
const commandBullets = [
    "Stay organized and look more professional",
    "Save time by automating the busy work",
    "Manage clients and build loyalty",
    "Track your income and grow with confidence"
];
const footerGroups = [
    {
        title: "Product",
        links: [
            {
                label: "Features",
                href: "#features"
            },
            {
                label: "Pricing",
                href: "#pricing"
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
                label: "Blog",
                href: "#"
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
                href: "#"
            },
            {
                label: "Terms of Service",
                href: "#"
            }
        ]
    }
];
function BarberButton({ href, children, variant = "primary", className = "" }) {
    const styles = {
        primary: "border border-brand bg-gradient-to-b from-[#C9823F] to-brand text-white shadow-[0_18px_42px_rgba(183,121,61,0.22)] hover:border-brand-gold hover:from-brand-gold hover:to-brand",
        secondary: "border border-brand/80 bg-transparent text-white hover:border-brand-gold hover:bg-brand/12",
        nav: "border border-brand bg-gradient-to-b from-[#C9823F] to-brand text-white hover:border-brand-gold hover:from-brand-gold hover:to-brand"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: [
            "inline-flex h-11 items-center justify-center rounded-[8px] px-6 text-sm font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold/45 focus:ring-offset-2 focus:ring-offset-[#111111]",
            styles[variant],
            className
        ].join(" "),
        children: children
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
function BarberLogo({ className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        href: "#top",
        className: `shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${className}`,
        "aria-label": "Root & Foil",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            src: "/assets/brand/root-foil-roots-mark.svg",
            alt: "Root & Foil",
            width: 147,
            height: 147,
            priority: true,
            className: "h-11 w-11 object-contain lg:h-14 lg:w-14"
        }, void 0, false, {
            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
            lineNumber: 137,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
function BarberNav() {
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "relative z-20 mx-auto flex h-[76px] max-w-[1180px] items-center justify-between px-5 sm:px-8 lg:h-[84px]",
        "aria-label": "Primary",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberLogo, {
                className: "lg:hidden"
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-auto hidden items-center gap-8 lg:flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "#features",
                        className: "text-sm font-extrabold text-white/84 transition-colors hover:text-brand-gold",
                        children: "Product"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "#pricing",
                        className: "text-sm font-extrabold text-white/84 transition-colors hover:text-brand-gold",
                        children: "Pricing"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: loginHref,
                        className: "text-sm font-extrabold text-white/84 transition-colors hover:text-brand-gold",
                        children: "Login"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-auto flex items-center gap-2 lg:ml-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberButton, {
                        href: signUpHref,
                        variant: "nav",
                        className: "h-9 px-3 text-xs sm:px-4 lg:h-10 lg:px-5 lg:text-sm",
                        children: "Join Waitlist"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": menuOpen ? "Close navigation" : "Open navigation",
                        "aria-expanded": menuOpen,
                        "aria-controls": "barber-mobile-navigation",
                        onClick: ()=>setMenuOpen((open)=>!open),
                        className: "inline-flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-gold/45 lg:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Menu"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 196,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "grid gap-1.5",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-0.5 w-5 bg-current"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-0.5 w-5 bg-current"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 199,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "h-0.5 w-5 bg-current"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                id: "barber-mobile-navigation",
                className: "absolute left-5 right-5 top-[68px] grid rounded-lg border border-[#C8A46B]/55 bg-[#FFFDF8] p-3 shadow-[0_18px_42px_rgba(0,0,0,0.38)] sm:left-8 sm:right-8 lg:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "#features",
                        onClick: ()=>setMenuOpen(false),
                        className: "rounded-md px-4 py-3 text-sm font-extrabold text-[#1F1A17] hover:bg-[#F6F1E8]",
                        children: "Product"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "#pricing",
                        onClick: ()=>setMenuOpen(false),
                        className: "rounded-md px-4 py-3 text-sm font-extrabold text-[#1F1A17] hover:bg-[#F6F1E8]",
                        children: "Pricing"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: loginHref,
                        onClick: ()=>setMenuOpen(false),
                        className: "rounded-md px-4 py-3 text-sm font-extrabold text-[#1F1A17] hover:bg-[#F6F1E8]",
                        children: "Login"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 206,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
function PhoneScreenshot({ src, alt, className = "" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: [
            "relative mx-auto aspect-[1122/1402] w-full max-w-[245px] drop-shadow-[0_24px_42px_rgba(17,17,17,0.16)]",
            className
        ].join(" "),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            src: src,
            alt: alt,
            fill: true,
            sizes: "245px",
            className: "object-contain"
        }, void 0, false, {
            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
            lineNumber: 235,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 229,
        columnNumber: 5
    }, this);
}
function BarberHero() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "top",
        className: "relative isolate overflow-hidden bg-[#111111] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(214,168,90,0.2),transparent_28%),linear-gradient(110deg,#050505_0%,#111111_44%,#1C1C1E_100%)]"
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberNav, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mx-auto grid max-w-[1180px] gap-8 px-5 pb-14 pt-7 sm:px-8 lg:min-h-[610px] lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:pb-0 lg:pt-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-[640px] lg:pb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/assets/brand/root-foil-full-logo-transparent.png",
                                alt: "Root & Foil",
                                width: 1169,
                                height: 1157,
                                priority: true,
                                className: "mx-auto mb-5 w-[210px] object-contain lg:mx-0 lg:mb-6 lg:w-[220px]"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "inline-flex items-center gap-2 rounded-[4px] border border-brand/80 bg-black/20 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#FAF7F2]",
                                children: "DESIGNED FOR INDEPENDENT STYLISTS AND BARBERS"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-6 max-w-[530px] font-display text-[54px] font-bold leading-[0.9] tracking-normal text-[#FAF7F2] sm:text-[72px] lg:text-[78px]",
                                children: "Growth starts at the roots."
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mt-5 max-w-[520px] whitespace-nowrap font-display text-[clamp(16px,4.8vw,28px)] font-bold leading-tight tracking-[-0.01em] text-brand-gold sm:text-[32px]",
                                children: "The business side of barbering"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-6 max-w-[520px] text-[16px] leading-7 text-white/76 sm:text-[17px]",
                                children: "Root & Foil helps you stay booked, remember every client, and understand your business. You get the tools you need without the complexity you don't, at a price that makes sense"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 277,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-8 flex flex-col gap-3 sm:flex-row",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberButton, {
                                        href: signUpHref,
                                        className: "w-full sm:w-auto",
                                        children: "Join Waitlist"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 284,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberButton, {
                                        href: "#features",
                                        variant: "secondary",
                                        className: "w-full sm:w-auto",
                                        children: "See What's Included"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 287,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 283,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative -mr-5 min-h-[390px] sm:-mr-8 sm:min-h-[500px] lg:-mr-[calc((100vw-1180px)/2)] lg:-mt-8 lg:h-[712px] lg:min-h-0 lg:self-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: "/assets/home/hero-barber-standing.webp",
                                alt: "Barber in a dark barbershop using a tablet",
                                fill: true,
                                priority: true,
                                sizes: "(min-width: 1180px) 660px, (min-width: 1024px) 56vw, 100vw",
                                className: "object-cover object-[72%_center]",
                                style: {
                                    maskImage: "linear-gradient(to bottom, transparent 0, black 96px)",
                                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0, black 96px)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 bg-[linear-gradient(90deg,#111111_0%,rgba(17,17,17,0.82)_18%,rgba(17,17,17,0.16)_58%,rgba(17,17,17,0.5)_100%),linear-gradient(180deg,rgba(17,17,17,0.1)_0%,#111111_100%)]"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                        lineNumber: 298,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 255,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 248,
        columnNumber: 5
    }, this);
}
function BarberValueCards() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "features",
        className: "border-t border-brand/20 bg-[#111111] px-5 py-20 text-white sm:px-8 sm:py-24 lg:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1180px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[860px] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "whitespace-nowrap font-display text-[clamp(19px,6vw,38px)] font-bold leading-[1.02] tracking-[-0.01em] text-[#FAF7F2] sm:text-[48px] lg:text-[56px]",
                            children: "Everything you need to grow."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 327,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-white/66 sm:text-base",
                            children: "Root & Foil brings your clients, booking, formulas, follow-ups, and business insights together in one focused system designed to help independent hair professionals grow."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 330,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 326,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-11 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7",
                    children: barberValueCards.map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "flex overflow-hidden rounded-[14px] border border-brand/35 bg-[#141414] shadow-[0_22px_44px_rgba(0,0,0,0.22)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-h-full w-full flex-col px-6 pb-0 pt-6 sm:px-7 sm:pt-7 lg:px-8 lg:pt-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid h-12 w-12 place-items-center rounded-full border border-brand/50 bg-brand/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: card.icon,
                                            alt: "",
                                            width: 24,
                                            height: 24,
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 345,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 344,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-6 font-display text-[30px] font-bold leading-[1.02] tracking-normal text-[#FAF7F2]",
                                        children: card.title
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 347,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-sm leading-7 text-white/64",
                                        children: card.body
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 h-px w-12 bg-brand-gold"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 349,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "mt-6 grid gap-3",
                                        children: card.bullets.map((bullet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex gap-3 text-[13px] font-bold leading-5 text-white/72",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-[11px] font-extrabold leading-none text-white",
                                                        "aria-hidden": "true",
                                                        children: "✓"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: bullet
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                        lineNumber: 354,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, bullet, true, {
                                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                lineNumber: 352,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 350,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-auto flex justify-center pt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: card.screenshot,
                                            alt: card.alt,
                                            width: 1122,
                                            height: 1402,
                                            sizes: "(min-width: 1024px) 300px, (min-width: 768px) 34vw, 78vw",
                                            className: "h-auto max-h-[360px] w-auto object-contain sm:max-h-[380px] lg:max-h-[410px]"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 359,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                        lineNumber: 358,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 343,
                                columnNumber: 15
                            }, this)
                        }, card.icon, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 339,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 337,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
            lineNumber: 325,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 321,
        columnNumber: 5
    }, this);
}
function BarberCommandCenter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "overflow-hidden border-t border-[#E4D6C3]/55 bg-[#FFFDF8] px-5 py-10 text-[#111111] sm:px-8 sm:py-14",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto grid max-w-[1180px] gap-8 lg:grid-cols-[0.66fr_1.34fr] lg:items-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-extrabold uppercase tracking-[0.12em] text-brand",
                            children: "All-in-one business hub"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 375,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-4 font-display text-[38px] font-bold leading-[1] tracking-normal text-[#111111] sm:text-[48px]",
                            children: [
                                "A cleaner command",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 380,
                                    columnNumber: 13
                                }, this),
                                "center for your chair."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 378,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-5 max-w-[400px] text-[15px] leading-7 text-[#6B7280]",
                            children: "Stop juggling apps, texts, and screenshots. DripDesk gives you everything you need to run your business — in one simple place."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "mt-7 grid gap-3",
                            children: commandBullets.map((bullet)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "flex gap-3 text-[13px] font-bold text-[#1C1C1E]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            src: "/assets/icons/icon-check-bronze.svg",
                                            alt: "",
                                            width: 22,
                                            height: 22,
                                            "aria-hidden": "true",
                                            className: "mt-0.5 h-5 w-5 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 392,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: bullet
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 400,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, bullet, true, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 391,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 389,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 374,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-5 sm:flex-row sm:items-end sm:justify-end sm:gap-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PhoneScreenshot, {
                            src: "/assets/home/barber-activity-iphone.png",
                            alt: "DripDesk activity screen shown on an iPhone",
                            className: "sm:-ml-0 lg:translate-y-8"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 407,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PhoneScreenshot, {
                            src: "/assets/home/barber-insights-iphone.png",
                            alt: "DripDesk insights screen shown on an iPhone",
                            className: "sm:-ml-8 lg:z-10"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 413,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PhoneScreenshot, {
                            src: "/assets/home/barber-clients-iphone.png",
                            alt: "DripDesk clients screen shown on an iPhone",
                            className: "sm:-ml-8 lg:translate-y-8"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 406,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
            lineNumber: 373,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 372,
        columnNumber: 5
    }, this);
}
function BarberPricing() {
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const messages = [
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    children: "We chose to focus."
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 433,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "An intuitive experience that makes running your business and booking with you feel effortless."
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 433,
                    columnNumber: 34
                }, this)
            ]
        }, void 0, true),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    children: "Every decision starts with you."
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 434,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "Built specifically for independent hair professionals, with the tools, workflows, and insights that actually matter. Nothing generic. Not every appointment business. ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            children: "Just yours."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 434,
                            columnNumber: 216
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 434,
                    columnNumber: 47
                }, this)
            ]
        }, void 0, true),
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    children: "Our best ideas aren't upgrades."
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 435,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "One experience. One price. Every feature. No locked tools or complicated tiers; you always get the full power of Root & Foil."
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 435,
                    columnNumber: 52
                }, this)
            ]
        }, void 0, true)
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "pricing",
        className: "border-t border-brand/20 bg-[#111111] px-5 py-20 text-white sm:px-8 sm:py-24 lg:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1180px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[860px] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-[38px] font-bold leading-[1.02] text-[#FAF7F2] sm:text-[48px] lg:text-[56px]",
                            children: [
                                "Why Root & ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-brand-gold",
                                    children: "Foil"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 439,
                                    columnNumber: 184
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 439,
                            columnNumber: 58
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-5 max-w-[780px] text-[15px] leading-7 text-white/66 sm:text-base",
                            children: "All the power; None of the bloat"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 439,
                            columnNumber: 234
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 439,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 hidden lg:grid lg:grid-cols-3 lg:divide-x lg:divide-brand/35",
                    children: messages.map((message, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "px-10 text-center first:pl-0 last:pr-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto grid h-[82px] w-[82px] place-items-center rounded-full border border-brand/25 bg-brand/10 text-3xl text-brand-gold",
                                    children: [
                                        "♙",
                                        "✦",
                                        "♡"
                                    ][index]
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 440,
                                    columnNumber: 194
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mx-auto mt-6 max-w-[270px] [&_h3]:font-display [&_h3]:text-[27px] [&_h3]:font-bold [&_h3]:text-[#FAF7F2] [&_p]:mt-4 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-white/66 [&_strong]:text-brand-gold",
                                    children: message
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 440,
                                    columnNumber: 362
                                }, this)
                            ]
                        }, index, true, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 440,
                            columnNumber: 122
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 440,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-9 lg:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-3 rounded-full border border-brand/45 p-1",
                            role: "tablist",
                            children: philosophyItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    role: "tab",
                                    "aria-selected": active === index,
                                    onClick: ()=>setActive(index),
                                    className: `min-h-12 rounded-full px-1 text-[10px] font-semibold whitespace-nowrap ${active === index ? "border border-brand/45 bg-[#1C1C1E] text-brand-gold" : "text-white/72"}`,
                                    children: item.label
                                }, item.label, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 163
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 441,
                            columnNumber: 39
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                            className: "mt-5 rounded-[20px] border border-brand/30 bg-[#141414] px-6 py-8 text-center [&_h3]:font-display [&_h3]:text-[27px] [&_h3]:font-bold [&_h3]:text-[#FAF7F2] [&_p]:mt-4 [&_p]:text-sm [&_p]:leading-7 [&_p]:text-white/66 [&_strong]:text-brand-gold",
                            children: [
                                messages[active],
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex justify-center gap-3",
                                    children: philosophyItems.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `h-2 w-2 rounded-full ${index === active ? "bg-brand-gold" : "bg-white/20"}`
                                        }, item.label, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 441,
                                            columnNumber: 843
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 441,
                                    columnNumber: 760
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 441,
                            columnNumber: 477
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 441,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-12 overflow-hidden rounded-[18px] border border-brand/45 bg-[#141414] sm:mt-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid lg:grid-cols-[0.86fr_1.14fr]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "whitespace-nowrap font-display text-[clamp(26px,7.5vw,34px)] font-bold text-[#FAF7F2] sm:text-[42px]",
                                            children: "One straightforward price."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 220
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 flex items-end gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-display text-[68px] font-bold leading-none text-brand-gold sm:text-[82px]",
                                                    children: MONTHLY_PRICE
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 411
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "pb-2 font-bold",
                                                    children: "/month"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 530
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 368
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 h-px w-36 bg-brand/70"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 582
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "mt-7 grid gap-4",
                                            children: corePricingItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex gap-3 text-sm text-white/74",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-brand-gold",
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 747
                                                        }, this),
                                                        item
                                                    ]
                                                }, item, true, {
                                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 687
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 627
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 442,
                                    columnNumber: 157
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-t border-brand/30 px-6 py-8 sm:px-10 sm:py-10 lg:border-l lg:border-t-0 lg:px-12 lg:py-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-display text-[28px] font-bold text-[#FAF7F2] sm:text-[34px]",
                                            children: "The tools that help your business grow."
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 927
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-7 grid grid-cols-2 gap-x-4 sm:gap-x-8",
                                            children: includedFeatureColumns.map((column, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "grid content-start gap-4",
                                                    children: column.map((feature)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex gap-2 text-[11px] leading-5 text-white/72 sm:text-sm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-brand-gold",
                                                                    children: "✓"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                                    lineNumber: 442,
                                                                    columnNumber: 1308
                                                                }, this),
                                                                feature
                                                            ]
                                                        }, feature, true, {
                                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                            lineNumber: 442,
                                                            columnNumber: 1220
                                                        }, this))
                                                }, i, false, {
                                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 1150
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 1052
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 442,
                                    columnNumber: 813
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 442,
                            columnNumber: 106
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "px-6 pb-8 sm:px-10 sm:pb-10 lg:pb-12",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberButton, {
                                href: signUpHref,
                                className: "h-14 w-full !border-black !bg-black !text-base !text-white hover:!bg-[#2A2522] sm:mx-auto sm:w-[352px]",
                                children: "Join the waitlist"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                lineNumber: 442,
                                columnNumber: 1445
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 442,
                            columnNumber: 1391
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 442,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
            lineNumber: 438,
            columnNumber: 125
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 438,
        columnNumber: 5
    }, this);
}
function BarberFinalCta() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-[#111111] px-5 pb-14 pt-2 text-white sm:px-8 sm:pb-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-[1060px] flex-col gap-6 rounded-[8px] border border-brand/45 bg-[#141414] px-6 py-7 shadow-[0_20px_46px_rgba(0,0,0,0.24)] sm:flex-row sm:items-center sm:justify-between sm:px-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "hidden h-16 w-9 rounded-full border border-brand/70 sm:block"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 452,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-display text-[28px] font-bold leading-tight tracking-normal text-[#FAF7F2] sm:text-[34px]",
                                    children: "Ready to run your business like a pro?"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-sm leading-7 text-white/64",
                                    children: "More bookings. Less stress. Real results."
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 457,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 453,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 451,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 sm:flex-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberButton, {
                            href: signUpHref,
                            className: "w-full sm:w-auto",
                            children: "Get Started"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 463,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberButton, {
                            href: "#pricing",
                            variant: "secondary",
                            className: "w-full sm:w-auto",
                            children: "View Plans"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 466,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 462,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
            lineNumber: 450,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 449,
        columnNumber: 5
    }, this);
}
function BarberFooter() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t border-brand/20 bg-[#050505] px-5 py-10 text-white sm:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1.15fr_2fr_auto]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberLogo, {}, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 484,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 max-w-[280px] text-sm leading-6 text-white/58",
                            children: "Built for independent beauty pros. Designed to help you grow."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 485,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 483,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-6 sm:grid-cols-3",
                    children: footerGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xs font-extrabold uppercase tracking-[0.1em] text-[#FAF7F2]",
                                    children: group.title
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 493,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-3 grid gap-2",
                                    children: group.links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm font-semibold text-white/56 transition-colors hover:text-brand-gold",
                                                children: link.label
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                                lineNumber: 499,
                                                columnNumber: 21
                                            }, this)
                                        }, link.label, false, {
                                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                            lineNumber: 498,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                                    lineNumber: 496,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, group.title, true, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 492,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 490,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-semibold text-white/54 md:text-right",
                    children: [
                        "© 2026 Root & Foil",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                            lineNumber: 514,
                            columnNumber: 11
                        }, this),
                        "All rights reserved."
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                    lineNumber: 512,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
            lineNumber: 482,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 481,
        columnNumber: 5
    }, this);
}
function BarberLandingPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-[#111111] text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberHero, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 525,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberValueCards, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 526,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberPricing, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 527,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BarberFooter, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
                lineNumber: 528,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/barber/page.tsx",
        lineNumber: 524,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=apps_marketing_src_0aw887m._.js.map