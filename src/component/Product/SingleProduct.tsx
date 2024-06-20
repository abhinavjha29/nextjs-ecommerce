// components/ProductPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import SkeletonSingleProduct from "../skeleton/SkeletonSingleProduct";

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  const token = Cookies.get("token");

  if (!token) {
    router.replace("/");
  }
  if (!product) {
    return <SkeletonSingleProduct />;
  }
  const handleGoBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <Image
                src={product.image}
                width={500}
                height={500}
                alt={product.title}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>${product.price}</p>
          <p>{product.description}</p>
          <div>
            <h5>Select Size:</h5>
            <div className="btn-group" role="group">
              <button
                type="button"
                className={`btn ${
                  selectedSize === "s" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleSizeChange("s")}
              >
                Small
              </button>
              <button
                type="button"
                className={`btn ${
                  selectedSize === "m" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleSizeChange("m")}
              >
                Medium
              </button>
              <button
                type="button"
                className={`btn ${
                  selectedSize === "l" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => handleSizeChange("l")}
              >
                Large
              </button>
            </div>
          </div>
          <div className="mt-3">
            <p>
              Rating: {product?.rating.rate} ({product?.rating.count} reviews)
            </p>
          </div>
          <div className="mt-3">
            <button
              className="btn btn-secondary me-2"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                handleGoBack(e)
              }
            >
              Go Back
            </button>
            <button className="btn btn-success">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
