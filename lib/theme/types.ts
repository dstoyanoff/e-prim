import { safeColors } from "@/system/safe-colors";
import { CssProperties } from "@/system/types";
import { Join, PathsToStringProps } from "@/utils/dot-object";

export type TypographySpecs = {
  fontFamily?: CssProperties["fontFamily"];
  fontSize?: CssProperties["fontSize"];
  fontWeight?: CssProperties["fontWeight"];
  lineHeight?: CssProperties["lineHeight"];
  letterSpacing?: CssProperties["letterSpacing"];
};

export type SpacingUnit = string | number;

export interface TBreakpoint {}
export interface TPalette {}
export interface TRadius {}
export interface TShadow {}
export interface TZIndex {}
export interface TTypography {}

export interface TCustomProps {}

export type PaletteKey = Join<PathsToStringProps<TPalette>> | typeof safeColors[number];
export type TypographyKey = Join<PathsToStringProps<TTypography, TypographySpecs>> | "default";
export type ShadowKey = Join<PathsToStringProps<TShadow>>;

export interface BaseTheme extends TCustomProps {
  /**
   * The spacing value is used as a multiplier on all spacing-related properties.
   * It's purpose is to bring consistency in the design.
   * For example defining this spacing as 4 would use paddings as multipliers of 4 - 4, 8, 12, 16,
   * making the UI consistent as opposed to using a multiplier of 1, which allows inconsistent styles
   */
  spacingValue: number;

  /**
   * Breakpoints are crucial for the responsive design. In this property, we define the list of breakpoints as well as their pixel representation.
   * The keys will later be used to create a media query automatically
   */
  breakpoint: TBreakpoint;

  /**
   * Typography lists all variants of texts within the app.
   * This way, we define them once and only use them as a reference later on.
   * Typography can be nested in a hierarchy and later on used with a dot notation - e.g. body.1
   * The default property specifies the default styles of the typography.
   * All variants would inherit it's props and override the matching styles
   */
  typography: { default: TypographySpecs } & TTypography;

  /**
   * Defines a list of border radiuses that can be used in the app.
   * The keys of this object would be used as values to the radius property and automatically apply border-radius to the object
   */
  radius: TRadius;

  /**
   * Defines a list of shadows that can be used in the app.
   * The keys of this object would be used as values to the shadow property and automatically apply box-shadow to the object
   */
  shadow: TShadow;

  /**
   * List of z-indexes to be used within the app. Knowing your z-indexes globally can guard you from weird bugs.
   * Similarly to other props, the keys of this object will later be used as values of the zIndex prop
   */
  zIndex: TZIndex;

  /**
   * Color definition to use within the app. Can either be a flat object or nested (up to 3 levels currently).
   * Colors can then be used in all color-like props using a dot notation - e.g. background="primary.normal"
   */
  palette: TPalette;

  border?: {
    color?: PaletteKey;
    width?: number | string;
  };

  mediaDown: (breakpoint: keyof TBreakpoint) => string;
  mediaUp: (breakpoint: keyof TBreakpoint) => string;
  spacing: (...values: SpacingUnit[]) => string;
  transparentColor: (key: PaletteKey | undefined, opacity: number) => string | undefined;
  colorByKey: (key: PaletteKey | undefined) => string | undefined;
}

interface TypographyConfig {
  default: TypographySpecs;
  [index: string]: TypographySpecs | Omit<TypographyConfig, "default">;
}

interface ColorConfig {
  [index: string | number]: CssProperties["color"] | ColorConfig;
}

export type ThemeConfig = TCustomProps & {
  spacing: number;
  breakpoint: TBreakpoint;
  radius: TRadius;
  zIndex: TZIndex;
  palette: ColorConfig;
  typography: TypographyConfig;
  shadow: TShadow;
  border?: {
    color: PaletteKey;
    width: number | string;
  };
};

declare module "@emotion/react" {
  export interface Theme extends BaseTheme {}
}
