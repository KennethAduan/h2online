import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Item {
  id: string;
  name: string;
  itemCode: string;
  quantity: number;
  unitPrice: number;
  subPrice: number;
  serviceType: string;
  unitPricePurchase: number;
  priceTaxPurchase: number;
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
    increaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.subPrice = item.quantity * item.unitPrice;
        state.totalAmount += item.unitPrice;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.subPrice = item.quantity * item.unitPrice;
        state.totalAmount -= item.unitPrice;
      }
    },
    clearOrder: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearOrder,
  increaseQuantity,
  decreaseQuantity,
} = orderSlice.actions;

export default orderSlice.reducer;
