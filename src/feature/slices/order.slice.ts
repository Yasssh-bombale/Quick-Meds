import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateObject = {
  isOrderPlaced: boolean;
  isOrderOutOfStock: boolean;
};

const initialState: initialStateObject = {
  isOrderPlaced: false,
  isOrderOutOfStock: false,
};

const orderSlice = createSlice({
  name: "orderState",
  initialState,
  reducers: {
    makePlaceOrder: (state, action: PayloadAction<boolean>) => {
      state.isOrderPlaced = action.payload;
      // state.isOrderOutOfStock = false;
    },
    outOfStock: (state) => {
      state.isOrderOutOfStock = true;
      // state.isOrderPlaced = false;
    },
  },
});

export const { makePlaceOrder, outOfStock } = orderSlice.actions;

export default orderSlice.reducer;
