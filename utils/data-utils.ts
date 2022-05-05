import { EmptyArray } from "../types/utility-types";

export function isArray<T>(value: T | T[]): value is T[] {
  return Array.isArray(value);
}

export function isEmptyArray<T>(
  value: T[] | EmptyArray<T>
): value is EmptyArray<T> {
  return Boolean(value.length);
}

export function isLastItemOfArray<T>(arr: T[], index: number): boolean {
  return arr.length === index - 1;
}

export function not<T>(value: T | boolean): value is boolean {
  return !value;
}
