import { Definition, DefinitionFnKey, Harness, HarnessSubset } from "@types";
import { Nullish } from "@ubloimmo/front-util/lib/types";

type PrimitiveFns = {
  voidFn: () => void;
  booleanFn: () => boolean;
  numberFn: () => number;
  objectFn: () => object;
  stringFn: () => string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  anyFn: () => any;
  unknownFn: () => unknown;
};

type NullishPrimitiveFns = {
  [TKey in keyof PrimitiveFns]: () => Nullish<ReturnType<PrimitiveFns[TKey]>>;
};

export type TestDefinition = PrimitiveFns & {
  nested: PrimitiveFns & {
    nestedNullish: NullishPrimitiveFns;
  };
  nested2: {
    nested2Fn: () => false;
  };
};

export const testDefinition: TestDefinition = {
  voidFn: () => {},
  booleanFn: () => true,
  numberFn: () => 0,
  objectFn: () => ({}),
  stringFn: () => "",
  anyFn: () => null,
  unknownFn: () => undefined,
  nested: {
    voidFn: () => {},
    booleanFn: () => true,
    numberFn: () => 0,
    objectFn: () => ({}),
    stringFn: () => "",
    anyFn: () => null,
    unknownFn: () => undefined,
    nestedNullish: {
      voidFn: () => null,
      booleanFn: () => null,
      numberFn: () => undefined,
      objectFn: () => null,
      stringFn: () => undefined,
      anyFn: () => null,
      unknownFn: () => undefined,
    },
  },
  nested2: {
    nested2Fn: () => false,
  },
};

export type TestHarness = Harness<TestDefinition>;

type DefinitionFnKeys<TDefinition extends Definition> = {
  [TKey in DefinitionFnKey<TDefinition>]: true;
};

export const testDefinitionFnKeys: DefinitionFnKeys<TestDefinition> = {
  voidFn: true,
  booleanFn: true,
  numberFn: true,
  objectFn: true,
  stringFn: true,
  anyFn: true,
  unknownFn: true,
  "nested.voidFn": true,
  "nested.booleanFn": true,
  "nested.numberFn": true,
  "nested.objectFn": true,
  "nested.stringFn": true,
  "nested.anyFn": true,
  "nested.unknownFn": true,
  "nested.nestedNullish.voidFn": true,
  "nested.nestedNullish.booleanFn": true,
  "nested.nestedNullish.numberFn": true,
  "nested.nestedNullish.objectFn": true,
  "nested.nestedNullish.stringFn": true,
  "nested.nestedNullish.anyFn": true,
  "nested.nestedNullish.unknownFn": true,
  "nested2.nested2Fn": true,
};

// const _subsetKey: HarnessSubsetKey<TestHarness> = "";

export const testHarness: TestHarness = {
  voidFn: async () => {},
  booleanFn: async () => true,
  numberFn: async () => 0,
  objectFn: async () => ({}),
  stringFn: async () => "",
  anyFn: async () => null,
  unknownFn: async () => undefined,
  "nested.voidFn": async () => {},
  "nested.booleanFn": async () => true,
  "nested.numberFn": async () => 0,
  "nested.objectFn": async () => ({}),
  "nested.stringFn": async () => "",
  "nested.anyFn": async () => null,
  "nested.unknownFn": async () => undefined,
  "nested.nestedNullish.voidFn": async () => {},
  "nested.nestedNullish.booleanFn": async () => true,
  "nested.nestedNullish.numberFn": async () => 0,
  "nested.nestedNullish.objectFn": async () => ({}),
  "nested.nestedNullish.stringFn": async () => "",
  "nested.nestedNullish.anyFn": async () => null,
  "nested.nestedNullish.unknownFn": async () => undefined,
  "nested2.nested2Fn": async () => false,
};

export const testNestedHarnessSubset: HarnessSubset<TestDefinition, "nested"> =
  {
    voidFn: async () => {},
    booleanFn: async () => true,
    numberFn: async () => 0,
    objectFn: async () => ({}),
    stringFn: async () => "",
    anyFn: async () => null,
    unknownFn: async () => undefined,
    "nestedNullish.voidFn": async () => {},
    "nestedNullish.booleanFn": async () => true,
    "nestedNullish.numberFn": async () => 0,
    "nestedNullish.objectFn": async () => ({}),
    "nestedNullish.stringFn": async () => "",
    "nestedNullish.anyFn": async () => null,
    "nestedNullish.unknownFn": async () => undefined,
  };
