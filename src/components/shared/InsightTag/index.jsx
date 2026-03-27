import { spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Box, Stack, Typography } from "@mui/material";

/** @typedef {import("@/types/color.d.js").ColorContextValue} ColorContextValueProps */

/**
 * @param {Object} props
 * @param {keyof ColorContextValueProps["status"]} props.color
 * @param {string} props.label
 * @param {string | number} props.value
 */
export default function InsightTag({ color = "success", label = "Label", value = "100" }) {
  const { status } = useColor();

  return (
    <Stack gap={spacingTokens.xs}>
      <Stack direction="row" alignItems="center" gap={spacingTokens.sm}>
        <Box
          sx={{
            backgroundColor: status[color]?.primary,
            height: "8px",
            width: "8px",
            borderRadius: "999px",
          }}
        ></Box>
        <Typography color="#A1A3C3" fontSize="12px" fontWeight={700}>
          {label}
        </Typography>
      </Stack>
      <Typography
        color="#A1A3C3"
        fontSize="15px"
        fontWeight={700}
        sx={{ marginLeft: `calc(8px + ${spacingTokens.sm})` }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
