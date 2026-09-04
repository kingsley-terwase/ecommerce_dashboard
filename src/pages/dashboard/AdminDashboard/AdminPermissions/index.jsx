// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Info24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useAdminPermissions, useAssignPermissions } from "@/Hooks/admin_permissions";
import AdminInfoCard from "./AdminInfoCard";
import PermissionMatrix from "./PermissionMatrix";

export default function AdminPermissionsPage() {
    const { fg, bg, border, main } = useColor();
    const { adminId } = useParams();

    const { fetchPermissions, admin, grants: fetchedGrants, version, loading } = useAdminPermissions();
    const { assignPermissions, loading: saving } = useAssignPermissions();

    const [grants, setGrants] = useState([]);

    useEffect(() => {
        if (adminId) fetchPermissions(adminId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adminId]);

    // Keep a local editable copy in sync whenever a fresh fetch comes in
    // (initial load, or after a successful save re-fetches nothing — we just
    // trust the fetched grants as the new baseline).
    useEffect(() => {
        setGrants(fetchedGrants);
    }, [fetchedGrants]);

    const isDirty = useMemo(
        () => JSON.stringify(grants) !== JSON.stringify(fetchedGrants),
        [grants, fetchedGrants]
    );

    const handleToggle = (adminTypeId, key) => {
        setGrants((prev) =>
            prev.map((g) => (g.admin_type_id === adminTypeId ? { ...g, [key]: !g[key] } : g))
        );
    };

    const handleToggleColumn = (key) => {
        const allOn = grants.every((g) => g[key]);
        setGrants((prev) => prev.map((g) => ({ ...g, [key]: !allOn })));
    };

    const handleReset = () => setGrants(fetchedGrants);

    const handleSave = async () => {
        const payloadGrants = grants.map((g) => ({
            admin_type_id: g.admin_type_id,
            can_create: g.can_create,
            can_read: g.can_read,
            can_update: g.can_update,
            can_delete: g.can_delete,
        }));

        const result = await assignPermissions(adminId, { version, grants: payloadGrants });
        if (result.success) {
            fetchPermissions(adminId); 
        }
    };

    return (
        <Box sx={{ pb: isDirty ? 10 : 0 }}>
            <Box sx={{ mb: 2.4 }}>
                <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>
                    Admin Permissions
                </Typography>
                <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
                    Control exactly what this admin can view and change across TETYHUB.
                </Typography>
            </Box>

            <Stack
                direction="row"
                gap={1}
                sx={{
                    px: 1.6,
                    py: 1.2,
                    borderRadius: 2,
                    backgroundColor: `${main.primary}12`,
                    border: `1px solid ${main.primary}33`,
                    mb: 2.4,
                }}
            >
                <Info24Regular style={{ fontSize: 16, color: main.primary, flexShrink: 0, marginTop: 2 }} />
                <Typography sx={{ fontSize: 12, color: fg.secondary }}>
                    Click any circle to toggle that permission. Click a column header (CREATE, READ, UPDATE,
                    DELETE) to switch it on or off for every resource at once. Nothing changes until you hit
                    Save.
                </Typography>
            </Stack>

            {loading ? (
                <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 4 }}>
                    Loading permissions...
                </Typography>
            ) : !admin ? (
                <Typography sx={{ fontSize: 13, color: fg.tertiary, textAlign: "center", py: 4 }}>
                    Admin not found.
                </Typography>
            ) : (
                <>
                    <AdminInfoCard admin={admin} fg={fg} bg={bg} border={border} main={main} />
                    <PermissionMatrix
                        grants={grants}
                        onToggle={handleToggle}
                        onToggleColumn={handleToggleColumn}
                        fg={fg}
                        border={border}
                        main={main}
                    />
                </>
            )}

            {isDirty && (
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        position: "fixed",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        px: { xs: 2, md: 4 },
                        py: 1.6,
                        backgroundColor: bg.primary,
                        borderTop: `1px solid ${border.primary}`,
                        boxShadow: "0 -8px 24px -12px rgba(0,0,0,0.25)",
                        zIndex: 20,
                    }}
                >
                    <Typography sx={{ fontSize: 13, color: fg.secondary }}>
                        You have unsaved permission changes.
                    </Typography>
                    <Stack direction="row" gap={1.2}>
                        <Button onClick={handleReset} sx={{ textTransform: "none", color: fg.secondary }}>
                            Discard
                        </Button>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            disabled={saving}
                            sx={{
                                backgroundColor: main.primary,
                                textTransform: "none",
                                fontWeight: 700,
                                borderRadius: radiusTokens.md,
                                px: 2.6,
                            }}
                        >
                            {saving ? "Saving..." : "Save changes"}
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Box>
    );
}