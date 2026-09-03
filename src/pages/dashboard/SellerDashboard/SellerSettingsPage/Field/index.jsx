// @ts-nocheck
import { Box, Stack, Typography, InputBase } from "@mui/material";
import { radiusTokens } from "@/lib/theme";

export default function Field({ label, hint, value, onChange, placeholder, border, fg }) {
    return (
        <Stack gap={0.6}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>{label}</Typography>
            {hint && (
                <Typography sx={{ fontSize: 11.5, color: fg.tertiary, mt: -0.4 }}>{hint}</Typography>
            )}
            <Box
                sx={{
                    border: `1px solid ${border.primary}`,
                    borderRadius: radiusTokens.sm ?? 8,
                    px: 1.4,
                    py: 1,
                    mt: 0.3,
                }}
            >
                <InputBase
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    sx={{ fontSize: 16, width: "100%", color: fg.primary, "& input": { fontSize: 16 } }}
                />
            </Box>
        </Stack>
    );
}