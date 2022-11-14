import { CSSObject } from "@emotion/react";
import { BaseTheme, PaletteKey, TRadius, TypographyKey, TZIndex } from "../theme/types";
import { getValueFromKey } from "../utils/dot-object";
import { createValue } from "./create-value";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory } from "./responsive-css-value-factory";
import { ResponsiveValue } from "./types";
import { getTypographyStyles } from "./typography-system";

export const createCssProps = (props: CssPropsSystem, theme: BaseTheme): CSSObject[] => {
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
  } = props;

  const colorTransformer = (value: PaletteKey) => getValueFromKey<string>(value, theme.palette);
  const borderTransformer = (value: PaletteKey | boolean) =>
    value ? `1px solid ${getValueFromKey(value === true ? theme.defaultBorder : value, theme.palette)}` : undefined;

  return [
    responsive("position", position),
    responsive("minWidth", minWidth),
    responsive("width", width),
    responsive("maxWidth", maxWidth),
    responsive("minHeight", minHeight),
    responsive("height", height),
    responsive("maxHeight", maxHeight),
    responsive("borderRadius", radius, value => theme.radius[value as keyof TRadius]),

    createValue("color", color, colorTransformer),
    createValue("background", background, colorTransformer),

    createValue("border", border, borderTransformer),
    createValue("borderTop", borderTop, borderTransformer),
    createValue("borderRight", borderRight, borderTransformer),
    createValue("borderBottom", borderBottom, borderTransformer),
    createValue("borderLeft", borderLeft, borderTransformer),

    createValue("zIndex", zIndex, value => theme.zIndex[value as keyof TZIndex]),

    { cursor, overflow, ...getTypographyStyles(typography, theme.typography) },

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
});

export type PositionProps = {
  position?: ResponsiveValue<CSSObject["position"]>;
  overflow?: CSSObject["overflow"];
};

export type SizeProps = {
  minWidth?: ResponsiveValue<CSSObject["minWidth"]>;
  width?: ResponsiveValue<CSSObject["width"]>;
  maxWidth?: ResponsiveValue<CSSObject["maxWidth"]>;
  minHeight?: ResponsiveValue<CSSObject["minHeight"]>;
  height?: ResponsiveValue<CSSObject["height"]>;
  maxHeight?: ResponsiveValue<CSSObject["maxHeight"]>;
  grow?: ResponsiveValue<CSSObject["flexGrow"]>;
};

export type ColorProps = {
  background?: PaletteKey;
  color?: PaletteKey;
};

export type BorderProps = {
  border?: PaletteKey | boolean;
  borderTop?: PaletteKey | boolean;
  borderRight?: PaletteKey | boolean;
  borderBottom?: PaletteKey | boolean;
  borderLeft?: PaletteKey | boolean;
  radius?: ResponsiveValue<TRadius>;
};

export type CssPropsSystem = PositionProps &
  SizeProps &
  ColorProps &
  BorderProps & {
    cursor?: CSSObject["cursor"];
    zIndex?: keyof TZIndex;
    typography?: TypographyKey;
  };
