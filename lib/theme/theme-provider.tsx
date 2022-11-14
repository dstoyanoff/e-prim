import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { PropsWithChildren } from "react";
import { BaseTheme, ThemeConfig } from "./types";

export type ThemeProviderProps<TTheme extends ThemeConfig> = {
  mode?: "dark" | "light";
  theme: TTheme | { dark: TTheme; light: TTheme };
};

export function ThemeProvider<TTheme extends ThemeConfig>({
  children,
  theme,
  mode,
}: PropsWithChildren<ThemeProviderProps<TTheme>>) {
  // TODO: add automatic theme detector
  if ("dark" in theme) {
    return null;
  }

  const themeEnriched: BaseTheme = {
    ...theme,
    mediaDown: breakpoint => `@media (max-width: ${theme.breakpoint[breakpoint]}px)`,
    mediaUp: breakpoint => `@media (min-width: ${theme.breakpoint[breakpoint]}px)`,
    spacing: (...values) =>
      values.map(item => (typeof item === "string" ? item : `${item * theme.spacing}px`)).join(" "),
    spacingValue: theme.spacing,
  };

  return <EmotionThemeProvider theme={themeEnriched}>{children}</EmotionThemeProvider>;
}
