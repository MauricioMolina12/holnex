import { AuthUser } from '../../../shared/models/auth-user.model';

/** Backward-compat alias — use AuthUser directly for new code */
export type ProfileUser = AuthUser;

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
}

export interface ProfileStats {
  totalOrders: number;
  pendingOrders: number;
  totalSpent: number;
  savedItems: number;
}

export interface ProfileState {
  orders: Order[];
  stats: ProfileStats | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
  ordersLoaded: boolean;
  statsLoaded: boolean;
}

export interface SidebarLink {
  label: string;
  route: string;
  icon: string;
}
