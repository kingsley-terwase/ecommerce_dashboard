import { Button, Typography } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { AddFilled } from "@fluentui/react-icons";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import AddAdminModal from "../Modal/AddAdminModal";
import { useAuthStore } from "@/store/auth";

const TODAY = new Date().toLocaleDateString(undefined, {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function Hero() {
  const [addAdmin, setAddAdmin] = useState(false);
  // @ts-ignore
  const user = useAuthStore((s) => s.user);

  const displayName = user?.firstname || "there";

  /** @returns {void} */
  const handleOpen = () => {
    setAddAdmin(true);
  };

  /** @returns {void} */
  const handleClose = () => {
    setAddAdmin(false);
  };

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "start", md: "space-between" }}
      alignItems="start"
      gap={spacingTokens.lg}
    >
      <Box>
        <Typography variant="h1">👋 Welcome Back, {displayName}</Typography>
        <Typography variant="body1" color="secondary">
          {TODAY}
        </Typography>
      </Box>

      <Stack direction="row" gap={spacingTokens.sm} flexWrap="wrap">
        <Button
          onClick={handleOpen}
          color="primary"
          size="large"
          startContent={<AddFilled />}
        >
          Add Admin
        </Button>
      </Stack>

      <AddAdminModal open={addAdmin} onClose={handleClose} />
    </Stack>
  );
}