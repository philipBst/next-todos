export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type OptionalNullable<T> = T | null | undefined;

export type UnArray<T> = T extends Array<infer U> ? U : never;

export type EmptyArray<T> = T extends UnArray<T>
  ? T extends { length: 0 }
    ? T
    : never
  : never;
