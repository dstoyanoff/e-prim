import { mockThemeConfig } from "./utils/mock-theme";

type Breakpoint = typeof mockThemeConfig.breakpoint;
type Typography = typeof mockThemeConfig.typography;
type ZIndex = typeof mockThemeConfig.zIndex;
type Palette = typeof mockThemeConfig.palette;
type Radius = typeof mockThemeConfig.radius;

type CustomProps = Omit<
  typeof mockThemeConfig,
  "breakpoint" | "spacing" | "palette" | "radius" | "zIndex" | "typography" | "border"
>;

declare module "./theme/types" {
  export interface TBreakpoint extends Breakpoint {}
  export interface TPalette extends Palette {}
  export interface TRadius extends Radius {}
  export interface TZIndex extends ZIndex {}
  export interface TTypography extends Typography {}
  export interface TCustomProps extends CustomProps {}
}
