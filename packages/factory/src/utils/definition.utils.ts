import { HarnessInternalError, HarnessValidationError } from "@errors";
import type {
  AnyFn,
  Definition,
  DefinitionInitializer,
  DefinitionOrInitializer,
  Harness,
} from "@types";
import {
  isArray,
  isFunction,
  isObject,
  isString,
  transformObject,
} from "@ubloimmo/front-util";

/**
 * Checks if a given value is a valid {@link Definition} object.
 *
 * A Definition is an object whose values are either functions or nested Definition objects.
 * This function recursively validates the structure of the provided value.
 *
 * @template TDefinition - The Definition type to check against.
 * @param {unknown} value - The value to check.
 * @param {string} [parentKey] - The parent key for nested validation (used solely internally for error reporting).
 * @returns {value is TDefinition} - Returns true if the value is a valid Definition, throws otherwise.
 */
export function isDefinition<TDefinition extends Definition>(
  value: unknown,
  parentKey?: string
): value is TDefinition {
  // logger setup for error reporting
  let currentKey = parentKey;
  // data structure validation
  if (!isObject(value))
    throw new HarnessValidationError(
      `Expected an object but got "${value}"`,
      currentKey
    );
  if (isArray(value))
    throw new HarnessValidationError(
      "Expected a string object but got an array",
      currentKey
    );

  // try getting entries
  let entries: [string, unknown][];
  try {
    entries = Object.entries(value);
  } catch (err) {
    throw new HarnessInternalError(
      err,
      "Error while calling Object.entries() on provided value, see above"
    );
  }
  // nested entries validation
  return entries.every(([key, value]) => {
    currentKey = isString(parentKey) ? `${parentKey}.${key}` : key;
    // ensure key is a string
    if (!isString(key))
      throw new HarnessValidationError(
        "Array indices are not supported as definition keys",
        currentKey
      );
    // only accept functions or non-array objects as values
    if (isFunction<AnyFn>(value)) return true;
    if (!isObject(value) || isArray(value))
      throw new HarnessValidationError(
        "Only non-array objects and functions are supported as defintion values",
        currentKey
      );
    // recursively check if the value is a definition
    return isDefinition<TDefinition>(value, currentKey);
  });
}

/**
 * Gets a definition directly or via its initializer, without validating it.
 * @param definitionOrInitializer - The definition or initializer to normalize.
 * @returns The normalized definition.
 */
export function normalizeDefinition<TDefinition extends Definition>(
  definitionOrInitializer: DefinitionOrInitializer<TDefinition>
): TDefinition {
  if (isFunction<DefinitionInitializer<TDefinition>>(definitionOrInitializer)) {
    return definitionOrInitializer();
  }
  return definitionOrInitializer;
}

/**
 * Validates a definition object.
 * @param definitionOrInitializer - The definition or initializer to normalize.
 * @returns The normalized definition.
 */
export function validateDefinition<TDefinition extends Definition>(
  definition: TDefinition | unknown
): TDefinition {
  if (!isDefinition<TDefinition>(definition)) {
    throw new HarnessValidationError(
      "Provided definition is not valid, see above errors."
    );
  }
  return definition;
}

/**
 * Recursively transforms a definition object into a harness object.
 *
 * For each function in the definition, wraps it in an async function that preserves its signature and return type.
 * For nested definition objects, recursively applies the transformation.
 *
 * @template TDefinition - The type of the definition object.
 * @param definition - The definition object to transform.
 * @returns The harness object with all functions wrapped as async and nested definitions transformed.
 */
export function definitionToHarness<TDefinition extends Definition>(
  definition: TDefinition
): Harness<TDefinition> {
  return transformObject(definition, (value) => {
    if (isFunction<AnyFn>(value)) {
      return async function (...args: Parameters<typeof value>) {
        return await value(...args);
      };
    }
    return definitionToHarness(value);
  }) as Harness<TDefinition>;
}
