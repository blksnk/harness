export class HarnessInternalError extends Error {
  constructor(
    public readonly internalError: unknown,
    message = "Internal error"
  ) {
    console.error(internalError);
    super(message);
  }
}
