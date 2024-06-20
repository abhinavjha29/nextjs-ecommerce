"use client";
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  fetchInvoices,
  updateInvoiceStatus,
  deleteInvoice,
} from '@/app/lib/store/InvoiceSlice'
import { AppDispatch, RootState } from "@/app/lib/store/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
const Invoice: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.invoice.invoices);
  const loading = useSelector((state: RootState) => state.invoice.loading);
  const error = useSelector((state: RootState) => state.invoice.error);
  const router = useRouter();
  const isAdmin = Cookies.get("isAdmin");

  // useEffect(() => {
  //   if (isAdmin === "true") {
  //     dispatch(fetchInvoices());
  //   } else {
  //     toast.error("You Are not Authorised");
  //     router.replace("/");
  //   }
  // }, [dispatch]);
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);
  const handleUpdateStatus = (
    id: string,
    status: "pending" | "fulfilled" | "rejected"
  ) => {
    dispatch(updateInvoiceStatus({ id, status }));
  };

  const handleDeleteInvoice = (id: string) => {
    dispatch(deleteInvoice(id));
  };

  console.log(invoices);

  return (
    <div className="container mt-4">
      <h1>Invoices</h1>
      {loading && <div className="alert alert-info">Loading...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Products</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice._id}>
              <td>{invoice.email}</td>
              <td>
                <span
                  className={`badge bg-${
                    invoice.status === "pending"
                      ? "warning"
                      : invoice.status === "fulfilled"
                      ? "success"
                      : "danger"
                  }`}
                >
                  {invoice.status}
                </span>
              </td>
              <td>
                <ul className="list-unstyled">
                  {invoice.products.map((product, index) => (
                    <li key={index}>
                      {product.title} - ${product.price} x {product.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                {invoice.status !== "fulfilled" && (
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleUpdateStatus(invoice._id, "fulfilled")}
                  >
                    Fulfill
                  </button>
                )}
                {invoice.status !== "pending" && (
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdateStatus(invoice._id, "pending")}
                  >
                    Pending
                  </button>
                )}
                {invoice.status !== "rejected" && (
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleUpdateStatus(invoice._id, "rejected")}
                  >
                    Reject
                  </button>
                )}
                <button
                  className="btn btn-outline-dark"
                  onClick={() => handleDeleteInvoice(invoice._id)}
                >
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoice;
