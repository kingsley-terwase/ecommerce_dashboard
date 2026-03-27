import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
import { Box, Typography } from "@mui/material";
import { PulseLoader } from "react-spinners";

/**
 * A full-screen overlay loader component with a blur backdrop.
 *
 * @component
 * @param {Object} props
 * @param {boolean} [props.open=false] - Controls the visibility of the loader overlay.
 * @param {string} [props.message] - Optional text displayed below the spinner.
 * @returns {import("react").ReactNode|null} The loader overlay, or null if `open` is false.
 *
 * @example
 * <ScreenLoader open={isLoading} message="Fetching data..." />
 */
export default function ScreenLoader({ open = false, message }) {
  const { main, theme } = useColor();

  return open ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: theme === "light" ? "rgba(255, 255, 255, 0.77)" : "rgba(0, 0, 0, 0.77)",
        backdropFilter: "blur(8px)",
        gap: spacingTokens.md,
      }}
    >
      <Box component="img" src="/logo-icon.png" height="30px" />
      <PulseLoader loading={open} size={14} color={main.primary} />
      {message && <Typography variant="caption">{message}</Typography>}
    </Box>
  ) : null;
}
