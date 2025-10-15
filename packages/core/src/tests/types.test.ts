import {
  Definition,
  DefinitionSubset,
  DefinitionSubsetKey,
  Harness,
  HarnessKey,
  HarnessSubset,
} from "@types";
import { Nullish } from "@ubloimmo/front-util";

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

type TestDefinition = PrimitiveFns & {
  nested: PrimitiveFns & {
    nestedNullish: NullishPrimitiveFns;
  };
};

const _testDefinition: TestDefinition = {
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
};

type DefinitionSubsetKeys<TDefinition extends Definition> = {
  [TKey in DefinitionSubsetKey<TDefinition>]: true;
};

const _definitionsubsetKeys: DefinitionSubsetKeys<TestDefinition> = {
  nested: true,
  "nested.nestedNullish": true,
};

const _nestedDefinitionSubsetKeys: DefinitionSubsetKey<
  DefinitionSubset<TestDefinition, "nested">
> = "nestedNullish";

const _definitionNestedSubset: DefinitionSubset<TestDefinition, "nested"> =
  _testDefinition.nested;

const _definitionNestedNullishSubset: DefinitionSubset<
  DefinitionSubset<TestDefinition, "nested">,
  "nestedNullish"
> = _testDefinition.nested.nestedNullish;

type TestHarness = Harness<TestDefinition>;

type HarnessFnKeys<TDefinition extends Definition> = {
  [TKey in HarnessKey<TDefinition>]: true;
};

const _keys: HarnessFnKeys<TestDefinition> = {
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
};

const _testHarness: TestHarness = {
  voidFn: async () => {},
  booleanFn: async () => true,
  numberFn: async () => 0,
  objectFn: async () => ({}),
  stringFn: async () => "",
  anyFn: async () => null,
  unknownFn: async () => undefined,
  nested: {
    voidFn: async () => {},
    booleanFn: async () => true,
    numberFn: async () => 0,
    objectFn: async () => ({}),
    stringFn: async () => "",
    anyFn: async () => null,
    unknownFn: async () => undefined,
    nestedNullish: {
      voidFn: async () => null,
      booleanFn: async () => null,
      numberFn: async () => undefined,
      objectFn: async () => null,
      stringFn: async () => undefined,
      anyFn: async () => null,
      unknownFn: async () => undefined,
    },
  },
};

const _nestedSubset: HarnessSubset<TestDefinition, "nested"> =
  _testHarness.nested;

const _nestedNullishSubset: HarnessSubset<
  TestDefinition,
  "nested.nestedNullish"
> &
  HarnessSubset<DefinitionSubset<TestDefinition, "nested">, "nestedNullish"> =
  _testHarness.nested.nestedNullish;
