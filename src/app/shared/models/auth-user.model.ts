export type UserRole = 'buyer' | 'seller' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: UserRole;
  countryId: string;
  address: string;
  createdAt: string;
}

export interface UserState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}
