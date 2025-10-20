import type { AnyFn, StringKeyOf } from "./global.types";

/**
 * The base shape of a harness. An object that may have nested definitions or functions as values.
 */
export interface Definition {
  readonly [key: string]: Definition | AnyFn;
}

/**
 * A function that returns a definition. Useful if one needs to run conditional logic.
 */
export interface DefinitionInitializer<TDefinition extends Definition> {
  (): TDefinition;
}

/**
 * Either a {@link Definition} or a {@link DefinitionInitializer} function that returns it.
 */
export type DefinitionOrInitializer<TDefinition extends Definition> =
  | TDefinition
  | DefinitionInitializer<TDefinition>;

/**
 * Any key - nested or not - in a {@link Definition} that points to a function
 */
export type DefinitionFnKey<TDefinition extends Definition> = {
  [K in StringKeyOf<TDefinition>]: TDefinition[K] extends infer DefinitionOrFn
    ? DefinitionOrFn extends AnyFn
      ? K
      : DefinitionOrFn extends Definition
      ? `${K}.${DefinitionFnKey<DefinitionOrFn>}`
      : never
    : never;
}[StringKeyOf<TDefinition>];

/**
 * Utility types that returns a function in a {@link Definition} using its key
 */
export type DefinitionFnReference<
  TDefinition extends Definition,
  TKey extends DefinitionFnKey<TDefinition>
> = TKey extends StringKeyOf<TDefinition>
  ? TDefinition[TKey] extends infer TFn
    ? TFn extends AnyFn
      ? TFn
      : never
    : never
  : TKey extends `${infer THead}.${infer TTail}`
  ? THead extends StringKeyOf<TDefinition>
    ? TDefinition[THead] extends infer SubDef
      ? SubDef extends Definition
        ? TTail extends DefinitionFnKey<SubDef>
          ? DefinitionFnReference<SubDef, TTail>
          : never
        : never
      : never
    : never
  : never;
