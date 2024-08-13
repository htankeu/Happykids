export interface CRUD<T, K, L> {
  list(take: number, page: number, filterOption?: any): Promise<L>;

  create(resource: K): Promise<T>;

  readById(id: any): Promise<T | null> | Promise<K | null>;
  putById(id: any, resource: any): Promise<boolean>;

  deleteById(id: any): Promise<boolean>;
}
