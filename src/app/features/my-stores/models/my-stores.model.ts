/** Represents a seller's store */
export interface Store {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string | null;
  banner: string | null;
  ownerId: string;
  isDefault: boolean;
  status: StoreStatus;
  settings: StoreSettings;
  createdAt: string;
  updatedAt: string;
}

export type StoreStatus = 'active' | 'inactive' | 'suspended';

export interface StoreSettings {
  currency: string;
  language: string;
  timezone: string;
}

/** Product managed within a store — extends the shared Product model */
export interface StoreProduct {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  currency: string;
  images: string[];
  thumbnail: string;
  stock: number;
  categories: string[];
  tags?: string[];
  sku: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  brand?: string;
  ratings?: {
    average: number;
    count: number;
  };
  availability: ProductAvailability;
  variants?: StoreProductVariant[];
  status: ProductStatus;
  createdAt: string;
  updatedAt: string;
}

export type ProductAvailability = 'in_stock' | 'out_of_stock' | 'pre_order';
export type ProductStatus = 'active' | 'draft' | 'archived';

export interface StoreProductVariant {
  id: string;
  name: string;
  price?: number;
  stock: number;
  sku?: string;
}

/** NgRx state interfaces */
export interface MyStoresState {
  stores: Store[];
  selectedStore: Store | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export interface StoreProductsState {
  products: StoreProduct[];
  selectedProduct: StoreProduct | null;
  loading: boolean;
  error: string | null;
  totalCount: number;
}

/** Sidebar navigation item for the store dashboard */
export interface StoreSidebarItem {
  label: string;
  icon: string;
  route: string;
  children?: StoreSidebarItem[];
  expanded?: boolean;
}
