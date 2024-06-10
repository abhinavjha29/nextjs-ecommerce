import {
  FetchAllProductsArgs,
  Product,
  ProductData,
  ProductState,
} from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

const initialState: ProductState = {
  product: [],
  loading: "idle",
  singleProduct: null,
  paginationDetail: {
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  },
};
//satifies keyword

export const fetchAllProducts = createAsyncThunk<
  ProductData,
  { currentPage: number; search: string | null }
>("products/fetchAllProducts", async ({ currentPage, search }) => {
  const token: string | undefined = Cookies.get("token");

  const response = await axios.get(
    "http://localhost:3004/product/getallproducts",
    {
      params: { page: currentPage, perPage: 6, search },
      headers: {
        Authorization: token,
      },
    }
  );
  console.log("data at store is", response.data);
  return response.data;
});
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingleProduct",
  async (id: string) => {
    try {
      console.log(id);
      const token: string | undefined = Cookies.get("token");
      if (!token) {
        throw new Error();
      }
      const response = await axios.get(
        `http://localhost:3004/product/getsingleproduct/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data.singleProduct;
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  }
);
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = "success";
        state.product = action.payload.products;
        state.paginationDetail = action.payload.paginationInfo;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.loading = "error";
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = "success";
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state) => {
        state.loading = "error";
      });
  },
});
