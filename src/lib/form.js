import { useState, useMemo } from "react";

/**
 * @typedef {(value:any) => (string|null|undefined)} ValidationRule
 */

/**
 * @param {string} field
 * @param {any} value
 * @param {Record<string, ValidationRule[]>} rules
 * @returns {string|null}
 */
export function validateField(field, value, rules) {
  const fieldRules = rules?.[field];

  if (!Array.isArray(fieldRules) || fieldRules.length === 0) {
    return null;
  }

  for (const rule of fieldRules) {
    if (typeof rule !== "function") continue;

    const error = rule(value);
    if (error) return error;
  }

  return null;
}

/**
 * @param {Record<string, any>} formData
 * @param {Record<string, ValidationRule[]>} rules
 * @returns {Record<string,string>}
 */
export function getValidationErrors(formData, rules) {
  /** @type {Record<string,string>} */
  const errors = {};

  if (!rules) return errors;

  for (const field in rules) {
    const error = validateField(field, formData?.[field], rules);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/**
 * @typedef {Object} FormValidationProps
 * @property {Record<string,any>} init
 * @property {(formData:any)=>any} rules
 * @property {number} [step]
 */

/**
 * @param {FormValidationProps} props
 */
export function useForm({ init, rules, step }) {
  const [formData, setFormData] = useState(/** @type {Record<string | number, any>} */ (init));
  const [formErrors, setFormErrors] = useState(/** @type {Record<string | number, any>} */ ({}));

  const isStepValid = step !== undefined && step >= 0;

  const __rules = useMemo(() => rules(formData), [formData, rules]);

  const _rules = isStepValid ? __rules?.[step] || {} : __rules || {};
  const _formData = isStepValid ? formData?.[step] || {} : formData;

  /**
   * @param {string} field
   * @param {any} value
   */
  function handleChange(field, value) {
    setFormData((prev) => {
      if (isStepValid) {
        return {
          ...prev,
          [step]: {
            ...(prev?.[step] || {}),
            [field]: value,
          },
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });

    setFormErrors((prev) => {
      if (isStepValid) {
        const stepErrors = { ...(prev?.[step] || {}) };
        delete stepErrors[field];

        if (!Object.keys(stepErrors).length) {
          const updated = { ...prev };
          delete updated[step];
          return updated;
        }

        return {
          ...prev,
          [step]: stepErrors,
        };
      }

      const updated = { ...prev };
      delete updated[field];

      return Object.keys(updated).length ? updated : {};
    });
  }

  /**
   * @param {string} field
   * @param {any} value
   */
  function handleBlur(field, value) {
    const error = validateField(field, value, _rules);

    if (!error) return;

    setFormErrors((prev) => {
      if (isStepValid) {
        return {
          ...prev,
          [step]: {
            ...(prev?.[step] || {}),
            [field]: error,
          },
        };
      }

      return {
        ...prev,
        [field]: error,
      };
    });
  }

  /**
   * Validates the current step/form, sets errors in state,
   * and returns true if the form is valid (no errors).
   * @returns {boolean}
   */
  function validateForm() {
    const newErrors = getValidationErrors(_formData, _rules);
    const hasErrors = Object.keys(newErrors).length > 0;

    setFormErrors((prev) => {
      if (!hasErrors) {
        if (isStepValid) {
          const updated = { ...prev };
          delete updated[step];
          return updated;
        }
        return {};
      }

      if (isStepValid) {
        return { ...prev, [step]: newErrors };
      }

      return newErrors;
    });

    return !hasErrors;
  }

  function reset() {
    setFormData(init);
    setFormErrors({});
  }

  const isErrors =
    Object.keys(isStepValid ? formErrors?.[step] || {} : formErrors || {}).length > 0;

  return {
    formData,
    formErrors,
    setFormData,
    onChange: handleChange,
    onBlur: handleBlur,
    validateForm,
    resetForm: reset,
    isFormErrors: isErrors,
  };
}
