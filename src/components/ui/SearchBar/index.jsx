import { useState, useRef, useEffect } from "react";
import { SearchRegular, DismissRegular } from "@fluentui/react-icons";
import { Box } from "@mui/material";
import { useColor } from "@/contexts/color";
import { actionSizes, radius, radiusTokens, spacingTokens, typefaces } from "@/lib/theme";

/**
 * @param {Object} props
 * @param {string} props.value
 * @param {(value: string) => void} props.onChange
 * @param {string} [props.size]
 */
export default function SearchBar({ value, onChange, size = actionSizes.small }) {
  const { main, border, fg, bg, shadow } = useColor();
  const [isOpen, setIsOpen] = useState(false);
  /** @type {React.RefObject<HTMLInputElement | null>} */
  const inputRef = useRef(null);
  /** @type {React.RefObject<HTMLDivElement | null>} */
  const containerRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (/** @type {MouseEvent} */ e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target instanceof Node ? e.target : null)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ACCENT = main.primary;

  return (
    <Box component="div" ref={containerRef} sx={{ position: "relative", display: "inline-block" }}>
      <Box
        onClick={() => setIsOpen(true)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          borderRadius: radiusTokens.md,
          border: "1px solid",
          borderColor: isOpen ? ACCENT : border.primary,
          bgcolor: "transparent",
          color: isOpen ? ACCENT : fg.secondary,
          visibility: isOpen ? "hidden" : "visible",
          transition: "border-color 0.18s, color 0.18s, box-shadow 0.18s",
          cursor: "pointer",
          "&:hover": {
            borderColor: ACCENT,
            color: ACCENT,
            bgcolor: bg.secondary,
          },
        }}
      >
        <SearchRegular fontSize={16} />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          bgcolor: bg.tertiary,
          borderBottom: "1px solid",
          borderBottomColor: ACCENT,
          borderRadius: radius[1],
          gap: spacingTokens.sm,
          boxShadow: shadow.default,
          height: size,
          px: spacingTokens.sm,
          overflow: "hidden",
          pointerEvents: isOpen ? "all" : "none",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scaleX(1)" : "scaleX(0.85)",
          transformOrigin: "left center",
          transition:
            "width 0.28s cubic-bezier(0.34,1.2,0.64,1), opacity 0.2s ease, transform 0.28s cubic-bezier(0.34,1.2,0.64,1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: ACCENT,
          }}
        >
          <SearchRegular fontSize={16} />
        </Box>

        <Box
          component="input"
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
          placeholder="Search tasks..."
          sx={{
            flex: 1,
            fontWeight: 400,
            color: fg.secondary,
            fontFamily: typefaces.default,
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            "&::placeholder": {
              color: fg.tertiary,
              fontWeight: 300,
              opacity: 1,
            },
          }}
        />

        <Box
          onClick={() => {
            onChange("");
            setIsOpen(false);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <DismissRegular fontSize={16} />
        </Box>
      </Box>
    </Box>
  );
}
