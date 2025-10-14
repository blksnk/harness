export class HarnessValidationError extends Error {
  constructor(message?: string, evaluatedKey?: string) {
    const prefix = evaluatedKey
      ? `Invalid harness definition at key "${evaluatedKey}"`
      : "Invalid harness definition";
    super(message ? `${prefix}: ${message}` : prefix);
  }
}
