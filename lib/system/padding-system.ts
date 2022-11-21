import { BaseTheme, SpacingUnit } from "@/theme/types";
import { singleOrMulti, FixedLengthArray } from "../utils/array-utils";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory, ValueTransformer } from "./responsive-css-value-factory";
import { CssProperties, ResponsiveValue } from "./types";

export const createPaddings = (props: PaddingSystem, theme: BaseTheme): CssProperties[] => {
  const { spacing } = theme;
  const { p, px, py, pt, pr, pb, pl } = props;

  const spacingTransformer: ValueTransformer<"padding", SpacingUnit | SpacingUnit[]> = value =>
    spacing(...singleOrMulti(value));

  const responsive = responsiveCssValueFactory(theme);

  return [
    responsive("padding", p as SpacingUnit | ResponsiveValue<SpacingUnit>, spacingTransformer),
    responsive("paddingTop", py, spacingTransformer),
    responsive("paddingTop", pt, spacingTransformer),
    responsive("paddingRight", px, spacingTransformer),
    responsive("paddingRight", pr, spacingTransformer),
    responsive("paddingBottom", py, spacingTransformer),
    responsive("paddingBottom", pb, spacingTransformer),
    responsive("paddingLeft", px, spacingTransformer),
    responsive("paddingLeft", pl, spacingTransformer),
  ];
};

export const paddingsPropKeys = getAllPropKeys<PaddingSystem>({
  p: true,
  px: true,
  py: true,
  pt: true,
  pr: true,
  pb: true,
  pl: true,
});

/**
 * Paddings exposes a set of props to add paddings to an element.
 * All values are either strings or units, where each unit is then internally multiplied by the theme's default spacing value.
 * Example: Consider the theme's spacing is configured to 4 and a component is rendered with p={1}, then it would add a 4px padding to all sides.
 * If a string is passed (e.g. % or vh, vw), it will be passed as is.
 */
export type PaddingSystem = {
  /**
   * Padding on all sites. An array adds padding to particular sides, just like in pure CSS
   * @example p={1} => padding: 4px
   * @example p={[1, 2]} => padding: 4px 8px
   * @example p={[1, 2, '10%']} => padding: 4px 8px 10%
   * @example p={[1, 2, '3vw', '10%']} => padding: 4px 8px 3vw 10%
   */
  p?: ResponsiveValue<
    SpacingUnit | FixedLengthArray<SpacingUnit, 2> | FixedLengthArray<SpacingUnit, 3> | FixedLengthArray<SpacingUnit, 4>
  >;

  /**
   * Padding on the x axis in units
   * @example px={1} => padding-left: 4px 4px;
   */
  px?: ResponsiveValue<SpacingUnit>;

  /**
   * Padding on the y axis
   * @example py={1} => padding-top: 4px 4px;
   */
  py?: ResponsiveValue<SpacingUnit>;

  /**
   * Padding on the top
   * @example pt={1} => padding-top: 4px;
   * @example pt="10%" => padding-top: 10%;
   */
  pt?: ResponsiveValue<SpacingUnit>;

  /**
   * Padding on the right
   * @example pr={1} => padding-right: 4px;
   * @example pr="10%" => padding-right: 10%;
   */
  pr?: ResponsiveValue<SpacingUnit>;

  /**
   * Padding on the bottom
   * @example pb={1} => padding-bottom: 4px;
   * @example pb="10%" => padding-bottom: 10%;
   */
  pb?: ResponsiveValue<SpacingUnit>;

  /**
   * Padding on the left
   * @example pl={1} => padding-left: 4px;
   * @example pl="10%" => padding-left: 10%;
   */
  pl?: ResponsiveValue<SpacingUnit>;
};
