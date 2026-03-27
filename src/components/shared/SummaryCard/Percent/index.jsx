import { useColor } from "@/contexts/color";
import { Typography, Stack } from "@mui/material";
import { ArrowUpFilled, ArrowDownFilled } from "@fluentui/react-icons";

/**
 * @param {Object} props
 * @param {number} props.value        e.g. 8.2 or -3.1
 * @param {string} [props.label]      e.g. "since last month"
 */
export const Percent = ({ value, label = "since last month" }) => {
  const { main, fg } = useColor();

  // Guard: coerce to number, return null if NaN (prevents -NaN% bug)
  // @ts-ignore
  const num = parseFloat(value);
  if (isNaN(num)) return null;

  const isUp = num >= 0;
  const color = isUp ? main.success : main.error;
  const Icon = isUp ? ArrowUpFilled : ArrowDownFilled;
  const display = `${isUp ? "+" : ""}${num}%`;

  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      <Icon
        fontSize={14}
        color={color}
        style={{ display: "block", flexShrink: 0 }}
      />
      <Typography variant="caption" fontWeight={600} sx={{ color }}>
        {display}
      </Typography>
      <Typography variant="caption" sx={{ color: fg.primary }}>
        {label}
      </Typography>
    </Stack>
  );
};
