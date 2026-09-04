// @ts-nocheck
import { Box } from "@mui/material";
import { Checkmark24Filled, Dismiss24Regular } from "@fluentui/react-icons";

const GREEN = "#22C55E";

export default function PermissionToggle({ granted, onToggle, label, disabled, border, fg }) {
    return (
        <Box
            component="span"
            title={`${label}: ${granted ? "allowed" : "not allowed"}`}
            onClick={!disabled ? onToggle : undefined}
            sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: "50%",
                cursor: disabled ? "not-allowed" : "pointer",
                backgroundColor: granted ? `${GREEN}1f` : "transparent",
                border: `1.5px solid ${granted ? GREEN : border.primary}`,
                color: granted ? GREEN : fg.tertiary,
                opacity: disabled ? 0.5 : 1,
                transition: "background-color 0.15s ease, border-color 0.15s ease",
            }}
        >
            {granted ? (
                <Checkmark24Filled style={{ fontSize: 16 }} />
            ) : (
                <Dismiss24Regular style={{ fontSize: 14 }} />
            )}
        </Box>
    );
}