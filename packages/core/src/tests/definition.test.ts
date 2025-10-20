import {
  definitionSubset,
  isDefinition,
  normalizeDefinition,
  validateDefinition,
} from "../utils";
import { describe, expect, it, mock } from "bun:test";
import { testDefinition } from "./test.values";

describe("definition", () => {
  describe("normalization", () => {
    it("should return the definition as-is", () => {
      expect(() => normalizeDefinition(testDefinition)).not.toThrow();
      expect(normalizeDefinition(testDefinition)).toEqual(testDefinition);
    });

    it("sould run the initializer and return the definition", () => {
      const mockInitializer = mock(() => testDefinition);
      expect(normalizeDefinition(mockInitializer)).toEqual(testDefinition);
      expect(mockInitializer).toHaveBeenCalled();
    });
  });

  describe("validation", () => {
    it("should ensure a valid definition is valid", () => {
      expect(() => isDefinition(testDefinition)).not.toThrow();
      expect(isDefinition(testDefinition)).toBeTrue();
    });
    it("should validate a definition", () => {
      expect(() => validateDefinition(testDefinition)).not.toThrow();
      expect(validateDefinition(testDefinition)).toEqual(testDefinition);
    });
  });

  describe("subset", () => {
    it("should return a valid definition subset", () => {
      expect(() => definitionSubset(testDefinition, "nested")).not.toThrow();
      expect(definitionSubset(testDefinition, "nested")).toEqual(
        testDefinition.nested
      );
    });
    it("should be chainable", () => {
      expect(() =>
        definitionSubset(
          definitionSubset(testDefinition, "nested"),
          "nestedNullish"
        )
      ).not.toThrow();
      expect(
        definitionSubset(
          definitionSubset(testDefinition, "nested"),
          "nestedNullish"
        )
      ).toEqual(testDefinition.nested.nestedNullish);
    });
  });
});
