import { HarnessReferenceError } from "@errors";
import type {
  AnyFn,
  Definition,
  DefinitionSubset,
  DefinitionSubsetKey,
  Harness,
  HarnessSubset,
  HarnessSubsetKey,
} from "@types";
import { isFunction } from "@ubloimmo/front-util";
import { validateDefinition } from "./definition.utils";

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
): DefinitionSubset<TDefinition, TSubsetKey> {
  const found = definition[subsetKey];
  if (!found)
    throw new HarnessReferenceError(subsetKey, "not found in base definition");
  return validateDefinition<DefinitionSubset<TDefinition, TSubsetKey>>(found);
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
  THarness extends Harness<Definition>,
  TSubsetKey extends HarnessSubsetKey<THarness>
>(
  harness: THarness,
  subsetKey: TSubsetKey
): HarnessSubset<THarness, TSubsetKey> {
  const found = harness[subsetKey];
  if (!found)
    throw new HarnessReferenceError(subsetKey, "not found in base harness");
  if (isFunction<AnyFn>(found))
    throw new HarnessReferenceError(
      subsetKey,
      "points to a harness function, expected a harness object"
    );
  return found;
}
