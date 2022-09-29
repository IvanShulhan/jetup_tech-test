import { configureStore } from '@reduxjs/toolkit';
import wordsReducer from '../features/words/wordsSlice';
import statisticReducer from '../features/words/statisticSlice';


export const store = configureStore({
  reducer: {
    words: wordsReducer,
    statistic: statisticReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
