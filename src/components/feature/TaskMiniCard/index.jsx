import { Avatar, Checkbox, Typography } from "@/components/ui";
import { radius, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { renderDateTime } from "@/helpers/date";
import { ClockAlarmRegular } from "@fluentui/react-icons";
import { Box, Stack } from "@mui/material";

/**
 * @param {Object} props
 * @param {string} [props.assigneeName]
 * @param {boolean} [props.completed]
 * @param {string} props.subject
 * @param {() => void} [props.onCheck]
 * @param {string} [props.date]
 * @param {string} [props.time]
 * @param {string} [props.reminder]
 * * @param {keyof radius} [props.round]
 */
export default function TaskMiniCard({
  assigneeName,
  completed,
  subject,
  onCheck,
  date,
  time,
  reminder,
  round = 4,
}) {
  const { border, fg, main } = useColor();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        py: spacingTokens.sm,
        px: spacingTokens.md,
        borderRadius: radius[round],
        border: `1px solid ${border.primary}`,
      }}
    >
      <Stack direction="row" alignItems="center" gap={spacingTokens.md}>
        <Checkbox checked={completed} onCheck={onCheck}></Checkbox>
        {assigneeName && <Avatar name={assigneeName}></Avatar>}
        <Stack gap={spacingTokens.sm}>
          <Typography
            fontWeight={500}
            lineHeight={1}
            sx={{
              whiteSpace: "nowrap",
              cursor: "pointer",
              transition:
                "color 0.35s ease-in-out, text-decoration 0.35s ease-in-out 0.25s",
              "&:hover": {
                textDecoration: "underline",
                color: main.primary,
              },
            }}
          >
            {subject}
          </Typography>

          <Typography
            variant="caption"
            color="secondary"
            lineHeight={1}
            sx={{ whiteSpace: "nowrap" }}
          >
            {date || time ? renderDateTime(date, time) : "Goals"}
          </Typography>
        </Stack>
      </Stack>
      {reminder && (
        <Stack gap={spacingTokens.sm} alignItems="end">
          <ClockAlarmRegular fontSize={18} color={fg.secondary} />
          <Typography
            variant="caption"
            color="main-primary"
            lineHeight={1}
            textAlign="right"
            sx={{ whiteSpace: "nowrap" }}
          >
            {reminder}
          </Typography>
        </Stack>
      )}
    </Box>
  );
}
