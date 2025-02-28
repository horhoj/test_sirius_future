import { Delay, FakeApiGateStore, SaveStore, Session, UniqueIdGenerator, GetCurrentUnixTime } from './types';
import { fakeApiGateStore, saveStoreToLS } from './fakeApiGateStore';
import { delay } from '~/utils/delay';
import {
  DisciplineContract,
  GateAPIContract,
  LessonContract,
  ProfileDataContract,
  UserDataContract,
  authErrorMessagesContract,
  balanceOfLessonContract,
} from '~/CONTRACTS/Gate.contracts';
import { getUUID } from '~/utils/getUUID';

export class FakeApiGate implements GateAPIContract {
  private store: FakeApiGateStore;
  private delay: Delay;
  private uniqueIdGenerator: UniqueIdGenerator;
  private saveStore: SaveStore;
  private getCurrentUnixTime: GetCurrentUnixTime;

  public constructor(params: {
    store: FakeApiGateStore;
    delay: Delay;
    uniqueIdGenerator: UniqueIdGenerator;
    saveStore: SaveStore;
    getCurrentUnixTime: GetCurrentUnixTime;
  }) {
    this.store = params.store;
    this.delay = params.delay;
    this.uniqueIdGenerator = params.uniqueIdGenerator;
    this.saveStore = params.saveStore;
    this.getCurrentUnixTime = params.getCurrentUnixTime;
  }

  private async system() {
    // эмулируем сетевую задержку
    await this.delay();
  }

  // ДЛЯ ПРОСТОТЫ У ВСЕХ ПОЛЬЗОВАТЕЛЕЙ ПАРОЛЬ: '12345678'
  public async login(params: { email: string; password: string }): Promise<string> {
    await this.system();
    // Ищем пользователя в базе и проверяем что он есть и предоставлен нужный пароль
    // Если условия не выполнены бросаем ошибку с сообщением согласно контракту
    const user = this.store.users.find((user) => user.email === params.email);
    if (user === undefined || params.password !== '12345678') {
      throw new Error(authErrorMessagesContract.INCORRECT_CREDENTIALS);
    }
    // создадим новую сессию для пользователя
    const session: Session = {
      token: this.uniqueIdGenerator(),
      userId: user.id,
    };
    this.store.sessions.push(session);
    this.saveStore();
    // вернем токен
    return session.token;
  }

  public async logout(params: { token: string }): Promise<void> {
    await this.system();
    // найдем индекс сессии
    const sessionIndex = this.store.sessions.findIndex((session) => session.token === params.token);
    // если сессии не существует, то бросаем ошибку с сообщением согласно контракту
    if (sessionIndex === -1) {
      throw new Error(authErrorMessagesContract.INCORRECT_SESSION);
    }
    // удалим сессию из базы
    this.store.sessions.splice(sessionIndex, 1);
    this.saveStore();
  }

  public async fetchUserData(params: { token: string }): Promise<UserDataContract> {
    await this.system();
    // найдем сессию
    const userSession = this.store.sessions.find((session) => session.token === params.token);
    // Если не нашли, то бросаем ошибку с сообщением согласно контракту
    if (userSession === undefined) {
      throw new Error(authErrorMessagesContract.INCORRECT_SESSION);
    }
    // ищем данные по юзеру
    const user = this.store.users.find((user) => user.id === userSession.userId);
    // Если не нашли, то бросаем ошибку с сообщением согласно контракту
    if (user === undefined) {
      throw new Error(authErrorMessagesContract.SERVER_AUTH_ERROR);
    }

    return user;
  }

  public async checkToken(params: { token: string }): Promise<void> {
    await this.system();
    // найдем сессию
    const userSession = this.store.sessions.find((session) => session.token === params.token);
    // Если не нашли, то бросаем ошибку с сообщением согласно контракту
    if (userSession === undefined) {
      throw new Error(authErrorMessagesContract.INCORRECT_SESSION);
    }
  }

  public async fetchLessons(params: {
    startPeriodUnixTime: number;
    endPeriodUnixTime: number;
    token: string;
  }): Promise<LessonContract[]> {
    await this.system();
    // найдем сессию
    const userSession = this.store.sessions.find((session) => session.token === params.token);
    // Если не нашли, то бросаем ошибку с сообщением согласно контракту
    if (userSession === undefined) {
      throw new Error(authErrorMessagesContract.INCORRECT_SESSION);
    }
    const lessonsIds = this.store.linksLessonsAndUsers[userSession.userId];

    if (lessonsIds === undefined) {
      throw new Error(authErrorMessagesContract.SERVER_INTERNAL_ERROR);
    }

    const allUserLessons = lessonsIds.map((lessonId) => {
      const lesson = this.store.lessons.find((lesson) => lesson.id === lessonId);
      if (lesson === undefined) {
        throw new Error(authErrorMessagesContract.SERVER_INTERNAL_ERROR);
      }
      const discipline = this.store.disciplines.find((discipline) => discipline.id === lesson.disciplineId);
      if (discipline === undefined) {
        throw new Error(authErrorMessagesContract.SERVER_INTERNAL_ERROR);
      }
      return {
        id: lessonId,
        isCancelled: lesson.isCancelled,
        isPaid: lesson.isPaid,
        startUnixTime: lesson.startUnixTime,
        lessonDurationInMinutes: lesson.lessonDurationInMinutes,
        disciplineTitle: discipline.title,
      };
    });

    return allUserLessons.filter((lesson) => {
      return lesson.startUnixTime >= params.startPeriodUnixTime && lesson.startUnixTime <= params.endPeriodUnixTime;
    });
  }

  public async fetchDisciplineList(params: { token: string }): Promise<DisciplineContract[]> {
    await this.system();
    const sessionIndex = this.store.sessions.findIndex((session) => session.token === params.token);
    // если сессии не существует, то бросаем ошибку с сообщением согласно контракту
    if (sessionIndex === -1) {
      throw new Error(authErrorMessagesContract.INCORRECT_SESSION);
    }
    return this.store.disciplines;
  }

  public async fetchProfileData(params: { token: string }): Promise<ProfileDataContract> {
    await this.system();
    // найдем сессию
    const userSession = this.store.sessions.find((session) => session.token === params.token);
    // Если не нашли, то бросаем ошибку с сообщением согласно контракту
    if (userSession === undefined) {
      throw new Error(authErrorMessagesContract.INCORRECT_SESSION);
    }
    const lessonsIds = this.store.linksLessonsAndUsers[userSession.userId];

    if (lessonsIds === undefined) {
      throw new Error(authErrorMessagesContract.SERVER_INTERNAL_ERROR);
    }

    const userLessons = this.store.lessons
      .filter((lesson) => lessonsIds.includes(lesson.id) && lesson.startUnixTime > this.getCurrentUnixTime())
      .slice();

    userLessons.sort((a, b) => {
      return a.startUnixTime - b.startUnixTime;
    });

    const nextLessons: LessonContract[] = userLessons.slice(0, 3).map((lesson) => {
      const discipline = this.store.disciplines.find((el) => el.id === lesson.disciplineId);
      return {
        id: lesson.id,
        isCancelled: lesson.isCancelled,
        isPaid: lesson.isPaid,
        lessonDurationInMinutes: lesson.lessonDurationInMinutes,
        startUnixTime: lesson.startUnixTime,
        disciplineTitle: discipline?.title ?? 'не найдено в базе',
      };
    });

    const userAllLessons = this.store.lessons.filter((lesson) => lessonsIds.includes(lesson.id)).slice();

    const hashMap: Record<string, { count: number; title: string }> = {};
    this.store.disciplines.forEach((discipline) => {
      hashMap[discipline.id] = { count: 0, title: discipline.title };
    });

    userAllLessons.forEach((lesson) => {
      if (hashMap[lesson.disciplineId]) {
        hashMap[lesson.disciplineId].count++;
      }
    });

    const balanceOfLessons: balanceOfLessonContract[] = Object.keys(hashMap).map((key) => ({
      disciplineId: key,
      count: hashMap[key].count,
      disciplineTitle: hashMap[key].title,
    }));

    return {
      nextLessons,
      balanceOfLessons,
    };
  }
}

export const fakeApiGate = new FakeApiGate({
  delay: () => delay(300),
  store: fakeApiGateStore,
  uniqueIdGenerator: () => getUUID(),
  saveStore: () => saveStoreToLS(),
  getCurrentUnixTime: () => new Date().getTime(),
});
