/**
 * @param {Object} props
 * @param {Array<{value: number, color: string}>} props.data
 * @param {number} props.total
 * @param {number} [props.width]
 * @param {number} [props.height]
 * @param {number} [props.gap]
 * @param {"start" | "center" | "end"} [props.align]
 */
export default function BarChart({
  data,
  total,
  width = 100,
  height = 140,
  gap = 10,
  align = "start",
}) {
  const barWidth = (width - gap) / 4;

  const totalBarsWidth = data.length * barWidth + (data.length - 1) * gap;

  const getStartOffset = () => {
    if (align === "end") {
      return width - totalBarsWidth;
    } else if (align === "center") {
      return (width - totalBarsWidth) / 2;
    }
    return 0;
  };

  const startOffset = getStartOffset();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        backgroundColor: "transparent",
      }}
    >
      {data.map((item, index) => {
        const percentage = item.value / total;
        const barHeight = percentage * (height * 0.9);
        const x = startOffset + index * (barWidth + gap);
        const y = height - barHeight;

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            fill={item.color}
            rx="8"
            ry="8"
          ></rect>
        );
      })}
    </svg>
  );
}
