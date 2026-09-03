// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { useReveal } from "../../HomePage/Hooks";
import AuthLeftPanel from "../AuthLeftPanel";
import GoogleAuthButton from "./GoogleBtn";
import RoleTabs from "./RoleTabs";
import RegisterForm from "./RegisterForm";
import SignInPrompt from "./SignInPrompt";
import { ROLES } from "./constants";
import { typefaces } from "@/lib/theme";

export default function RegisterPage() {
  const { bg, fg, main } = useColor();
  const [role, setRole] = useState("buyer");
  const form = useReveal();
  const activeRole = ROLES.find((r) => r.id === role);

  return (
    <Stack direction="row" sx={{ backgroundColor: bg.primary }}>
      <AuthLeftPanel />

      <Stack alignItems="center" justifyContent="center" sx={{ flex: 1, px: { xs: 3, md: 6 }, py: 4 }}>
        <Box ref={form.ref} className={form.className} sx={{ width: "100%", maxWidth: 420 }}>
          <Typography
            sx={{ fontFamily: typefaces.tertiary, fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: main.primary, textAlign: "center", mb: 1 }}
          >
            JOIN US
          </Typography>
          <Typography
            sx={{ fontFamily: typefaces.tertiary, fontSize: { xs: 24, md: 28 }, fontWeight:700, color: fg.primary, textAlign: "center", mb: 3 }}
          >
            Create Your{" "}
            <Box component="span" sx={{ color: main.primary }}>
              Account
            </Box>
          </Typography>

          <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", color: fg.secondary, mb: 1 }}>
            I WANT TO
          </Typography>

          <RoleTabs role={role} setRole={setRole} />
          <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 12, color: fg.tertiary, textAlign: "center", mb: 3 }}>
            {activeRole.desc}
          </Typography>

          <GoogleAuthButton />
          <RegisterForm role={role} />
          <SignInPrompt />
        </Box>
      </Stack>
    </Stack>
  );
}