// @ts-nocheck
import { Box, Stack, Typography } from "@mui/material";
import { Edit24Regular, LockClosed24Regular, LockClosedRegular } from "@fluentui/react-icons";
import StatusPill from "../StatusPill";

const SCOPE_LABELS = { platform: "Platform", vendor: "Vendor", both: "Both" };

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
  } catch {
    return "—";
  }
}

function ScopeBadge({ scope, main }) {
  if (!scope) return <Typography sx={{ fontSize: 12, color: "inherit", opacity: 0.5 }}>—</Typography>;
  return (
    <Box
      sx={{
        display: "inline-flex",
        px: 1,
        py: 0.3,
        borderRadius: 999,
        backgroundColor: `${main.primary}1a`,
        width: "fit-content",
      }}
    >
      <Typography sx={{ fontSize: 11, fontWeight: 700, color: main.primary }}>
        {SCOPE_LABELS[scope] || scope}
      </Typography>
    </Box>
  );
}

export default function AdminTypeTable({ adminTypes, loading, fg, border, main, onEdit }) {
  if (loading) {
    return (
      <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 3, textAlign: "center" }}>
        Loading admin roles...
      </Typography>
    );
  }

  if (adminTypes.length === 0) {
    return (
      <Typography sx={{ fontSize: 13, color: fg.tertiary, px: 2.4, py: 3, textAlign: "center" }}>
        No admin roles created yet.
      </Typography>
    );
  }

  return (
    <Stack>
      <Stack
        direction="row"
        sx={{
          px: { xs: 1.75, sm: 2.4 },
          py: 1.2,
          borderBottom: `1px solid ${border.primary}`,
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Typography sx={{ flex: 2, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
          ROLE
        </Typography>
        <Typography sx={{ flex: 2.4, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
          DESCRIPTION
        </Typography>
        <Typography sx={{ flex: 1.2, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
          SCOPE
        </Typography>
        <Typography sx={{ flex: 1.2, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
          STATUS
        </Typography>
        <Typography sx={{ flex: 1.2, fontSize: 11.5, fontWeight: 700, color: fg.tertiary, letterSpacing: "0.04em" }}>
          CREATED
        </Typography>
        <Box sx={{ width: 40 }} />
      </Stack>

      {adminTypes.map((type, i) => (
        <Stack
          key={type.id}
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          gap={{ xs: 0.8, sm: 0 }}
          sx={{
            px: { xs: 1.75, sm: 2.4 },
            py: 1.6,
            borderTop: i === 0 ? "none" : `1px solid ${border.primary}`,
          }}
        >
          <Box sx={{ flex: 2, minWidth: 0 }}>
            <Stack direction="row" alignItems="center" gap={0.6}>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: fg.primary, textTransform: "capitalize" }}>
                {type.admin_type}
              </Typography>
              {type.is_system && (
                <Box component="span" title="System-defined role" sx={{ display: "flex", flexShrink: 0 }}>
                  <LockClosedRegular style={{ fontSize: 18, color: fg.tertiary }} />
                </Box>
              )}
            </Stack>
            <Typography sx={{ fontSize: 11, color: fg.tertiary }}>Resource: {type.resource}</Typography>
          </Box>

          <Typography sx={{ flex: 2.4, fontSize: 13, color: fg.secondary, minWidth: 0 }}>
            {type.description || "—"}
          </Typography>

          <Box sx={{ flex: 1.2 }}>
            <ScopeBadge scope={type.scope} main={main} />
          </Box>

          <Box sx={{ flex: 1.2 }}>
            <StatusPill active={type.status} />
          </Box>

          <Typography sx={{ flex: 1.2, fontSize: 12, color: fg.tertiary }}>
            {formatDate(type.created_at)}
          </Typography>

          <Box
            onClick={() => onEdit(type)}
            sx={{
              width: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "flex-start", sm: "center" },
              cursor: "pointer",
              color: fg.secondary,
              "&:hover": { color: main.primary },
            }}
          >
            <Edit24Regular style={{ fontSize: 18 }} />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}