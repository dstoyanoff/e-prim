import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { PropsWithChildren } from "react";
import { mediaDown, mediaUp, spacing } from "../system/theme-functions";
import { BaseTheme, SpacingUnit, TBreakpoint, ThemeConfig } from "./types";

export type ThemeProviderProps<TTheme extends ThemeConfig> = {
  theme: TTheme;
};

export const makeTheme = <TTheme extends ThemeConfig>(config: TTheme) => ({
  ...config,
  mediaDown: (breakpoint: keyof TBreakpoint) => mediaDown(breakpoint, config.breakpoint),
  mediaUp: (breakpoint: keyof TBreakpoint) => mediaUp(breakpoint, config.breakpoint),
  spacing: (...values: SpacingUnit[]) => spacing(config.spacing, ...values),
  spacingValue: config.spacing,
});

export function ThemeProvider<TTheme extends ThemeConfig>({
  children,
  theme,
}: PropsWithChildren<ThemeProviderProps<TTheme>>) {
  return <EmotionThemeProvider theme={makeTheme(theme) as unknown as BaseTheme}>{children}</EmotionThemeProvider>;
}
