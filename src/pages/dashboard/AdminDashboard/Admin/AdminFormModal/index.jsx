// @ts-nocheck
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Stack,
    Typography,
    InputBase,
    Button,
    IconButton,
} from "@mui/material";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useCreateAdmin, useUpdateAdmin } from "@/Hooks/admins";


export default function AdminFormModal({ open, onClose, onSaved, editingAdmin }) {
    const { fg, border, main } = useColor();
    const { createAdmin, loading: creating } = useCreateAdmin();
    const { updateAdmin, loading: updating } = useUpdateAdmin();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const isEditing = Boolean(editingAdmin);
    const loading = creating || updating;

    useEffect(() => {
        if (open) {
            setFirstname(editingAdmin?.firstname || "");
            setLastname(editingAdmin?.lastname || "");
            setEmail(editingAdmin?.email || "");
            setPhone(editingAdmin?.phone || "");
        }
    }, [open, editingAdmin]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = isEditing
            ? await updateAdmin(editingAdmin.admin_id, { firstname, lastname, phone })
            : await createAdmin({ firstname, lastname, email, phone });

        if (result.success) {
            onSaved?.();
            onClose();
        }
    };

    const fieldSx = {
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.4,
        py: 1,
        mt: 0.3,
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit}>
                <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 800, color: fg.primary }}>
                        {isEditing ? "Edit Admin" : "Invite Admin"}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Stack gap={1.8} sx={{ pt: 0.5 }}>
                        {!isEditing && (
                            <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                                They'll get an email invitation and choose their own password when they accept it.
                            </Typography>
                        )}

                        <Stack direction="row" gap={1.4}>
                            <Stack sx={{ flex: 1 }} gap={0.6}>
                                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
                                    First name
                                </Typography>
                                <Box sx={fieldSx}>
                                    <InputBase fullWidth value={firstname} onChange={(e) => setFirstname(e.target.value)} sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Stack>
                            <Stack sx={{ flex: 1 }} gap={0.6}>
                                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
                                    Last name
                                </Typography>
                                <Box sx={fieldSx}>
                                    <InputBase fullWidth value={lastname} onChange={(e) => setLastname(e.target.value)} sx={{ fontSize: 14, color: fg.primary }} />
                                </Box>
                            </Stack>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
                                Email
                            </Typography>
                            <Box sx={{ ...fieldSx, opacity: isEditing ? 0.55 : 1 }}>
                                <InputBase
                                    fullWidth
                                    type="email"
                                    disabled={isEditing}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    sx={{ fontSize: 14, color: fg.primary }}
                                />
                            </Box>
                            {isEditing && (
                                <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                                    Email can't be changed after the invitation is sent.
                                </Typography>
                            )}
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
                                Phone
                            </Typography>
                            <Box sx={fieldSx}>
                                <InputBase fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234..." sx={{ fontSize: 14, color: fg.primary }} />
                            </Box>
                        </Stack>
                    </Stack>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2.5 }}>
                    <Button onClick={onClose} sx={{ textTransform: "none", color: fg.secondary }}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !firstname.trim() || !lastname.trim() || (!isEditing && !email.trim())}
                        sx={{ backgroundColor: main.primary, textTransform: "none", fontWeight: 700, borderRadius: radiusTokens.md, px: 2.4 }}
                    >
                        {loading ? "Saving..." : isEditing ? "Save changes" : "Send invitation"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}