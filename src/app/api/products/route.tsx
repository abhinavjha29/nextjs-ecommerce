import { Product } from "@/types";
import axios from "axios";

export const getSingleProduct = async (id: string): Promise<Product> => {
  const response = await axios.get(
    `http://localhost:3004/products/getsingleproduct/${id}`
  );

  return response.data;
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get("https://fakestoreapi.com/products");

  return res.data;
};
