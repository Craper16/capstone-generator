import dayjs from 'dayjs';

export function formatDate(date?: Date | null) {
  if (!date) {
    return '';
  }

  return dayjs(date).format('YYYY/MM/DD');
}

export function dateFromNow(date?: Date) {
  if (!date) {
    return '';
  }

  return dayjs(date).fromNow();
}

export function formatDateToHoursAndMinutes(date?: Date) {
  if (!date) {
    return '';
  }

  return dayjs(date).format('HH:mm A');
}

export function getMonthAndYear(date?: Date) {
  if (!date) {
    return '';
  }

  return dayjs(date).format('MMMM YYYY');
}
