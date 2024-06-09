import { FakeApiGateStore } from './types';

const FAKE_STORE_LS_KEY = 'FAKE_STORE_LS_KEY';

const getTime = (date: string) => new Date(date).getTime();

export const makeDefaultFakeApiGateStore = (): FakeApiGateStore => ({
  sessions: [],
  users: [
    {
      id: '1',
      email: 'miha@mail.ru',
      name: 'Михаил',
    },
    {
      id: '2',
      email: 'anna@mail.ru',
      name: 'Анна',
    },
  ],
  disciplines: [
    { id: '1', title: 'Ментальная арифметика' },
    { id: '2', title: 'Программирование' },
    { id: '3', title: 'Скорочтение' },
  ],
  lessons: [
    // уроки михаила
    {
      disciplineId: '1',
      id: '1',
      isCancelled: true,
      isPaid: false,
      lessonDurationInMinutes: 46,
      startUnixTime: getTime('2024-06-03T08:00:00.000Z'),
    },
    {
      disciplineId: '2',
      id: '2',
      isCancelled: false,
      isPaid: true,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-06-13T09:00:00.000Z'),
    },
    {
      disciplineId: '2',
      id: '3',
      isCancelled: false,
      isPaid: true,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-06-12T09:00:00.000Z'),
    },

    {
      disciplineId: '1',
      id: '4',
      isCancelled: true,
      isPaid: false,
      lessonDurationInMinutes: 46,
      startUnixTime: getTime('2024-07-12T08:00:00.000Z'),
    },
    {
      disciplineId: '2',
      id: '5',
      isCancelled: false,
      isPaid: true,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-07-12T09:00:00.000Z'),
    },
    {
      disciplineId: '2',
      id: '6',
      isCancelled: false,
      isPaid: true,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-07-02T09:00:00.000Z'),
    },
    {
      disciplineId: '3',
      id: '7',
      isCancelled: false,
      isPaid: true,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-05-31T09:00:00.000Z'),
    },
    // уроки анны
    {
      disciplineId: '1',
      id: '8',
      isCancelled: false,
      isPaid: true,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-07-12T09:00:00.000Z'),
    },
    {
      disciplineId: '2',
      id: '9',
      isCancelled: false,
      isPaid: true,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-07-02T09:00:00.000Z'),
    },
    {
      disciplineId: '3',
      id: '10',
      isCancelled: false,
      isPaid: false,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-05-31T09:00:00.000Z'),
    },
    {
      disciplineId: '2',
      id: '11',
      isCancelled: false,
      isPaid: false,
      lessonDurationInMinutes: 45,
      startUnixTime: getTime('2024-08-01T09:00:00.000Z'),
    },
  ],
  linksLessonsAndUsers: { '1': ['1', '2', '3', '4', '5', '6', '7'], '2': ['8', '9', '10', '11'] },
});

export const loadStoreFromLS = () => {
  const storeFromLS = localStorage.getItem(FAKE_STORE_LS_KEY);

  if (storeFromLS === null) {
    return makeDefaultFakeApiGateStore();
  }

  return { ...makeDefaultFakeApiGateStore(), ...JSON.parse(storeFromLS) } as FakeApiGateStore;
};

export const fakeApiGateStore = loadStoreFromLS();

export const saveStoreToLS = () => {
  const { sessions } = fakeApiGateStore;

  localStorage.setItem(FAKE_STORE_LS_KEY, JSON.stringify({ sessions }));
};
