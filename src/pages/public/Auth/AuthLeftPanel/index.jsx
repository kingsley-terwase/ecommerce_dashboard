// @ts-nocheck
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { Sparkle24Filled } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import MarketplacePulse from "./MarketPlacePulse";
import Stat from "./Stat";
import { FONT, AMBER, STATS } from "./constants";
import { typefaces } from "@/lib/theme";

const drift = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(3%, -3%); }
`;

const drift2 = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(-3%, 3%); }
`;

const livePulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Staggered entrance timing for each content block — one orchestrated
// load-in sequence rather than everything animating independently.
const reveal = (delayMs) => ({
  animation: `${fadeInUp} 0.6s ease-out ${delayMs}ms both`,
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
});

export default function AuthLeftPanel() {
  const { main } = useColor();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        minHeight: "100vh",
        width: "45%",
        p: 4,
        overflow: "hidden",
        backgroundColor: "#070A12",
      }}
    >
      {/* Dot-grid texture — quiet, on-brand backdrop instead of a stock photo */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Two soft drifting glows — brand blue and amber, low opacity */}
      <Box
        sx={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${main.primary}33 0%, transparent 70%)`,
          animation: `${drift} 12s ease-in-out infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      />
      {/* <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          right: "-10%",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${AMBER}26 0%, transparent 70%)`,
          animation: `${drift2} 14s ease-in-out infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      /> */}

      {/* Header row: wordmark + live indicator */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ position: "relative", zIndex: 1, mb: 6, ...reveal(0) }}
      >
        <Typography
          onClick={() => navigate("/")}
          sx={{
            fontFamily: typefaces.tertiary,
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.01em",
            cursor: "pointer",
          }}
        >
          TETY
          <Box component="span" sx={{ color: main.primary }}>
            HUB
          </Box>
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          gap={0.7}
          sx={{
            px: 1.4,
            py: 0.6,
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.18)",
            backgroundColor: "rgba(255,255,255,0.06)",
          }}
        >
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: AMBER,
              animation: `${livePulse} 1.6s ease-in-out infinite`,
              "@media (prefers-reduced-motion: reduce)": { animation: "none" },
            }}
          />
          <Typography
            sx={{
              fontFamily: FONT,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: "#fff",
            }}
          >
            LIVE MARKETPLACE
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction="row"
          alignItems="center"
          gap={0.6}
          sx={{ mb: 2, ...reveal(80) }}
        >
          <Sparkle24Filled style={{ fontSize: 14, color: AMBER }} />
          <Typography
            sx={{
              fontFamily: typefaces.tertiary,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: AMBER,
            }}
          >
            THE MARKETPLACE FOR EVERYONE
          </Typography>
        </Stack>

        {/* Headline: "WHERE BUYERS & SELLERS" wraps inline together;
            "MEET" is the oversized gradient payoff on its own line. */}
        <Stack sx={{ mb: 3.5, maxWidth: 480, ...reveal(160) }}>
          <Stack direction="row" flexWrap="wrap" alignItems="baseline" columnGap={1.2}>
            <Typography
              sx={{
                 fontFamily: typefaces.tertiary,
                fontSize: { md: 32, lg: 50 },
                fontWeight: 700,
                lineHeight: 1.15,
                color: "#fff",
              }}
            >
              WHERE   BUYERS 
               &amp; SELLERS MEET
            </Typography>
           
          </Stack>
        </Stack>

       
        <Box sx={reveal(320)}>
          <MarketplacePulse />
        </Box>

        <Box sx={{ height: "1px", backgroundColor: "rgba(255,255,255,0.14)", mb: 3, ...reveal(360) }} />

        <Stack direction="row" gap={4} sx={reveal(400)}>
          {STATS.map((s) => (
            <Stat key={s.label} stat={s} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}