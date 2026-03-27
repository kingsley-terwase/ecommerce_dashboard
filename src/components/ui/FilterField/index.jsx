import { actionSizes, radiusTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { FilterRegular } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import { useState } from "react";
import { Dropdown } from "@/components/shared";

/**
 * @template TItem
 * @param {Object} props
 * @param {TItem[]} props.items
 * @param {(item: TItem) => { label: string; value: string }} props.renderItem
 * @param {(value: string, item: TItem) => void} props.onSelect
 * @param {string} props.selectedValue
 */
export default function FilterField({ items, renderItem, onSelect, selectedValue }) {
  const { main, fg, bg, border } = useColor();
  const ACCENT = main.primary;

  const [anchorEl, setAnchorEl] = useState(
    /** @type {(EventTarget & HTMLDivElement) | null} */ (null),
  );

  const isOpen = Boolean(anchorEl);

  return (
    <>
      <Box
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: actionSizes.small,
          height: actionSizes.small,
          borderRadius: radiusTokens.md,
          border: "1px solid",
          borderColor: isOpen ? ACCENT : border.primary,
          color: isOpen ? ACCENT : fg.secondary,
          bgcolor: isOpen ? bg.secondary : "transparent",
          transition: "border-color 0.18s, color 0.18s, background 0.18s",
          verticalAlign: "middle",
          cursor: "pointer",
          "&:hover": {
            borderColor: ACCENT,
            color: ACCENT,
            bgcolor: bg.secondary,
          },
        }}
      >
        <FilterRegular fontSize={16} />
      </Box>

      <Dropdown
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        items={items}
        renderItem={renderItem}
        selectedValue={selectedValue}
        onSelect={(val, item) => {
          onSelect?.(val, item);
          setAnchorEl(null);
        }}
      />
    </>
  );
}
