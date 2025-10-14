import type { Definition, DefinitionOrInitializer } from "./definition.types";
import type { Harness } from "./harness.types";

export interface HarnessSetupFn<TDefinition extends Definition> {
  (
    definitionOrInitializer: DefinitionOrInitializer<TDefinition>
  ): Harness<TDefinition>;
}
