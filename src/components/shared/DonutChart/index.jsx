/**
 * @param {Object} props
 * @param {Array<{percent: number, color: string}>} props.data
 * @param {number} [props.size]
 * @param {number} [props.thickness]    ring thickness in px
 * @param {number} [props.gap]          gap between segments in px
 */
export default function DonutChart({
  data,
  size = 200,
  thickness = 40,
  gap = 3,
}) {
  const cx = size / 2;
  const cy = size / 2;
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const total = data.reduce((sum, d) => sum + d.percent, 0);

  const gapFraction = gap / circumference;

  let cumulativePercent = 0;

  const slices = data.map((item, i) => {
    const fraction = item.percent / total;
    const startPct = cumulativePercent;
    cumulativePercent += fraction;

    const sliceFraction = Math.max(0, fraction - gapFraction);
    const dashArray = `${sliceFraction * circumference} ${circumference}`;

    const rotateDeg = (startPct + gapFraction / 2) * 360 - 90;

    return (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={radius}
        fill="none"
        stroke={item.color}
        strokeWidth={thickness}
        strokeDasharray={dashArray}
        strokeDashoffset={0}
        strokeLinecap="butt"
        transform={`rotate(${rotateDeg} ${cx} ${cy})`}
      />
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices}
    </svg>
  );
}
