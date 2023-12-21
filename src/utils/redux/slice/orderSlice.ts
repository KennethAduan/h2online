import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Item {
  name: string;
  quantity: number;
  unitPrice: number;
  subPrice: number;
}

interface OrderSummaryState {
  items: Item[];
  totalAmount: number;
}

const initialState: OrderSummaryState = {
  items: [],
  totalAmount: 0,
};

const orderSlice = createSlice({
  name: "orderSummary",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      state.totalAmount += action.payload.subPrice;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.name === action.payload
      );
      if (index !== -1) {
        state.totalAmount -= state.items[index].subPrice;
        state.items.splice(index, 1);
      }
    },
    clearOrder: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItem, removeItem, clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
