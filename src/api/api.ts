import { GateAPIContract } from '~/CONTRACTS/Gate.contracts';
import { fakeApiGate } from '~/fakeApiGate/fakeApiGate';

const TOKEN_LS_KEY = 'TOKEN_LS_KEY';

const login = async (...params: Parameters<GateAPIContract['login']>) => {
  const token = await fakeApiGate.login(...params);
  localStorage.setItem(TOKEN_LS_KEY, token);
};

const getTokenFromLS = () => localStorage.getItem(TOKEN_LS_KEY) ?? '';

const logout = async () => {
  const token = getTokenFromLS();
  await fakeApiGate.logout({ token });
};

const fetchUserData = async () => {
  const token = getTokenFromLS();
  return fakeApiGate.fetchUserData({ token });
};

const checkToken = async () => {
  const token = getTokenFromLS();
  return fakeApiGate.checkToken({ token });
};

const fetchLessons = async (params: Omit<Parameters<GateAPIContract['fetchLessons']>[0], 'token'>) => {
  const token = getTokenFromLS();
  return fakeApiGate.fetchLessons({ token, ...params });
};

const fetchDisciplineList = async () => {
  const token = getTokenFromLS();
  return fakeApiGate.fetchDisciplineList({ token });
};

const fetchProfileData = async () => {
  const token = getTokenFromLS();
  return fakeApiGate.fetchProfileData({ token });
};

export const api = {
  login,
  logout,
  fetchUserData,
  checkToken,
  fetchLessons,
  fetchDisciplineList,
  fetchProfileData,
} as const;
