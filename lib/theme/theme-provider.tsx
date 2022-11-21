import { PropsWithChildren } from "react";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { transparentColor, mediaDown, mediaUp, spacing, colorByKey } from "@/system/theme-functions";
import { BaseTheme, PaletteKey, SpacingUnit, TBreakpoint, ThemeConfig, TPalette } from "./types";

export type ThemeProviderProps<TTheme extends ThemeConfig> = {
  theme: TTheme;
};

export const makeTheme = <TTheme extends ThemeConfig>(config: TTheme) => ({
  ...config,
  mediaDown: (breakpoint: keyof TBreakpoint) => mediaDown(breakpoint, config.breakpoint),
  mediaUp: (breakpoint: keyof TBreakpoint) => mediaUp(breakpoint, config.breakpoint),
  spacing: (...values: SpacingUnit[]) => spacing(config.spacing, ...values),
  transparentColor: (key: PaletteKey | undefined, opacity: number) =>
    transparentColor(key, opacity, config.palette as TPalette),
  colorByKey: (key: PaletteKey | undefined) => colorByKey(key, config.palette as TPalette),
  spacingValue: config.spacing,
});

export function ThemeProvider<TTheme extends ThemeConfig>({
  children,
  theme,
}: PropsWithChildren<ThemeProviderProps<TTheme>>) {
  return <EmotionThemeProvider theme={makeTheme(theme) as unknown as BaseTheme}>{children}</EmotionThemeProvider>;
}
