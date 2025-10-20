import { HarnessReferenceError } from "@errors";
import type {
  Definition,
  DefinitionSubset,
  DefinitionSubsetKey,
  Harness,
  HarnessSubset,
  StringKeyOf,
} from "@types";
import { objectEntries, objectKeys } from "@ubloimmo/front-util/lib/functions";
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
  TDefinition extends Definition,
  TSubsetKey extends DefinitionSubsetKey<TDefinition> = DefinitionSubsetKey<TDefinition>
>(
  harness: Harness<TDefinition>,
  subsetKey: TSubsetKey
): HarnessSubset<TDefinition, TSubsetKey> {
  const subset: Partial<HarnessSubset<TDefinition, TSubsetKey>> = {};
  const prefix = `${subsetKey}.`;
  objectEntries(harness).forEach(([key, value]) => {
    const keyStr = key as unknown as string;
    if (!keyStr.startsWith(prefix)) return;
    const trimmedKey = keyStr.substring(prefix.length);
    if (!trimmedKey.length) return;
    subset[
      trimmedKey as unknown as StringKeyOf<
        HarnessSubset<TDefinition, TSubsetKey>
      >
    ] = value;
  });

  const isSubset = (
    partialSubset: Partial<HarnessSubset<TDefinition, TSubsetKey>>
  ): partialSubset is HarnessSubset<TDefinition, TSubsetKey> =>
    !!objectKeys(partialSubset).length;

  if (!isSubset(subset))
    throw new HarnessReferenceError(subsetKey, "harness subset is empty.");

  return subset;
}
