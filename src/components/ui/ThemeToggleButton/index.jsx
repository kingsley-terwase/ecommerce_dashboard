import { actionSizes } from "@/lib/theme";
import { WeatherMoonRegular, WeatherSunnyRegular } from "@fluentui/react-icons";
import { Box } from "@mui/material";

/**
 * @param {Object} props
 * @param {boolean} props.isDark
 * @param {boolean} props.spinning
 * @param {() => void} props.onToggle
 */
export default function ThemeToggleButton({ isDark, spinning, onToggle }) {
  return (
    <Box
      onClick={onToggle}
      sx={{
        position: "relative",
        width: actionSizes.small,
        height: actionSizes.small,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        backgroundColor: isDark
          ? "rgba(8, 96, 185, 0.22)"
          : "rgba(251, 191, 36, 0.12)",
        "&:hover": {
          backgroundColor: isDark
            ? "rgba(8, 96, 185, 0.22)"
            : "rgba(251, 191, 36, 0.22)",
          boxShadow: isDark
            ? "0 0 12px rgba(12, 99, 186, 0.35)"
            : "0 0 12px rgba(251, 191, 36, 0.45)",
          "& .icon-wrap": {
            transform: "scale(1.15)",
          },
        },
        "&:active": {
          "& .icon-wrap": {
            transform: "scale(0.88)",
          },
        },
        // ripple burst on click
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: isDark
            ? "gba(8, 96, 185, 0.22)"
            : "rgba(251, 191, 36, 0.3)",
          opacity: spinning ? 1 : 0,
          transform: spinning ? "scale(2.2)" : "scale(0)",
          transition: spinning
            ? "transform 0.5s ease-out, opacity 0.5s ease-out"
            : "none",
        },
      }}
    >
      <Box
        className="icon-wrap"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: spinning
            ? `${isDark ? "spinIn" : "spinOut"} 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`
            : "none",
          "@keyframes spinIn": {
            "0%": { transform: "rotate(-90deg) scale(0.5)", opacity: 0 },
            "60%": { transform: "rotate(15deg)  scale(1.1)", opacity: 1 },
            "100%": { transform: "rotate(0deg)   scale(1)", opacity: 1 },
          },
          "@keyframes spinOut": {
            "0%": { transform: "rotate(90deg)  scale(0.5)", opacity: 0 },
            "60%": { transform: "rotate(-15deg) scale(1.1)", opacity: 1 },
            "100%": { transform: "rotate(0deg)   scale(1)", opacity: 1 },
          },
        }}
      >
        {isDark ? (
          <WeatherMoonRegular
            fontSize={20}
            style={{ color: "rgb(167, 139, 250)" }}
          />
        ) : (
          <WeatherSunnyRegular
            fontSize={20}
            style={{ color: "rgb(245, 158, 11)" }}
          />
        )}
      </Box>
    </Box>
  );
}
