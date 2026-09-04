// @ts-nocheck
import { useEffect, useState } from "react";
import { Box, Stack, Typography, Button, InputBase } from "@mui/material";
import { AddFilled, Search24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useAdmins } from "@/Hooks/admins";
import AdminsTable from "./AdminsTable";
import AdminFormModal from "./AdminFormModal";

const PAGE_SIZE = 10;
const STATUS_FILTERS = [
    { id: "", label: "All" },
    { id: "active", label: "Active" },
    { id: "pending", label: "Pending" },
    { id: "suspended", label: "Suspended" },
];

export default function AdminsPage() {
    const { fg, bg, border, main } = useColor();
    const { fetchAdmins, admins, total, loading } = useAdmins();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [offset, setOffset] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);

    const load = () => fetchAdmins({ offset, limit: PAGE_SIZE, search, status });

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [offset, status]);

    // Debounced search — waits for a pause in typing rather than firing on every keystroke.
    useEffect(() => {
        const id = setTimeout(() => {
            setOffset(0);
            load();
        }, 400);
        return () => clearTimeout(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const handleAdd = () => {
        setEditingAdmin(null);
        setModalOpen(true);
    };

    const handleEdit = (admin) => {
        setEditingAdmin(admin);
        setModalOpen(true);
    };

    const page = Math.floor(offset / PAGE_SIZE) + 1;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <Box>
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent={{ xs: "start", md: "space-between" }}
                alignItems={{ xs: "start", md: "center" }}
                gap={1.6}
                sx={{ mb: 2.4 }}
            >
                <Box>
                    <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 800, color: fg.primary }}>
                        Admins
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: fg.secondary, mt: 0.4 }}>
                        Everyone with admin access to TETYHUB.
                    </Typography>
                </Box>

                <Button
                    onClick={handleAdd}
                    variant="contained"
                    startIcon={<AddFilled />}
                    sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4, flexShrink: 0 }}
                >
                    Invite admin
                </Button>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ mb: 2 }}>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        border: `1px solid ${border.primary}`,
                        borderRadius: radiusTokens.sm ?? 8,
                        px: 1.4,
                        py: 0.9,
                    }}
                >
                    <Search24Regular style={{ fontSize: 16, color: fg.tertiary }} />
                    <InputBase
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email"
                        sx={{ fontSize: 13.5, color: fg.primary }}
                    />
                </Box>

                <Stack direction="row" gap={0.5}>
                    {STATUS_FILTERS.map((f) => {
                        const active = f.id === status;
                        return (
                            <Box
                                key={f.id}
                                onClick={() => {
                                    setStatus(f.id);
                                    setOffset(0);
                                }}
                                sx={{
                                    px: 1.4,
                                    py: 0.9,
                                    borderRadius: radiusTokens.sm ?? 8,
                                    border: `1px solid ${active ? main.primary : border.primary}`,
                                    backgroundColor: active ? `${main.primary}1a` : "transparent",
                                    cursor: "pointer",
                                }}
                            >
                                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: active ? main.primary : fg.secondary }}>
                                    {f.label}
                                </Typography>
                            </Box>
                        );
                    })}
                </Stack>
            </Stack>

            <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: radiusTokens.lg ?? 12, backgroundColor: bg.secondary, overflow: "hidden" }}>
                <AdminsTable admins={admins} loading={loading} fg={fg} border={border} main={main} onEdit={handleEdit} />
            </Box>

            {total > PAGE_SIZE && (
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.6 }}>
                    <Typography sx={{ fontSize: 12.5, color: fg.tertiary }}>
                        Page {page} of {totalPages} · {total} admins total
                    </Typography>
                    <Stack direction="row" gap={1}>
                        <Button
                            disabled={offset === 0}
                            onClick={() => setOffset((o) => Math.max(0, o - PAGE_SIZE))}
                            sx={{ textTransform: "none", color: fg.secondary }}
                        >
                            Previous
                        </Button>
                        <Button
                            disabled={offset + PAGE_SIZE >= total}
                            onClick={() => setOffset((o) => o + PAGE_SIZE)}
                            sx={{ textTransform: "none", color: fg.secondary }}
                        >
                            Next
                        </Button>
                    </Stack>
                </Stack>
            )}

            <AdminFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSaved={load} editingAdmin={editingAdmin} />
        </Box>
    );
}