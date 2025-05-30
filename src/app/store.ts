// @ts-ignore
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import { baseApi } from '../services/baseApi';

// 1. Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

// 2. Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

// 3. Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store
export const store = configureStore({
  reducer: persistedReducer as typeof rootReducer, // 👈 Fix TypeScript mismatch
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),
});

// 5. Persistor
export const persistor = persistStore(store);

// 6. Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
