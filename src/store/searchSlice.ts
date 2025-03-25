import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Option } from '../types/SelectOptions'
import { RootState } from './store';

interface Filter {
  status: Option,
  statusOptions: Option[]
}

// Interface para o typescript
interface SearchState {
  name: string;
  filter: Filter;
}

// State structure 
const initialState: SearchState = {
  name: '',
  filter: {
    statusOptions: [
      {label: 'All', value: ''},
      {label: 'Alive', value: 'alive'},
      {label: 'Dead', value: 'dead'}, 
      {label: 'Unknown', value: 'unknown'}
    ],
    status: {label: 'All', value: ''}
  }
};

// My store obj (Slice)
const searchSlice = createSlice({
  name: 'pagination',
  // insert state in slice obj
  initialState,
  // actions/mutations
  reducers: {
    setSearchName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },

    updateStatus(state, action: PayloadAction<Option>) {
      state.filter.status = action.payload || '';
    },

    clearFields(state) {
      state.name = ''
      state.filter.status = {label: 'All', value: ''}
    }
  },
});

// Precisa importar as actions
export const { 
  setSearchName,
  updateStatus,
  clearFields
} = searchSlice.actions;

const selectPagination = (state: RootState) => state.searchSlice

export const searchName = createSelector(
  [selectPagination],
  (state) => state.name
);

export const status = createSelector(
  [selectPagination],
  (state) => state.filter.status
);

export const statusOptions = createSelector(
  [selectPagination],
  (state) => state.filter.statusOptions
);


export default searchSlice.reducer;
