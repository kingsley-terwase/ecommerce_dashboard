// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { radiusTokens } from "@/lib/theme";

const STATUS_COLORS = { active: "#22C55E", suspended: "#EF4444", pending: "#F2A93D" };

export default function AdminInfoCard({ admin, fg, bg, border, main }) {
    if (!admin) return null;

    const statusColor = STATUS_COLORS[admin.admin_status] || fg.tertiary;
    const initials = `${admin.firstname?.[0] || ""}${admin.lastname?.[0] || ""}`.toUpperCase();

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1.6}
            sx={{
                border: `1px solid ${border.primary}`,
                borderRadius: radiusTokens.lg ?? 12,
                backgroundColor: bg.secondary,
                px: 2.4,
                py: 2,
                mb: 2.4,
            }}
        >
            <Box
                sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    backgroundColor: `${main.primary}22`,
                    color: main.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 16,
                    flexShrink: 0,
                }}
            >
                {initials || "?"}
            </Box>

            <Box sx={{ minWidth: 0, flex: 1 }}>
                <Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
                    <Typography sx={{ fontSize: 15.5, fontWeight: 800, color: fg.primary }}>
                        {admin.firstname} {admin.lastname}
                    </Typography>
                    <Stack direction="row" alignItems="center" gap={0.5}>
                        <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: statusColor }} />
                        <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: statusColor, textTransform: "capitalize" }}>
                            {admin.admin_status}
                        </Typography>
                    </Stack>
                </Stack>
                <Typography sx={{ fontSize: 12.5, color: fg.secondary }}>{admin.email}</Typography>
            </Box>

            <Box
                sx={{
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 999,
                    backgroundColor: `${main.primary}1a`,
                    flexShrink: 0,
                }}
            >
                <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: main.primary, textTransform: "capitalize" }}>
                    {admin.scope} scope
                </Typography>
            </Box>
        </Stack>
    );
}