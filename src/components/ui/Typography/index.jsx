import { useColor } from "@/contexts/color";
import { Typography as BaseTypography } from "@mui/material";

/** @typedef {import("@/types/color.d.js").ColorContextValue} ColorContextValueProps */

/**
 * @param {Omit<import("@mui/material").TypographyProps, "color"> & {color?: keyof ColorContextValueProps["fg"]}} props
 */
export default function Typography({ children, color = "primary", sx, ...props }) {
  const { fg } = useColor();

  return (
    <BaseTypography
      {...props}
      sx={[
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        {
          color: fg[color],
        },
      ]}
    >
      {children}
    </BaseTypography>
  );
}
