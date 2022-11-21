export type PathsToStringProps<T, TStopType = string> = T extends TStopType
  ? []
  : {
      [K in Extract<keyof T, string | number>]: [K, ...PathsToStringProps<T[K], TStopType>];
    }[Extract<keyof T, string | number>];

export type Join<T extends (string | number)[], D extends string = "."> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer R]
  ? F extends string | number
    ? `${F}${D}${Join<Extract<R, (string | number)[]>, D>}`
    : never
  : string | number;

/**
 * Given a color key (dot-based deep path), resolves the actual color value
 * @param key dot-based path
 * @param object reference to the main object that should be used to find the value
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const getValueFromKey = <TValue, TKey extends string = string, TObject = {}>(
  key: TKey | undefined,
  object: TObject,
): TValue | undefined => {
  if (!key) {
    return undefined;
  }

  const paths = key.split(".");

  return paths.reduce((accumulator, path) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return accumulator ? accumulator[path] : (object as any)[path];
  }, undefined);
};
