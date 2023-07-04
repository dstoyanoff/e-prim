import { BaseTheme, TBreakpoint } from "@/theme/types";
import { isResponsiveValue } from "@/utils/is-responsive-value";
import { createValue } from "./create-value";
import { CssProperties, ResponsiveValue } from "./types";

export type ValueTransformer<PropName extends keyof CssProperties, TValue = CssProperties[PropName]> = (
  value: TValue,
) => CssProperties[PropName];

/**
 * Creates a responsive value that can be passed as a normal property or a map of props per breakpoint
 * Factory pattern is used to pass the theme just once and not for every property
 * @param propName name of the property
 * @param value value - either single value or a map
 * @param theme reference to the theme
 * @param valueTransform a function to actually transform the input to a particular string
 * @returns an object, containing the property. Needs to be ...spread to the style object
 */
export const responsiveCssValueFactory =
  (theme: BaseTheme) =>
  <PropName extends keyof CssProperties, TValue = CssProperties[PropName]>(
    propName: PropName,
    value: ResponsiveValue<TValue> | undefined,
    valueTransform: ValueTransformer<PropName, TValue> = value => value as unknown as CssProperties[PropName],
  ): CssProperties => {
    if (value == null) {
      return {};
    }

    if (!isResponsiveValue(value as ResponsiveValue<TValue>, theme.breakpoint)) {
      return createValue(propName, value as TValue, valueTransform);
    }

    const { mediaUp } = theme;

    return Object.entries(value as object).reduce((acc, [key, breakpointValue]) => {
      const breakpoint = key as keyof TBreakpoint;
      const mediaQuery = mediaUp(breakpoint);

      const transformedBreakpointValue = valueTransform(breakpointValue);

      if (transformedBreakpointValue) {
        acc[mediaQuery] = {
          [propName]: transformedBreakpointValue,
        };
      }

      return acc;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as Record<string, any>);
  };
