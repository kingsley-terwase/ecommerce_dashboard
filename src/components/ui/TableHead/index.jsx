import { spacing } from "@/lib/theme";
import { TableRow, TableHead as RootTableHead, TableCell, Stack } from "@mui/material";

/**
 * @param {Object} props
 * @param {Array<import("@/types/global.d").TableColumn>} props.columns
 */
export default function TableHead({ columns }) {
  return (
    <RootTableHead>
      <TableRow>
        {columns?.map((column, index) => (
          <TableCell key={index} align={column?.align || "left"}>
            <Stack
              gap={spacing[1]}
              direction="row"
              alignItems="center"
              justifyContent={column.align === "right" ? "flex-end" : "flex-start"}
            >
              {column?.icon && (
                <column.icon fontSize={18} style={{ color: "inherit !important" }}></column.icon>
              )}
              {column?.label && (
                <span style={{ fontSize: "inherit", color: "inherit" }}>{column?.label}</span>
              )}
            </Stack>
          </TableCell>
        ))}
      </TableRow>
    </RootTableHead>
  );
}
