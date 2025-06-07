import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';
import matrimonyReducer from '../features/matrimony/matrimonySlice';
import { baseApi } from '../services/baseApi'; // this is where you injected your matrimonyApi endpoints

// Step 1: Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    matrimony: matrimonyReducer,
    [baseApi.reducerPath]: baseApi.reducer, // dynamic reducer from RTK Query
});

// Step 2: Setup redux-persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'matrimony'], // do NOT persist baseApi
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
