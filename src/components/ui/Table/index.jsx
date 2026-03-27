import { Box, TableContainer, Table as TableRoot } from "@mui/material";

/**
 * @param {import("@mui/material").TableProps & {children: import("@mui/material").TableProps["children"] }} props
 */
export default function Table({ children, ...props }) {
  return (
    <TableContainer component={Box}>
      <TableRoot {...props}>{children}</TableRoot>
    </TableContainer>
  );
}
