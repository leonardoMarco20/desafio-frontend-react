import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types/CharacterDataType'

// Interface para o typescript
interface CharacterState {
  charactersList: Character[];
}

// State structure 
const initialState: CharacterState = {
  charactersList: []
};

// My store obj (Slice)
const characterSlice = createSlice({
  name: 'pagination',
  // insert state in slice obj
  initialState,
  // actions/mutations
  reducers: {
    setCharactersList(state, action: PayloadAction<Character[]>) {
      state.charactersList = action.payload;
    },
  },
});

// Precisa importar as actions
export const { 
  setCharactersList
} = characterSlice.actions;



export default characterSlice.reducer;
