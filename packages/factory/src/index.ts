import type { Definition, HarnessSetupFn } from "@libharness/core";
import { harnessSetup } from "@libharness/setup";

export function harnessFactory<
  TDefinition extends Definition
>(): HarnessSetupFn<TDefinition> {
  return harnessSetup<TDefinition>;
}
