// @ts-nocheck
import { Box, Typography } from "@mui/material";

const GREEN = "#22C55E";
const GRAY = "#94A3B8";

export default function StatusPill({ active }) {
  const color = active ? GREEN : GRAY;

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
      <Typography sx={{ fontSize: 11.5, fontWeight: 700, color }}>
        {active ? "Active" : "Inactive"}
      </Typography>
    </Box>
  );
}