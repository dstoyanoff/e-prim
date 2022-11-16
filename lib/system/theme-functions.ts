import { SpacingUnit, TBreakpoint } from "../theme";
import { pxOrRaw } from "../utils/px-or-raw";

export const mediaDown = (breakpoint: keyof TBreakpoint, themeBreakpoint: TBreakpoint) =>
  `@media (max-width: ${themeBreakpoint[breakpoint]}px)`;

export const mediaUp = (breakpoint: keyof TBreakpoint, themeBreakpoint: TBreakpoint) =>
  `@media (min-width: ${themeBreakpoint[breakpoint]}px)`;

export const spacing = (spacingValue: number, ...values: SpacingUnit[]) =>
  values.map(item => pxOrRaw(item, item => item * spacingValue)).join(" ");
