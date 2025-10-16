import { HarnessConsumer } from "@";
import { Harness } from "@libharness/core";

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

type Har = Harness<Def>;

const harness: Har = {
  login: async (_email, _password) => ({ error: new Error() }),
  flags: {
    rentVariations: async () => true,
    nested: {
      hello: async () => false,
      withArgs: async (_arg1, _arg2) => {},
    },
  },
};

const C = new HarnessConsumer(harness);
const S = new HarnessConsumer(harness.flags);

C.call("flags.nested.withArgs", true, "");
S.call("nested.hello");
C.subset("flags").subset("nested").call("hello");
S.call("rentVariations");
C.call("login", "email", "password");
const CS = C.subset("flags");
CS.call("rentVariations");
