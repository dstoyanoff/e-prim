import { CSSObject } from "@emotion/react";
import { BaseTheme, SpacingUnit } from "../theme/types";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory } from "./responsive-css-value-factory";
import { ResponsiveValue } from "./types";

export const createFlex = (props: FlexSystem, theme: BaseTheme): CSSObject[] => {
  const { spacing } = theme;
  const { direction, center, centerMain, centerCross, gap, justify, align } = props;

  const responsive = responsiveCssValueFactory(theme);

  return [
    { display: "flex" },
    responsive("flexDirection", direction),
    responsive("alignItems", center || centerCross ? "center" : align),
    responsive("justifyContent", center || centerMain ? "center" : justify),
    responsive("gap", gap, value => spacing(value as SpacingUnit)),
  ];
};

export const flexPropKeys = getAllPropKeys<FlexSystem>({
  align: true,
  center: true,
  centerCross: true,
  centerMain: true,
  justify: true,
  gap: true,
  direction: true,
});

export type FlexSystem = {
  /**
   * How to order items (flex-direction)
   */
  direction?: ResponsiveValue<CSSObject["flexDirection"]>;

  /**
   * Centers the items on both axises (justify-content: center, align-items: center)
   */
  center?: ResponsiveValue<boolean>;

  /**
   * Centers the items on their main axis (justify-content: center)
   */
  centerMain?: ResponsiveValue<boolean>;

  /**
   * Centers the items on their cross axis (align-items: center)
   */
  centerCross?: ResponsiveValue<boolean>;

  /**
   * Adds a gap between the elements. Either a string or a unit is allowed
   */
  gap?: ResponsiveValue<SpacingUnit>;

  /**
   * Applies justify-content to the elements. It has lower priority than center/centerMain/centerCross
   */
  justify?: ResponsiveValue<CSSObject["justifyContent"]>;

  /**
   * Applies align-items to the elements. It has lower priority than center/centerMain/centerCross
   */
  align?: ResponsiveValue<CSSObject["alignItems"]>;
};
