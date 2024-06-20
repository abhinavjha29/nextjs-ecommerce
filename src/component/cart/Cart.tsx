"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import {
  deleteAllCartProduct,
  deleteCartProduct,
  fetchCartProducts,
} from "@/app/lib/store/CartSlice";
import { Product } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";
import { createInvoice } from "@/app/lib/store/InvoiceSlice";
import { toast } from "react-toastify";
import CartSkeleton from "../skeleton/CartSkeleton";
import { PROFILE } from "@/utils/constants";

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const token = Cookies.get("token");
  useEffect(() => {
    if (token) {
      getCartProducts();
    } else {
      toast.error("Invalid Authentication, Please Login To continue");
    }
  }, [dispatch]);

  const getCartProducts = async () => {
    await dispatch(fetchCartProducts());
  };
  const cart = useSelector((state: RootState) => state.cart.cartProducts);
  console.log(cart);
  const loading = useSelector((state: RootState) => state.cart.loading);

  const handleRemove = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: number
  ) => {
    e.preventDefault();
    await dispatch(deleteCartProduct(productId));
  };

  const handleOrder = () => {
    setShowModal(true);
  };

  const confirmOrder = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const profile = localStorage.getItem(PROFILE);
    if (profile) {
      await dispatch(createInvoice(cart));
      dispatch(deleteAllCartProduct());

      setShowModal(false);
    } else {
      toast.error("Please Complete Your Profile");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  if (loading) {
    return <CartSkeleton />;
  }
  if (!loading && cart.length === 0) {
    return <h1>Cart is Empty</h1>;
  }
  if (!loading && cart?.length > 0) {
    return (
      <div className="container mt-4">
        <h1 className="mb-4">Your Cart</h1>
        <ul className="list-group">
          {cart?.map((item) => (
            <li className="list-group-item" key={item.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-0">{item.title}</h5>
                  <p className="text-muted mb-0">Price: ${item.price}</p>
                  <p className="text-muted mb-0">Quantity: {item.quantity}</p>
                </div>
                <div>
                  {/* <button
                  className="btn btn-outline-primary me-2"
                  // onClick={() => handleIncrease(item.id)}
                >
                  +
                </button>
                <button
                  className="btn btn-outline-danger me-2"
                  // onClick={() => handleDecrease(item.id)}
                >
                  -
                </button> */}
                  <button
                    className="btn btn-outline-danger"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleRemove(e, item.id)
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn btn-success mt-4" onClick={handleOrder}>
          Order
        </button>

        {showModal && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Order</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to place the order?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      confirmOrder(e)
                    }
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default Cart;
