import { CSSObject } from "@emotion/react";
import { BaseTheme, SpacingUnit } from "../theme/types";
import { FixedLengthArray } from "../utils/fixed-length-array";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory } from "./responsive-css-value-factory";
import { ResponsiveValue } from "./types";

export const createMargins = (props: MarginSystem, theme: BaseTheme): CSSObject[] => {
  const { spacing } = theme;
  const { m, mx, my, mt, mr, mb, ml } = props;

  const responsive = responsiveCssValueFactory(theme);

  return [
    responsive("margin", m, v => spacing(...((Array.isArray(v) ? v : [v]) as SpacingUnit[]))),
    responsive("marginTop", mt ?? my, value => spacing(value as SpacingUnit)),
    responsive("marginRight", mr ?? mx, value => spacing(value as SpacingUnit)),
    responsive("marginBottom", mb ?? my, value => spacing(value as SpacingUnit)),
    responsive("marginLeft", ml ?? mx, value => spacing(value as SpacingUnit)),
  ];
};

export const marginsPropKeys = getAllPropKeys<MarginSystem>({
  m: true,
  mx: true,
  my: true,
  mt: true,
  mr: true,
  mb: true,
  ml: true,
});

/**
 * Margins exposes a set of props to add margins to an element.
 * All values are either strings or units, where each unit is then internally multiplied by the theme's default spacing value.
 * Example: Consider the theme's spacing is configured to 4 and a component is rendered with m={1}, then it would add a 4px margin to all sides.
 * If a string is passed (e.g. % or vh, vw), it will be passed as is.
 */
export type MarginSystem = {
  /**
   * Margin on all sites. An array adds margin to particular sides, just like in pure CSS
   * @example m={1} => margin: 4px
   * @example m={[1, 2]} => margin: 4px 8px
   * @example m={[1, 2, '10%']} => margin: 4px 8px 10%
   * @example m={[1, 2, '3vw', '10%']} => margin: 4px 8px 3vw 10%
   */
  m?: ResponsiveValue<
    SpacingUnit | FixedLengthArray<SpacingUnit, 2> | FixedLengthArray<SpacingUnit, 3> | FixedLengthArray<SpacingUnit, 4>
  >;

  /**
   * Margin on the x axis in units
   * @example mx={1} => margin-left: 4px 4px;
   */
  mx?: ResponsiveValue<SpacingUnit>;

  /**
   * Margin on the y axis
   * @example my={1} => margin-top: 4px 4px;
   */
  my?: ResponsiveValue<SpacingUnit>;

  /**
   * Margin on the top
   * @example mt={1} => margin-top: 4px;
   * @example mt="10%" => margin-top: 10%;
   */
  mt?: ResponsiveValue<SpacingUnit>;

  /**
   * Margin on the right
   * @example mr={1} => margin-right: 4px;
   * @example mr="10%" => margin-right: 10%;
   */
  mr?: ResponsiveValue<SpacingUnit>;

  /**
   * Margin on the bottom
   * @example mb={1} => margin-bottom: 4px;
   * @example mb="10%" => margin-bottom: 10%;
   */
  mb?: ResponsiveValue<SpacingUnit>;

  /**
   * Margin on the left
   * @example ml={1} => margin-left: 4px;
   * @example ml="10%" => margin-left: 10%;
   */
  ml?: ResponsiveValue<SpacingUnit>;
};
