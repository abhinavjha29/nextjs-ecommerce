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

// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import userReducer from "./UserSlice";
// import { productSlice } from "./ProductSlice";
// import CartSlice from "./CartSlice";
// import InvoiceSlice from "./InvoiceSlice";

// // Persist configuration for user slice
// const userPersistConfig = {
//   key: "user",
//   storage,
// };

// // Create a persisted reducer for the user slice
// const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// // Combine your reducers
// const rootReducer = combineReducers({
//   user: persistedUserReducer,
//   product: productSlice.reducer,
//   cart: CartSlice,
//   invoice: InvoiceSlice,
// });

// // Configure store with combined reducers
// export const store = configureStore({
//   reducer: rootReducer,
// });

// // Create a persistor
// export const persistor = persistStore(store);

// // Type definitions for the store's state and dispatch function
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
