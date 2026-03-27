import { Stack } from "@mui/material";
import { spacingTokens } from "@/lib/theme";
import FilterRenderer from "./FilterRenderer";

/**
 * @param {Object} props
 * @param {import("@/types/global.d").FilterConfig[]} props.filters - Ordered list of filter configs to render.
 * @param {Record<string, string>} props.filterValues - Flat map of all current filter values keyed by their config key.
 * @param {(key: string, value: string) => void} props.onFilterChange - Called with the changed key and new value whenever any filter updates.
 * @param {React.ReactNode} [props.action] - Optional element rendered on the trailing edge (e.g. a CTA button). Defaults to nothing.
 * @returns {React.ReactElement}
 */
export default function Toolbar({ filters, filterValues, onFilterChange, action }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={spacingTokens.sm}
    >
      <Stack direction="row" alignItems="center" flexWrap="wrap" gap={spacingTokens.sm}>
        {filters.map((filter, index) => (
          <FilterRenderer
            key={index}
            filter={filter}
            filterValues={filterValues}
            onFilterChange={onFilterChange}
          />
        ))}
      </Stack>

      {action && (
        <Stack direction="row" alignItems="center" gap={spacingTokens.sm} flexShrink={0}>
          {action}
        </Stack>
      )}
    </Stack>
  );
}
