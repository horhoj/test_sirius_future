import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestList, RequestStateProperty, makeRequestExtraReducer, makeRequestStateProperty } from '~/store/helpers';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';
import { api } from '~/api/api';
import { UserDataContract } from '~/CONTRACTS/Gate.contracts';

interface IS {
  isAuth: boolean;
  loginRequest: RequestStateProperty<unknown, ApiError>;
  logoutRequest: RequestStateProperty<unknown, ApiError>;
  fetchDataFirstAppRunRequest: RequestStateProperty<unknown, ApiError>;
  fetchUserDataRequest: RequestStateProperty<UserDataContract, ApiError>;
}

const SLICE_NAME = 'authSlice';

const initialState: IS = {
  isAuth: false,
  loginRequest: makeRequestStateProperty(),
  logoutRequest: makeRequestStateProperty(),
  fetchDataFirstAppRunRequest: makeRequestStateProperty({ isLoading: true }),
  fetchUserDataRequest: makeRequestStateProperty(),
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },

    loginRequestClear: (state) => {
      state.loginRequest = makeRequestStateProperty();
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, loginThunk, 'loginRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, logoutThunk, 'logoutRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchDataFirstAppRunThunk, 'fetchDataFirstAppRunRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchUserDataThunk, 'fetchUserDataRequest');
  },
});

interface LoginThunkPayload {
  loginPayload: Parameters<typeof api.login>[0];
}

const loginThunk = createAsyncThunk(`${SLICE_NAME}/loginThunk`, async (payload: LoginThunkPayload, store) => {
  try {
    await api.login(payload.loginPayload);
    store.dispatch(actions.setIsAuth(true));
    store.dispatch(fetchUserDataThunk());
    return null;
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

const logoutThunk = createAsyncThunk(`${SLICE_NAME}/logoutThunk`, async (_, store) => {
  try {
    await api.logout();
    store.dispatch(actions.setIsAuth(false));

    return null;
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

const fetchDataFirstAppRunThunk = createAsyncThunk(`${SLICE_NAME}/fetchDataFirstAppRunThunk`, async (_, store) => {
  try {
    await api.checkToken();
    store.dispatch(actions.setIsAuth(true));
    store.dispatch(fetchUserDataThunk());
    return null;
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

const fetchUserDataThunk = createAsyncThunk(`${SLICE_NAME}/fetchUserDataThunk`, async (_, store) => {
  try {
    const userData = await api.fetchUserData();
    return userData;
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const authReducer = reducer;
export const authSlice = {
  actions,
  thunks: {
    loginThunk,
    logoutThunk,
    fetchDataFirstAppRunThunk,
    fetchUserDataThunk,
  },
} as const;
