// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import PermissionToggle from "../PermissionToggle";

const SCOPE_LABELS = { platform: "Platform", vendor: "Vendor", both: "Both" };
const COLUMNS = [
    { key: "can_create", label: "Create" },
    { key: "can_read", label: "Read" },
    { key: "can_update", label: "Update" },
    { key: "can_delete", label: "Delete" },
];

function formatDate(iso) {
    if (!iso) return "Never";
    try {
        return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
    } catch {
        return "—";
    }
}

export default function PermissionMatrix({ grants, onToggle, onToggleColumn, fg, border, main }) {
    return (
        <Box sx={{ border: `1px solid ${border.primary}`, borderRadius: 2, overflow: "hidden" }}>
            <Stack
                direction="row"
                alignItems="center"
                sx={{ px: 2.4, py: 1.2, borderBottom: `1px solid ${border.primary}`, backgroundColor: `${main.primary}08` }}
            >
                <Typography sx={{ flex: 2.4, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
                    RESOURCE
                </Typography>
                {COLUMNS.map((col) => (
                    <Box
                        key={col.key}
                        onClick={() => onToggleColumn(col.key)}
                        sx={{ flex: 1, textAlign: "center", cursor: "pointer" }}
                        title={`Toggle ${col.label} for every resource`}
                    >
                        <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
                            {col.label.toUpperCase()}
                        </Typography>
                    </Box>
                ))}
                <Typography sx={{ width: 110, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em", textAlign: "right" }}>
                    LAST CHANGED
                </Typography>
            </Stack>

            {grants.map((grant, i) => (
                <Stack
                    key={grant.admin_type_id}
                    direction="row"
                    alignItems="center"
                    sx={{ px: 2.4, py: 1.6, borderTop: i === 0 ? "none" : `1px solid ${border.primary}` }}
                >
                    <Box sx={{ flex: 2.4, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary }}>{grant.name}</Typography>
                        <Stack direction="row" alignItems="center" gap={0.6}>
                            <Typography sx={{ fontSize: 11, color: fg.tertiary }}>{grant.resource}</Typography>
                            <Typography sx={{ fontSize: 11, color: main.primary, fontWeight: 700 }}>
                                · {SCOPE_LABELS[grant.scope] || grant.scope}
                            </Typography>
                        </Stack>
                    </Box>

                    {COLUMNS.map((col) => (
                        <Box key={col.key} sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
                            <PermissionToggle
                                granted={Boolean(grant[col.key])}
                                onToggle={() => onToggle(grant.admin_type_id, col.key)}
                                label={col.label}
                                border={border}
                                fg={fg}
                            />
                        </Box>
                    ))}

                    <Typography sx={{ width: 110, fontSize: 11.5, color: fg.tertiary, textAlign: "right" }}>
                        {formatDate(grant.updated_at)}
                    </Typography>
                </Stack>
            ))}
        </Box>
    );
}