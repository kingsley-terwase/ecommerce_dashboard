import { useState } from "react";

/**
 * @param {number | (() => number)} initialValue
 */
export const useTab = (initialValue) => {
  const [tab, setTab] = useState(initialValue);
  function onChange(/** @type {number} */ value) {
    setTab(value);
  }

  return { tab, setTab, onChange };
};
