import { harnessSetup } from "@/setup";
import type { Definition, HarnessSetupFn } from "@/types";

export function harnessFactory<
  TDefinition extends Definition
>(): HarnessSetupFn<TDefinition> {
  return harnessSetup<TDefinition>;
}
