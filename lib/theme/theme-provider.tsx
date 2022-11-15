import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { PropsWithChildren } from "react";
import { pxOrRaw } from "../utils/px-or-raw";
import { BaseTheme, ThemeConfig } from "./types";

export type ThemeProviderProps<TTheme extends ThemeConfig> = {
  theme: TTheme;
};

export function ThemeProvider<TTheme extends ThemeConfig>({
  children,
  theme,
}: PropsWithChildren<ThemeProviderProps<TTheme>>) {
  const themeEnriched: BaseTheme = {
    ...theme,
    mediaDown: breakpoint => `@media (max-width: ${theme.breakpoint[breakpoint]}px)`,
    mediaUp: breakpoint => `@media (min-width: ${theme.breakpoint[breakpoint]}px)`,
    spacing: (...values) => values.map(item => pxOrRaw(item, item => item * theme.spacing)).join(" "),
    spacingValue: theme.spacing,
  };

  return <EmotionThemeProvider theme={themeEnriched}>{children}</EmotionThemeProvider>;
}
