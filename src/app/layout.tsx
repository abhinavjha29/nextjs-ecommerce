import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import "./globals.css";
import BootstrapClient from "@/component/BootstrapClient";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";

import "react-toastify/dist/ReactToastify.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce-app",
  description: "A Simple Ecommerce App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          <main> {children}</main>
          <Footer />
          <BootstrapClient />
        </StoreProvider>

        {/* <ToastContainer position="top-right" autoClose={5000} /> */}
      </body>
    </html>
  );
}
