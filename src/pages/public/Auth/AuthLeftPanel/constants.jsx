export const FONT = "Poppins";

// Monospace stack for anything meant to read as "live data" — the ticker
// feed and the stat numbers. Falls back gracefully if JetBrains Mono isn't
// loaded; add it to index.html's font links for the exact intended look:
// <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
export const MONO =
    '"JetBrains Mono", "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

export const AMBER = "#F2A93D";
export const GREEN = "#34D399";

export const STATS = [
    { value: 1840, suffix: "+", label: "ACTIVE SELLERS" },
    { value: 26, suffix: "K+", label: "PRODUCTS LISTED" },
    { value: 97, suffix: "%", label: "BUYER SATISFACTION" },
];

// Simulated marketplace activity for the MarketplacePulse ticker.
// Each `tag` is color-coded by category so the feed reads at a glance —
// amber for listings, blue (brand) for orders/sellers, green for money
// moving. Kept to three colors so the palette stays disciplined.
export const FEED = [
    { tag: "LISTING", tone: "amber", text: 'Adaeze O. added "Handwoven Basket Set"' },
    { tag: "ORDER", tone: "blue", text: "#TH-8823 marked delivered" },
    { tag: "PAYMENT", tone: "green", text: "₦42,000 released to seller" },
    { tag: "SELLER", tone: "blue", text: "Lagos Textiles Co. verified" },
    { tag: "REVIEW", tone: "amber", text: "Tunde K. left a 5★ rating" },
    { tag: "LISTING", tone: "amber", text: 'New arrival: "Ankara Fabric Bundle"' },
    { tag: "ORDER", tone: "blue", text: "#TH-9014 placed by a buyer" },
    { tag: "PAYMENT", tone: "green", text: "₦18,500 released to seller" },
];