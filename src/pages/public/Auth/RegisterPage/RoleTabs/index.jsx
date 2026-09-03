// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { useColor } from "@/contexts/color";
import { radiusTokens, typefaces } from "@/lib/theme";
import {ROLES } from "../constants";

/** Compact segmented pill — sliding color highlight instead of two bulky cards. */
export default function RoleTabs({ role, setRole }) {
    const { bg, fg, border } = useColor();
    const activeIndex = ROLES.findIndex((r) => r.id === role);
    const activeColor = ROLES[activeIndex].color;

    return (
        <Box
            sx={{
                position: "relative",
                display: "flex",
                borderRadius: radiusTokens.full,
                border: `1px solid ${border.primary}`,
                backgroundColor: bg.secondary,
                p: 0.5,
                mb: 1.2,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: activeIndex === 0 ? 4 : "50%",
                    width: "calc(50% - 4px)",
                    borderRadius: radiusTokens.full,
                    backgroundColor: activeColor,
                    transition: "left 0.3s ease, background-color 0.3s ease",
                }}
            />
            {ROLES.map((r) => {
                const Icon = r.icon;
                const isActive = r.id === role;
                return (
                    <Stack
                        key={r.id}
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        gap={0.7}
                        onClick={() => setRole(r.id)}
                        sx={{ position: "relative", zIndex: 1, flex: 1, py: 1, cursor: "pointer", transition: "color 0.3s ease" }}
                    >
                        <Icon style={{ fontSize: 16, color: isActive ? "#fff" : fg.secondary }} />
                        <Typography
                            sx={{
                                fontFamily: typefaces.tertiary,
                                fontSize: 13,
                                fontWeight: 700,
                                color: isActive ? "#fff" : fg.secondary,
                            }}
                        >
                            {r.label}
                        </Typography>
                    </Stack>
                );
            })}
        </Box>
    );
}