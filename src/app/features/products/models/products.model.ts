import { Category } from "../../categories/models/categories";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category; 
}

export interface ProductsListState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface ProductDetailState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

