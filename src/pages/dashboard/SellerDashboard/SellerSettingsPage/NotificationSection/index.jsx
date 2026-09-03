// @ts-nocheck
import { useState } from "react";
import { Stack, Typography, Switch } from "@mui/material";
import { SectionCard } from "../../SellerUi";

const ROWS = [
    { key: "newOrder", label: "New orders", hint: "Get notified the moment a buyer places an order." },
    { key: "message", label: "New messages", hint: "Alert when a buyer sends you a message." },
    { key: "review", label: "New reviews", hint: "Get notified when a buyer leaves a review." },
    { key: "payout", label: "Payout completed", hint: "Confirmation once a withdrawal lands in your account." },
    { key: "promo", label: "TETYHUB tips & promos", hint: "Occasional tips on growing your store." },
];

export default function NotificationsSection({ fg, border, main }) {
    const [prefs, setPrefs] = useState({
        newOrder: true,
        message: true,
        review: true,
        payout: true,
        promo: false,
    });
    const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));

    return (
        <SectionCard noPadding border={border}>
            <Stack>
                {ROWS.map((r, i) => (
                    <Stack
                        key={r.key}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1.4}
                        sx={{
                            px: { xs: 1.75, sm: 2.4 },
                            py: 1.4,
                            borderTop: i === 0 ? "none" : `1px solid ${border.primary}`,
                        }}
                    >
                        <Stack sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: fg.primary }}>{r.label}</Typography>
                            <Typography sx={{ fontSize: 11.5, color: fg.tertiary, mt: 0.2 }}>{r.hint}</Typography>
                        </Stack>
                        <Switch
                            checked={prefs[r.key]}
                            onChange={() => toggle(r.key)}
                            sx={{
                                flexShrink: 0,
                                "& .MuiSwitch-switchBase.Mui-checked": { color: main.primary },
                                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { backgroundColor: main.primary },
                            }}
                        />
                    </Stack>
                ))}
            </Stack>
        </SectionCard>
    );
}