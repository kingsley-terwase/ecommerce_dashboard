import { Box } from "@mui/material";
import { spacing } from "@/lib/theme";

/**
 * @param {Object} props
 * @param {number} props.activeTab
 * @param {number} props.tabKey
 * @param {keyof spacing} [props.t]
 * @param {import("react").ReactNode} [props.children]
 */
export default function Tab({ children, activeTab, tabKey, t = 2 }) {
  return activeTab === tabKey ? <Box mt={t}>{children}</Box> : null;
}
