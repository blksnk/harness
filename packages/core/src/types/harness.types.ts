import type { DeepKeyOfType, DeepValueOf } from "@ubloimmo/front-util";
import type { AnyFn } from "./global.types";
import type { Definition } from "./definition.types";

/**
 * Utility type that converts any function in a {@link Definition} to its async counterpart
 */
export interface HarnessFn<TFn extends AnyFn> {
  (...args: Parameters<TFn>): Promise<Awaited<ReturnType<TFn>>>;
}

/**
 * A generic object containing async functons, derived from a {@link Definition} object
 */
export type Harness<TDefinition extends Definition> = {
  readonly [key in keyof TDefinition]: TDefinition[key] extends AnyFn
    ? HarnessFn<TDefinition[key]>
    : TDefinition[key] extends Definition
    ? Harness<TDefinition[key]>
    : never;
};

/**
 * Any key — nested or not — in a harness that points to a function
 */
export type HarnessKey<TDefinition extends Definition> = DeepKeyOfType<
  Harness<TDefinition>,
  AnyFn
>;

/**
 * Utility type used to get a {@link Harness}'s function using its {@link HarnessKey}
 */
export type HarnessFnReference<
  TDefinition extends Definition,
  TKey extends HarnessKey<TDefinition>
> = HarnessFn<AnyFn> & DeepValueOf<Harness<TDefinition>, TKey>;
