"use client";

import { getSingleProduct } from "@/app/api/products/route";
import { fetchSingleProduct } from "@/app/lib/store/ProductSlice";
import { AppDispatch, RootState } from "@/app/lib/store/store";
import SingleProduct from "@/component/SingleProduct";
import SkeletonSingleProduct from "@/component/skeleton/SkeletonSingleProduct";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const page = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();

  const id = params?.id as string;
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [id]);
  const product = useSelector(
    (state: RootState) => state.product?.singleProduct
  );
  const loading = useSelector((state: RootState) => state.product.loading);
  if (loading === "error") {
    return <h1>ERROR 404</h1>;
  }
  if (loading === "loading") {
    return <SkeletonSingleProduct />;
  }
  return (
    <div>
      <SingleProduct product={product} />
    </div>
  );
};

export default page;
