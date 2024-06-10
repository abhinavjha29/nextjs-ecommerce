// types.ts
export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  _id: string;
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
  quantity?: number;
}

export interface UserDetail {
  name?: string;
  email: string;
  password: string;
}
export interface ProductState {
  product: Product[];
  loading: "idle" | "loading" | "success" | "error";
  singleProduct: Product | null;
  paginationDetail: PaginationInfo;
}

export interface FetchAllProductsArgs {
  currentPage: number;
}

export interface ProductData {
  products: Product[];
  paginationInfo: PaginationInfo;
}
interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
}
