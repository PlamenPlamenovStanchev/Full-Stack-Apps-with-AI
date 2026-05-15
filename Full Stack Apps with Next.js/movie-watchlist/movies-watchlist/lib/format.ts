export const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}

export function formatStatus(status: "to_watch" | "watching" | "watched") {
  const labels = {
    to_watch: "To watch",
    watching: "Watching",
    watched: "Watched",
  };

  return labels[status];
}
