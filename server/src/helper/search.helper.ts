import { ILike } from "typeorm";

export class SearchHelper {
  userSearch(search: string): { key: string; value: any }[][] {
    const resultArray: { key: string; value: any }[][] = [];
    const searchOption: string[] = ["Username", "FirstName", "LastName", "Email"];

    for (let option of searchOption) {
      resultArray.push([{ key: `${option}`, value: ILike(`%${search}%`) }]);
    }

    return resultArray;
  }
}
