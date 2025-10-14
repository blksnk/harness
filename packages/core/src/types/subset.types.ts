import type { DeepKeyOfType, DeepValueOf } from "@ubloimmo/front-util";
import type { Definition } from "./definition.types";
import type { Harness } from "./harness.types";

/**
 * Any definition key that points to a nested definition
 */
export type DefinitionSubsetKey<TDefinition extends Definition> = DeepKeyOfType<
  TDefinition,
  Definition
>;

/**
 * A root definition's subset
 */
export type DefinitionSubset<
  TDefinition extends Definition,
  TSubsetKey extends DefinitionSubsetKey<TDefinition>
> = Definition & DeepValueOf<TDefinition, TSubsetKey>;

/**
 * Any harness key that points to a nested harness
 */
export type HarnessSubsetKey<TDefinition extends Definition> = DeepKeyOfType<
  Harness<TDefinition>,
  Harness<Definition>
>;

/**
 * A root harness's subset
 */
export type HarnessSubset<
  TDefinition extends Definition,
  TSubsetKey extends DefinitionSubsetKey<TDefinition>
> = Harness<DefinitionSubset<TDefinition, TSubsetKey>>;
