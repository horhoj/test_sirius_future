import { LessonIdContract, TokenContract, UserDataContract, UserIdContract } from '~/CONTRACTS/Gate.contracts';

export type Delay = () => Promise<void>;

export type UniqueIdGenerator = () => string;

export type SaveStore = () => void;

export type GetCurrentUnixTime = () => number;

export interface Session {
  userId: UserIdContract;
  token: TokenContract;
}

export interface FakeApiGateStore {
  sessions: Session[];
  users: UserDataContract[];
  disciplines: Discipline[];
  lessons: Lesson[];
  linksLessonsAndUsers: Record<UserIdContract, Lesson['id'][]>;
}

export interface Discipline {
  id: string;
  title: string;
}

export interface Lesson {
  id: LessonIdContract;
  startUnixTime: number;
  lessonDurationInMinutes: number;
  isCancelled: boolean;
  isPaid: boolean;
  disciplineId: string;
}
