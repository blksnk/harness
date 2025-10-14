import type { AnyFn } from "./global.types";

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
