import type { Definition, Harness } from "@types";
import { isDefinition } from "./definition.utils";
import { Predicate } from "@ubloimmo/front-util/lib/types";

/**
 * Checks if a given value is a valid {@link Harness} object.
 *
 * A Definition is an object whose values are either functions or nested Definition objects.
 * This function recursively validates the structure of the provided value.
 *
 * @template TDefinition - The Definition type to check against.
 * @param {unknown} value - The value to check.
 * @returns {value is TDefinition} - Returns true if the value is a valid Harness, throws otherwise.
 */
export function isHarness<TDefinition extends Definition>(
  value: unknown
): value is Harness<TDefinition> {
  const predicate = isDefinition as Predicate<Harness<TDefinition>>;
  return predicate(value);
}
