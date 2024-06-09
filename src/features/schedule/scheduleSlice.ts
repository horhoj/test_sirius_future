import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from './../../store/types';
import { scheduleHelpers } from './helpers';
import { api } from '~/api/api';
import { getApiErrors } from '~/api/common';
import { RequestList, RequestStateProperty, makeRequestExtraReducer, makeRequestStateProperty } from '~/store/helpers';
import { DisciplineContract, LessonContract } from '~/CONTRACTS/Gate.contracts';
import { ApiError } from '~/api/common.types';

const SLICE_NAME = 'schedule';

interface IS {
  currentUnixDate: number;
  fetchLessonsRequest: RequestStateProperty<LessonContract[], ApiError>;
  fetchDisciplineListRequest: RequestStateProperty<DisciplineContract[], ApiError>;
}

const initialState: IS = {
  currentUnixDate: scheduleHelpers.getCurrentUnixTime(),
  fetchLessonsRequest: makeRequestStateProperty(),
  fetchDisciplineListRequest: makeRequestStateProperty(),
};

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCurrentUnixDate: (state, action: PayloadAction<number>) => {
      state.currentUnixDate = action.payload;
    },
    nextDate: (state) => {
      state.currentUnixDate = scheduleHelpers.getNextStartMonthDate(state.currentUnixDate);
    },
    prevDate: (state) => {
      state.currentUnixDate = scheduleHelpers.getPrevStartMonthDate(state.currentUnixDate);
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchLessonsThunk, 'fetchLessonsRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchDisciplineListThunk, 'fetchDisciplineListRequest');
  },
});

const dateListSelector = createSelector(
  (state: RootState) => state.schedule.currentUnixDate,
  (currentUnixDate) => scheduleHelpers.getDatesOfSelectedInterval(currentUnixDate),
);

interface FetchLessonsThunkPayload {
  type: 'current' | 'prev' | 'next' | 'today';
}

const fetchLessonsThunk = createAsyncThunk(
  `${SLICE_NAME}/fetchLessonsThunk`,
  async ({ type }: FetchLessonsThunkPayload, store) => {
    let date = (store.getState() as RootState).schedule.currentUnixDate;
    try {
      if (type === 'next') {
        date = scheduleHelpers.getNextStartMonthDate(date);
      }
      if (type === 'prev') {
        date = scheduleHelpers.getPrevStartMonthDate(date);
      }
      if (type === 'today') {
        date = scheduleHelpers.getCurrentUnixTime();
      }
      const { end, start } = scheduleHelpers.getDatesOfSelectedIntervalStartAndEnd(date);
      const userData = await api.fetchLessons({ startPeriodUnixTime: start, endPeriodUnixTime: end });
      store.dispatch(actions.setCurrentUnixDate(date));
      return userData;
    } catch (e: unknown) {
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

const fetchDisciplineListThunk = createAsyncThunk(`${SLICE_NAME}/fetchDisciplineListThunk`, async (_, store) => {
  try {
    const disciplineList = await api.fetchDisciplineList();

    return disciplineList;
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

const isLoadingSelector = (state: RootState) =>
  state.schedule.fetchLessonsRequest.isLoading || state.schedule.fetchDisciplineListRequest.isLoading;

export const scheduleSelectors = { dateListSelector, isLoadingSelector } as const;

export const scheduleReducer = reducer;

export const scheduleSlice = { actions, thunks: { fetchLessonsThunk, fetchDisciplineListThunk } } as const;
