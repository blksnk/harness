import {
  definitionToHarness,
  normalizeDefinition,
  validateDefinition,
} from "@libharness/core";
import type {
  Definition,
  DefinitionOrInitializer,
  Harness,
} from "@libharness/core";

/**
 * Normalizes, parses and validates a {@link Definition} before converting it to a {@link Harness}
 *
 * @template {Definition} TDefinition - The type of the harness' definition
 * @param {DefinitionOrInitializer<TDefinition>} definitionOrInitializer - Either a definition object or a function that returns one
 * @returns
 */
export function harnessSetup<TDefinition extends Definition>(
  definitionOrInitializer: DefinitionOrInitializer<TDefinition>
): Harness<TDefinition> {
  const definition = normalizeDefinition(definitionOrInitializer);
  const validated = validateDefinition<TDefinition>(definition);
  return definitionToHarness(validated);
}
