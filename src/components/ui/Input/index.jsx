import { radius } from "@/lib/theme";
import { FormControl, FormHelperText, FormLabel, FilledInput, OutlinedInput } from "@mui/material";

/**
 * @typedef {object} Input
 * @property {string} [label]
 * @property {(name: string) => any} [error]
 * @property {boolean} [disabled]
 * @property {keyof typeof radius} [round="4"]
 * @property {(name: string, value: any) => void} [onChange]
 * @property {(name: string, value: any) => void} [onBlur]
 * @property {string} name
 * @property {(name: string) => any} value
 * @property {boolean} [fullWidth=true]
 * @property {"filled" | "outlined"} [variant="filled"]
 * @property {import("@mui/material").FilledInputProps | import("@mui/material").OutlinedInputProps} [rest]
 */

/**
 * @param {Omit<import("@mui/material").InputProps, keyof Input> & Input} props
 */
export default function Input({
  label,
  error,
  round = 0,
  name,
  onBlur,
  onChange,
  value,
  fullWidth = true,
  variant = "outlined",
  ...rest
}) {
  const _error = error ? error(name) : null;
  const RootInput = variant === "outlined" ? OutlinedInput : FilledInput;

  return (
    <FormControl error={!!_error} fullWidth={fullWidth}>
      {label && <FormLabel>{label}</FormLabel>}
      <RootInput
        {...rest}
        name={name}
        value={value(name)}
        onChange={onChange ? (e) => onChange(name, e.target.value) : undefined}
        onBlur={onBlur ? (e) => onBlur(name, e.target.value) : undefined}
        sx={{
          borderRadius: `${radius[round]} !important`,
        }}
      />
      {_error && <FormHelperText>{_error}</FormHelperText>}
    </FormControl>
  );
}
