import { useColor } from "@/contexts/color";
import { Box } from "@mui/material";

/**
 * @param {Object} props
 * @param {number} props.value - Percentage value (0 - 100)
 * @param {number} props.size - Diameter of the ring
 * @param {number} [props.strokeWidth] - Thickness of the ring
 * @param {string} [props.accent] - Color of the progress part
 * @param {string} [props.bgColor] - Color of the background part
 */

export default function RingProgress({ value = 40, size = 25, strokeWidth = 4, accent, bgColor }) {
  const { main, theme } = useColor();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <Box sx={{ position: "relative" }}>
      <svg width={size} height={size}>
        <circle
          stroke={bgColor || (theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)")}
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={accent || main.primary}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            transition: "stroke-dashoffset 0.6s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
    </Box>
  );
}
