export class HarnessReferenceError extends Error {
  constructor(invalidKey: unknown, message?: string) {
    super(
      `Invalid harness key "${invalidKey}"${message ? `: ${message}` : ""}`
    );
  }
}
