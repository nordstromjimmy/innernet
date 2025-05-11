function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
}
