// countdownSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface CountdownState {
  targetDates: { [itemId: string]: string };
  resetFlags: { [itemId: string]: boolean };
  timePercentages: { [itemId: string]: number }; // New field to store percentages
}

const initialState: CountdownState = {
  targetDates: {},
  resetFlags: {},
  timePercentages: {}, // Initialize as an empty object
};

export const countdownSlice = createSlice({
  name: "countdown",
  initialState,
  reducers: {
    setTargetDate: (
      state,
      action: PayloadAction<{ itemId: string; targetDate: string }>
    ) => {
      const { itemId, targetDate } = action.payload;
      state.targetDates[itemId] = targetDate;
    },
    resetTargetDate: (
      state,
      action: PayloadAction<{ itemId: string; resetFlag: boolean }>
    ) => {
      const { itemId, resetFlag } = action.payload;
      state.resetFlags[itemId] = resetFlag;
    },
    setTimePercentage: (
      state,
      action: PayloadAction<{ itemId: string; percentage: number }>
    ) => {
      const { itemId, percentage } = action.payload;
      state.timePercentages[itemId] = percentage;
    },
  },
});

export const { setTargetDate, resetTargetDate, setTimePercentage } =
  countdownSlice.actions;
export default countdownSlice.reducer;
