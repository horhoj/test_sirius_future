import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import { LessonsMap } from './types';
import { LessonContract } from '~/CONTRACTS/Gate.contracts';
import { getUUID } from '~/utils/getUUID';

const START_OF_WEEK = 1;
const LOCALE = 'ru-ru';

const getDatesOfSelectedInterval = (selectedDate: number) => {
  // получаем дату начала и конца месяца
  const startDateOfSelectedMonth = startOfMonth(selectedDate).getTime();
  const endDateOfSelectedMonth = endOfMonth(selectedDate).getTime();

  // начало интервала это начало недели первого числа месяца
  const start = startOfWeek(startDateOfSelectedMonth, {
    weekStartsOn: START_OF_WEEK,
  }).getTime();

  const end = endOfWeek(endDateOfSelectedMonth, {
    weekStartsOn: START_OF_WEEK,
  }).getTime();

  return eachDayOfInterval({ start, end }, {}).map((date) => ({
    unixTime: date.getTime(),
    id: getUUID(),
    isMonthSame: date.getMonth() === new Date(selectedDate).getMonth(),
    dateView: date.toLocaleString(),
    date: date.getDate(),
    month: date.getMonth(),
  }));
};

const getDatesOfSelectedIntervalStartAndEnd = (selectedDate: number) => {
  // получаем дату начала и конца месяца
  const startDateOfSelectedMonth = startOfMonth(selectedDate).getTime();
  const endDateOfSelectedMonth = endOfMonth(selectedDate).getTime();

  // начало интервала это начало недели первого числа месяца
  const start = startOfWeek(startDateOfSelectedMonth, {
    weekStartsOn: START_OF_WEEK,
  }).getTime();

  const end = endOfWeek(endDateOfSelectedMonth, {
    weekStartsOn: START_OF_WEEK,
  }).getTime();

  return { start, end };
};

const getCurrentUnixTime = () => new Date().getTime();

const getMonthLabel = (selectedDate: number, locale?: string): string => {
  const date = new Date(selectedDate);
  const year = date.getFullYear();
  const month = date.toLocaleString(locale ?? LOCALE, { month: 'long' });

  return `${month} ${year}`;
};

const getTimeLabel = (selectedDate: number, locale?: string) => {
  return new Date(selectedDate).toLocaleTimeString(locale ?? LOCALE, { hour: '2-digit', minute: '2-digit' });
};

const getNextStartMonthDate = (selectedDate: number) => {
  const startDateOfSelectedMonth = startOfMonth(selectedDate).getTime();

  return addMonths(startDateOfSelectedMonth, 1).getTime();
};

const getPrevStartMonthDate = (selectedDate: number) => {
  const startDateOfSelectedMonth = startOfMonth(selectedDate).getTime();

  return addMonths(startDateOfSelectedMonth, -1).getTime();
};

const getLessonMapId = (params: { month: number; day: number }) => `${params.month}-${params.day}`;

const fetchLessonsMapper = (lessons: LessonContract[] | null) => {
  if (lessons === null) {
    return null;
  }
  const data: LessonsMap = {};
  lessons.forEach((lesson) => {
    const day = new Date(lesson.startUnixTime).getDate();
    const month = new Date(lesson.startUnixTime).getMonth();
    const id = getLessonMapId({ day, month });

    if (data[id] === undefined) {
      data[id] = [lesson];
    } else {
      data[id].push(lesson);
    }
  });

  return data;
};

export const scheduleHelpers = {
  getDatesOfSelectedInterval,
  getCurrentUnixTime,
  getMonthLabel,
  getNextStartMonthDate,
  getPrevStartMonthDate,
  getDatesOfSelectedIntervalStartAndEnd,
  fetchLessonsMapper,
  getTimeLabel,
  getLessonMapId,
} as const;
