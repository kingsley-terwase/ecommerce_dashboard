/**
 * @param {string | Date} date
 * @returns {string}
 */
export function formatDueDate(date) {
  const standardDate = new Date(date);
  if (isNaN(standardDate.getTime())) return "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(standardDate);
  target.setHours(0, 0, 0, 0);

  const diffDays = Math.round((target.getSeconds() - today.getSeconds()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Tomorrow";
  if (diffDays === -1) return "Yesterday";

  return target.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * @param {string} [date]
 * @param {string} [time]
 * @returns {string}
 */
export function renderDateTime(date, time) {
  if (!date && !time) return "Goals";
  return (date ? formatDueDate(date) : "") + (date && time ? " • " : "") + (time ? time : "");
}
