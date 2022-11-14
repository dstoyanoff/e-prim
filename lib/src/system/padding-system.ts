import { CSSObject } from "@emotion/react";
import { BaseTheme, SpacingUnit } from "../theme/types";
import { FixedLengthArray } from "../utils/fixed-length-array";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory } from "./responsive-css-value-factory";
import { ResponsiveValue } from "./types";

export const createPaddings = (props: PaddingSystem, theme: BaseTheme): CSSObject[] => {
  const { spacing } = theme;
  const { p, px, py, pt, pr, pb, pl } = props;

  const responsive = responsiveCssValueFactory(theme);

  return [
    responsive("padding", p, v => spacing(...((Array.isArray(v) ? v : [v]) as SpacingUnit[]))),
    responsive("paddingTop", pt ?? py, value => spacing(value as SpacingUnit)),
    responsive("paddingRight", pr ?? px, value => spacing(value as SpacingUnit)),
    responsive("paddingBottom", pb ?? py, value => spacing(value as SpacingUnit)),
    responsive("paddingLeft", pl ?? px, value => spacing(value as SpacingUnit)),
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
