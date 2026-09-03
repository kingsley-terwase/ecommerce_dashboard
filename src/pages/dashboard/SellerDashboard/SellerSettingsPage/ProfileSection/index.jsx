// @ts-nocheck
import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Camera24Regular } from "@fluentui/react-icons";
import { SectionCard, Avatar } from "../../SellerUi";
import Field from "../Field";
import SaveBar from "../SaveBar";
import { useAuthStore } from "@/store/auth";

export default function ProfileSection({ fg, bg, border, main }) {
    const user = useAuthStore((s) => s.user);

    // Store profile fields (name, tagline, category) have no backing API yet —
    // GET /auth/sessions and POST /auth/signin only return account fields
    // (firstname, lastname, email, role...), not store data. Leaving these
    // blank with real placeholders rather than faking defaults like "SparkleCo".
    // ⚠️ Needs a real endpoint (e.g. GET /seller/profile) to actually load/save this.
    const [store, setStore] = useState("");
    const [tagline, setTagline] = useState("");
    const [category, setCategory] = useState("");
    const [phone, setPhone] = useState(user?.email || "");

    const accountName = user ? `${user.firstname} ${user.lastname}` : "";
    const avatarLabel = store || accountName || "?";

    return (
        <SectionCard border={border}>
            <Stack direction="row" alignItems="center" gap={1.6} sx={{ mb: 2.4 }}>
                <Box sx={{ position: "relative" }}>
                    <Avatar name={avatarLabel} size={64} />
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: -2,
                            right: -2,
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            backgroundColor: main.primary,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: `2px solid ${bg.primary}`,
                            cursor: "pointer",
                        }}
                    >
                        <Camera24Regular style={{ fontSize: 12 }} />
                    </Box>
                </Box>
                <Stack gap={0.2}>
                    <Typography sx={{ fontSize: 14.5, fontWeight: 800, color: fg.primary }}>
                        {store || "Your store"}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: fg.tertiary }}>
                        Store logo shown on your listings
                    </Typography>
                </Stack>
            </Stack>

            <Stack gap={1.8}>
                <Field
                    label="Store name"
                    placeholder={accountName || "e.g. SparkleCo"}
                    value={store}
                    onChange={setStore}
                    border={border}
                    fg={fg}
                />
                <Field
                    label="Tagline"
                    hint="Shown under your store name to buyers."
                    placeholder="e.g. Deep home cleaning done right."
                    value={tagline}
                    onChange={setTagline}
                    border={border}
                    fg={fg}
                />
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ minWidth: 0 }}>
                    <Stack sx={{ flex: 1, minWidth: 0 }}>
                        <Field
                            label="Primary category"
                            placeholder="e.g. Home services"
                            value={category}
                            onChange={setCategory}
                            border={border}
                            fg={fg}
                        />
                    </Stack>
                    <Stack sx={{ flex: 1, minWidth: 0 }}>
                        <Field label="Contact phone or email" value={phone} onChange={setPhone} border={border} fg={fg} />
                    </Stack>
                </Stack>
            </Stack>
            <SaveBar main={main} />
        </SectionCard>
    );
}