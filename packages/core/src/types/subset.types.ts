import type { Definition } from "./definition.types";
import type { Harness } from "./harness.types";
import type { StringKeyOf } from "./global.types";

/**
 * Any definition key that points to a nested definition
 */
export type DefinitionSubsetKey<TDefinition extends Definition> = {
  [TKey in StringKeyOf<TDefinition>]: TDefinition[TKey] extends Definition
    ? TKey
    : never;
}[StringKeyOf<TDefinition>];

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
 * A root harness's subset
 */
export type HarnessSubset<
  TDefinition extends Definition,
  TSubsetKey extends DefinitionSubsetKey<TDefinition>
> = Harness<DefinitionSubset<TDefinition, TSubsetKey>>;
