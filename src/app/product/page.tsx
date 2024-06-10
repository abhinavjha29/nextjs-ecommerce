// pages/products.tsx
"use client";
import React, { useEffect, useState } from "react";
import ProductList from "@/component/ProductList";
import Cookies from "js-cookie";
import { fetchProducts } from "../api/products/route";
import Search from "@/component/Search";
import { Product } from "@/types";

import { cookies } from "next/headers";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/store";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "../lib/ProductSlice";
import SkeletonProduct from "@/component/skeleton/SkeletonProduct";
import Pagination from "@/component/Pagination";

const page = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setPage] = useState<number>(1);
  // const [products, setProducts] = useState<Product[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  console.log("query is", query);
  const products = useSelector((state: RootState) => state.product.product);
  const loading = useSelector((state: RootState) => state.product.loading);
  // console.log(tempProducts);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
      console.log("current page at", currentPage);
      dispatch(fetchAllProducts({ currentPage, search: query }));
    }
  }, [dispatch, currentPage, query]);

  // const searchHandler = (searchWord: string) => {
  //   if (searchWord) {
  //     searchWord = searchWord.toLowerCase();
  //     const filtered: Product[] = tempProducts.filter((item: Product) =>
  //       item.title.toLowerCase().includes(searchWord)
  //     );
  //     setProducts(filtered);
  //   }
  //   if (!searchWord) {
  //     setProducts([]);
  //   }
  // };
  console.log(isLoggedIn);
  if (loading === "loading") {
    return <SkeletonProduct />;
  }
  if (loading === "error") {
    return <h1>Something went wrong</h1>;
  }
  return (
    <div>
      <Search />
      <h1 className="text-center my-4">Products</h1>
      {isLoggedIn && products.length === 0 && <h1>No Product Matches </h1>}
      {isLoggedIn && products?.length > 0 && (
        <ProductList products={products} />
      )}
      {!isLoggedIn && <h1>plese login</h1>}

      <div>
        {" "}
        <Pagination setPage={setPage} />
      </div>
    </div>
  );
};

export default page;
