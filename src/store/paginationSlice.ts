import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// Interface para o typescript
interface PaginationState {
  totalPages: number;
  currentPage: number;
}

// State structure 
const initialState: PaginationState = {
  totalPages: 0,
  currentPage: 1,
};

// My store obj (Slice)
const paginationSlice = createSlice({
  name: 'pagination',
  // insert state in slice obj
  initialState,
  // actions/mutations
  reducers: {
    goToFirstPage(state) {
      state.currentPage = 1;
    },
    goToLastPage(state) {
      state.currentPage = state.totalPages;
    },
    goToPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    goToNextPagination(state) {
      const nextPage = state.currentPage + 5;
      state.currentPage = nextPage > state.totalPages ? state.totalPages : nextPage;
    },
    goToPreviousPagination(state) {
      const prevPage = state.currentPage - 5;
      state.currentPage = prevPage < 1 ? 1 : prevPage;  
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  },
});

// Precisa importar as actions
export const { 
  goToFirstPage,
  goToLastPage, 
  goToPage,
  goToNextPagination,
  goToPreviousPagination, 
  setTotalPages,
  setCurrentPage 
} = paginationSlice.actions;


// Selectors
const selectPagination = (state: RootState) => state.paginationSlice

export const firstItemPagination = createSelector(
  [selectPagination],
  (pagination) => {
    const { currentPage, totalPages } = pagination;
    if (currentPage >= totalPages - 2 && totalPages > 5) return totalPages - 4;
    return currentPage > 3 ? Math.max(currentPage - 2, 1) : 1;
  }
);

export const secondItemPagination = createSelector(
  [selectPagination],
  (pagination) => {
    const { currentPage, totalPages } = pagination;
    if (currentPage >= totalPages - 1 && totalPages > 5) return totalPages - 3;
    return currentPage > 3 ? Math.max(currentPage - 1, 1) : 2;
  }
);

export const thirdItemPagination = createSelector(
  [selectPagination],
  (pagination) => {
    const { currentPage, totalPages } = pagination;
    if (currentPage >= totalPages - 2 && totalPages > 5) return totalPages - 2;
      return currentPage > 3 ? currentPage : 3;
  }
);

export const fourthItemPagination = createSelector(
  [selectPagination, firstItemPagination],
  (pagination, firstItem) => {
    const { currentPage, totalPages } = pagination;
    if (currentPage >= totalPages - 1 && totalPages > 5) return totalPages - 1;
      return currentPage > 3 ? Math.min(firstItem + 3, totalPages) : 4;
  }
);

export const lastItemPagination = createSelector(
  [selectPagination, firstItemPagination],
  (pagination, firstItem) => {
    const { currentPage, totalPages } = pagination;
    return currentPage > 3 ? Math.min(firstItem + 4, totalPages) : 5;
  }
);

export const paginationItemsSelector = createSelector(
  [firstItemPagination, secondItemPagination, thirdItemPagination, fourthItemPagination, lastItemPagination],
  (firstItem, secondItem, thirdItem, fourthItem, lastItem) => {
    return [firstItem, secondItem, thirdItem, fourthItem, lastItem]
  }
);


export default paginationSlice.reducer;
