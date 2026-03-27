import { Button, Input, Typography } from "@/components/ui";
import { fontSizes, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Box, Stack } from "@mui/material";
import { useForm } from "@/lib/form";
import { rules } from "./lib";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLogin } from "@/queries/auth";
import { filterObj } from "@/helpers/validation";

export default function LoginPage() {
  const [params] = useSearchParams();
  const otpEnabled = params.get("otp_enabled");

  const navigate = useNavigate();

  const { fg, main } = useColor();
  const { loading, login } = useLogin();

  const { onBlur, onChange, formData, formErrors, validateForm } = useForm({
    init: {
      email: "",
      password: "",
      otp: "",
    },
    rules: () => rules({ otpEnabled: !!otpEnabled && otpEnabled === "true" }),
  });

  async function handleSubmit() {
    if (!validateForm()) return;
    await login(filterObj(formData));
  }

  function goToPasswordReset() {
    navigate("/password/reset");
  }

  return (
    <>
      <Box>
        <Typography variant="h1" lineHeight={1.5} fontWeight={500}>
          Sell Smarter. Connect Better.
        </Typography>
        <Typography
          color="secondary"
          fontWeight={300}
          variant="h3"
          lineHeight={1.25}
        >
          Your deals, contacts, and insights are waiting.
        </Typography>
      </Box>
      <Stack gap={spacingTokens.md}>
        <Input
          label="Email"
          name="email"
          value={(name) => formData[name]}
          onChange={(name, value) => onChange(name, value)}
          onBlur={(name, value) => onBlur(name, value)}
          error={(name) => formErrors?.[name]}
        />

        <Input
          label="Password"
          name="password"
          value={(name) => formData[name]}
          onChange={(name, value) => onChange(name, value)}
          onBlur={(name, value) => onBlur(name, value)}
          error={(name) => formErrors?.[name]}
          type="password"
        />

        <Button size="large" loading={loading} onClick={handleSubmit}>
          Submit
        </Button>

        <Box
          component="p"
          m={0}
          p={0}
          fontSize={fontSizes.caption}
          color={fg.primary}
        >
          Forgot Password?{" "}
          <Box
            component="span"
            fontWeight={500}
            color={main.primary}
            onClick={goToPasswordReset}
            sx={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Reset
          </Box>
        </Box>
      </Stack>
    </>
  );
}
