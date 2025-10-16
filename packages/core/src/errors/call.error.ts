import type { Definition, Harness, HarnessKey } from "@types";

export class HarnessCallError<
  THarness extends Harness<Definition>
> extends Error {
  constructor(
    public readonly callKey: HarnessKey<THarness>,
    public readonly callArguments: unknown,
    public readonly callError: Error | unknown
  ) {
    console.error(callError);
    super(`An error occured while calling "${callKey}". See error above.`);
  }
}
