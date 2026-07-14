import { Product } from '../../products/models/products.model';

export interface Favorite {
  productId: string;
  addedAt: Date;
  userId: string;
  product?: Product;
}

export interface ProductsFavoriteState {
  ids: string[];
  entities: Record<string, Favorite>;
  loading: boolean;
  error: string | null;
}
