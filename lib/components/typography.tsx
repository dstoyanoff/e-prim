import { ElementType, forwardRef, ReactElement, Ref } from "react";
import { TypographySystem } from "../system/typography-system";
import { Box, BoxProps } from "./box";
import { omit } from "../utils/omit";
import { combineResponsiveValues } from "../system/combine-responsive-values";
import { createTypography, typographyPropKeys } from "../system/typography-system";

const DEFAULT_TAG = "span";

type OwnProps = TypographySystem;

export type TypographyProps<E extends ElementType> = BoxProps<E> & OwnProps;

export const Typography: <E extends ElementType = typeof DEFAULT_TAG>(
  props: TypographyProps<E>
) => ReactElement | null = forwardRef(
  <E extends ElementType = typeof DEFAULT_TAG>(props: OwnProps, ref: Ref<TypographyProps<E>["as"]>) => {
    return (
      <Box
        ref={ref}
        {...omit(props, ...typographyPropKeys)}
        css={theme => combineResponsiveValues(...createTypography(props, theme))}
      />
    );
  }
);
