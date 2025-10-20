import { definitionToHarness, harnessSubset } from "../utils";
import { describe, expect, it, mock } from "bun:test";
import {
  TestDefinition,
  testDefinition,
  testDefinitionFnKeys,
  testHarness,
  testNestedHarnessSubset,
} from "./test.values";
import { AnyFn, Definition, Harness } from "../types";
import { isFunction, objectKeys } from "@ubloimmo/front-util/lib/functions";

describe("harness", () => {
  describe("generation", () => {
    it("should generate a harness from a definition", () => {
      expect(() => definitionToHarness(testDefinition)).not.toThrow();

      const validateHarness = <TDefinition extends Definition>(
        definition: TDefinition,
        harness: Harness<TDefinition>,
        prefix?: string
      ) => {
        const harnessKeys = Object.keys(harness);
        objectKeys(definition).forEach(
          <TKey extends keyof TDefinition>(key: TKey) => {
            const value = definition[key];
            const keyStr = key as string;
            const harnessKey = prefix ? `${prefix}.${keyStr}` : keyStr;
            if (isFunction<AnyFn>(value)) {
              expect(harnessKeys).toContain(harnessKey as keyof typeof harness);
              expect(
                harness[harnessKey as keyof typeof harness]
              ).toBeFunction();
            } else {
              expect(definition[key]).toBeObject();
              validateHarness(
                definition[key] as unknown as TDefinition,
                harness,
                harnessKey
              );
            }
          }
        );
      };
      const generated = definitionToHarness(testDefinition);
      validateHarness(testDefinition, generated);

      expect(generated).toMatchObject(testHarness);
    });

    it("should contain all function keys in the root definition", () => {
      expect(definitionToHarness(testHarness)).toContainAllKeys(
        objectKeys(testDefinitionFnKeys)
      );
    });
  });

  describe("function call", () => {
    it("should forward calls to its definition implementation", async () => {
      const mockFn = mock((n: number) => n * 2);
      const def = { nested: { fn: mockFn } };
      const harness = definitionToHarness(def);
      expect(harness).toContainKey("nested.fn");
      expect(harness["nested.fn"]).toBeFunction();
      expect(harness["nested.fn"]).not.toThrow();
      expect(await harness["nested.fn"](12)).toBe(24);
      expect(mockFn).toHaveBeenCalled();
    });
  });

  describe("subset", () => {
    it("should return a valid harness subset", () => {
      expect(() =>
        harnessSubset<TestDefinition>(testHarness, "nested")
      ).not.toThrow();
      expect(
        harnessSubset<TestDefinition>(testHarness, "nested")
      ).toMatchObject(testNestedHarnessSubset);
    });
  });
});
