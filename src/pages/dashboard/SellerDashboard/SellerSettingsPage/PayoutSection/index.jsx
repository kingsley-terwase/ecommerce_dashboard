// @ts-nocheck
import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { SectionCard } from "../../SellerUi";
import Field from "../Field";
import SaveBar from "../SaveBar";

export default function PayoutSection({ fg, border, main }) {
    const [bank, setBank] = useState("GTBank");
    const [account, setAccount] = useState("0123456789");
    const [accountName, setAccountName] = useState("SparkleCo Services Ltd");

    return (
        <SectionCard border={border}>
            <Typography sx={{ fontSize: 12.5, color: fg.tertiary, mb: 1.8 }}>
                Earnings are sent here when you request a withdrawal.
            </Typography>
            <Stack gap={1.8}>
                <Field label="Bank name" value={bank} onChange={setBank} border={border} fg={fg} />
                <Stack direction={{ xs: "column", sm: "row" }} gap={1.4} sx={{ minWidth: 0 }}>
                    <Stack sx={{ flex: 1, minWidth: 0 }}>
                        <Field label="Account number" value={account} onChange={setAccount} border={border} fg={fg} />
                    </Stack>
                    <Stack sx={{ flex: 1, minWidth: 0 }}>
                        <Field label="Account name" value={accountName} onChange={setAccountName} border={border} fg={fg} />
                    </Stack>
                </Stack>
            </Stack>
            <SaveBar main={main} />
        </SectionCard>
    );
}