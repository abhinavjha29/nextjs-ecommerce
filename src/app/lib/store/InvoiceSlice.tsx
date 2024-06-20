import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Product } from "@/types";
import { cookies } from "next/headers";
import axiosClient from "../AxiosClient";
interface IProduct {
  productId: string;
  title: string;
  price: number;
  quantity: number;
}

interface Invoice {
  _id: string;
  email: string;
  products: IProduct[];
  status: "pending" | "fulfilled" | "rejected";
}

// interface ReturnInvoice {

// }
interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};

// Thunks

export const fetchInvoices = createAsyncThunk(
  "invoices/fetchInvoices",
  async () => {
    const response = await axiosClient.get("/invoice/getinvoice");

    return response.data;
  }
);

export const createInvoice = createAsyncThunk<Invoice, Product[]>(
  "invoices/createInvoice",
  async (product) => {
    try {
      console.log(product);
      const response = await axiosClient.post("/invoice/postinvoice", {
        product,
      });
      if ((response.status = 201)) {
        toast.success("Order succesful");

        return response.data;
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong , unable to order");
    }
  }
);

export const updateInvoiceStatus = createAsyncThunk(
  "invoices/updateInvoiceStatus",
  async ({
    id,
    status,
  }: {
    id: string;
    status: "pending" | "fulfilled" | "rejected";
  }) => {
    console.log(id);
    const response = await axiosClient.patch(`/invoice/updatestatus/${id}`, {
      status,
    });
    return response.data;
  }
);

export const deleteInvoice = createAsyncThunk<string, undefined>(
  "invoices/deleteInvoice",
  async (id: any) => {
    try {
      const token = Cookies.get("token");
      if (token) {
        await axiosClient.delete(`/invoice/deleteinvoice/${id}`);
        return id;
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchInvoices.fulfilled,
        (state, action: PayloadAction<Invoice[]>) => {
          state.loading = false;
          state.invoices = action.payload;
        }
      )
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch invoices";
      })
      .addCase(createInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createInvoice.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.loading = false;
          state.invoices.push(action.payload);
        }
      )
      .addCase(createInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create invoice";
      })
      .addCase(updateInvoiceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateInvoiceStatus.fulfilled,
        (state, action: PayloadAction<Invoice>) => {
          state.loading = false;
          const index = state.invoices.findIndex(
            (invoice) => invoice._id === action.payload._id
          );
          if (index !== -1) {
            state.invoices[index] = action.payload;
          }
        }
      )
      .addCase(updateInvoiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update invoice status";
      })
      .addCase(deleteInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteInvoice.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.invoices = state.invoices.filter(
            (invoice) => invoice._id !== action.payload
          );
        }
      )
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete invoice";
      });
  },
});

export default invoiceSlice.reducer;
