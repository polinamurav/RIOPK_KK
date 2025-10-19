export function getMinDate(date: Date, incrementDay?: number): Date {
  if (incrementDay) {
    date.setDate(date.getDate() + incrementDay);
  }

  date.setHours(0, 0, 0, 0);
  return date;
}
