import { eachDayOfInterval, startOfDay } from 'date-fns';
import { api } from '~/api/api';
import { FakeApiGate } from '~/fakeApiGate/fakeApiGate';
import { makeDefaultFakeApiGateStore } from '~/fakeApiGate/fakeApiGateStore';
import { getUUID } from '~/utils/getUUID';

it('', async () => {
  // const store = makeDefaultFakeApiGateStore();
  // const api = new FakeApiGate({ delay: () => Promise.resolve(), store, uniqueIdGenerator: () => getUUID() });
  // {
  //   const token = await api.login({ email: 'anna@mail.ru', password: '123' });
  //   const userData = await api.fetchUserData({ token });
  //   console.log(store);
  //   await api.logout({ token });
  //   console.log(store);
  // }
  // await api.login({ email: 'miha@mail.ru', password: '12345678' });
  await api.login({ email: 'anna@mail.ru', password: '12345678' });
  // const data = await api.fetchLessons({
  //   startPeriodUnixTime: new Date('2024-06-01').getTime(),
  //   endPeriodUnixTime: new Date('2024-06-30').getTime(),
  // });
  const data = await api.fetchDiscipline();
  console.log(data);
});

it('', async () => {
  // const ms = getDatesOfSelectedInterval(startOfDay(new Date()).getTime()).map((el) => new Date(el));
  // console.log(JSON.stringify(ms, null, 2));
  // const res = eachDayOfInterval({ start: new Date('2024-07-29'), end: new Date('2024-09-02') });
  // console.log(JSON.stringify(res, null, 2));
});
