import { radiusTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";
import { Stack } from "@mui/material";
import { CalendarRegular, DismissFilled } from "@fluentui/react-icons";
import { useRef } from "react";
import { TriggerButton } from "@/components/ui";

/**
 * @param {Object} props
 * @param {string} props.from
 * @param {string} props.to
 * @param {(value: string) => void} props.onFromChange
 * @param {(value: string) => void} props.onToChange
 */
export default function FilterDate({ from, to, onFromChange, onToChange }) {
  const { border, fg } = useColor();
  const fromInputRef = useRef(/** @type {HTMLInputElement | null} */ (null));
  const toInputRef = useRef(/** @type {HTMLInputElement | null} */ (null));

  const handleFromClick = () => {
    fromInputRef.current?.showPicker();
  };

  const handleToClick = () => {
    toInputRef.current?.showPicker();
  };

  return (
    <Stack
      direction="row"
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
        label={from || "From"}
        icon={CalendarRegular}
        br
        accent={fg.tertiary}
        onClick={handleFromClick}
        fullWidth
      />
      <TriggerButton
        round={0}
        noBorder
        label={to || "To"}
        icon={CalendarRegular}
        br
        accent={fg.tertiary}
        onClick={handleToClick}
        fullWidth
      />

      <TriggerButton
        round={0}
        noBorder
        icon={DismissFilled}
        accent={fg.secondary}
        onClick={() => console.log("Hey")}
      />

      <input
        ref={fromInputRef}
        type="date"
        onChange={(e) => onFromChange?.(e.target.value)}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
        tabIndex={-1}
      />

      <input
        ref={toInputRef}
        type="date"
        onChange={(e) => onToChange?.(e.target.value)}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
        tabIndex={-1}
      />
    </Stack>
  );
}
