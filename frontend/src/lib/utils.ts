export function formatMessageTime(date: Date, timeOnly: boolean) {
  const inputDate = new Date(date);
  const now = new Date();

  // For date-only comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDay = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

  const diffMs = today.getTime() - messageDay.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  const timeString = inputDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  if (timeOnly) return timeString;

  if (diffDays === 0) {
    return timeString; // Today
  } else if (diffDays === 1) {
    return `Yesterday at ${timeString}`;
  } else if (diffDays < 7) {
    const weekday = inputDate.toLocaleDateString("en-US", { weekday: "long" });
    return `${weekday} ${timeString}`;
  } else {
    const dateString = inputDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${dateString} at ${timeString}`;
  }
}