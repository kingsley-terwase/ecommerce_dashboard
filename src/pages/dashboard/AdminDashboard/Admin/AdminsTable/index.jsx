// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { Edit24Regular, ShieldPersonRegular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import AdminStatusPill from "../AdminStatusPill";

const ROLE_LABELS = { super_admin: "Super Admin", admin: "Admin" };

export default function AdminsTable({ admins, loading, fg, border, main, onEdit }) {
    const navigate = useNavigate();

    if (loading) {
        return (
            <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 3, textAlign: "center" }}>
                Loading admins...
            </Typography>
        );
    }

    if (admins.length === 0) {
        return (
            <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 3, textAlign: "center" }}>
                No admins found.
            </Typography>
        );
    }

    return (
        <Stack>
            <Stack
                direction="row"
                sx={{
                    px: { xs: 1.75, sm: 2.4 },
                    py: 1.2,
                    borderBottom: `1px solid ${border.primary}`,
                    display: { xs: "none", sm: "flex" },
                }}
            >
                <Typography sx={{ flex: 2.2, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
                    ADMIN
                </Typography>
                <Typography sx={{ flex: 1.4, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
                    ROLE
                </Typography>
                <Typography sx={{ flex: 1.2, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
                    SCOPE
                </Typography>
                <Typography sx={{ flex: 1.2, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
                    STATUS
                </Typography>
                <Box sx={{ width: 84 }} />
            </Stack>

            {admins.map((a, i) => (
                <Stack
                    key={a.admin_id}
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    gap={{ xs: 0.8, sm: 0 }}
                    sx={{ px: { xs: 1.75, sm: 2.4 }, py: 1.6, borderTop: i === 0 ? "none" : `1px solid ${border.primary}` }}
                >
                    <Box sx={{ flex: 2.2, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}>
                            {a.firstname} {a.lastname}
                        </Typography>
                        <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>{a.email}</Typography>
                    </Box>

                    <Typography sx={{ flex: 1.4, fontSize: 13, color: fg.secondary }}>
                        {ROLE_LABELS[a.role] || a.role}
                    </Typography>

                    <Typography sx={{ flex: 1.2, fontSize: 13, color: fg.secondary, textTransform: "capitalize" }}>
                        {a.scope}
                    </Typography>

                    <Box sx={{ flex: 1.2 }}>
                        <AdminStatusPill status={a.admin_status} />
                    </Box>

                    <Stack direction="row" gap={1.2} sx={{ width: 84, justifyContent: { xs: "flex-start", sm: "center" } }}>
                        <Box
                            onClick={() => navigate(`/dashboard/admin/admins/${a.admin_id}/permissions`)}
                            title="Manage permissions"
                            sx={{ cursor: "pointer", color: fg.secondary, display: "flex", "&:hover": { color: main.primary } }}
                        >
                            <ShieldPersonRegular style={{ fontSize: 25 }} />
                        </Box>
                        <Box
                            onClick={() => onEdit(a)}
                            title="Edit admin"
                            sx={{ cursor: "pointer", color: fg.secondary, display: "flex", "&:hover": { color: main.primary } }}
                        >
                            <Edit24Regular style={{ fontSize: 18 }} />
                        </Box>
                    </Stack>
                </Stack>
            ))}
        </Stack>
    );
}