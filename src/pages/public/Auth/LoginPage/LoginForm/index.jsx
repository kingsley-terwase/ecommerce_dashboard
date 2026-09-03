// @ts-nocheck
import { useState } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import {
  Eye24Regular,
  EyeOff24Regular,
  LockClosed24Regular,
  Mail24Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useColor } from "@/contexts/color";
import { radiusTokens, typefaces } from "@/lib/theme";
import AppLoader from "@/Utils/AppLoader";
import { useLogin } from "@/Hooks/auth";

export default function LoginForm() {
  const { fg, border, main } = useColor();
  const navigate = useNavigate();
  const { login, loading } = useLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
    // useLogin handles the notification + redirect on success internally.
  };

  return (
    <>
      <AppLoader show={loading} tagline="Signing you in..." />

      <Box component="form" onSubmit={handleSubmit}>
        <Stack gap={2}>
          <Box>
            <Typography
              sx={{
                fontFamily: typefaces.primary,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: fg.secondary,
                mb: 0.6,
              }}
            >
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

          <Box>
            <Typography
              sx={{
                fontFamily: typefaces.primary,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                color: fg.secondary,
                mb: 0.6,
              }}
            >
              PASSWORD
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              sx={inputSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockClosed24Regular style={{ fontSize: 17, color: fg.tertiary }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Box
                    onClick={() => setShowPassword((s) => !s)}
                    sx={{ cursor: "pointer", display: "flex", color: fg.tertiary }}
                  >
                    {showPassword ? (
                      <EyeOff24Regular style={{ fontSize: 18 }} />
                    ) : (
                      <Eye24Regular style={{ fontSize: 18 }} />
                    )}
                  </Box>
                ),
              }}
            />
          </Box>

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{ color: border.primary, "&.Mui-checked": { color: main.primary } }}
                />
              }
              label={
                <Typography sx={{ fontFamily: typefaces.primary, fontSize: 13, color: fg.secondary }}>
                  Remember me
                </Typography>
              }
            />
            <Typography
              onClick={() => navigate("/forgot-password")}
              sx={{
                fontFamily: typefaces.primary,
                fontSize: 13,
                fontWeight: 600,
                color: main.primary,
                cursor: "pointer",
              }}
            >
              Forgot password?
            </Typography>
          </Stack>

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
              mt: 1,
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
                background:
                  "linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent)",
                transform: "skewX(-20deg)",
                transition: "left 0.6s ease",
              },
            }}
          >
            Sign In →
          </Button>
        </Stack>
      </Box>
    </>
  );
}