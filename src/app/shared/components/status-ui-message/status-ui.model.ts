export interface UiStatus {
  type: 'network' | 'error' | 'loading' | 'empty' | 'success';
  title: string;
  color?: string;
  icon?: string;
  description?: string;
}
