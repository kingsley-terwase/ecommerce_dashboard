import { radiusTokens, spacing, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { ChevronLeftFilled } from "@fluentui/react-icons";
import { Box, Stack } from "@mui/material";

/** @typedef {import("@/types/global.d.js").NavItem} NavProps */

/**
 * @param {Object} props
 * @param {NavProps} props.nav
 * @param {() => void} props.onNavigate
 * @param {boolean} props.active
 * @param {string} [props.y]
 * @param {string} [props.x]
 * @param {boolean} [props.subNavOpen]
 */
export default function NavLink({
  nav,
  onNavigate,
  active,
  y = "6px",
  x = spacing[3],
  subNavOpen = false,
}) {
  const { elevate, fg, theme, main } = useColor();
  const hasSubNav = nav?.sub && nav?.sub?.length > 0;

  return (
    <Box
      component="div"
      onClick={onNavigate}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: spacingTokens.sm,
        width: "100%",
        fontWeight: 400,
        py: y,
        pl: x,
        pr: hasSubNav ? `calc(${x} + 16px)` : x,
        lineHeight: 1,
        verticalAlign: "middle",
        backgroundColor: active ? elevate.primary : "transparent",
        borderRadius: radiusTokens.md,
        flexShrink: 0,
        cursor: "pointer",
        color: active ? fg.primary : fg.secondary,
        transition:
          "background-color 0.35s ease-in-out, color 0.35s ease-in-out 0.25s",
        "& *": {
          flexShrink: 0,
        },
        "&:hover": {
          backgroundColor: elevate.primary,
          color: fg.primary,
          "& .indicator": {
            transform: "translateY(-50%) rotate(180deg)",
          },
        },
        "& .indicator": {
          position: "absolute",
          top: "50%",
          right: 0,
          transform: subNavOpen
            ? "translateY(-50%) rotate(90deg)"
            : "translateY(-50%) rotate(0deg)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          height: "16px",
          width: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          backgroundColor:
            theme === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <nav.icon
        fontSize={18}
        style={{
          display: "block",
          color: nav?.color ? nav.color : main.primary,
        }}
      ></nav.icon>
      <Box
        component="span"
        sx={{
          userSelect: "none",
          lineHeight: 1,
          display: "flex",
          alignItems: "center",
          verticalAlign: "middle",
        }}
      >
        {nav?.label}
      </Box>
      {hasSubNav && (
        <Stack
          alignItems="center"
          justifyContent="center"
          component="div"
          className="indicator"
        >
          <ChevronLeftFilled fontSize={12}></ChevronLeftFilled>
        </Stack>
      )}
    </Box>
  );
}
