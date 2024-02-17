import UserSlice from '@/slices/user';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({

  user: UserSlice.reducer
});
