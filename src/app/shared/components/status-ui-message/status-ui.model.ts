export interface UiStatus {
  type: 'network' | 'error' | 'loading' | 'empty' | 'success';
  title?: string | null;
  color?: string | null;
  icon?: string | null;
  description?: string | null;
}
