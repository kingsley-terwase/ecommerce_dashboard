import { fontSizes, spacingTokens } from "@/lib/theme";
import { useColor } from "@/contexts/color";

/**
 * @param {{
    strokeWidth?: number;
    color?: string;
    value?: number;
    total?: number;
    width?: string;
    showPercentage?: boolean;
    title?: string;
  }} props
 */
export default function HorizontalBar({
  strokeWidth = 10,
  color = "#4ECDC4",
  value = 0,
  total = 100,
  width = "100%",
  showPercentage = false,
  title = "",
}) {
  const { fg, elevate } = useColor();
  const percentage = total > 0 ? (value / total) * 100 : 0;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: spacingTokens.sm }}>
      {title && (
        <div
          style={{
            fontSize: fontSizes.caption,
            color: fg.secondary,
            fontWeight: 500,
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          backgroundColor: elevate.primary,
          borderRadius: "999px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: strokeWidth,
            borderRadius: "999px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              width: `${clampedPercentage}%`,
              height: "100%",
              backgroundColor: color,
              borderRadius: strokeWidth / 2,
              transition: "width 0.3s ease",
            }}
          ></div>
        </div>
      </div>
      {showPercentage && (
        <div
          style={{
            fontSize: fontSizes.caption,
            color: fg.secondary,
            textAlign: "right",
            fontWeight: 400,
          }}
        >
          {clampedPercentage.toFixed(0)}%
        </div>
      )}
    </div>
  );
}
