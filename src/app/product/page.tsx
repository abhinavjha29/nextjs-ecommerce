// // pages/products.tsx
"use client";
import React, { useEffect, useState } from "react";
import ProductList from "@/component/Product/ProductList";
import Search from "@/component/Product/Search";
import { Product } from "@/types";

import { AppDispatch, RootState } from "../lib/store/store";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../lib/store/ProductSlice";
import SkeletonProduct from "@/component/skeleton/SkeletonProduct";
import Pagination from "@/component/Product/Pagination";

import { useMutation, useQuery } from "react-query";

import { toast } from "react-toastify";

const page = () => {
  const dispatch: AppDispatch = useDispatch();

  const [currentPage, setPage] = useState<number>(1);
  // const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  console.log("query is", query);
  const [product, setProduct] = useState<Product[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log("current page at", currentPage);
    if (query) {
      setPage(1);
    }
    mutate();
    dispatch(fetchAllProducts({ currentPage, search: query }));
  }, [dispatch, currentPage, query]);

  const fetchProduct = async () => {
    try {
      const response = await dispatch(
        fetchAllProducts({ currentPage, search: query })
      ).unwrap();
      console.log("resp is=>", response);
      return response.products;
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  const { mutate, isLoading } = useMutation(fetchProduct, {
    onSuccess: (data) => {
      console.log(data);
      setProduct(data);
    },
    onError: (err) => {
      console.error(err);
      toast.error("something went wrong");
      setError(true);
    },
  });
  console.log("data of product is =>", product);
  console.log("is loding is =>", isLoading);
  if (isLoading) {
    return <SkeletonProduct />;
  }
  if (error) {
    return <h1>Something went wrong</h1>;
  }
  if (!isLoading && product.length === 0) {
    return <SkeletonProduct />;
  }
  return (
    <div>
      <Search />
      <h1 className="text-center my-4">Products</h1>
      {!isLoading && !product && <h1>No Product Found</h1>}
      {!isLoading && product?.length > 0 && <ProductList products={product} />}

      <div>
        <Pagination setPage={setPage} />
      </div>
    </div>
  );
};

export default page;
