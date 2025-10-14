import type { DeepKeyOfType, DeepValueOf } from "@ubloimmo/front-util";
import type { AnyFn } from "./global.types";
import type { Definition } from "./definition.types";

export interface HarnessFn<TFn extends AnyFn> {
  (...args: Parameters<TFn>): Promise<Awaited<ReturnType<TFn>>>;
}

export type Harness<TDefinition extends Definition> = {
  readonly [key in keyof TDefinition]: TDefinition[key] extends AnyFn
    ? HarnessFn<TDefinition[key]>
    : TDefinition[key] extends Definition
    ? Harness<TDefinition[key]>
    : never;
};

export type HarnessKey<TDefinition extends Definition> = DeepKeyOfType<
  Harness<TDefinition>,
  AnyFn
>;

export type HarnessFnReference<
  TDefinition extends Definition,
  TKey extends HarnessKey<TDefinition>
> = HarnessFn<AnyFn> & DeepValueOf<Harness<TDefinition>, TKey>;
