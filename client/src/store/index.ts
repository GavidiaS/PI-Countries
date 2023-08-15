import { configureStore } from '@reduxjs/toolkit';
import userReducer from './context/userSlice';
import countryReducer from './context/countrySlice';
import activityReducer from './context/activitySlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
    activity: activityReducer
  }
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;