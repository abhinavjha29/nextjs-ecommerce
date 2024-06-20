// cartSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Product } from "@/types";
import axios from "axios";
import { toast } from "react-toastify";
import { stat } from "fs";
import axiosClient from "../AxiosClient";

interface CartState {
  cartProducts: Product[];
  loading: boolean;
  error: string | null;
}
interface CartResponse {
  product: Product[] | null;
  message: string;
}
interface DeleteCartResponse {
  product: Product;
  message: string;
}
interface AddToCartPayload {
  productId: string;
}

const initialState: CartState = {
  cartProducts: [],
  loading: false,
  error: null,
};

export const fetchCartProducts = createAsyncThunk(
  "cart/fetchCartProducts",
  async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        const response = await axiosClient.get("/cart/getcartitem");
        if (response.data) {
          console.log(response.data);
          return response.data.item;
        } else {
          return null;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const addProductToCart = createAsyncThunk<CartResponse, Product>(
  "cart/addcarttoproduct",
  async (product) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No token found");
      }

      const quantity = 1;
      const cartItem = { ...product, quantity };
      const response = await axiosClient.post("/cart/addtocart", { cartItem });
      if (response) {
        toast.success("added product");
      } else {
        toast.error("error adding products");
      }
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);
export const deleteCartProduct = createAsyncThunk<Product, number>(
  "/deletecartproduct",
  async (id) => {
    try {
      const response = await axiosClient.delete(`/cart/deleteProduct/${id}`);
      if (response.status === 200) {
        toast.success("Item Removed");
        return response.data.product;
      } else {
        toast.error("Product cant be removed");
        console.log("error", response);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }
);
export const deleteAllCartProduct = createAsyncThunk(
  "cart/deleteAllproduct",
  async () => {
    try {
      const token = Cookies.get("token");
      if (token) {
        console.log("inside");
        const response = await axiosClient.delete("/cart/deleteall");
        if (response.status === 200) {
          return true;
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.cartProducts = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch cart products";
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.cartProducts = state.cartProducts.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteAllCartProduct.fulfilled, (state, action) => {
        state.cartProducts = [];
      });
  },
});

export default cartSlice.reducer;
