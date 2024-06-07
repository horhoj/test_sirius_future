import { TokenContract, UserDataContract, UserIdContract } from '~/CONTRACTS/Gate.contracts';

export type Delay = () => Promise<void>;

export type UniqueIdGenerator = () => string;

export type SaveStore = () => void;

export interface Session {
  userId: UserIdContract;
  token: TokenContract;
}

export interface FakeApiGateStore {
  sessions: Session[];
  users: UserDataContract[];
}
