// @ts-nocheck
import { Stack, Typography } from "@mui/material";
import {
    LockClosed24Regular,
    ShieldCheckmark24Regular,
    Flash24Regular,
} from "@fluentui/react-icons";
import { useColor } from "@/contexts/color";
import { typefaces } from "@/lib/theme";

const BADGES = [
    { icon: LockClosed24Regular, label: "Secure Login" },
    { icon: ShieldCheckmark24Regular, label: "SOC 2 Compliant" },
    { icon: Flash24Regular, label: "99.9% Uptime" },
];

export default function TrustBadges() {
    const { fg } = useColor();

    return (
        <Stack direction="row" justifyContent="center" gap={2.5} sx={{ mt: 4, opacity: 0.7 }}>
            {BADGES.map(({ icon: Icon, label }) => (
                <Stack key={label} direction="row" alignItems="center" gap={0.4}>
                    <Icon style={{ fontSize: 13, color: fg.tertiary }} />
                    <Typography sx={{ fontFamily: typefaces.tertiary, fontSize: 11, color: fg.tertiary }}>
                        {label}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    );
}