import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import AuthSlice from '../features/auth/AuthSlice';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
};

const rootPersistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineSlices({
  auth: persistReducer(authPersistConfig, AuthSlice),
});
export type RootState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const makeStore = (preloadedState?: any) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState,
    devTools: true,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
