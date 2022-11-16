import { CssProperties } from "./types";

/**
 * Formats the value, skipping empty results on multiple level, as well as allowing a custom transformer
 * @param propName name of the property
 * @param value the passed value
 * @param valueTransform a function to actually transform the input to a particular string
 */
export const createValue = <PropName extends keyof CssProperties, TValue = CssProperties[PropName]>(
  propName: PropName,
  value: TValue | undefined,
  valueTransform: (value: TValue) => CssProperties[PropName] = value => value as unknown as CssProperties[PropName],
): CssProperties => {
  if (value == null) {
    return {};
  }

  const transformedValue = valueTransform(value);

  if (transformedValue == null) {
    return {};
  }

  return {
    [propName]: transformedValue,
  };
};
