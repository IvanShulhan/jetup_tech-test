import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Statistic {
  id: number;
  created: string;
  result: number;
}

const state: Statistic[] = [];

export interface StatisticState {
  statistic: Statistic[];
}

const initialState: StatisticState = {
  statistic: state
};

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    addStatistic: (state, action: PayloadAction<Statistic>) => {
      state.statistic.push(action.payload);
  }},
});

export const { addStatistic } = statisticSlice.actions;

export const selectStatistic = (state: RootState) => state.statistic;

export default statisticSlice.reducer;
