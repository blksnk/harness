import { HarnessConsumer } from "../index";
import { definitionToHarness } from "@libharness/core";

type User = {
  id: string;
  email: string;
  userName: string;
};

type Result<TData, TError extends Error = Error> =
  | {
      data: TData;
      error?: never;
    }
  | {
      data?: never;
      error: TError;
    };

type Def = {
  login: (email: string, password: string) => Result<User>;
  flags: {
    rentVariations: () => boolean;
    nested: {
      hello: () => boolean;
      withArgs: (arg1: boolean, arg2: string | number) => void;
    };
  };
};

const def: Def = {
  login: (_email, _password) => ({ error: new Error() }),
  flags: {
    rentVariations: () => true,
    nested: {
      hello: () => false,
      withArgs: (_arg1, _arg2) => {},
    },
  },
};

const harness = definitionToHarness<Def>(def);

const C = new HarnessConsumer<Def>(harness);

C.call("flags.nested.withArgs", true, "");
C.call("login", "email", "password");
const CS = C.subset("flags");
CS.call("rentVariations");
C.subset("flags").subset("nested").call("withArgs", true, "string");
const _hello = C.subset("flags").subset("nested").reference("hello");
const login = C.reference("login");

login("email", "pwd");
