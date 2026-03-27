import { Button, Typography } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { AddFilled } from "@fluentui/react-icons";
import { Box, Stack } from "@mui/material";

export default function Hero() {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "start", md: "space-between" }}
      alignItems="start"
      gap={spacingTokens.lg}
    >
      <Box>
        <Typography variant="h1">👋 Welcome Back, Kingsley</Typography>
        <Typography variant="body1" color="secondary">
          Wednesday, March 25, 2026
        </Typography>
      </Box>
      <Stack direction="row" gap={spacingTokens.sm} flexWrap="wrap">
        <Button
          color="primary"
          size="large"
          startContent={<AddFilled></AddFilled>}
        >
          Add Admin
        </Button>
      </Stack>
    </Stack>
  );
}
