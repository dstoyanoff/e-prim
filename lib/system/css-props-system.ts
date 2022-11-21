import { BaseTheme, PaletteKey, ShadowKey, TRadius, TypographyKey, TZIndex } from "@/theme/types";
import { getValueFromKey } from "@/utils/dot-object";
import { pxOrRaw } from "@/utils/px-or-raw";
import { createValue } from "./create-value";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory } from "./responsive-css-value-factory";
import { colorByKey } from "./theme-functions";
import { CssProperties, ResponsiveValue } from "./types";
import { getTypographyStyles } from "./typography-system";

export const createCssProps = (props: CssPropsSystem, theme: BaseTheme): CssProperties[] => {
  const responsive = responsiveCssValueFactory(theme);
  const {
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    position,
    width,
    background,
    color,
    overflow,
    radius,
    border,
    borderBottom,
    borderLeft,
    borderRight,
    borderTop,
    cursor,
    grow,
    zIndex,
    typography,
    shadow,
  } = props;

  const colorTransformer = (value: PaletteKey) => colorByKey(value, theme.palette);
  const borderTransformer = (value: PaletteKey | boolean) => {
    const width = pxOrRaw(theme.border?.width ?? 1);
    const color = colorByKey(value === true ? theme.border?.color : (value as PaletteKey | undefined), theme.palette);

    return `${width} solid ${color}`;
  };

  return [
    responsive("position", position),
    responsive("minWidth", minWidth),
    responsive("width", width),
    responsive("maxWidth", maxWidth),
    responsive("minHeight", minHeight),
    responsive("height", height),
    responsive("maxHeight", maxHeight),
    responsive("borderRadius", radius, value => theme.radius[value]),

    createValue("color", color, colorTransformer),
    createValue("background", background, colorTransformer),
    responsive("boxShadow", shadow, value => getValueFromKey(value, theme.shadow)),

    createValue("border", border, borderTransformer),
    createValue("borderTop", borderTop, borderTransformer),
    createValue("borderRight", borderRight, borderTransformer),
    createValue("borderBottom", borderBottom, borderTransformer),
    createValue("borderLeft", borderLeft, borderTransformer),

    createValue("zIndex", zIndex, value => theme.zIndex[value as keyof TZIndex]),

    { cursor, overflow, ...(typography && getTypographyStyles(typography, theme.typography)) },

    responsive("flexGrow", grow),
  ];
};

export const cssPropsKeys = getAllPropKeys<CssPropsSystem>({
  background: true,
  border: true,
  borderBottom: true,
  borderLeft: true,
  borderRight: true,
  borderTop: true,
  color: true,
  cursor: true,
  grow: true,
  height: true,
  maxHeight: true,
  maxWidth: true,
  minHeight: true,
  minWidth: true,
  overflow: true,
  position: true,
  typography: true,
  width: true,
  zIndex: true,
  radius: true,
  shadow: true,
});

export type PositionProps = {
  position?: ResponsiveValue<CssProperties["position"]>;
  overflow?: CssProperties["overflow"];
};

export type SizeProps = {
  minWidth?: ResponsiveValue<CssProperties["minWidth"]>;
  width?: ResponsiveValue<CssProperties["width"]>;
  maxWidth?: ResponsiveValue<CssProperties["maxWidth"]>;
  minHeight?: ResponsiveValue<CssProperties["minHeight"]>;
  height?: ResponsiveValue<CssProperties["height"]>;
  maxHeight?: ResponsiveValue<CssProperties["maxHeight"]>;
  grow?: ResponsiveValue<CssProperties["flexGrow"]>;
};

export type ColorProps = {
  background?: PaletteKey;
  color?: PaletteKey;
  shadow?: ResponsiveValue<ShadowKey>;
};

export type BorderProps = {
  border?: PaletteKey | boolean;
  borderTop?: PaletteKey | boolean;
  borderRight?: PaletteKey | boolean;
  borderBottom?: PaletteKey | boolean;
  borderLeft?: PaletteKey | boolean;
  radius?: ResponsiveValue<keyof TRadius>;
};

export type CssPropsSystem = PositionProps &
  SizeProps &
  ColorProps &
  BorderProps & {
    cursor?: CssProperties["cursor"];
    zIndex?: keyof TZIndex;
    typography?: TypographyKey;
  };
