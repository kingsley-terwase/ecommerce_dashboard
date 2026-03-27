import { radius } from "@/lib/theme";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select as RootSelect,
} from "@mui/material";

/**
 * @typedef {Object} Select
 * @property {string} label - The label displayed above the select input.
 * @property {(name: string) => any} [error] - Function that returns an error message for the given field name.
 * @property {any[]} options - Array of options to render in the dropdown.
 * @property {(option: any) => { label: string, value: string }} renderOption - Function that maps an option to its label and value.
 * @property {boolean} [disabled] - Whether the select is disabled.
 * @property {keyof typeof radius} [round="4"] - Border radius key from the theme radius constants.
 * @property {(name: string, value: any) => void} onChange - Callback fired when the selected value changes.
 * @property {(name: string, value: any) => void} onBlur - Callback fired when the select loses focus.
 * @property {string} name - The name of the field, used for value/error lookups.
 * @property {(name: string) => any} value - Function that returns the current value for the given field name.
 * @property {boolean} [loading] Determines if input is loading.
 */

/**
 * @param {Omit<import("@mui/material").SelectProps, keyof Select> & Select} props
 */
export default function Select({
  label,
  error,
  options,
  renderOption,
  disabled,
  round = 0,
  name,
  onBlur,
  onChange,
  value,
  variant = "outlined",
  loading,
  ...rest
}) {
  const _error = error ? error(name) : null;
  return (
    <FormControl error={!!_error}>
      <FormLabel>{label}</FormLabel>
      <RootSelect
        {...rest}
        name={name}
        value={value(name)}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={(e) => onBlur(name, e.target.value)}
        variant={variant}
        disabled={disabled || options?.length === 0}
        sx={{
          borderRadius: radius[round],
        }}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} value={renderOption(option).value}>
            {renderOption(option).label}
          </MenuItem>
        ))}
      </RootSelect>
      {_error && <FormHelperText>{_error}</FormHelperText>}
    </FormControl>
  );
}
