import { CSSObject } from "@emotion/react";
import { ResponsiveValue } from "../system/types";

/**
 * Combines an array of styles in a way that breakpoint objects are merged together
 * @param values list of styles to combine
 */
export const combineResponsiveValues = <T>(...values: ResponsiveValue<T>[]): CSSObject => {
  return values.reduce<CSSObject>((acc, value) => {
    Object.entries(value as object).forEach(([prop, propValue]) => {
      const isNewObject = propValue && typeof propValue === "object";

      if (!isNewObject) {
        // that's the simple case without breakpoints, where the value is always 1-level deep
        acc[prop] = propValue;
        return acc;
      }

      // if there are already values for the breakpoint, we try to merge
      // otherwise we just put the new one
      acc[prop] = acc[prop] ? { ...(acc[prop] as object), ...propValue } : propValue;
    });

    return acc;
  }, {});
};
