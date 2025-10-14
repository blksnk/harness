import {
  definitionToHarness,
  normalizeDefinition,
  validateDefinition,
} from "@utils";
import type { Definition, DefinitionOrInitializer, Harness } from "@types";

export function harnessSetup<TDefinition extends Definition>(
  definitionOrInitializer: DefinitionOrInitializer<TDefinition>
): Harness<TDefinition> {
  const definition = normalizeDefinition(definitionOrInitializer);
  const validated = validateDefinition<TDefinition>(definition);
  return definitionToHarness(validated);
}
