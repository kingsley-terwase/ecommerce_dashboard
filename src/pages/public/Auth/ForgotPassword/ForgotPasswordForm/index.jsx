// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, TextField, Button, InputAdornment } from "@mui/material";
import { Mail24Regular, CheckmarkCircle24Filled, CheckmarkCircleFilled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens, typefaces } from "@/lib/theme";
import { useForgotPassword, useResendVerification } from "@/Hooks/auth";
import AppLoader from "@/Utils/AppLoader";

export default function ForgotPasswordForm() {
    const { fg, border, main } = useColor();
    const { forgotPassword, loading } = useForgotPassword();
    const { resendVerification, loading: resending } = useResendVerification();

    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [needsVerification, setNeedsVerification] = useState(false);

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            fontFamily:typefaces.tertiary,
            borderRadius: radiusTokens.md,
            color: fg.primary,
            "& fieldset": { borderColor: border.primary },
            "&:hover fieldset": { borderColor: main.primary },
            "&.Mui-focused fieldset": { borderColor: main.primary },
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNeedsVerification(false);

        const result = await forgotPassword(email);
        // The hook already shows a notification either way — this local `sent`
        // state just swaps the form for a confirmation view on success.
        if (result.success) {
            setSent(true);
            return;
        }

        // ⚠️ Heuristic match on message text — there's no dedicated error code
        // documented for "account exists but isn't verified" vs. other failures
        // (e.g. email not found). Confirm the exact wording with your backend
        // dev and tighten this check once known.
        if (result.message?.toLowerCase().includes("verif")) {
            setNeedsVerification(true);
        }
    };

    const handleResend = async () => {
        await resendVerification(email);
    };

    if (sent) {
        return (
            <Stack alignItems="center" gap={1.6} sx={{ py: 2 }}>
                <CheckmarkCircleFilled style={{ fontSize: 40, color: 'green' }} />
                <Typography sx={{ fontFamily:typefaces.tertiary, fontSize: 15, fontWeight: 700, color: fg.primary, textAlign: "center" }}>
                    Check your inbox
                </Typography>
                <Typography sx={{ fontFamily:typefaces.tertiary, fontSize: 13, color: fg.secondary, textAlign: "center", maxWidth: 320 }}>
                    We've sent a password reset link to <strong>{email}</strong>. It may take a minute to arrive.
                </Typography>
                <Typography
                    onClick={() => setSent(false)}
                    sx={{ fontFamily:typefaces.tertiary, fontSize: 13, fontWeight: 700, color: main.primary, cursor: "pointer", mt: 1 }}
                >
                    Use a different email
                </Typography>
            </Stack>
        );
    }

    return (
        <>
            {/* AppLoader overlays the whole screen while either request is in
          flight — consistent with how LoginForm handles its loading state. */}
            <AppLoader show={loading || resending} tagline={loading ? "Sending reset link..." : "Resending verification..."} />

            <Box component="form" onSubmit={handleSubmit}>
                <Stack gap={2}>
                    <Box>
                        <Typography sx={{ fontFamily:typefaces.tertiary, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: fg.secondary, mb: 0.6 }}>
                            EMAIL
                        </Typography>
                        <TextField
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            sx={inputSx}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Mail24Regular style={{ fontSize: 17, color: fg.tertiary }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading || resending}
                        sx={{
                            backgroundColor: main.primary,
                            borderRadius: radiusTokens.md,
                            textTransform: "none",
                            fontFamily:typefaces.tertiary,
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            py: 1.3,
                            mt: 0.5,
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            "&:hover": { transform: "translateY(-2px)", boxShadow: `0 12px 24px -10px ${main.primary}88` },
                        }}
                    >
                        SEND RESET LINK →
                    </Button>

                    {needsVerification && (
                        <Box sx={{ textAlign: "center", mt: -0.5 }}>
                            <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>
                                This account isn't verified yet.{" "}
                                <Box
                                    component="span"
                                    onClick={!resending ? handleResend : undefined}
                                    sx={{ color: main.primary, fontWeight: 700, cursor: resending ? "default" : "pointer" }}
                                >
                                    Resend verification email
                                </Box>
                            </Typography>
                        </Box>
                    )}
                </Stack>
            </Box>
        </>
    );
}