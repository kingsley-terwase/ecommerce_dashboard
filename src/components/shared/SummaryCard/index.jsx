import { Typography } from "@/components/ui";
import { radius, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Box, Stack, Typography as BaseTypography } from "@mui/material";
import { Percent } from "./Percent";

/**
 * @param {{
 *  color?: string,
 *  value: number | string,
 *  round?: keyof typeof radius,
 *  secondaryLabel?: string,
 *  icon?: React.ComponentType<{fontSize: number, color: string, style: Record<string, any>}>,
 *  percentValue?: number,
 *  percentLabel?: string
 * }} props
 */
export default function SummaryCard({
  color = "primary",
  value,
  round = 8,
  percentLabel = "since last month",
  secondaryLabel = "Total",
  icon: Icon,
  percentValue = 3.0,
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
        padding: `${spacingTokens.xl} ${spacingTokens.xl}`,
        display: "flex",
        flexDirection: "column",
        gap: spacingTokens.lg,
        position: "relative",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={spacingTokens.lg}
      >
        <Stack gap={spacingTokens.lg}>
          <Typography
            variant="caption"
            textAlign="start"
            fontWeight={500}
            color="secondary"
          >
            {secondaryLabel}
          </Typography>
          <BaseTypography
            variant="h1"
            sx={{ color: fg.primary }}
            textAlign="start"
            fontWeight={700}
            lineHeight={1}
          >
            {value}
          </BaseTypography>
        </Stack>

        {Icon && (
          <Icon
            fontSize={40}
            color={_color?.primary}
            style={{ display: "block" }}
          />
        )}
      </Stack>

      <Percent value={percentValue} label={percentLabel} />
    </Box>
  );
}
