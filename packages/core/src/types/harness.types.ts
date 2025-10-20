import type { AnyFn } from "./global.types";
import type {
  Definition,
  DefinitionFnKey,
  DefinitionFnReference,
} from "./definition.types";

/**
 * Utility type that converts any function in a {@link Definition} to its async counterpart
 */
export interface HarnessFn<TFn extends AnyFn> {
  (...args: Parameters<TFn>): Promise<Awaited<ReturnType<TFn>>>;
}

/**
 * A generic object containing async functions, derived from a {@link Definition} object
 * Flattens a {@link Definition}'s nested properties
 */
export type Harness<TDefinition extends Definition> = {
  readonly [TKey in DefinitionFnKey<TDefinition>]: HarnessFn<
    DefinitionFnReference<TDefinition, TKey>
  >;
};

/**
 * Utility type used to get a {@link Harness}'s {@link HarnessFn} using its {@link DefinitionFnKey}
 */
export type HarnessFnReference<
  TDefinition extends Definition,
  TKey extends DefinitionFnKey<TDefinition>
> = HarnessFn<DefinitionFnReference<TDefinition, TKey>>;
