export function isToday(dateStr) {
  return new Date(dateStr).toDateString() === new Date().toDateString();
}
