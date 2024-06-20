import Sidebar from "@/component/admin/Sidebar";
import type { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Ecommerce-app",
  description: "A Simple Ecommerce App",
};
type LayoutProps = {
  children: ReactNode;
};
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">{children}</div>
    </main>
  );
};

export default Layout;
