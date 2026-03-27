import { radius, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Box } from "@mui/material";

/**
 * @param {Object} props
 * @param {import("@/types/global.d.js").Tab[]} props.tabs
 * @param {number} props.active
 * @param {(key: number) => void} props.onChange
 * @param {import("react").ReactNode} props.children
 * @param {keyof radius} [props.round]
 */
export default function Tabs({ children, tabs, active, onChange, round = 4 }) {
  const { border, elevate, fg, main } = useColor();

  return (
    <Box>
      <Box
        sx={{
          overflowX: "auto",
          display: "flex",
          border: `1px solid ${border.primary}`,
          borderRadius: radius[round],
        }}
      >
        {tabs.map((item, index) => {
          const _active = active === item.key;
          return (
            <Box
              component="div"
              key={index}
              onClick={() => onChange(item.key)}
              sx={{
                cursor: "pointer",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                whiteSpace: "nowrap",
                height: "40px",
                px: spacingTokens.md,
                backgroundColor: _active ? elevate.primary : "transparent",
                color: _active ? fg.primary : fg.tertiary,
                transition: "background-color 0.35s ease-in-out, color 0.35s ease-in-out 0.25s",
                "&:hover": {
                  backgroundColor: main.primary,
                  color: "#ffffff",
                },
              }}
            >
              {item.label}
            </Box>
          );
        })}
      </Box>
      {children}
    </Box>
  );
}
