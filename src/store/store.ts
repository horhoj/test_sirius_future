import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import * as rp from 'redux-persist';
import { settingsReducer } from './settingsSlice';
import { authReducer } from '~/features/auth/store/authSlice';
import { scheduleReducer } from '~/features/schedule/scheduleSlice';
import { mainReducer } from '~/features/main/mainSlice';

const reducers = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  schedule: scheduleReducer,
  main: mainReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    // whitelist: ['settings'],
    whitelist: [],
  },
  reducers,
);

export const store = configureStore({
  devTools: true,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [rp.FLUSH, rp.REHYDRATE, rp.PAUSE, rp.PERSIST, rp.PURGE, rp.REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
