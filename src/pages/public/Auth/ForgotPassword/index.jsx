// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { useReveal } from "../../HomePage/Hooks";
import AuthLeftPanel from "../AuthLeftPanel";
import ForgotPasswordForm from "./ForgotPasswordForm";
import BackToLoginPrompt from "./BackToLoginPrompt";
import { typefaces } from "@/lib/theme";
import ResetPasswordForm from "./ResetPasswordForm";


export default function ForgotPasswordPage() {
    const { bg, fg, main } = useColor();
    const form = useReveal();
    const [searchParams] = useSearchParams();

    // The email link now points straight at this page with ?token=&email=
    // attached (confirmed from the real email: /forgot-password?token=...&email=...),
    // rather than a separate /reset-password page. So this one page covers both
    // steps of the flow: request the link (no params yet), then set the new
    // password (params present, arrived via the email link).
    const hasResetParams = Boolean(searchParams.get("token") && searchParams.get("email"));

    return (
        <Stack direction="row" sx={{ minHeight: "100vh", backgroundColor: bg.tertiary }}>
            <AuthLeftPanel />

            <Stack alignItems="center" justifyContent="center" sx={{ flex: 1, px: { xs: 3, md: 6 }, py: 6 }}>
                <Box ref={form.ref} className={form.className} sx={{ width: "100%", maxWidth: 400 }}>
                    <Typography
                        sx={{
                            fontFamily:typefaces.tertiary,
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            color: main.primary,
                            textAlign: "center",
                            mb: 1,
                        }}
                    >
                        RESET PASSWORD
                    </Typography>

                    {hasResetParams ? (
                        <>
                            <Typography
                                sx={{ fontFamily: typefaces.tertiary, fontSize: { xs: 24, md: 28 }, fontWeight: 700, color: fg.primary, textAlign: "center", mb: 3.5 }}
                            >
                                Set a New{" "}
                                <Box component="span" sx={{ color: main.primary }}>
                                    Password
                                </Box>
                            </Typography>
                            <ResetPasswordForm />
                        </>
                    ) : (
                        <>
                            <Typography
                                sx={{ fontFamily: typefaces.tertiary, fontSize: { xs: 24, md: 28 }, fontWeight: 700, color: fg.primary, textAlign: "center", mb: 1 }}
                            >
                                Forgot Your{" "}
                                <Box component="span" sx={{ color: main.tertiary }}>
                                    Password?
                                </Box>
                            </Typography>
                            <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 13, color: fg.secondary, textAlign: "center", mb: 3.5 }}>
                                No worries — enter your email and we'll send you a reset link.
                            </Typography>
                            <ForgotPasswordForm />
                        </>
                    )}

                    <BackToLoginPrompt />
                </Box>
            </Stack>
        </Stack>
    );
}