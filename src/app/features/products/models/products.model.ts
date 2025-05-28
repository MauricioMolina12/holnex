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

export interface ProductState {
  products: Product[];
  productDetail: Product | null;
  loading: boolean;
  error: string | null;
}
