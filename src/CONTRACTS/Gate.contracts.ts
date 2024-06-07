export type TokenContract = string;
export type UserIdContract = string;

export interface UserDataContract {
  id: UserIdContract;
  name: string;
  email: string;
}

export enum authErrorMessagesContract {
  INCORRECT_CREDENTIALS = 'INCORRECT_CREDENTIALS',
  INCORRECT_SESSION = 'INCORRECT_SESSION',
  SERVER_AUTH_ERROR = 'SERVER_AUTH_ERROR',
}

export interface GateAPIContract {
  login(params: { email: string; password: string }): Promise<TokenContract>;
  logout(params: { token: TokenContract }): Promise<void>;
  checkToken(params: { token: TokenContract }): Promise<void>;
  fetchUserData(params: { token: TokenContract }): Promise<UserDataContract>;
}
