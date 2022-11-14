import { ResponsiveValue } from "../system/types";
import { TBreakpoint } from "../theme";

/**
 * Check if the value is an object that contains either breakpoint
 */
export const isResponsiveValue = <T>(value: ResponsiveValue<T>, breakpoints: TBreakpoint) => {
  if (typeof value !== "object") {
    return false;
  }

  return Object.keys(breakpoints).some(breakpoint => value && breakpoint in value);
};
