export class ErrorParser {
  static parseError(error: unknown) {
    if (error instanceof Error) return error.message;
    return error;
  }
}
