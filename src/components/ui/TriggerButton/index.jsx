import { actionSizes, spacingTokens, radius, fontSizes } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Box } from "@mui/material";

/**
 * @param {Object} props
 * @param {string} [props.label]
 * @param {string} [props.placeholder]
 * @param {string} [props.accent]
 * @param {import("react").ComponentType<{fontSize?: number, color?: string}>} [props.icon]
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onClick]
 * @param {keyof typeof radius} [props.round]
 * @param {boolean} [props.noBorder]
 * @param {boolean} [props.br]
 * @param {boolean} [props.bl]
 * @param {boolean} [props.fullWidth]
 */
export default function TriggerButton({
  label,
  icon: Icon,
  accent,
  onClick,
  round = 4,
  noBorder = false,
  br = false,
  bl = false,
  fullWidth = false,
  placeholder,
}) {
  const { input, fg } = useColor();

  const borderStyle = `1px solid ${input.outlined.default.border}`;

  const resolvedBorder = noBorder ? "none" : borderStyle;
  const resolvedBorderRight = noBorder ? (br ? borderStyle : "none") : borderStyle;
  const resolvedBorderLeft = noBorder ? (bl ? borderStyle : "none") : borderStyle;

  return (
    <Box
      component="div"
      onClick={onClick}
      aria-hidden={false}
      sx={{
        display: "flex",
        alignItems: "center",
        height: actionSizes.small,
        gap: spacingTokens.xs,
        lineHeight: 1,
        px: spacingTokens.sm,
        cursor: onClick ? "pointer" : "default",
        transition: "background-color 0.35s ease-in-out, border-color 0.35s ease-in-out",
        border: resolvedBorder,
        borderRight: resolvedBorderRight,
        borderLeft: resolvedBorderLeft,
        borderRadius: radius[round],
        width: fullWidth ? "100%" : "fit-content",
        "& *": {
          fontFamily: fontSizes.body1,
        },
        "&:hover": {
          backgroundColor: onClick ? input.outlined.default.bg : "transparent",
        },
      }}
    >
      {Icon && <Icon color={accent || input.outlined.default.placeholder} />}
      {(label || placeholder) && (
        <Box
          component="span"
          fontWeight={400}
          color={placeholder && !label ? fg.disabled : input.outlined.default.fg}
          sx={{
            whiteSpace: "nowrap",
            userSelect: "none",
            lineHeight: 1,
          }}
        >
          {label || placeholder}
        </Box>
      )}
    </Box>
  );
}
