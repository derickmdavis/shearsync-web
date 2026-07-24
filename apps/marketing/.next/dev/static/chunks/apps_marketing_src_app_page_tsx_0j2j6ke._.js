(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/marketing/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
const productPillars = [
    {
        icon: "/assets/icons/icon-calendar-bronze.svg",
        title: "Stay booked.",
        body: "Simple, reliable booking tools that make it easy for clients to schedule, reschedule, and return.",
        bullets: [
            "Online booking that’s always open",
            "Automated reminders that reduce no-shows",
            "Waitlist support to fill last-minute openings"
        ],
        screenshot: "/assets/home/root-and-foil-phone-calendar.png",
        alt: "Root & Foil calendar screen showing appointments, open time, and booking controls"
    },
    {
        icon: "/assets/icons/icon-client-bronze.svg",
        title: "Remember every client.",
        body: "Keep every detail that matters so you can personalize every visit and build lasting relationships.",
        bullets: [
            "Notes, preferences, and service history",
            "Before & after photos in one place",
            "Quick access to past appointments and spend"
        ],
        screenshot: "/assets/home/root-and-foil-phone-clients.png",
        alt: "Root & Foil clients screen showing client list, notes, and client history"
    },
    {
        icon: "/assets/icons/icon-analytics-bronze.svg",
        title: "Know what’s working.",
        body: "Understand your numbers, client behavior, and trends so you can make smarter decisions and grow with confidence.",
        bullets: [
            "Revenue, rebooking rate, and client retention",
            "Average ticket, top services, and add-ons",
            "Trends and insights to guide your next move"
        ],
        screenshot: "/assets/home/root-and-foil-phone-insights.png",
        alt: "Root & Foil dashboard screen showing business snapshot and revenue insights"
    }
];
const pricingPlans = [
    {
        name: "Basic",
        price: "$12",
        period: "/ month"
    },
    {
        name: "Pro",
        price: "$25",
        period: "/ month",
        popular: true
    },
    {
        name: "Premium",
        price: "$35",
        period: "/ month"
    }
];
const comparisonRows = [
    {
        feature: "Online booking",
        basic: "yes",
        pro: "yes",
        premium: "yes"
    },
    {
        feature: "Client notes & history",
        basic: "Unlimited clients",
        pro: "Unlimited clients",
        premium: "Unlimited clients"
    },
    {
        feature: "Appointment reminders",
        basic: "yes",
        pro: "yes",
        premium: "yes"
    },
    {
        feature: "Import from GlossGenius / Booksy / Fresha / Vagaro / StyleSeat / Square",
        basic: "yes",
        pro: "yes",
        premium: "yes"
    },
    {
        feature: "Full client history",
        basic: "yes",
        pro: "yes",
        premium: "yes"
    },
    {
        feature: "Service limit",
        basic: "7 services",
        pro: "Unlimited services",
        premium: "Unlimited services"
    },
    {
        feature: "Waitlist",
        basic: "no",
        pro: "yes",
        premium: "yes"
    },
    {
        feature: "QR booking code",
        basic: "no",
        pro: "yes",
        premium: "yes"
    },
    {
        feature: "Advanced metrics",
        basic: "no",
        pro: "yes",
        premium: "yes"
    },
    {
        feature: "Weekly business recap email",
        basic: "no",
        pro: "no",
        premium: "yes"
    },
    {
        feature: "Apple / Google Calendar integration",
        basic: "no",
        pro: "no",
        premium: "yes"
    }
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
        lineNumber: 172,
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
        lineNumber: 203,
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
            src: "/assets/brand/root-and-foil-logo.svg",
            alt: "Root & Foil",
            width: 2120,
            height: 414,
            priority: true,
            className: "h-8 w-auto object-contain sm:h-9"
        }, void 0, false, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 224,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 219,
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
                lineNumber: 242,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "#top",
                        className: "font-display text-xs font-semibold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm",
                        children: "About"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "#pricing",
                        className: "font-display text-xs font-semibold text-[#1F1A17] transition-colors hover:text-brand sm:text-sm",
                        children: "Pricing"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketingButton, {
                        onClick: onJoinWaitlist,
                        variant: "nav",
                        className: "h-9 px-4 text-xs sm:h-10 sm:px-5 sm:text-sm",
                        children: "Join Waitlist"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 238,
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
                lineNumber: 275,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.32)_44%,transparent_56%),linear-gradient(300deg,transparent_0%,rgba(200,164,107,0.12)_42%,transparent_65%)] opacity-60"
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 276,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeNav, {
                onJoinWaitlist: onJoinWaitlist
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 277,
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
                                lineNumber: 281,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mt-6 max-w-[530px] font-display text-[54px] font-bold leading-[0.9] tracking-normal text-[#111111] sm:text-[72px] lg:text-[78px]",
                                children: "Growth starts at the roots."
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 285,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-6 max-w-[520px] text-[16px] leading-7 text-[#4F4A45] sm:text-[17px]",
                                children: "Stop chasing appointments. Stop losing clients between visits. Root & Foil helps you remember every client and keep them coming back."
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-7 flex max-w-[560px] items-center gap-3 text-xs font-bold leading-5 text-[#4F4A45] sm:text-[13px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "sm:whitespace-nowrap",
                                    children: "Seamless booking. Automated growth. Smart business insights."
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 294,
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
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketingLink, {
                                        href: "#pricing",
                                        variant: "secondary",
                                        className: "w-full sm:w-auto",
                                        children: "View Plans"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 280,
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
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#F6F1E8] via-[#F6F1E8]/72 to-transparent"
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 327,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 271,
        columnNumber: 5
    }, this);
}
_c4 = HomeHero;
function HomeProductPillars() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "features",
        className: "border-t border-[rgba(200,164,107,0.30)] bg-transparent px-5 py-20 text-[#111111] sm:px-8 sm:py-24 lg:py-28",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1240px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[860px] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-[38px] font-bold leading-[1.02] tracking-normal sm:text-[48px] lg:text-[56px]",
                            children: [
                                "Everything behind your chair,",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this),
                                "finally in one place."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 342,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-5 max-w-[720px] text-[15px] leading-7 text-[#4F4A45] sm:text-base",
                            children: "Root & Foil helps you stay booked, remember every client detail, and understand what your chair is earning without juggling texts, notes, screenshots, or spreadsheets."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 347,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 341,
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
                                            lineNumber: 360,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 359,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-6 font-display text-[30px] font-bold leading-[1.02] tracking-normal text-[#111111]",
                                        children: card.title
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 368,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-sm leading-7 text-[#4F4A45]",
                                        children: card.body
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 371,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-6 h-px w-12 bg-[#B07A3E]"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 374,
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
                                                        lineNumber: 381,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: bullet
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, bullet, true, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 377,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 375,
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
                                            lineNumber: 392,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 358,
                                columnNumber: 15
                            }, this)
                        }, card.title, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 354,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 352,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 340,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 336,
        columnNumber: 5
    }, this);
}
_c5 = HomeProductPillars;
function FeatureValue({ value }) {
    if (value === "yes") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-lg font-extrabold text-brand",
            children: "✓"
        }, void 0, false, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 412,
            columnNumber: 12
        }, this);
    }
    if (value === "no") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-lg font-bold text-[#8A7E72]",
            children: "—"
        }, void 0, false, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 416,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-xs font-bold text-[#1F1A17]",
        children: value
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 419,
        columnNumber: 10
    }, this);
}
_c6 = FeatureValue;
function HomePricing({ onJoinWaitlist }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "pricing",
        className: "bg-transparent px-5 py-10 text-[#111111] sm:px-8 sm:py-14",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-[1180px] flex-col gap-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[920px] text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs font-extrabold uppercase tracking-[0.12em] text-brand",
                            children: "Compare plans"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 430,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mt-4 whitespace-nowrap font-display text-[clamp(25px,5vw,46px)] font-bold leading-[1.02] tracking-normal",
                            children: "Find the plan that fits your business."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 433,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mx-auto mt-5 max-w-[440px] text-sm leading-7 text-[#6B625A]",
                            children: "Simple pricing. Powerful features. Built for how you work."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 436,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 429,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "overflow-x-auto rounded-[8px] border border-[rgba(200,164,107,0.42)] bg-[#FFFDF8]/80 shadow-[0_18px_45px_rgba(80,52,25,0.08)]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "min-w-[760px] table-fixed border-collapse text-left",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "w-[30%] border-b border-[rgba(200,164,107,0.42)] px-4 py-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#6B625A]",
                                            children: "Feature"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 17
                                        }, this),
                                        pricingPlans.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: [
                                                    "relative border-b border-l border-[rgba(200,164,107,0.42)] px-4 py-3 text-center",
                                                    plan.popular ? "bg-brand/10" : "bg-[#FFFDF8]/70"
                                                ].join(" "),
                                                children: [
                                                    plan.popular ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-x-0 -top-px bg-brand py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-white",
                                                        children: "Most Popular"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                        lineNumber: 457,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-3 text-xs font-extrabold uppercase tracking-[0.08em] text-[#111111]",
                                                        children: plan.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1 text-xl font-extrabold text-[#111111]",
                                                        children: [
                                                            plan.price,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "ml-1 text-xs font-bold text-[#6B625A]",
                                                                children: plan.period
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                                lineNumber: 466,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                        lineNumber: 464,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: onJoinWaitlist,
                                                        className: [
                                                            "mt-3 inline-flex h-8 items-center justify-center rounded-[8px] border px-3 text-[11px] font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-brand/35",
                                                            plan.popular ? "border-brand bg-brand text-white hover:bg-brand-dark" : "border-brand/70 text-brand hover:bg-brand hover:text-white"
                                                        ].join(" "),
                                                        children: "Join Waitlist"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                        lineNumber: 470,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, plan.name, true, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 449,
                                                columnNumber: 19
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 444,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 443,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: comparisonRows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "border-t border-[rgba(200,164,107,0.42)] px-4 py-2.5 text-xs font-bold text-[#1F1A17]",
                                                children: row.feature
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 489,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "border-l border-t border-[rgba(200,164,107,0.42)] px-4 py-2.5 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureValue, {
                                                    value: row.basic
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 492,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "border-l border-t border-[rgba(200,164,107,0.42)] bg-brand/10 px-4 py-2.5 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureValue, {
                                                    value: row.pro
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 496,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 495,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                className: "border-l border-t border-[rgba(200,164,107,0.42)] px-4 py-2.5 text-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FeatureValue, {
                                                    value: row.premium
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 499,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 498,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, row.feature, true, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 488,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                lineNumber: 486,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 441,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 428,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 424,
        columnNumber: 5
    }, this);
}
_c7 = HomePricing;
function HomeFinalCta({ onJoinWaitlist }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "bg-transparent px-5 pb-14 pt-2 text-[#111111] sm:px-8 sm:pb-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto flex max-w-[980px] flex-col gap-6 rounded-[8px] border border-[rgba(200,164,107,0.45)] bg-[#FFFDF8]/75 px-6 py-7 text-[#111111] shadow-[0_18px_45px_rgba(80,52,25,0.08)] sm:flex-row sm:items-center sm:justify-between sm:px-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-[28px] font-bold leading-tight tracking-normal text-[#111111] sm:text-[34px]",
                            children: "Ready to run your business like a pro?"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 516,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-sm leading-7 text-[#4F4A45]",
                            children: "Growth starts at the roots."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 519,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 515,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3 sm:flex-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MarketingButton, {
                            onClick: onJoinWaitlist,
                            className: "w-full sm:w-auto",
                            children: "Join Waitlist"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 524,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "#pricing",
                            className: "inline-flex h-11 w-full items-center justify-center rounded-[8px] border border-[#B07A3E] bg-transparent px-6 font-display text-sm font-semibold text-[#4A3728] transition-colors hover:bg-[rgba(200,164,107,0.10)] focus:outline-none focus:ring-2 focus:ring-brand-gold/35 focus:ring-offset-2 focus:ring-offset-[#FFFDF8] sm:w-auto",
                            children: "View Plans"
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 530,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 523,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 514,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 513,
        columnNumber: 5
    }, this);
}
_c8 = HomeFinalCta;
function WaitlistModal({ open, onClose }) {
    _s();
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
                    lineNumber: 697,
                    columnNumber: 9
                }, this),
                submitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WaitlistSuccessState, {}, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 708,
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
                                    lineNumber: 712,
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
                                            lineNumber: 725,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 720,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 max-w-[420px] text-sm leading-6 text-[#4F4A45] sm:mt-6 sm:text-[15px] sm:leading-7",
                                    children: "Root & Foil is opening to a small group of independent stylists and barbers before public launch."
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 727,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 max-w-[420px] text-sm font-bold leading-6 text-[#1C1C1E] sm:mt-4",
                                    children: "Join the list and we'll reach out when we're ready."
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 731,
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
                                                    lineNumber: 745,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: item
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, item, true, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 741,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 735,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 h-px w-20 bg-[#D6A85A] sm:mt-9"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 756,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[#B7793D] sm:mt-4",
                                    children: "Thank you for your interest!"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 757,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 711,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative overflow-hidden px-5 py-6 sm:px-10 sm:py-9 lg:px-12 lg:py-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(214,168,90,0.24),transparent_30%),linear-gradient(160deg,rgba(250,247,242,0.82),rgba(255,255,255,0.96))]"
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 763,
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
                                                lineNumber: 766,
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
                                                lineNumber: 783,
                                                columnNumber: 19
                                            }, this),
                                            errors.form ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "rounded-[8px] border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700",
                                                children: errors.form
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 803,
                                                columnNumber: 21
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: submitting,
                                                className: "mt-1 inline-flex h-12 w-full items-center justify-center rounded-[8px] border border-[rgba(138,85,40,0.65)] bg-gradient-to-b from-[#C98A44] via-[#B07A3E] to-[#A96A32] px-6 font-display text-sm font-semibold text-white shadow-[0_18px_38px_rgba(176,122,62,0.20)] transition hover:border-brand-dark hover:from-[#B97939] hover:to-[#996534] focus:outline-none focus:ring-2 focus:ring-brand/35 focus:ring-offset-2 focus:ring-offset-[#FFFDF8] disabled:cursor-not-allowed disabled:opacity-70",
                                                children: submitting ? "Joining..." : "Join the waitlist"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 808,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-center text-xs leading-5 text-[#6B7280]",
                                                children: "We respect your privacy. We'll only use your email for Root & Foil updates."
                                            }, void 0, false, {
                                                fileName: "[project]/apps/marketing/src/app/page.tsx",
                                                lineNumber: 816,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                                        lineNumber: 765,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 764,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 762,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 710,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 690,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 682,
        columnNumber: 5
    }, this);
}
_s(WaitlistModal, "9BG2rvZb6FkQj7nAGZwMT7btm9M=");
_c9 = WaitlistModal;
function WaitlistField({ id, label, value, placeholder, onChange, autoComplete, error, type = "text" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                htmlFor: id,
                className: "text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1C1C1E]",
                children: label
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 851,
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
                lineNumber: 857,
                columnNumber: 7
            }, this),
            error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                id: `${id}-error`,
                className: "mt-2 text-sm font-semibold text-red-700",
                children: error
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 869,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 850,
        columnNumber: 5
    }, this);
}
_c10 = WaitlistField;
function WaitlistSuccessState() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative grid min-h-[520px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(214,168,90,0.26),transparent_28%),linear-gradient(145deg,#FFFDF8_0%,#FAF7F2_100%)] px-7 py-14 text-center sm:px-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#D6A85A]/12 blur-3xl"
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 880,
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
                        lineNumber: 882,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "waitlist-success-title",
                        className: "mt-8 font-display text-[44px] font-bold leading-none text-[#111111] sm:text-[54px]",
                        children: "You're on the list!"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 885,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mx-auto mt-5 max-w-[320px] text-[15px] leading-7 text-[#4F4A45]",
                        children: "Thanks - we'll be in touch when early access to Root & Foil is ready."
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 891,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": "true",
                        className: "mx-auto mt-10 grid h-24 w-28 place-items-center rounded-[14px] border border-[#D6A85A] bg-white/45 text-5xl text-[#B7793D] shadow-[0_18px_45px_rgba(80,52,25,0.08)]",
                        children: "✉"
                    }, void 0, false, {
                        fileName: "[project]/apps/marketing/src/app/page.tsx",
                        lineNumber: 894,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 881,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 879,
        columnNumber: 5
    }, this);
}
_c11 = WaitlistSuccessState;
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
                            lineNumber: 910,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 max-w-[280px] text-sm leading-6 text-[#4F4A45]",
                            children: "Built for independent beauty pros. Designed to help you grow."
                        }, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 911,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 909,
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
                                    lineNumber: 919,
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
                                                lineNumber: 925,
                                                columnNumber: 21
                                            }, this)
                                        }, link.label, false, {
                                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                                            lineNumber: 924,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                                    lineNumber: 922,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, group.title, true, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 918,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 916,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm font-semibold text-[#4F4A45] md:text-right",
                    children: [
                        "© 2026 Root & Foil",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/apps/marketing/src/app/page.tsx",
                            lineNumber: 940,
                            columnNumber: 11
                        }, this),
                        "All rights reserved."
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/marketing/src/app/page.tsx",
                    lineNumber: 938,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/marketing/src/app/page.tsx",
            lineNumber: 908,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 907,
        columnNumber: 5
    }, this);
}
_c12 = HomeFooter;
function HomePage() {
    _s1();
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
                lineNumber: 955,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeProductPillars, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 956,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomePricing, {
                onJoinWaitlist: openWaitlist
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 957,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeFinalCta, {
                onJoinWaitlist: openWaitlist
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 958,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HomeFooter, {}, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 959,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WaitlistModal, {
                open: waitlistOpen,
                onClose: closeWaitlist
            }, void 0, false, {
                fileName: "[project]/apps/marketing/src/app/page.tsx",
                lineNumber: 960,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/marketing/src/app/page.tsx",
        lineNumber: 954,
        columnNumber: 5
    }, this);
}
_s1(HomePage, "r4I0S87DDyME7xFX6YtosScUcBY=");
_c13 = HomePage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13;
__turbopack_context__.k.register(_c, "MarketingLink");
__turbopack_context__.k.register(_c1, "MarketingButton");
__turbopack_context__.k.register(_c2, "BrandLogo");
__turbopack_context__.k.register(_c3, "HomeNav");
__turbopack_context__.k.register(_c4, "HomeHero");
__turbopack_context__.k.register(_c5, "HomeProductPillars");
__turbopack_context__.k.register(_c6, "FeatureValue");
__turbopack_context__.k.register(_c7, "HomePricing");
__turbopack_context__.k.register(_c8, "HomeFinalCta");
__turbopack_context__.k.register(_c9, "WaitlistModal");
__turbopack_context__.k.register(_c10, "WaitlistField");
__turbopack_context__.k.register(_c11, "WaitlistSuccessState");
__turbopack_context__.k.register(_c12, "HomeFooter");
__turbopack_context__.k.register(_c13, "HomePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=apps_marketing_src_app_page_tsx_0j2j6ke._.js.map