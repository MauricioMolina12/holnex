export type UiStatus =
  | {
      type: 'network';
      title?: string | null;
      color?: string | null;
      icon?: string | null;
      description?: string | null;
      actionLabel?: string | null;
      actionType?: 'retry' | 'refresh' | 'custom';
      options: { isOnline: boolean };
    }
  | {
      type: 'error' | 'loading' | 'empty' | 'success';
      title?: string | null;
      color?: string | null;
      icon?: string | null;
      description?: string | null;
      actionLabel?: string | null;
      actionType?: 'retry' | 'refresh' | 'custom';
      options?: never;
    };
