import { ThemeToggleButton } from "@/components/ui";
import { radius, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";

export default function AuthLayout() {
  const navigate = useNavigate();
  const { bg, main, theme: mode, toggleTheme } = useColor();
  const illustration = mode === "light" ? "/auth-light.png" : "/auth-dark.png";
  const [spinning, setSpinning] = useState(false);

  function navigateToHome() {
    navigate("/");
  }

  const handleToggle = () => {
    if (spinning) return;
    setSpinning(true);
    toggleTheme();
    setTimeout(() => setSpinning(false), 500);
  };

  const isDark = mode === "dark";

  return (
    <Box display="grid" gridTemplateColumns={{ xs: "1fr", md: "repeat(2, 1fr)" }}>
      <Box sx={{ backgroundColor: bg.tertiary }}>
        <Stack
          justifyContent="center"
          gap={spacingTokens.xl}
          sx={{
            height: "100svh",
            mx: "auto",
            maxWidth: { xs: "auto", md: "380px" },
            width: { xs: "100%", md: "60%" },
            boxSizing: "border-box",
            py: spacingTokens.lg,
            px: spacingTokens.md,
          }}
        >
          <Stack alignItems="start">
            <Box
              component="img"
              src="/logo-icon.png"
              sx={{ height: "40px", cursor: "pointer" }}
              onClick={navigateToHome}
            />
          </Stack>
          <Outlet />
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundImage: `linear-gradient(180deg, ${main.primary}, ${bg.tertiary})`,
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={illustration}
          sx={{
            borderRadius: radius[3],
            height: "90svh",
            width: "50svw",
            position: "absolute",
            right: "-5svw",
            bottom: "-10px",
            objectFit: "cover",
            display: "block",
            objectPosition: "left top",
          }}
        />

        <Box sx={{ position: "absolute", top: "20px", right: "20px" }}>
          <ThemeToggleButton spinning={spinning} isDark={isDark} onToggle={handleToggle} />
        </Box>
      </Box>
    </Box>
  );
}
