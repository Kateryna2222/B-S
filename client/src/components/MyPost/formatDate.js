export function formatDate(createdAt) {
  const date = new Date(createdAt);
  const now = new Date();

  const isCurrentYear = date.getFullYear() === now.getFullYear();

  const options = {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  };

  if (!isCurrentYear) {
    options.year = 'numeric';
  }

  return new Intl.DateTimeFormat('uk-UA', options).format(date);
}