export const getFormattedStringDate = (date: Date): string => {
  const shortWeekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

  const monthsNames = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];

  const dateNum = date.getDate();
  const month = monthsNames[date.getMonth()];
  const year = date.getFullYear();
  const day = shortWeekDays[date.getDay()];

  return `${dateNum} ${month} ${year}, ${day}`;
};

export const getFormattedStringTime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return minutes < 10 ? `${hours}:0${minutes}` : `${hours}:${minutes}`;
};

export const getFormatedTimeFromSeconds = (seconds: number): string => {
  const hours = seconds / 3600;
  const hour = Math.trunc(hours);
  const decimal = hours - hour;

  if (decimal === 0) {
    return `${hour}ч`;
  }

  const minutes = Math.trunc((decimal * 3600) / 60);

  return `${hour}ч ${minutes}мин`;
};
