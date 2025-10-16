import {
  Definition,
  DefinitionSubset,
  DefinitionSubsetKey,
  Harness,
  HarnessFnReference,
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
  nested2: {
    nested2Fn: () => false;
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
  nested2: {
    nested2Fn: () => false,
  },
};

type DefinitionSubsetKeys<TDefinition extends Definition> = {
  [TKey in DefinitionSubsetKey<TDefinition>]: true;
};

const _definitionsubsetKeys: DefinitionSubsetKeys<TestDefinition> = {
  nested: true,
  nested2: true,
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

type HarnessFnKeys<THarness extends Harness<Definition>> = {
  [TKey in HarnessKey<THarness>]: true;
};

const _keys: HarnessFnKeys<TestHarness> = {
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
  nested2: {
    nested2Fn: async () => false,
  },
};

type HarnessFnReferences<THarness extends Harness<Definition>> = {
  [TKey in HarnessKey<THarness>]: HarnessFnReference<THarness, TKey>;
};

const _fnReferences: HarnessFnReferences<TestHarness> = {
  voidFn: _testHarness.voidFn,
  booleanFn: _testHarness.booleanFn,
  numberFn: _testHarness.voidFn,
  objectFn: _testHarness.objectFn,
  stringFn: _testHarness.stringFn,
  anyFn: _testHarness.anyFn,
  unknownFn: _testHarness.unknownFn,
  "nested.voidFn": _testHarness.nested.voidFn,
  "nested.booleanFn": _testHarness.nested.booleanFn,
  "nested.numberFn": _testHarness.nested.numberFn,
  "nested.objectFn": _testHarness.nested.objectFn,
  "nested.stringFn": _testHarness.nested.stringFn,
  "nested.anyFn": _testHarness.nested.anyFn,
  "nested.unknownFn": _testHarness.nested.unknownFn,
  "nested.nestedNullish.voidFn": _testHarness.nested.nestedNullish.voidFn,
  "nested.nestedNullish.booleanFn": _testHarness.nested.nestedNullish.booleanFn,
  "nested.nestedNullish.numberFn": _testHarness.nested.nestedNullish.numberFn,
  "nested.nestedNullish.objectFn": _testHarness.nested.nestedNullish.objectFn,
  "nested.nestedNullish.stringFn": _testHarness.nested.nestedNullish.stringFn,
  "nested.nestedNullish.anyFn": _testHarness.nested.nestedNullish.anyFn,
  "nested.nestedNullish.unknownFn": _testHarness.nested.nestedNullish.unknownFn,
  "nested2.nested2Fn": _testHarness.nested2.nested2Fn,
};

const _nestedSubset: HarnessSubset<TestHarness, "nested"> = _testHarness.nested;

const _nestedNullishSubset: HarnessSubset<
  HarnessSubset<TestHarness, "nested">,
  "nestedNullish"
> = _testHarness.nested.nestedNullish;
