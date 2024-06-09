export type TokenContract = string;
export type UserIdContract = string;
export type LessonIdContract = string;
export type DisciplineIdContract = string;

export interface UserDataContract {
  id: UserIdContract;
  name: string;
  email: string;
}

export interface LessonContract {
  id: LessonIdContract;
  startUnixTime: number;
  lessonDurationInMinutes: number;
  isCancelled: boolean;
  isPaid: boolean;
  disciplineTitle: string;
}

export interface DisciplineContract {
  id: DisciplineIdContract;
  title: string;
}

export interface balanceOfLessonContract {
  disciplineId: DisciplineIdContract;
  disciplineTitle: string;
  count: number;
}

export interface ProfileDataContract {
  nextLessons: LessonContract[];
  balanceOfLessons: balanceOfLessonContract[];
}

export interface GateAPIContract {
  login(params: { email: string; password: string }): Promise<TokenContract>;
  logout(params: { token: TokenContract }): Promise<void>;
  checkToken(params: { token: TokenContract }): Promise<void>;
  fetchUserData(params: { token: TokenContract }): Promise<UserDataContract>;
  fetchLessons(params: {
    startPeriodUnixTime: number;
    endPeriodUnixTime: number;
    token: TokenContract;
  }): Promise<LessonContract[]>;
  fetchDisciplineList(params: { token: TokenContract }): Promise<DisciplineContract[]>;
  fetchProfileData(params: { token: TokenContract }): Promise<ProfileDataContract>;
}

export enum authErrorMessagesContract {
  INCORRECT_CREDENTIALS = 'INCORRECT_CREDENTIALS',
  INCORRECT_SESSION = 'INCORRECT_SESSION',
  SERVER_AUTH_ERROR = 'SERVER_AUTH_ERROR',
  SERVER_INTERNAL_ERROR = 'SERVER_INTERNAL_ERROR',
}
