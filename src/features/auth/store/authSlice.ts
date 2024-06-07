import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RequestList, RequestStateProperty, makeRequestExtraReducer, makeRequestStateProperty } from '~/store/helpers';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';
import { api } from '~/api/api';

interface IS {
  isAuth: boolean;
  loginRequest: RequestStateProperty<unknown, ApiError>;
  logoutRequest: RequestStateProperty<unknown, ApiError>;
  fetchDataFirstAppRunRequest: RequestStateProperty<unknown, ApiError>;
}

const SLICE_NAME = 'authSlice';

const initialState: IS = {
  isAuth: false,
  loginRequest: makeRequestStateProperty(),
  logoutRequest: makeRequestStateProperty(),
  fetchDataFirstAppRunRequest: makeRequestStateProperty({ isLoading: true }),
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
  },
});

interface LoginThunkPayload {
  loginPayload: Parameters<typeof api.login>[0];
}

const loginThunk = createAsyncThunk(`${SLICE_NAME}/loginThunk`, async (payload: LoginThunkPayload, store) => {
  try {
    await api.login(payload.loginPayload);
    store.dispatch(actions.setIsAuth(true));
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
    return null;
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
  },
} as const;
