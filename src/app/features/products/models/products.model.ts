export interface Product {
    id: string;
    title: string;
    price: number;
    slug: string;
    images: string[];
    category: any;
    description: string;
  }
  
  export interface ProductState {
    products: Product[];
    productDetail: Product | null;
    loading: boolean;
    error: string | null;
  }
  