import type { KeyOf } from "@ubloimmo/front-util";
import type { Definition } from "./definition.types";
import type { Harness } from "./harness.types";
import {} from "./global.types";

/**
 * Any definition key that points to a nested definition
 */
export type DefinitionSubsetKey<TDefinition extends Definition> = {
  [TKey in KeyOf<TDefinition, string>]: TDefinition[TKey] extends Definition
    ? TKey
    : never;
}[KeyOf<TDefinition, string>];

/**
 * A rooy  definition's subset
 */
export type DefinitionSubset<
  TDefinition extends Definition,
  TSubsetKey extends DefinitionSubsetKey<TDefinition>
> = TDefinition[TSubsetKey] extends infer TSubset extends Definition
  ? TSubset
  : never;

/**
 * A stricter variant of {@link Definition subset} that enforces an intersection with {@link Definition}
 */
export type DefinitionSubsetStrict<
  TDefinition extends Definition,
  TSubsetKey extends DefinitionSubsetKey<TDefinition>
> = Definition & DefinitionSubset<TDefinition, TSubsetKey>;

/**
 * Any harness key that points to a nested harness
 */
export type HarnessSubsetKey<THarness extends Harness<Definition>> = {
  [TKey in KeyOf<THarness, string>]: THarness[TKey] extends Harness<Definition>
    ? TKey
    : never;
}[KeyOf<THarness, string>];

/**
 * A root harness's subset
 */
export type HarnessSubset<
  THarness extends Harness<Definition>,
  TSubsetKey extends HarnessSubsetKey<THarness>
> = THarness[TSubsetKey] extends infer TSubset extends Harness<Definition>
  ? TSubset
  : never;
