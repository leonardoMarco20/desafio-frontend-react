import { configureStore } from '@reduxjs/toolkit'
import paginationSlice from './paginationSlice'
import charactersSlice from './charactersSlice';

const store = configureStore({
  reducer: {
    paginationSlice,
    charactersSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;