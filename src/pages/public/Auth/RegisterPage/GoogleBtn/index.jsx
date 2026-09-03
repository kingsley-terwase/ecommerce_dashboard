// @ts-nocheck
import { Box, Button, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { radiusTokens, typefaces } from "@/lib/theme";
import GoogleIcon from "../../GoogleIcon";

export default function GoogleAuthButton() {
    const { fg, border } = useColor();

    const handleGoogleAuth = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    };

    return (
        <>
            <Button
                fullWidth
                variant="outlined"
                onClick={handleGoogleAuth}
                sx={{
                    borderColor: border.primary,
                    color: fg.primary,
                    textTransform: "none",
                    fontFamily: typefaces.tertiary,
                    fontWeight: 600,
                    borderRadius: radiusTokens.md,
                    py: 1.1,
                    mb: 2.5,
                    gap: 1,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 18px -10px rgba(0,0,0,0.25)",
                    },
                }}
                startIcon={<GoogleIcon />}
            >
                Continue with Google
            </Button>

            <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 2.5 }}>
                <Box sx={{ flex: 1, height: "1px", backgroundColor: border.primary }} />
                <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 11, color: fg.tertiary }}>
                    OR
                </Typography>
                <Box sx={{ flex: 1, height: "1px", backgroundColor: border.primary }} />
            </Stack>
        </>
    );
}