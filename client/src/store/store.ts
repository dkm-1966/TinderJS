import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

const rootReducer = combineReducers({
    auth: authSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];