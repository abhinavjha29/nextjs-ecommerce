"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./lib/store/store";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./lib/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider> {children}</AuthProvider>

        <ToastContainer position="top-right" autoClose={2000} />
      </Provider>
    </QueryClientProvider>
  );
};
export default StoreProvider;
