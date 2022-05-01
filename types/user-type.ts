import { OptionalNullable } from "./utility-types";

export type User = {
  name: OptionalNullable<string>;
  email: OptionalNullable<string>;
  image: OptionalNullable<string>;
};
