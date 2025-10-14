import type { Definition, DefinitionOrInitializer } from "./definition.types";
import type { Harness } from "./harness.types";

/**
 * A function that takes a {@link DefinitionOrInitializer} and returns a corresponding {@link Harness}
 */
export interface HarnessSetupFn<TDefinition extends Definition> {
  (
    definitionOrInitializer: DefinitionOrInitializer<TDefinition>
  ): Harness<TDefinition>;
}
