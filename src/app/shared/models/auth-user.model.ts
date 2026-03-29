export type UserRole = 'buyer' | 'seller' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: UserRole;
  /** ISO alpha-2 country code — reference to Country.id */
  countryId: string;
  address: string;
  createdAt: string;
}

export interface UserState {
  user: AuthUser | null;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}
