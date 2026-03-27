import { validateEmail } from "@/helpers/validation";

/**
 * @param {Object} props
 * @param {boolean} props.otpEnabled
 */
export function rules({ otpEnabled }) {
  return {
    email: [
      (/** @type {string} */ value) => (!value ? "Enter account email address" : null),
      (/** @type {string} */ value) =>
        !validateEmail(value) ? `"${value}" is not a valid email. e.g "johndoe@gmail.com"` : null,
    ],
    password: [(/** @type {string} */ value) => (!value ? "Enter account password" : null)],
    otp: [
      (/** @type {string} */ value) =>
        otpEnabled && (!value || value.length != 6) ? "OTP must be 6 letters" : null,
    ],
  };
}
