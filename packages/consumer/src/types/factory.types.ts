import type { Definition } from "./definition.types";
import type { HarnessSetupFn } from "./setup.types";

/**
 * Returns a typed {@link HarnessSetupFn} callback that initializes a harness
 */
export interface HarnessFactoryFn<TDefinition extends Definition> {
  (): HarnessSetupFn<TDefinition>;
}
