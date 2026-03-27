import { validateEmail, validatePassword } from "@/helpers/validation";

/**
 * @param {Object} params
 * @param {boolean} params.otpSent
 * @param {string} params.password
 */
export function rules({ otpSent, password }) {
  return {
    email: [
      (/** @type {string} */ value) => (!value ? "Enter account email address" : null),
      (/** @type {string} */ value) =>
        !validateEmail(value) ? `"${value}" is not a valid email. e.g "johndoe@gmail.com"` : null,
    ],
    password: [
      (/** @type {string} */ value) => (otpSent && !value ? "Enter account password" : null),
      (/** @type {string} */ value) =>
        otpSent && !validatePassword(value)
          ? "Password must be 8+ characters, with uppercase, lowercase, and a symbol (!@#$%^&*)"
          : null,
    ],
    confirmPassword: [
      (/** @type {string} */ value) => (otpSent && !value ? "Enter account password" : null),
      (/** @type {string} */ value) =>
        otpSent && !validatePassword(value)
          ? "Password must be 8+ characters, with uppercase, lowercase, and a symbol (!@#$%^&*)"
          : null,
      (/** @type {string} */ value) =>
        otpSent && value !== password ? "Passwords do not match" : null,
    ],
    token: [
      (/** @type {string} */ value) =>
        otpSent && !value ? "Enter the code sent to your email" : null,
      (/** @type {string} */ value) =>
        otpSent && value?.length !== 6 ? "Code must be exactly 6 characters" : null,
      (/** @type {string} */ value) =>
        otpSent && !parseInt(value) ? "Code must be numeric" : null,
    ],
  };
}
