import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const state: Words[] = [];

export interface Words {
  id: number;
  word: string;
  translation: string;
}

export interface WordsState {
  words: Words[];
}

const initialState: WordsState = {
  words: state
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    addWords: (state, action: PayloadAction<Words>) => {
      state.words.push(action.payload);
  }},
});

export const { addWords } = wordsSlice.actions;

export const selectWords = (state: RootState) => state.words;

export default wordsSlice.reducer;
