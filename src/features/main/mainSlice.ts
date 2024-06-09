import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProfileDataContract } from '~/CONTRACTS/Gate.contracts';
import { api } from '~/api/api';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';
import { RequestList, RequestStateProperty, makeRequestExtraReducer, makeRequestStateProperty } from '~/store/helpers';

const SLICE_NAME = 'main';

interface IS {
  profileDataRequest: RequestStateProperty<ProfileDataContract, ApiError>;
}

const initialState: IS = {
  profileDataRequest: makeRequestStateProperty(),
};

const { actions, reducer } = createSlice({
  initialState,
  name: SLICE_NAME,
  reducers: {},
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, profileDataThunk, 'profileDataRequest');
  },
});

const profileDataThunk = createAsyncThunk(`${SLICE_NAME}/fetchDisciplineListThunk`, async (_, store) => {
  try {
    const profileData = await api.fetchProfileData();

    return profileData;
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const mainSlice = { actions, thunks: { profileDataThunk } } as const;

export const mainReducer = reducer;
