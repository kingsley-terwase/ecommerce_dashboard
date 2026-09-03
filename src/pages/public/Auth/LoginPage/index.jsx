// @ts-nocheck
import { Box, Stack } from "@mui/material";
import { useColor } from "@/contexts/color";
import { useReveal } from "../../HomePage/Hooks";
import AuthLeftPanel from "../AuthLeftPanel";
import LoginHeader from "./LoginHeader";
import GoogleAuthButton from "./GoogleBtn";
import LoginForm from "./LoginForm";
import RegisterPrompt from "./RegisterPrompt";
import TrustBadges from "./TrustBadge";



export default function LoginPage() {
  const { bg } = useColor();
  const form = useReveal();

  return (
    <Stack direction="row" sx={{ minHeight: "100vh", backgroundColor: bg.primary }}>
      <AuthLeftPanel />

      <Stack alignItems="center" justifyContent="center" sx={{ flex: 1, px: { xs: 3, md: 6 }, py: 6 }}>
        <Box ref={form.ref} className={form.className} sx={{ width: "100%", maxWidth: 400 }}>
          <LoginHeader />
          <GoogleAuthButton />
          <LoginForm />
          <RegisterPrompt />
          <TrustBadges />
        </Box>
      </Stack>
    </Stack>
  );
}