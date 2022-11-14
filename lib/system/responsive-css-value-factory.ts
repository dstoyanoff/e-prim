import { CSSObject } from "@emotion/react";
import { BaseTheme, TBreakpoint } from "../theme/types";
import { isResponsiveValue } from "../utils/is-responsive-value";
import { ResponsiveValue } from "./types";

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
  <PropName extends keyof CSSObject, TValue>(
    propName: PropName,
    value: ResponsiveValue<CSSObject[PropName]> | ResponsiveValue<TValue> | undefined,
    valueTransform: (
      value: ResponsiveValue<CSSObject[PropName]> | ResponsiveValue<TValue>
    ) => ResponsiveValue<CSSObject[PropName]> = value => value as ResponsiveValue<CSSObject[PropName]>
  ): CSSObject => {
    if (value == null) {
      return {};
    }

    if (!isResponsiveValue(value as ResponsiveValue<unknown>, theme.breakpoint)) {
      const transformedValue = valueTransform(value);

      return {
        ...(transformedValue != null && {
          [propName]: transformedValue,
        }),
      };
    }

    const { mediaUp } = theme;

    return Object.entries(value as object).reduce((acc, [key, breakpointValue]) => {
      const breakpoint = key as keyof TBreakpoint;
      const mediaQuery = mediaUp(breakpoint);

      acc[mediaQuery] = acc[mediaQuery] ?? {};

      const transformedBreakpointValue = valueTransform(breakpointValue);

      if (transformedBreakpointValue) {
        acc[mediaQuery][propName] = transformedBreakpointValue;
      }

      return acc;
    }, {} as Record<any, any>);
  };
