import { DeleteRegular, EditRegular, EyeRegular } from "@fluentui/react-icons";

/**
 * @param {Object} props
 * @param {"edit" | "delete" | "preview"} props.variation
 * @param {() => void} props.onClick
 */
export default function ActionButton({ variation, onClick }) {
  const icons = {
    edit: EditRegular,
    delete: DeleteRegular,
    preview: EyeRegular,
  };

  const Icon = icons[variation];

  return <Icon fontSize={18} onClick={onClick} style={{ cursor: "pointer" }}></Icon>;
}
