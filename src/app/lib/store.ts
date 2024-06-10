import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"; // Import the user slice reducer
import { productSlice } from "./ProductSlice";
import CartSlice from "./CartSlice";
import InvoiceSlice from "./InvoiceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productSlice.reducer,
    cart: CartSlice,
    invoice: InvoiceSlice,
  },
});

// Type definitions for the store's state and dispatch function
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
