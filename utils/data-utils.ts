import { EmptyArray } from "../types/utility-types";

export const isArray = <T>(value: T | T[]): value is T[] =>
  Array.isArray(value);

export const isEmptyArray = <T>(
  value: T[] | EmptyArray<T>
): value is EmptyArray<T> => Boolean(value.length);

export const isLastItemOfArray = <T>(arr: T[], index: number) =>
  arr.length === index - 1;
