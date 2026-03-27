/** @param {string} name */
export function getColorFromName(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return {
    dark: `hsl(${hue}, 65%, 50%)`,
    light: `hsl(${hue}, 65%, 95%)`,
  };
}
