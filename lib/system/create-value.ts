import { CSSObject } from "@emotion/react";
import { CSSProperties } from "react";

/**
 * Formats the value, skipping empty results on multiple level, as well as allowing a custom transformer
 * @param propName name of the property
 * @param value the passed value
 * @param valueTransform a function to actually transform the input to a particular string
 */
export const createValue = <PropName extends keyof CSSProperties, TValue>(
  propName: PropName,
  value: TValue | undefined,
  valueTransform: (value: TValue) => CSSObject[PropName] = (value: TValue) => value as never
): CSSObject => {
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
