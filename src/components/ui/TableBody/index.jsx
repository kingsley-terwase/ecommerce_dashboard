import { TableRow, TableBody as RootTableBody, TableCell, Box, Typography } from "@mui/material";
import { MoonLoader } from "react-spinners";

/**
 * @param {Object} props
 * @param {import("@mui/material").TableBodyProps["children"]} props.children
 * @param {number} props.count
 * @param {string} [props.message]
 * @param {number} props.span
 * @param {boolean} [props.loading]
 */
export default function TableBody({ children, count, message, span, loading = false }) {
  return (
    <RootTableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={span} align="center">
            <MoonLoader loading size={13}></MoonLoader>
          </TableCell>
        </TableRow>
      ) : Number(count || 0) === 0 ? (
        <TableRow>
          <TableCell colSpan={span} align="center">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="tight"
            >
              <Typography fontSize="16px" fontWeight={600} lineHeight={1}>
                404!
              </Typography>
              <Typography variant="body1" color="tertiary">
                {message || "The data requested is not found."}
              </Typography>
            </Box>
          </TableCell>
        </TableRow>
      ) : (
        children
      )}
    </RootTableBody>
  );
}
