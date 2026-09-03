// @ts-nocheck
import { keyframes } from "@emotion/react";
import { Box, Stack, Typography } from "@mui/material";
import { ArrowLeft24Regular, ArrowLeftRegular, ArrowMaximizeTopLeftBottomRight16Filled, ArrowUpFilled, ArrowWrapUpToDown20Filled, Home24Regular, ShoppingBag24Filled, ShoppingBagFilled } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";

const FONT = "Poppins";
const AMBER = "#F2A93D";

const floatY = keyframes`WSSSS
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-14px) rotate(6deg); }
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const reveal = (delayMs) => ({
  animation: `${fadeInUp} 0.6s ease-out ${delayMs}ms both`,
  "@media (prefers-reduced-motion: reduce)": { animation: "none" },
});

export default function NotFoundPage() {
  const { bg, fg, border, main } = useColor();
  const navigate = useNavigate();

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: bg.primary, px: 3, textAlign: "center" }}
    >
      {/* Floating bag icon — a small nod to the marketplace theme, not a full illustration */}
      <Box
        sx={{
          mb: 2,
          color: main.primary,
          opacity: 0.5,
          animation: `${floatY} 3.4s ease-in-out infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          ...reveal(0),
        }}
      >
        <ShoppingBagFilled style={{ fontSize: 100 }} />
      </Box>

      <Typography
        sx={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: { xs: 88, md: 120 },
          lineHeight: 1,
          background: `linear-gradient(120deg, ${AMBER}, ${main.primary})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          ...reveal(80),
        }}
      >
        404
      </Typography>

      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: { xs: 22, md: 28 },
          fontWeight: 800,
          color: fg.primary,
          mt: 1,
          ...reveal(160),
        }}
      >
        Lost in the marketplace?
      </Typography>

      <Typography
        sx={{
          fontFamily: FONT,
          fontSize: 14,
          color: fg.secondary,
          maxWidth: 380,
          mt: 1,
          mb: 4,
          ...reveal(220),
        }}
      >
        This page doesn't exist, moved, or never did in the first place.
        Let's get you back on track.
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={reveal(300)}>
        <Box
          onClick={() => navigate(-1)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,
            px: 2.6,
            py: 1.2,
            borderRadius: 999,
            border: `1px solid ${border.primary}`,
            color: fg.primary,
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "transform 0.2s ease",
            "&:hover": { transform: "translateY(-2px)" },
          }}
        >
          <ArrowLeftRegular style={{ fontSize: 20 }} />
          Go back
        </Box>

        <Box
          onClick={() => navigate("/")}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.8,
            px: 2.6,
            py: 1.2,
            borderRadius: 999,
            backgroundColor: main.primary,
            color: "#fff",
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: `0 10px 22px -10px ${main.primary}88`,
            },
          }}
        >
          Go home
          <ArrowUpFilled style={{ fontSize: 16 }} />          
        </Box>
      </Stack>
    </Stack>
  );
}