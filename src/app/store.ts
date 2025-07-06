// @ts-ignore
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import matrimonyReducer from '../features/matrimony/matrimonySlice';
import userReducer from '../features/user/userSlice';
import { baseApi } from '../services/baseApi'; // this is where you injected your matrimonyApi endpoints

// Step 1: Combine reducers
const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  matrimony: matrimonyReducer,
  [baseApi.reducerPath]: baseApi.reducer, // dynamic reducer from RTK Query
});
const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_APP') {
    // ⚠️ Reset whole redux state
    state = undefined;
  }
  return appReducer(state, action);
};

// Step 2: Setup redux-persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'matrimony', 'user'], // do NOT persist baseApi
};

// Step 3: Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    (getDefaultMiddleware({
      serializableCheck: false,
    }) as any).concat(baseApi.middleware), // add RTK Query middleware
});

// Step 5: Setup persistor
export const persistor = persistStore(store);

// Step 6: Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
