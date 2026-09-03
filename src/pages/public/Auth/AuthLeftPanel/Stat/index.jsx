// @ts-nocheck
import { Stack, Typography } from "@mui/material";
import { useCountUp, useReveal } from "../../../HomePage/Hooks";
import { MONO } from "../constants";
import { typefaces } from "@/lib/theme";

/**
 * Single animated stat (count-up number + label), used in the panel's
 * bottom row. Numbers render in monospace to tie visually into the
 * "live data" feel of the MarketplacePulse feed above it.
 */
export default function Stat({ stat }) {
    const [ref, isVisible] = useReveal();

    const value = useCountUp(stat.value, {
        duration: 1400,
        start: isVisible,
    });

    return (
        <Stack ref={ref} sx={{ minWidth: 90 }}>
            <Typography
                sx={{
                    fontFamily: typefaces.tertiary,
                    fontSize: { xs: 20, md: 24 },
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: "-0.01em",
                }}
            >
                {value.toLocaleString()}
                {stat.suffix}
            </Typography>

            <Typography
                sx={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.5)",
                }}
            >
                {stat.label}
            </Typography>
        </Stack>
    );
}