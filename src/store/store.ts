import { configureStore } from '@reduxjs/toolkit'
import paginationSlice from './paginationSlice'
import charactersSlice from './charactersSlice';
import searchSlice from './searchSlice';

const store = configureStore({
  reducer: {
    paginationSlice,
    charactersSlice,
    searchSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;