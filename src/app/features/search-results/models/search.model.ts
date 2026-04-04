import { Product } from '../../products/models/products.model';

export type SortOption = 'relevance' | 'price_asc' | 'price_desc' | 'newest' | 'rating';

// Availables filters:
// - Categories (multiple)
// - Price range (min/max)
// - Free shipping (boolean)
// - Rating (1-5)
// - Condition (Nuevo/Usado)
export interface SearchFilters {
  categories: string[];
  priceMin: number | null;
  priceMax: number | null;
  freeShipping: boolean;
  rating: number | null;
  condition: string[];
}

// Params sent to the backend for searching
export interface SearchParams {
  query: string;
  filters: SearchFilters;
  sort: SortOption;
  page: number;
  pageSize: number;
}

// Backend response based on pagination
export interface SearchResultMeta {
  totalResults: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

// Backend response
export interface SearchResponse {
  products: Product[];
  meta: SearchResultMeta;
  availableCategories: { name: string; count: number }[];
}


// State used in NgRx store
export interface SearchState {
  query: string;
  filters: SearchFilters;
  sort: SortOption;
  page: number;
  pageSize: number;
  products: Product[];
  meta: SearchResultMeta;
  availableCategories: { name: string; count: number }[];
  loading: boolean;
  error: string | null;
}

// Initial state for the search feature
export const initialSearchFilters: SearchFilters = {
  categories: [],
  priceMin: null,
  priceMax: null,
  freeShipping: false,
  rating: null,
  condition: [],
};

// Initial state for the search feature
export const initialSearchState: SearchState = {
  query: '',
  filters: initialSearchFilters,
  sort: 'relevance',
  page: 1,
  pageSize: 20,
  products: [],
  meta: { totalResults: 0, totalPages: 0, currentPage: 1, pageSize: 20 },
  availableCategories: [],
  loading: false,
  error: null,
};
