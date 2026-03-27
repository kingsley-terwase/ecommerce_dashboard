import { Button, Input, Typography } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { Box, Stack } from "@mui/material";
import { useForm } from "@/lib/form";
import { rules } from "./lib";
import { useResetPassword, useVerifyPasswordReset } from "@/queries/auth";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const [params, setParams] = useSearchParams();
  const otpSent = params.get("code_sent");
  const accountEmail = params.get("account");
  const isOtpSent = otpSent === "yes" && !!accountEmail;

  const navigate = useNavigate();
  const { loading, resetPassword } = useResetPassword();
  const { loading: verificationLoading, verifyPasswordReset } = useVerifyPasswordReset();

  const { onBlur, onChange, formData, formErrors, validateForm } = useForm({
    init: {
      email: accountEmail || "",
      token: "",
      password: "",
      confirmPassword: "",
    },
    rules: (formData) => rules({ otpSent: isOtpSent, password: formData?.password }),
  });

  async function handleSubmit() {
    if (!validateForm()) return;
    const response = await resetPassword(formData);
    if (response && response === "SUCCESS") {
      setParams({ code_sent: "yes", account: formData?.email });
    }
  }

  async function handleVerification() {
    if (!validateForm()) return;
    const response = await verifyPasswordReset(formData);
    if (response && response === "SUCCESS") {
      navigate("/login");
    }
  }

  function goToLogin() {
    navigate("/login");
  }

  return (
    <>
      <Box>
        <Typography variant="h1" lineHeight={1.5} fontWeight={500}>
          Forgot Password?
        </Typography>
        <Typography color="secondary" fontWeight={300} variant="h3" lineHeight={1.25}>
          Say no more. Get another password!
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
          disabled={isOtpSent}
        />

        {isOtpSent && (
          <>
            <Input
              label="Code"
              name="token"
              type="text"
              value={(name) => formData[name]}
              onChange={(name, value) => onChange(name, value)}
              onBlur={(name, value) => onBlur(name, value)}
              error={(name) => formErrors?.[name]}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={(name) => formData[name]}
              onChange={(name, value) => onChange(name, value)}
              onBlur={(name, value) => onBlur(name, value)}
              error={(name) => formErrors?.[name]}
            />
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={(name) => formData[name]}
              onChange={(name, value) => onChange(name, value)}
              onBlur={(name, value) => onBlur(name, value)}
              error={(name) => formErrors?.[name]}
            />
          </>
        )}

        <Stack gap={spacingTokens.sm}>
          {otpSent ? (
            <Button size="large" loading={verificationLoading} onClick={handleVerification}>
              Submit
            </Button>
          ) : (
            <Button size="large" loading={loading} onClick={handleSubmit}>
              Submit
            </Button>
          )}
          <Button size="large" color="secondary" onClick={goToLogin}>
            Go to Login
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
