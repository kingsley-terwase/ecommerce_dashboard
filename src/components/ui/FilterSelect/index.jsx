import { radiusTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Stack } from "@mui/material";
import { CircleRegular, DismissFilled } from "@fluentui/react-icons";
import { TriggerButton } from "@/components/ui";
import { Dropdown } from "@/components/shared";
import { useState } from "react";

/**
 * @template TItem
 * @param {Object} props
 * @param {import("@/types/global.d.js").FilterLabel} props.label
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {TItem[]} props.items
 * @param {(item: TItem) => { label: string; value: string }} props.renderItem
 * @param {(value: string, item: TItem) => void} props.onSelect
 */
export default function FilterSelect({ label, value, onChange, items, renderItem, onSelect }) {
  const { border, fg } = useColor();
  const [anchorEl, setAnchorEl] = useState(
    /** @type {(EventTarget & HTMLDivElement) | null} */ (null),
  );

  const selectedLabel = items?.map(renderItem).find((mapped) => mapped.value === value)?.label;

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        borderRadius: radiusTokens.md,
        border: `1px solid ${border.primary}`,
        width: "fit-content",
        transition: "border-color 0.35s ease-in-out",
        overflow: "hidden",
        "&:hover": { borderColor: border.secondary },
      }}
    >
      <TriggerButton
        round={0}
        noBorder
        label={label.label}
        icon={label.icon}
        br
        accent={fg.tertiary}
        fullWidth
      />
      <TriggerButton
        round={0}
        noBorder
        icon={CircleRegular}
        br
        accent={fg.tertiary}
        label={selectedLabel ?? ""}
        placeholder="Select..."
        onClick={(e) => setAnchorEl(e.currentTarget)}
        fullWidth
      />
      <TriggerButton
        round={0}
        noBorder
        icon={DismissFilled}
        accent={fg.secondary}
        onClick={() => onChange?.("")}
      />

      <Dropdown
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={items}
        renderItem={renderItem}
        selectedValue={value}
        onSelect={(val, item) => {
          onSelect?.(val, item);
          setAnchorEl(null);
        }}
      />
    </Stack>
  );
}
