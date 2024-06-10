// components/ProductList.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import { Product } from "../types";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/lib/store";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { addProductToCart } from "@/app/lib/CartSlice";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch: AppDispatch = useDispatch();
  const handleAddToCartBtn = async (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.preventDefault();
    console.log(product);
    try {
      dispatch(addProductToCart(product));
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products?.map((product) => (
          <div className="col" key={product.id}>
            <div className={`card h-100 ${styles.productCard}`}>
              <div className={`card-img-top ${styles.imageWrapper}`}>
                <Image
                  width={400}
                  height={400}
                  src={product.image}
                  className={`card-img-top ${styles.productImage}`}
                  alt={product.title}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <p className="card-text">
                  Rating: {product.rating.rate} ({product.rating.count} reviews)
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-primary"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    handleAddToCartBtn(e, product);
                  }}
                >
                  Add to cart
                </button>
                <Link href={`/product/${product._id}`}>
                  <button className="btn btn-danger"> View Detail</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
