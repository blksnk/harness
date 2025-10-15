import { HarnessReferenceError } from "@errors";
import type {
  AnyFn,
  Definition,
  DefinitionSubsetKey,
  DefinitionSubsetStrict,
  Harness,
  HarnessSubset,
  HarnessSubsetKey,
} from "@types";
import { deepValueOf, isFunction } from "@ubloimmo/front-util";
import { validateDefinition } from "./definition.utils";
import { isHarness } from "./harness.utils";

/**
 * Returns a {@link Definition}'s subset
 *
 * @template {Definition} TDefinition - The type of the root definition
 * @template {DefinitionSubsetKey<TDefinition>} TSubsetKey - The type of the key to make a subset out of
 * @param {TDefinition} definition - The base definition to take a subset of
 * @param {TSubsetKey} subsetKey - The key to base the subset on
 * @returns {DefinitionSubset<TDefinition, TSubsetKey>} A subset of the base definition
 */
export function definitionSubset<
  TDefinition extends Definition,
  TSubsetKey extends DefinitionSubsetKey<TDefinition>
>(
  definition: TDefinition,
  subsetKey: TSubsetKey
): DefinitionSubsetStrict<TDefinition, TSubsetKey> {
  const found = deepValueOf(definition, subsetKey, true);
  if (!found)
    throw new HarnessReferenceError(subsetKey, "not found in base definition");
  return validateDefinition<DefinitionSubsetStrict<TDefinition, TSubsetKey>>(
    found
  );
}

/**
 * Returns a {@link Harness}'s subset
 *
 * @template {Definition} TDefinition - The type of the base harness's definition
 * @template {DefinitionSubsetKey<TDefinition>} TSubsetKey - The type of the key to make a subset out of
 * @param {Harness<TDefinition>} harness - The base harness to take a subset of
 * @param {TSubsetKey} subsetKey - The key to base the subset on
 * @returns {HarnessSubset<TDefinition, TSubsetKey>} A subset of the base harness
 */
export function harnessSubset<
  TDefinition extends Definition,
  TSubsetKey extends DefinitionSubsetKey<TDefinition>
>(
  harness: Harness<TDefinition>,
  subsetKey: TSubsetKey
): HarnessSubset<TDefinition, TSubsetKey> {
  const found = deepValueOf(
    harness,
    subsetKey as HarnessSubsetKey<TDefinition>,
    true
  );
  if (!found)
    throw new HarnessReferenceError(subsetKey, "not found in base harness");
  if (isFunction<AnyFn>(found))
    throw new HarnessReferenceError(
      subsetKey,
      "points to a harness function, expected a harness object"
    );
  if (!isHarness<DefinitionSubsetStrict<TDefinition, TSubsetKey>>(found))
    throw new HarnessReferenceError(
      subsetKey,
      "does not point to a valid harness object"
    ).cause;
  return found;
}
