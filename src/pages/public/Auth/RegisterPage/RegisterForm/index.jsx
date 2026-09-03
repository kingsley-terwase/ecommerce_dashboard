// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { radiusTokens, typefaces } from "@/lib/theme";
import { ROLES } from "../constants";
import { useSignup } from "@/Hooks/auth";
import { useNotification } from "@/contexts/notification";
import AppLoader from "@/Utils/AppLoader";

export default function RegisterForm({ role }) {
    const { fg, border, main } = useColor();
    const navigate = useNavigate();
    const { signup, loading } = useSignup();
    const { error: notifyError } = useNotification();

    const [showPassword, setShowPassword] = useState(false);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);

    const inputSx = {
        "& .MuiOutlinedInput-root": {
            fontFamily: typefaces.tertiary,
            borderRadius: radiusTokens.md,
            color: fg.primary,
            "& fieldset": { borderColor: border.primary },
            "&:hover fieldset": { borderColor: main.primary },
            "&.Mui-focused fieldset": { borderColor: main.primary },
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            notifyError("Password must be at least 8 characters");
            return;
        }
        if (!agreed) {
            notifyError("Please accept the Terms of Service and Privacy Policy");
            return;
        }

        const apiRole = ROLES.find((r) => r.id === role)?.apiRole;
        const result = await signup({ firstname, lastname, email, password, role: apiRole });

        if (result.success) {
            // Account isn't usable until the verification link is clicked —
            // send them to login rather than trying to sign them in directly.
            navigate("/login");
        }
    };

    return (
        <>
            <AppLoader show={loading} tagline="Creating your account..." />
           
            <Box component="form" onSubmit={handleSubmit}>
                <Stack gap={2}>
                    <Stack direction="row" gap={1.5}>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: fg.secondary, mb: 0.6 }}>
                                FIRST NAME
                            </Typography>
                            <TextField
                                fullWidth
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="First name"
                                sx={inputSx}
                            />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: fg.secondary, mb: 0.6 }}>
                                LAST NAME
                            </Typography>
                            <TextField
                                fullWidth
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Last name"
                                sx={inputSx}
                            />
                        </Box>
                    </Stack>

                    <Box>
                        <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: fg.secondary, mb: 0.6 }}>
                            EMAIL
                        </Typography>
                        <TextField
                            fullWidth
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            sx={inputSx}
                        />
                    </Box>

                    <Box>
                        <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: fg.secondary, mb: 0.6 }}>
                            PASSWORD
                        </Typography>
                        <TextField
                            fullWidth
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 8 characters"
                            sx={inputSx}
                            InputProps={{
                                endAdornment: (
                                    <Box onClick={() => setShowPassword((s) => !s)} sx={{ cursor: "pointer", display: "flex", color: fg.tertiary }}>
                                        {showPassword ? <EyeOff24Regular style={{ fontSize: 18 }} /> : <Eye24Regular style={{ fontSize: 18 }} />}
                                    </Box>
                                ),
                            }}
                        />
                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                size="small"
                                checked={agreed}
                                onChange={(e) => setAgreed(e.target.checked)}
                                sx={{ color: border.primary, "&.Mui-checked": { color: main.primary } }}
                            />
                        }
                        label={
                            <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 12.5, color: fg.secondary }}>
                                I agree to the Terms of Service and Privacy Policy
                            </Typography>
                        }
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            backgroundColor: main.primary,
                            borderRadius: radiusTokens.md,
                            textTransform: "none",
                            fontFamily: typefaces.tertiary,
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            py: 1.3,
                            mt: 0.5,
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                            "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: `0 12px 24px -10px ${main.primary}88`,
                            },
                            "&:hover::after": { left: "130%" },
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: "-60%",
                                width: "40%",
                                height: "100%",
                                background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
                                transform: "skewX(-20deg)",
                                transition: "left 0.6s ease",
                            },
                        }}
                    >
                        Create Account →
                    </Button>
                </Stack>
            </Box>
        </>
    );
}