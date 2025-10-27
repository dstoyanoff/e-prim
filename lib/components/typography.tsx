import type { ElementType, ReactElement } from "react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { type TypographySystem, createTypography, typographyPropKeys } from "@/system/typography-system";
import type { BaseTheme } from "@/theme";
import { omit } from "@/utils/omit";
import { Box, type BoxProps } from "./box";

const DEFAULT_TAG = "span" as const;

type OwnProps = TypographySystem;

export type TypographyProps<E extends ElementType> = Omit<BoxProps<E>, "typography"> & OwnProps;

export function Typography<E extends ElementType = typeof DEFAULT_TAG>(props: TypographyProps<E>): ReactElement | null {
  return (
    <Box
      label="typography"
      {...(omit(props, ...typographyPropKeys) as BoxProps<E>)}
      css={(theme: BaseTheme) => combineResponsiveValues(...createTypography(props, theme))}
    />
  );
}
