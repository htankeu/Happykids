import { UserListFilter } from "../models/UserListFilter.model";
import { SearchHelper } from "./search.helper";

export class FilterOption {
  userFilter(filteroptionTyped: UserListFilter) {
    let filterOrArray: { key: string; value: any }[][] = [];
    const filterAndArray: { key: string; value: any }[] = [];
    const filterRelationsOrArray: { key: string; value: any }[][] = [];
    const filterRelations: { key: string; value: { key: string; value: { key: string; value: any }[][] } }[] = [];

    if (filteroptionTyped.search !== "") {
      const searchHelper = new SearchHelper();
      filterOrArray = searchHelper.userSearch(filteroptionTyped.search);
    }

    return {
      filterOrArray,
      filterAndArray,
      filterRelationsOrArray,
      filterRelations,
    };
  }
}
