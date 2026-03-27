import { FilterDate, FilterField, FilterSelect, SearchBar } from "@/components/ui";

/**
 * @param {Object} props
 * @param {import("@/types/global.d").FilterConfig} props.filter - The filter config to render.
 * @param {Record<string, string>} props.filterValues - Current flat key/value map of all filter state.
 * @param {(key: string, value: string) => void} props.onFilterChange - Callback fired when a filter value changes.
 * @returns {React.ReactElement | null}
 */
export default function FilterRenderer({ filter, filterValues, onFilterChange }) {
  switch (filter.type) {
    case "search":
      return (
        <SearchBar
          value={filterValues[filter.key] ?? ""}
          onChange={(value) => onFilterChange(filter.key, value)}
        />
      );

    case "field":
      return (
        <FilterField
          items={filter.items}
          renderItem={filter.renderItem}
          selectedValue={filterValues[filter.key]}
          onSelect={(val, item) => {
            onFilterChange(filter.key, val);
            filter.onSelect?.(val, item);
          }}
        />
      );

    case "select":
      return (
        <FilterSelect
          label={filter.label}
          items={filter.items}
          renderItem={filter.renderItem}
          value={filterValues[filter.key] ?? ""}
          onChange={(v) => onFilterChange(filter.key, v)}
          onSelect={(v) => onFilterChange(filter.key, v)}
        />
      );

    case "date":
      return (
        <FilterDate
          from={filterValues[filter.fromKey] ?? ""}
          to={filterValues[filter.toKey] ?? ""}
          onFromChange={(value) => onFilterChange(filter.fromKey, value)}
          onToChange={(value) => onFilterChange(filter.toKey, value)}
        />
      );

    default: {
      return null;
    }
  }
}
