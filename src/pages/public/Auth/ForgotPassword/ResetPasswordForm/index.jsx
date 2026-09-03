// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { LockClosed24Regular, Eye24Regular, EyeOff24Regular, CheckmarkCircle24Filled } from "@fluentui/react-icons";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { radiusTokens, typefaces } from "@/lib/theme";
import { useResetPassword } from "@/Hooks/auth";
import AppLoader from "@/Utils/AppLoader";

export default function ResetPasswordForm() {
    const { fg, border, main } = useColor();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { resetPassword, loading } = useResetPassword();

    const email = searchParams.get("email");
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [done, setDone] = useState(false);

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            fontFamily: typefaces.primary,
            borderRadius: radiusTokens.md,
            color: fg.primary,
            "& fieldset": { borderColor: border.primary },
            "&:hover fieldset": { borderColor: main.primary },
            "&.Mui-focused fieldset": { borderColor: main.primary },
        },
    };

    // If the link is missing its query params entirely, there's nothing to do here.
    if (!email || !token) {
        return (
            <Stack alignItems="center" gap={1.4} sx={{ py: 2, textAlign: "center" }}>
                <Typography sx={{ fontFamily: typefaces.primary, fontSize: 14, color: fg.secondary }}>
                    This reset link is missing or invalid. Please request a new one.
                </Typography>
                <Typography
                    onClick={() => navigate("/forgot-password")}
                    sx={{ fontFamily: typefaces.primary, fontSize: 13, fontWeight: 700, color: main.primary, cursor: "pointer" }}
                >
                    Request a new link
                </Typography>
            </Stack>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) return; // could add an inline error here if you want field-level feedback
        if (password !== confirmPassword) return;

        const result = await resetPassword({ email, token, newPassword: password });
        if (result.success) setDone(true);
    };

    if (done) {
        return (
            <Stack alignItems="center" gap={1.6} sx={{ py: 2, textAlign: "center" }}>
                <CheckmarkCircle24Filled style={{ fontSize: 40, color: main.primary }} />
                <Typography sx={{ fontFamily: typefaces.primary, fontSize: 15, fontWeight: 700, color: fg.primary }}>
                    Password updated
                </Typography>
                <Typography sx={{ fontFamily: typefaces.primary, fontSize: 13, color: fg.secondary, maxWidth: 320 }}>
                    Your password has been reset. You can now sign in with your new password.
                </Typography>
                <Button
                    onClick={() => navigate("/login")}
                    variant="contained"
                    sx={{
                        mt: 1,
                        backgroundColor: main.primary,
                        borderRadius: radiusTokens.md,
                        textTransform: "none",
                        fontFamily: typefaces.primary,
                        fontWeight: 700,
                        px: 3,
                    }}
                >
                    Go to sign in
                </Button>
            </Stack>
        );
    }

    return (
        <>
            <AppLoader show={loading} tagline="Updating your password..." />

            <Box component="form" onSubmit={handleSubmit}>
                <Stack gap={2}>
                    <Box>
                        <Typography sx={{ fontFamily: typefaces.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: fg.secondary, mb: 0.6 }}>
                            NEW PASSWORD
                        </Typography>
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 8 characters"
                            sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockClosed24Regular style={{ fontSize: 17, color: fg.primary }} />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <Box onClick={() => setShowPassword((s) => !s)} sx={{ cursor: "pointer", display: "flex", color: fg.primary }}>
                                        {showPassword ? <EyeOff24Regular style={{ fontSize: 18 }} /> : <Eye24Regular style={{ fontSize: 18 }} />}
                                    </Box>
                                ),
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontFamily: typefaces.primary, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: fg.secondary, mb: 0.6 }}>
                            CONFIRM PASSWORD
                        </Typography>
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter your password"
                            sx={inputSx}
                        />
                        {confirmPassword && password !== confirmPassword && (
                            <Typography sx={{ fontSize: 11.5, color: "#ef4444", mt: 0.5 }}>Passwords don't match</Typography>
                        )}
                    </Box>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading || password.length < 8 || password !== confirmPassword}
                        sx={{
                            backgroundColor: main.primary,
                            borderRadius: radiusTokens.md,
                            textTransform: "none",
                            fontFamily: typefaces.primary,
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            py: 1.3,
                            mt: 0.5,
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            "&:hover": { transform: "translateY(-2px)", boxShadow: `0 12px 24px -10px ${main.primary}88` },
                        }}
                    >
                        RESET PASSWORD →
                    </Button>
                </Stack>
            </Box>
        </>
    );
}