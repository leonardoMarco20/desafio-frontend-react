import { configureStore } from '@reduxjs/toolkit'
import PaginationSlice from './paginationSlice'

const store = configureStore({
  reducer: {
    PaginationSlice
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;