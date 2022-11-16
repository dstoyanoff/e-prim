import { CssProperties, ResponsiveValue } from "../system/types";

/**
 * Every style can currently produce an object that contains the same key when using responsive values (media-queries)
 * This function takes all styles and merges the media queries so that all props are rendered for a given query.
 * Example of input and output can be seen in the tests
 * @param values list of styles to combine
 */
export const combineResponsiveValues = <T>(...values: ResponsiveValue<T>[]): CssProperties => {
  return values.reduce<Partial<Record<keyof CssProperties, unknown>>>((acc, value) => {
    Object.entries(value as object).forEach(([prop, propValue]) => {
      const isNewObject = !!propValue && typeof propValue === "object";

      const property = prop as keyof CssProperties;

      if (!isNewObject) {
        // that's the simple case without breakpoints, where the value is always 1-level deep
        acc[property] = propValue;
        return acc;
      }

      // if there are already values for the breakpoint, we try to merge
      // otherwise we just put the new one
      acc[property] = acc[property] ? { ...(acc[property] as object), ...propValue } : propValue;
    });

    return acc;
  }, {}) as CssProperties;
};
