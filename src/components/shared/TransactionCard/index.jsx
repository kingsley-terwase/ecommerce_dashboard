import { Typography } from "@/components/ui";
import { radius, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Box, Stack, Typography as BaseTypography } from "@mui/material";
import RingProgress from "../RingProgress";

/**
 * @param {{
 *  color?: string,
 *  value: number | string,
 *  round?: keyof typeof radius,
 *  label?: string,
 *  footerLabel?: string,
 *  icon?: React.ComponentType<{fontSize: number, color: string, style: Record<string, any>}>,
 *  percentValue?: number,
 * }} props
 */
export default function TransactionCard({
  color = "primary",
  value,
  round = 8,
  label = "Total",
  footerLabel = "Current Financial Year",
  icon: Icon,
  percentValue = 15,
}) {
  const { status, bg, fg } = useColor();
  // @ts-ignore
  const _color = status[color] ?? status.primary;

  return (
    <Box
      sx={{
        borderRadius: radius[round],
        boxSizing: "border-box",
        backgroundColor: bg.quaternary,
        padding: `${spacingTokens.xl}`,
        display: "flex",
        flexDirection: "column",
        gap: spacingTokens.lg,
      }}
    >
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        {Icon && (
          <Icon
            fontSize={36}
            color={fg.secondary}
            style={{ display: "block" }}
          />
        )}
        <RingProgress
          value={percentValue}
          color={_color?.primary}
          size={62}
          thickness={6}
        />
      </Stack>

      <Stack gap={spacingTokens.xs}>
        <Typography variant="body2" fontWeight={400} color="secondary">
          {label}
        </Typography>

        <BaseTypography
          variant="h2"
          sx={{ color: fg.primary }}
          fontWeight={700}
          lineHeight={1.1}
        >
          {value}
        </BaseTypography>

        <Typography variant="caption" color="secondary" fontWeight={400}>
          {footerLabel}
        </Typography>
      </Stack>
    </Box>
  );
}
