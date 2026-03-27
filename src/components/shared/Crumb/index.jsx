import { dashboardNavHeight, radius, spacing } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Box } from "@mui/material";

/** @typedef {import("@/types/global.d.js").NavItem} NavProps */

/**
 * @param {Object} props
 * @param {boolean} props.active
 * @param {Omit<NavProps, "path" | "sub">} props.nav
 * @param {string} [props.height]
 */
export default function Crumb({ active, nav, height = dashboardNavHeight }) {
  const { fg, main } = useColor();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: height,
        "&::before": {
          content: '""',
          display: active ? "block" : "none",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: main.primary,
        },
      }}
    >
      <Box
        sx={{
          borderRadius: radius[5],
          padding: "7px 6px",
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: spacing[1],
          "& > *": {
            color: active ? main.primary : fg.primary,
            fontSize: "13px",
          },
        }}
      >
        {nav.icon && (
          <nav.icon style={{ display: "block", fontSize: "16px" }}></nav.icon>
        )}
        <span style={{ lineHeight: 1 }}>{nav?.label}</span>
      </Box>
    </Box>
  );
}
