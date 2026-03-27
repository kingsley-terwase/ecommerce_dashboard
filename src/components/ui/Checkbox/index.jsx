import { useColor } from "@/contexts/color";
import { CheckmarkFilled } from "@fluentui/react-icons";
import { Box } from "@mui/material";
/**
 * @param {Object} props
 * @param {number} [props.size]
 * @param {boolean} [props.checked]
 * @param {() => void} [props.onCheck]
 * @param {string} [props.accent]
 */
export default function Checkbox({ size = 16, checked = false, onCheck, accent }) {
  const { main, bg, border } = useColor();
  const unitSize = `${size}px`;
  const iconSize = size * 0.65;

  const defaultAccent = main.success;
  const accentColor = accent || defaultAccent;

  return (
    <Box
      component="div"
      onClick={onCheck}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: unitSize,
        width: unitSize,
        backgroundColor: checked ? accentColor : bg.tertiary,
        border: `1px solid ${checked ? accentColor : border.primary}`,
        borderRadius: size * 0.35 + "px",
        cursor: "pointer",
        transition: "background-color 0.35s ease-in-out 0.15s, border 0.25s ease-in-out",
        flexShrink: 0,
      }}
    >
      {checked && <CheckmarkFilled fontSize={iconSize} color="#ffffff" />}
    </Box>
  );
}
