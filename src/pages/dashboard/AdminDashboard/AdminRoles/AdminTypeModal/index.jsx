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
    Switch,
    Button,
    IconButton,
} from "@mui/material";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { radiusTokens } from "@/lib/theme";
import { useCreateAdminType, useUpdateAdminType } from "@/Hooks/admin_roles";

const SCOPES = [
    { id: "platform", label: "Platform" },
    { id: "vendor", label: "Vendor" },
    { id: "both", label: "Both" },
];

/** Sliding segmented control for the fixed scope enum. `disabled` locks it
 * for system roles, where the backend rejects any change with a 409. */
function ScopePicker({ value, onChange, disabled, border, fg, main, bg }) {
    const activeIndex = SCOPES.findIndex((s) => s.id === value);

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                borderRadius: radiusTokens.md,
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.primary,
                p: 0.4,
                opacity: disabled ? 0.55 : 1,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: `calc(${(activeIndex * 100) / SCOPES.length}% + 4px)`,
                    width: `calc(${100 / SCOPES.length}% - 8px)`,
                    borderRadius: radiusTokens.sm ?? 6,
                    backgroundColor: main.primary,
                    transition: "left 0.25s ease",
                }}
            />
            {SCOPES.map((s) => {
                const isActive = s.id === value;
                return (
                    <Box
                        key={s.id}
                        onClick={() => !disabled && onChange(s.id)}
                        sx={{
                            position: "relative",
                            zIndex: 1,
                            flex: 1,
                            textAlign: "center",
                            py: 0.9,
                            cursor: disabled ? "not-allowed" : "pointer",
                        }}
                    >
                        <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: isActive ? "#fff" : fg.secondary }}>
                            {s.label}
                        </Typography>
                    </Box>
                );
            })}
        </Box>
    );
}


export default function AdminTypeModal({ open, onClose, onSaved, editingType }) {
    const { fg, bg, border, main } = useColor();
    const { createAdminType, loading: creating } = useCreateAdminType();
    const { updateAdminType, loading: updating } = useUpdateAdminType();

    const [adminType, setAdminType] = useState("");
    const [resource, setResource] = useState("");
    const [description, setDescription] = useState("");
    const [scope, setScope] = useState("platform");
    const [status, setStatus] = useState(true);

    const isEditing = Boolean(editingType);
    const isSystem = Boolean(editingType?.is_system);
    const loading = creating || updating;

    // Reset (or prefill) the form every time the dialog opens.
    useEffect(() => {
        if (open) {
            setAdminType(editingType?.admin_type || "");
            setResource(editingType?.resource || "");
            setDescription(editingType?.description || "");
            setScope(editingType?.scope || "platform");
            setStatus(editingType?.status ?? true);
        }
    }, [open, editingType]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // For system roles, only send the fields the backend actually allows
        // to change — sending resource/scope unchanged is harmless, but this
        // keeps intent explicit rather than relying on "unchanged = accepted."
        const payload = isSystem
            ? { admin_type: adminType, description, status }
            : { admin_type: adminType, description, status, scope, resource };

        const result = isEditing
            ? await updateAdminType(editingType.id, payload)
            : await createAdminType(payload);

        if (result.success) {
            onSaved?.();
            onClose();
        }
    };

    const fieldSx = (disabled) => ({
        border: `1px solid ${border.primary}`,
        borderRadius: radiusTokens.sm ?? 8,
        px: 1.4,
        py: 1,
        mt: 0.3,
        opacity: disabled ? 0.55 : 1,
    });

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit}>
                <DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 16, fontWeight: 800, color: fg.primary }}>
                        {isEditing ? "Edit Admin Role" : "New Admin Role"}
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <Dismiss24Regular style={{ fontSize: 18, color: fg.secondary }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Stack gap={1.8} sx={{ pt: 0.5 }}>
                        {isSystem && (
                            <Typography sx={{ fontSize: 11.5, color: "#F2A93D", backgroundColor: "#F2A93D1a", borderRadius: 1, px: 1.2, py: 0.7 }}>
                                This is a system-defined role. Resource and scope are locked and can't be changed.
                            </Typography>
                        )}

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
                                Role name
                            </Typography>
                            <Box sx={fieldSx(false)}>
                                <InputBase
                                    fullWidth
                                    value={adminType}
                                    onChange={(e) => setAdminType(e.target.value)}
                                    placeholder="e.g. support, products"
                                    sx={{ fontSize: 15, color: fg.primary }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
                                Resource
                            </Typography>
                            <Box sx={fieldSx(isSystem)}>
                                <InputBase
                                    fullWidth
                                    disabled={isSystem}
                                    value={resource}
                                    onChange={(e) => setResource(e.target.value)}
                                    placeholder="e.g. users, orders, payments"
                                    sx={{ fontSize: 15, color: fg.primary }}
                                />
                            </Box>
                            <Typography sx={{ fontSize: 11, color: fg.tertiary }}>
                                The specific resource this role grants access to.
                            </Typography>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
                                Description
                            </Typography>
                            <Box sx={fieldSx(false)}>
                                <InputBase
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="What does this role manage?"
                                    sx={{ fontSize: 14, color: fg.primary }}
                                />
                            </Box>
                        </Stack>

                        <Stack gap={0.6}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: fg.primary }}>
                                Scope
                            </Typography>
                            <ScopePicker
                                value={scope}
                                onChange={setScope}
                                disabled={isSystem}
                                border={border}
                                fg={fg}
                                main={main}
                                bg={bg}
                            />
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack>
                                <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>
                                    Active
                                </Typography>
                                <Typography sx={{ fontSize: 11.5, color: fg.tertiary }}>
                                    Inactive roles can't be assigned to new admins.
                                </Typography>
                            </Stack>
                            <Switch
                                checked={status}
                                onChange={(e) => setStatus(e.target.checked)}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": { color: main.primary },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: main.primary },
                                }}
                            />
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
                        disabled={loading || !adminType.trim() || !resource.trim()}
                        sx={{
                            backgroundColor: main.primary,
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: radiusTokens.md,
                            px: 2.4,
                        }}
                    >
                        {loading ? "Saving..." : isEditing ? "Save changes" : "Create role"}
                    </Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
}