export type NotificationType = 'order' | 'promotion' | 'system' | 'info';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  imageUrl?: string;
  actionUrl?: string;
}

export interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  filter: 'all' | 'unread';
}
