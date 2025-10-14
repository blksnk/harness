import type {
  Definition,
  DefinitionSubset,
  DefinitionSubsetKey,
  Harness,
  HarnessFnReference,
  HarnessKey,
} from "@libharness/core";
import { deepValueOf } from "@ubloimmo/front-util";
import {
  HarnessCallError,
  HarnessReferenceError,
  harnessSubset,
} from "@libharness/core";

export class HarnessConsumer<TDefinition extends Definition> {
  constructor(private readonly _harness: Harness<TDefinition>) {}

  /**
   * Returns a reference to any of the harness' functions.
   *
   * @template {HarnessKey<TDefinition>} TKey - Any deep key in the harness pointing to one of its functions.
   * @param {TKey} key - The key of the harness function to reference.
   * @returns {HarnessFnReference<TDefinition, TKey>} The function referenced by the key.
   */
  public reference<TKey extends HarnessKey<TDefinition>>(
    key: TKey
  ): HarnessFnReference<TDefinition, TKey> {
    try {
      return deepValueOf(this._harness, key);
    } catch (_) {
      throw new HarnessReferenceError(key);
    }
  }

  /**
   * Calls a function in the harness after referencing it.
   *
   * @template {HarnessKey<TDefinition>} TKey - Any deep key in the harness pointing to one of its functions.
   * @template {HarnessFnReference<TDefinition, TKey>} TFn - The harness function referenced by the key.
   * @param {TKey} key - The key of the harness function to call.
   * @param {Parameters<TFn>} ...args - Arguments to pass to the referenced function.
   * @returns {Promise<Awaited<ReturnType<TFn>>>} The result of the referenced function.
   */
  public async call<
    TKey extends HarnessKey<TDefinition>,
    TFn extends HarnessFnReference<TDefinition, TKey> = HarnessFnReference<
      TDefinition,
      TKey
    >
  >(key: TKey, ...args: Parameters<TFn>): Promise<Awaited<ReturnType<TFn>>> {
    try {
      return this.reference(key)(...args);
    } catch (error) {
      throw new HarnessCallError(key, args, error);
    }
  }

  /**
   * Creates a new {@link HarnessConsumer} instance, pointing to a subset of the current harness.
   *
   * @template {DefinitionSubsetKey<TDefinition>} TSubsetKey - Any valid key in the definition that points to a nested object
   * @param {TSubsetKey} subsetKey - A key pointing to one of the harness' subsets
   * @returns {HarnessConsumer<DefinitionSubset<TDefinition, TSubsetKey>>} A fresh {@link HarnessConsumer} instance that only includes the subset
   */
  public subset<TSubsetKey extends DefinitionSubsetKey<TDefinition>>(
    subsetKey: TSubsetKey
  ): HarnessConsumer<DefinitionSubset<TDefinition, TSubsetKey>> {
    const subHarness = harnessSubset(this._harness, subsetKey);
    return new HarnessConsumer<DefinitionSubset<TDefinition, TSubsetKey>>(
      subHarness
    );
  }
}
