export interface UserListFilter {
  search: string;
  sort: "ASC" | "DESC" | string | undefined;
}
