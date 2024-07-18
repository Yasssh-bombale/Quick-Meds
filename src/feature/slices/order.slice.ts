import { Order } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type initialStateObject = {
  isOrderPlaced: boolean;
  isOrderOutOfStock: boolean;
  orders?: Order[] | null;
};

const initialState: initialStateObject = {
  isOrderPlaced: false,
  isOrderOutOfStock: false,
  orders: null,
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
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders?.push(action.payload);
    },
  },
});

export const { makePlaceOrder, outOfStock, setOrders, addOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
