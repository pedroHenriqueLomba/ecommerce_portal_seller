export interface GeneralPaginated<T>{
  data: T[],
  total: number;
  totalPages: number;
}
