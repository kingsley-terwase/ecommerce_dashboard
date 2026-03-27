import { Button, Typography, Input, Avatar, Select } from "@/components/ui";
import { useColor } from "@/contexts/color";
import { spacingTokens } from "@/lib/theme";
import { AddRegular, SendRegular, SubtractRegular } from "@fluentui/react-icons";
import { Box, Stack } from "@mui/material";

export default function CompanyAccountPage() {
  const { border } = useColor();

  return (
    <Stack gap={spacingTokens.xl}>
      <Stack direction="row" alignItems="stretch" gap={spacingTokens.md}>
        <Avatar size={50} imageUrl="" name="Lumcrea8" />
        <Stack justifyContent="space-between">
          <Stack direction="row" gap={spacingTokens.sm}>
            <Button size="small" startContent={<AddRegular />}>
              Change
            </Button>
            <Button size="small" color="secondary" startContent={<SubtractRegular />}>
              Remove
            </Button>
          </Stack>
          <Typography color="secondary" variant="caption" lineHeight={1}>
            We support PNGs, JPEGs, JPGs under 2MB.
          </Typography>
        </Stack>
      </Stack>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
        rowGap={{ xs: spacingTokens.xl, md: 0 }}
      >
        <Stack gap={spacingTokens.lg} pr={{ xs: 0, md: spacingTokens.lg }}>
          <Typography variant="h2" fontWeight={600} color="secondary">
            Profile
          </Typography>
          <Input name="max_users" label="Size" value={(name) => ""} />
          <Input name="name" label="Name" value={(name) => ""} />
          <Input name="phone" label="Phone" value={(name) => ""} />

          <Input name="about" label="About" multiline rows={2} value={(name) => ""} />
        </Stack>
        <Stack
          gap={spacingTokens.lg}
          px={{ xs: 0, md: spacingTokens.lg }}
          sx={{
            borderLeft: { xs: "none", md: `1px solid ${border.faint}` },
            borderRight: { xs: "none", md: `1px solid ${border.faint}` },
          }}
        >
          <Typography variant="h2" fontWeight={600} color="secondary">
            Address
          </Typography>
          <Input name="website" label="Website" value={(name) => ""} />
          <Select
            name="country"
            label="Country"
            value={() => ""}
            onChange={() => console.log("dfdf")}
            onBlur={() => console.log("dfdf")}
            options={["Algeria", "Ghana", "South Africa"]}
            renderOption={(option) => ({
              label: option,
              value: option,
            })}
          />
        </Stack>
        <Stack gap={spacingTokens.lg} pl={{ xs: 0, md: spacingTokens.lg }}>
          <Typography variant="h2" fontWeight={600} color="secondary">
            Socials
          </Typography>
          <Input name="facebook" label="Facebook" value={(name) => ""} />
          <Input name="twitter" label="Twitter" value={(name) => ""} />
          <Input name="instagram" label="Instagram" value={(name) => ""} />
          <Input name="tiktok" label="Tiktok" value={(name) => ""} />
        </Stack>
      </Box>

      <Stack direction="row" gap={spacingTokens.sm}>
        <Button size="large" className="rect" startContent={<SendRegular />}>
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
