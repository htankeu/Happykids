export class ValidationHelper {
  static checkPropertiesNullOrEmpty<T extends object>(data: T, properties: Array<string>): boolean {
    for (let property of properties) {
      if (!data.hasOwnProperty(property)) return true;

      if (!(data as any)[property]) return true;
    }

    return false;
  }

  static checkHappyAccount(userAccount: string): boolean {
    if (userAccount == undefined) throw Error('Der Nutzerkonto ist nicht definiert')
    const pattern: string = "[Hh]appy[a-zA-Z0-9]*";
    const happyReg: RegExp = new RegExp(pattern);
    return happyReg.test(userAccount);
  }

  validateBigInt(value: any) {
    try {
      BigInt(value);
      return true;
    } catch {
      return false;
    }
  }

  validateNumber(value: any) {
    try {
      return Number(value) ? true : false;
    } catch {
      return false;
    }
  }
}
