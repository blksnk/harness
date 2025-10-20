import type { Definition, DefinitionFnKey } from "@types";

export class HarnessCallError<TDefinition extends Definition> extends Error {
  constructor(
    public readonly callKey: DefinitionFnKey<TDefinition>,
    public readonly callArguments: unknown,
    public readonly callError: Error | unknown
  ) {
    console.error(callError);
    super(`An error occured while calling "${callKey}". See error above.`);
  }
}
