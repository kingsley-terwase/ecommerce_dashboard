import { getColorFromName } from "@/helpers/color";
import { getInitial } from "@/helpers/text";

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {string} [props.imageUrl]
 * @param {number} [props.size]
 * @param {boolean} [props.round]
 * @param {(e: React.MouseEvent<HTMLDivElement>) => void} [props.onClick]
 */
export default function Avatar({
  name,
  imageUrl,
  size = 28,
  round = true,
  onClick,
}) {
  const unitSize = `${size}px`;

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        onClick={onClick}
        style={{
          width: unitSize,
          height: unitSize,
          objectFit: "cover",
          borderRadius: round ? "999px" : 0,
          display: "block",
          cursor: "pointer",
        }}
      />
    );
  }

  const initials = getInitial(name);
  const { dark, light } = getColorFromName(name);

  return (
    <div
      onClick={onClick}
      style={{
        width: unitSize,
        height: unitSize,
        backgroundColor: light,
        color: dark,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        border: `1px solid ${dark}`,
        borderRadius: "999px",
        fontSize: `${size * 0.38}px`,
        fontWeight: 500,
        lineHeight: 0,
        cursor: "pointer",
      }}
    >
      {initials}
    </div>
  );
}
