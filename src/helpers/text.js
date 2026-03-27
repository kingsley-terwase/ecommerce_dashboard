/** @param {string} name */
export function getInitial(name) {
  return name.charAt(0);
}

/** @param {string | undefined | null} text */
export function renderText(text) {
  if (!text) return "-";
  return text || "-";
}
