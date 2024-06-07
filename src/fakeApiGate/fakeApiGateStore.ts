import { FakeApiGateStore } from './types';

const FAKE_STORE_LS_KEY = 'FAKE_STORE_LS_KEY';

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
});

export const loadStoreFromLS = () => {
  const storeFromLS = localStorage.getItem(FAKE_STORE_LS_KEY);

  if (storeFromLS === null) {
    return makeDefaultFakeApiGateStore();
  }

  return JSON.parse(storeFromLS) as FakeApiGateStore;
};

export const fakeApiGateStore = loadStoreFromLS();

export const saveStoreToLS = () => {
  localStorage.setItem(FAKE_STORE_LS_KEY, JSON.stringify(fakeApiGateStore));
};
