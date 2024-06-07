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

  await api.login({ email: 'anna@mail.ru', password: '123' });
  const data = await api.fetchUserData();
  console.log(data);
});
