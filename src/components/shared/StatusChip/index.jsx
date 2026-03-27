import { useColor } from "@/contexts/color";
import { Stack, Typography } from "@mui/material";
import {
  CheckmarkCircleFilled,
  DismissCircleFilled,
  ClockRegular,
} from "@fluentui/react-icons";

const config = {
  completed: { icon: CheckmarkCircleFilled, label: "Completed" },
  cancelled: { icon: DismissCircleFilled, label: "Cancelled" },
  pending: { icon: ClockRegular, label: "Pending" },
};

/**
 * @param {{ status: "completed" | "cancelled" | "pending" }} props
 */
export default function StatusChip({ status = "pending" }) {
  const { main, status: statusColors } = useColor();

  const map = {
    completed: {
      color: statusColors?.success?.primary ?? main.success,
      bg: statusColors?.success?.secondary,
    },
    cancelled: {
      color: statusColors?.error?.primary ?? main.error,
      bg: statusColors?.error?.secondary,
    },
    pending: {
      color: statusColors?.warning?.primary ?? main.warning,
      bg: statusColors?.warning?.secondary,
    },
  };

  const { color, bg } = map[status] ?? map.pending;
  const { icon: Icon, label } = config[status] ?? config.pending;

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={0.6}
      sx={{
        display: "inline-flex",
        px: 1.2,
        py: 0.4,
        borderRadius: "999px",
        backgroundColor: bg,
        width: "fit-content",
      }}
    >
      <Icon
        fontSize={14}
        color={color}
        style={{ display: "block", flexShrink: 0 }}
      />
      <Typography
        variant="caption"
        fontWeight={600}
        sx={{ color, lineHeight: 1 }}
      >
        {label}
      </Typography>
    </Stack>
  );
}
