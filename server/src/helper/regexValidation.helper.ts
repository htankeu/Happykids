export class RegexValidation {
  static validate(input: string | undefined, regExp: RegExp): boolean {
    if (!input) {
      return false;
    }

    const valid = regExp.test(input);
    return valid;
  }
}
