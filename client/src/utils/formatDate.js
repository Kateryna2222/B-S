export function formatDate(createdAt, year = false) {
  const date = new Date(createdAt);
  const now = new Date();

  const isCurrentYear = date.getFullYear() === now.getFullYear();

  const options = {
    day: 'numeric',
    month: 'long',
  };

  if (year) {
    options.year = 'numeric';
  } else if (!isCurrentYear) {
    options.year = 'numeric';
  } else {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return new Intl.DateTimeFormat('uk-UA', options).format(date);
}