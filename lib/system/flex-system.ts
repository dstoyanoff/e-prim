import { BaseTheme, SpacingUnit } from "@/theme/types";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory, ValueTransformer } from "./responsive-css-value-factory";
import { CssProperties, ResponsiveValue } from "./types";

export const createFlex = (props: FlexSystem, theme: BaseTheme): CssProperties[] => {
  const { spacing } = theme;
  const { direction, center, centerMain, centerCross, gap, justify, align, inline = false } = props;

  const centerTransformer: ValueTransformer<"alignItems" | "justifyContent", boolean> = value =>
    value ? "center" : undefined;

  const responsive = responsiveCssValueFactory(theme);

  return [
    responsive('display', inline, value => value ? "inline-flex" : "flex"),
    responsive("flexDirection", direction),

    responsive("alignItems", align),
    responsive("alignItems", centerCross, centerTransformer),
    responsive("alignItems", center, centerTransformer),

    responsive("justifyContent", justify),
    responsive("justifyContent", centerMain, centerTransformer),
    responsive("justifyContent", center, centerTransformer),

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
  inline: true
});

export type FlexSystem = {
  /**
   * How to order items (flex-direction)
   */
  direction?: ResponsiveValue<CssProperties["flexDirection"]>;

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
  justify?: ResponsiveValue<CssProperties["justifyContent"]>;

  /**
   * Applies align-items to the elements. It has lower priority than center/centerMain/centerCross
   */
  align?: ResponsiveValue<CssProperties["alignItems"]>;

  /**
   * Whether to render as inline-flex instead of flex
   */
  inline?: ResponsiveValue<boolean>;
};
