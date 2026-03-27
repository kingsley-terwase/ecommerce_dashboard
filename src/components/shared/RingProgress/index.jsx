/**
 * @param {Object} props
 * @param {number} props.value        — 0 to 100
 * @param {string} props.color        — stroke color e.g. "#a855f7"
 * @param {number} [props.size]        diameter in px
 * @param {number} [props.thickness]   ring thickness in px
 */
export default function RingProgress({
  value,
  color,
  size = 72,
  thickness = 5,
}) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const filled = (value / 100) * circumference;
  const rotateDeg = -90;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: "block" }}
    >
      {/* Track */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={thickness}
      />
      {/* Progress */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeDasharray={`${filled} ${circumference}`}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(${rotateDeg} ${cx} ${cy})`}
      />

      <circle
        cx={
          cx + radius * Math.cos((((value / 100) * 360 - 90) * Math.PI) / 180)
        }
        cy={
          cy + radius * Math.sin((((value / 100) * 360 - 90) * Math.PI) / 180)
        }
        r={thickness / 1.5}
        fill={color}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize={size * 0.18}
        fontWeight="700"
        fontFamily="inherit"
      >
        {value > 0 ? `+${value}%` : `${value}%`}
      </text>
    </svg>
  );
}
