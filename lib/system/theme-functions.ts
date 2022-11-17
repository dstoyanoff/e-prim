import { PaletteKey, SpacingUnit, TBreakpoint, TPalette } from "../theme";
import { percentToHex } from "../utils/color-utils";
import { getValueFromKey } from "../utils/dot-object";
import { pxOrRaw } from "../utils/px-or-raw";

const REGEX_RGB = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
const REGEX_HSL = /hsl\((\d+), (\d+)%, (\d+)%\)/;

export const mediaDown = (breakpoint: keyof TBreakpoint, themeBreakpoint: TBreakpoint) =>
  `@media (max-width: ${themeBreakpoint[breakpoint]}px)`;

export const mediaUp = (breakpoint: keyof TBreakpoint, themeBreakpoint: TBreakpoint) =>
  `@media (min-width: ${themeBreakpoint[breakpoint]}px)`;

export const spacing = (spacingValue: number, ...values: SpacingUnit[]) =>
  values.map(item => pxOrRaw(item, item => item * spacingValue)).join(" ");

export const colorByKey = (key: PaletteKey | undefined, palette: TPalette) => {
  const color = getValueFromKey<string>(key, palette);
  if (!color) {
    console.warn(`Could not find color by key ${key}`);
    return;
  }

  return color;
};

export const transparentColor = (key: PaletteKey, opacity: number, palette: TPalette) => {
  const color = colorByKey(key, palette);

  if (!color) {
    return;
  }

  if (color.startsWith("#")) {
    return `${color}${percentToHex(opacity)}`;
  }

  if (color.startsWith("rgb")) {
    const matches = REGEX_RGB.exec(color);

    if (!matches) {
      console.warn(`Could not parse color ${color} as a valid rgb color`);
      return color;
    }

    return `rgba(${matches[1]}, ${matches[2]}, ${matches[3]}, ${opacity / 100})`;
  }

  if (color.startsWith("hsl")) {
    const matches = REGEX_HSL.exec(color);

    if (!matches) {
      console.warn(`Could not parse color ${color} as a valid hsl color`);
      return color;
    }

    return `hsla(${matches[1]}, ${matches[2]}%, ${matches[3]}%, ${opacity / 100})`;
  }

  console.warn(`Color ${color} was not recognized as any valid type of color`);
  return color;
};
