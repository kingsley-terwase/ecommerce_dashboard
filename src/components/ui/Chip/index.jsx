import { Chip as BaseChip } from "@mui/material";

/**
 * @param {import("@mui/material").ChipProps} props
 */
export default function Chip({ ...props }) {
  return <BaseChip {...props}></BaseChip>;
}
