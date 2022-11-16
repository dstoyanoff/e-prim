/**
 * Takes either a single element or an array and always returns an array of one or many elements
 * @param items input items of generic type
 */
export const singleOrMulti = <T>(items: T | T[]): T[] => (Array.isArray(items) ? items : [items]);

type ArrayLengthMutationKeys = "splice" | "push" | "pop" | "shift" | "unshift";

export type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
  TObj,
  Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
  readonly length: L;
  [I: number]: T;
  [Symbol.iterator]: () => IterableIterator<T>;
};
