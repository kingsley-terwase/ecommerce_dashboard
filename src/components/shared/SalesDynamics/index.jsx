import { Box, Stack, Typography } from "@mui/material";
import { spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
// import { Card } from "@/components/ui";

const data = [
  { month: "JAN", value: 210 },
  { month: "FEB", value: 160 },
  { month: "MAR", value: 230 },
  { month: "APR", value: 200 },
  { month: "MAY", value: 270 },
  { month: "JUN", value: 210 },
  { month: "JUL", value: 220 },
  { month: "AUG", value: 80 },
  { month: "SEP", value: 230 },
  { month: "OCT", value: 250 },
  { month: "NOV", value: 300 },
  { month: "DEC", value: 360 },
];

export default function SalesDynamics() {
  const max = 400;

  const { fg } = useColor();

  return (
    <Box>
      <Box
        sx={{
          p: spacingTokens.lg,
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={spacingTokens.lg}
        >
          <Typography fontWeight={600}>Sales dynamics</Typography>
          <Typography sx={{ color: fg.primary }}>2026</Typography>
        </Stack>

        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="space-between"
          height={260}
        >
          {data.map((item) => {
            const heightPercent = (item.value / max) * 100;
            return (
              <Stack key={item.month} alignItems="center" spacing={1}>
                <Box
                  sx={{
                    width: 14,
                    height: 220,
                    borderRadius: 10,
                    background: "#fff",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      height: `${heightPercent}%`,
                      borderRadius: 10,
                      background: "#3B82F6",
                    }}
                  />
                </Box>

                <Typography variant="caption" sx={{ color: fg.primary }}>
                  {item.month}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
