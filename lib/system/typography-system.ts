import { BaseTheme, TypographyKey, TypographySpecs } from "../theme/types";
import { getValueFromKey } from "../utils/dot-object";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory } from "./responsive-css-value-factory";
import { CssProperties, ResponsiveValue } from "./types";

export const getTypographyStyles = (variant: TypographyKey = "default", typography: BaseTheme["typography"]) => ({
  ...typography.default,
  ...(variant !== "default" && getValueFromKey<TypographySpecs>(variant, typography)),
});

export const createTypography = (typographyProps: TypographySystem, theme: BaseTheme) => {
  const responsive = responsiveCssValueFactory(theme);

  return [
    responsive("textAlign", typographyProps.align),
    responsive("textTransform", typographyProps.uppercase, value => (value ? "uppercase" : undefined)),
    responsive("whiteSpace", typographyProps.noWrap, value => (value ? "nowrap" : undefined)),
    responsive("textOverflow", typographyProps.textOverflow),
    { ...getTypographyStyles(typographyProps.variant, theme.typography) },
  ];
};

export const typographyPropKeys = getAllPropKeys<TypographySystem>({
  align: true,
  noWrap: true,
  uppercase: true,
  variant: true,
  textOverflow: true,
});

export type TypographySystem = {
  /**
   * Chooses the typography style
   */
  variant?: TypographyKey;

  /**
   * Text align
   */
  align?: ResponsiveValue<CssProperties["textAlign"]>;

  /**
   * Whether to uppercase all text
   */
  uppercase?: boolean;

  /**
   * Disables text wrap
   */
  noWrap?: boolean;

  /**
   * Specifies text overflow
   */
  textOverflow?: ResponsiveValue<CssProperties["textOverflow"]>;
};
