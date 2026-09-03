// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import ProfileSection from "./ProfileSection";
import PayoutSection from "./PayoutSection";
import NotificationsSection from "./NotificationSection";
import SessionsSection from "./SessionsSection";
import { PageHeader } from "../SellerUi";
import { NAV } from "./contants";

export default function SellerSettingsPage() {
  const { fg, bg, border, main } = useColor();
  const [section, setSection] = useState("profile");

  return (
    <Box>
      <PageHeader title="Settings" subtitle="Your store profile, payout account, and alerts." fg={fg} />

      <Box
        sx={{
          mb: { xs: 2.4, md: 3 },
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        <Stack
          direction="row"
          gap={0.5}
          sx={{
            display: "inline-flex",
            p: 0.5,
            backgroundColor: bg.secondary,
            border: `1px solid ${border.primary}`,
            borderRadius: 999,
          }}
        >
          {NAV.map((n) => {
            const active = n.key === section;
            const Icon = n.icon;
            return (
              <Stack
                key={n.key}
                direction="row"
                alignItems="center"
                gap={0.7}
                onClick={() => setSection(n.key)}
                sx={{
                  px: { xs: 1.5, sm: 1.9 },
                  py: 0.95,
                  borderRadius: 999,
                  cursor: "pointer",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  backgroundColor: active ? main.primary : "transparent",
                  transition: "background-color 0.18s ease",
                  "&:hover": !active ? { backgroundColor: `${fg.secondary}14` } : undefined,
                }}
              >
                <Icon style={{ fontSize: 15, color: active ? "#fff" : fg.secondary }} />
                <Typography sx={{ fontSize: 13, fontWeight: active ? 700 : 600, color: active ? "#fff" : fg.secondary }}>
                  {n.label}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>

      {section === "profile" && <ProfileSection fg={fg} bg={bg} border={border} main={main} />}
      {section === "payout" && <PayoutSection fg={fg} border={border} main={main} />}
      {section === "notifications" && <NotificationsSection fg={fg} border={border} main={main} />}
      {section === "sessions" && <SessionsSection fg={fg} border={border} main={main} />}
    </Box>
  );
}