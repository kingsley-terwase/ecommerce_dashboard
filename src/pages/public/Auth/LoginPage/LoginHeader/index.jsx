// @ts-nocheck
import { Box, Typography } from "@mui/material";
import { Sparkle24Filled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { typefaces } from "@/lib/theme";
export default function LoginHeader() {
    const { fg, main } = useColor();

    return (
        <>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={0.6}
                sx={{ mb: 1 }}
            >
                <Sparkle24Filled style={{ fontSize: 14, color: main.primary }} />
                <Typography
                    sx={{
                        fontFamily: typefaces.tertiary,
                        fontSize: 12,
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: main.primary,
                    }}
                >
                    WELCOME BACK
                </Typography>
            </Box>
            <Typography
                sx={{
                    fontFamily: typefaces.tertiary,
                    fontSize: { xs: 26, md: 30 },
                    fontWeight: 700,
                    color: fg.primary,
                    textAlign: "center",
                    mb: 4,
                }}
            >
                Sign Into Your{" "}
                <Box component="span" sx={{ color: main.primary }}>
                    Account
                </Box>
            </Typography>
        </>
    );
}