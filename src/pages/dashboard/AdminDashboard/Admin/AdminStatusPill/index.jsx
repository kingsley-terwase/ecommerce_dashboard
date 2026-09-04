// @ts-nocheck
import { Box, Typography } from "@mui/material";

const STATUS_COLORS = {
  active: "#22C55E",
  pending: "#F2A93D",
  suspended: "#EF4444",
  revoked: "#94A3B8",
};

export default function AdminStatusPill({ status }) {
  const color = STATUS_COLORS[status] || "#94A3B8";

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        px: 1.1,
        py: 0.4,
        borderRadius: 999,
        backgroundColor: `${color}1a`,
        width: "fit-content",
      }}
    >
      <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: color }} />
      <Typography sx={{ fontSize: 11.5, fontWeight: 700, color, textTransform: "capitalize" }}>
        {status || "Unknown"}
      </Typography>
    </Box>
  );
}