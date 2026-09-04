// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { AddFilled } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useAdminTypes } from "@/Hooks/admin_roles";
import AdminTypeTable from "./AdminTypeTable";
import AdminTypeModal from "./AdminTypeModal";

export default function AdminRolesPage() {
    const { fg, bg, border, main } = useColor();
    const { fetchAdminTypes, adminTypes, loading } = useAdminTypes();

    const [modalOpen, setModalOpen] = useState(false);
    const [editingType, setEditingType] = useState(null);

    useEffect(() => {
        fetchAdminTypes();
    }, []);

    const handleAdd = () => {
        setEditingType(null);
        setModalOpen(true);
    };

    const handleEdit = (type) => {
        setEditingType(type);
        setModalOpen(true);
    };

    return (
        <Box>
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "start", md: "space-between" }}
                alignItems={{ xs: "start", md: "center" }}
                gap={1.6}
                sx={{ mb: { xs: 2.4, md: 3 } }}
            >
                <Box>
                    <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>
                        Admin Roles
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
                        Define the admin role types available on TETYHUB and what each one is for.
                    </Typography>
                </Box>

                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddFilled />}
                    sx={{
                        backgroundColor: main.primary,
                        textTransform: "none",
                        fontWeight: 700,
                        borderRadius: radiusTokens.md,
                        px: 2.4,
                        flexShrink: 0,
                    }}
                >
                    New role
                </Button>
            </Stack>

            <Box
                sx={{
                    border: `1px solid ${border.primary}`,
                    borderRadius: radiusTokens.lg ?? 12,
                    backgroundColor: bg.secondary,
                    overflow: "hidden",
                }}
            >
                <AdminTypeTable
                    adminTypes={adminTypes}
                    loading={loading}
                    fg={fg}
                    border={border}
                    main={main}
                    onEdit={handleEdit}
                />
            </Box>

            <AdminTypeModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSaved={fetchAdminTypes}
                editingType={editingType}
            />
        </Box>
    );
}