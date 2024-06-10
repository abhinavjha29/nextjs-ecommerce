"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import BootstrapClient from "@/component/BootstrapClient";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { cookies } from "next/headers";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Ecommerce-app",
//   description: "A Simple Ecommerce App",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar />
          <main> {children}</main>

          <Footer />
          <BootstrapClient />
          <ToastContainer position="top-right" autoClose={5000} />
        </Provider>
      </body>
    </html>
  );
}
