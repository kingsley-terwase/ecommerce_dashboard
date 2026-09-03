// @ts-nocheck
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { FONT, MONO, AMBER, GREEN, FEED } from "../constants";
import { typefaces } from "@/lib/theme";

const scrollUp = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-50%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
`;

function toneColor(tone, main) {
    if (tone === "amber") return AMBER;
    if (tone === "green") return GREEN;
    return main; // "blue" — the app's own brand color
}

function FeedRow({ item, main }) {
    const color = toneColor(item.tone, main);

    return (
        <Stack direction="row" alignItems="baseline" gap={1} sx={{ py: 0.9 }}>
            <Typography
                sx={{
                    fontFamily: typefaces.tertiary,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    color,
                    minWidth: 62,
                    flexShrink: 0,
                }}
            >
                [{item.tag}]
            </Typography>
            <Typography
                sx={{
                    fontFamily: typefaces.tertiary,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.75)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                {item.text}
            </Typography>
        </Stack>
    );
}

/**
 * The panel's signature element: a vertical, auto-scrolling feed of
 * marketplace activity, styled like a terminal log. Embodies "where
 * buyers & sellers meet" literally, in motion, instead of a static claim.
 * The list is duplicated once so the scroll can loop seamlessly at -50%.
 */
export default function MarketplacePulse() {
    const { main } = useColor();

    return (
        <Box
            sx={{
               
                // backgroundColor: "rgba(255,255,255,0.04)",
                // backdropFilter: "blur(6px)",
                px: 2,
                pt: 1.5,
                pb: 0.5,
                mb: 3,
            }}
        >
            <Stack direction="row" alignItems="center" gap={0.8} sx={{ mb: 0.5 }}>
                <Box
                    sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: AMBER,
                        animation: `${pulse} 1.8s ease-in-out infinite`,
                        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                    }}
                />
                <Typography
                    sx={{
                        fontFamily: typefaces.tertiary,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "rgba(255,255,255,0.5)",
                    }}
                >
                    MARKETPLACE PULSE
                </Typography>
            </Stack>

            <Box sx={{ position: "relative", height: 118, overflow: "hidden" }}>
                <Box
                    sx={{
                        animation: `${scrollUp} 16s linear infinite`,
                        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
                    }}
                >
                    {[...FEED, ...FEED].map((item, i) => (
                        <FeedRow key={i} item={item} main={main.primary} />
                    ))}
                </Box>

                {/* Fade masks so rows scroll in/out softly instead of clipping hard */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 20,
                        background: "linear-gradient(180deg, rgba(10,12,18,0.9), transparent)",
                        pointerEvents: "none",
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 20,
                        background: "linear-gradient(0deg, rgba(10,12,18,0.9), transparent)",
                        pointerEvents: "none",
                    }}
                />
            </Box>
        </Box>
    );
}