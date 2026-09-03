// @ts-nocheck
import { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Info24Regular, DesktopRegular, DeleteRegular } from "@fluentui/react-icons";
import { SectionCard } from "../../SellerUi";
import { useSessions, useTerminateSession } from "@/Hooks/auth";

/** Formats an ISO expiry string into something readable, e.g. "Aug 10, 2026, 9:07 PM" */
function formatExpiry(iso) {
    try {
        return new Date(iso).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        });
    } catch {
        return iso;
    }
}

export default function SessionsSection({ fg, border, main }) {
    const { fetchSessions, sessions, loading } = useSessions();
    const { terminateSession, loading: terminating } = useTerminateSession();

    useEffect(() => {
        fetchSessions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRevoke = async (sessionId) => {
        const result = await terminateSession(sessionId);
        if (result.success) fetchSessions();
    };

    return (
        <Stack gap={1.6}>
            {/* Honest limitation notice — the API doesn't tell us which session is
          "this browser," and doesn't return device/IP info at all. Rather than
          fake that data, we say so plainly. */}
            <Stack
                direction="row"
                gap={1}
                sx={{
                    px: 1.6,
                    py: 1.2,
                    borderRadius: 2,
                    backgroundColor: `${main.primary}12`,
                    border: `1px solid ${main.primary}33`,
                }}
            >
                <Info24Regular style={{ fontSize: 16, color: main.primary, flexShrink: 0, marginTop: 2 }} />
                <Typography sx={{ fontSize: 12, color: fg.secondary }}>
                    These are your active login sessions. The server doesn't currently report
                    device or location per session, so we can't show which one is this browser —
                    revoke any session you don't recognize.
                </Typography>
            </Stack>

            <SectionCard noPadding border={border}>
                {loading ? (
                    <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 2 }}>
                        Loading sessions...
                    </Typography>
                ) : sessions.length === 0 ? (
                    <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 2 }}>
                        No active sessions found.
                    </Typography>
                ) : (
                <Stack>
                    {sessions.map((s, i) => (
                    <Stack
                        key={s.sessionId}
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
                        <Stack direction="row" alignItems="center" gap={1.2} sx={{ minWidth: 0 }}>
                            <DesktopRegular style={{ fontSize: 20, color: fg.secondary, flexShrink: 0 }} />
                            <Stack sx={{ minWidth: 0 }}>
                                <Typography
                                    sx={{
                                        fontSize: 13,
                                        fontWeight: 700,
                                        color: fg.primary,
                                        fontFamily: "monospace",
                                    }}
                                >
                                    {s.sessionId.slice(0, 12)}…
                                </Typography>
                                <Typography sx={{ fontSize: 11.5, color: fg.tertiary, mt: 0.2 }}>
                                    Expires {formatExpiry(s.expiresAt)}
                                </Typography>
                            </Stack>
                        </Stack>

                        <Box
                            onClick={() => !terminating && handleRevoke(s.sessionId)}
                            sx={{
                                flexShrink: 0,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                px: 1.3,
                                py: 0.7,
                                borderRadius: 999,
                                border: "1px solid #ef444455",
                                color: "#ef4444",
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: terminating ? "default" : "pointer",
                                opacity: terminating ? 0.5 : 1,
                                "&:hover": !terminating ? { backgroundColor: "#ef444414" } : undefined,
                            }}
                        >
                            <DeleteRegular style={{ fontSize: 14 }} />
                            Revoke
                        </Box>
                    </Stack>
                    ))}
                </Stack>
                )}
            </SectionCard>
        </Stack>
    );
}