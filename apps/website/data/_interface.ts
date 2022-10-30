export interface IBase<T = any> {
  data: T;
  loading?: boolean;
  error?: string | null;
}