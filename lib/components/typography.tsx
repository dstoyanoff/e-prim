import { ElementType, forwardRef, ReactElement, Ref } from "react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { TypographySystem, createTypography, typographyPropKeys } from "@/system/typography-system";
import { omit } from "@/utils/omit";
import { Box, BoxProps } from "./box";

const DEFAULT_TAG = "span";

type OwnProps = TypographySystem;

export type TypographyProps<E extends ElementType> = Omit<BoxProps<E>, "typography"> &
  OwnProps & {
    as?: E;
  };

export const Typography: <E extends ElementType = typeof DEFAULT_TAG>(
  props: TypographyProps<E>,
) => ReactElement | null = forwardRef(
  <E extends ElementType = typeof DEFAULT_TAG>(props: OwnProps, ref: Ref<TypographyProps<E>["as"]>) => {
    return (
      <Box
        ref={ref}
        label="typography"
        {...omit(props, ...typographyPropKeys)}
        css={theme => combineResponsiveValues(...createTypography(props, theme))}
      />
    );
  },
);
