import type { ElementType, ReactElement } from "react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { createFlex, flexPropKeys, type FlexSystem } from "@/system/flex-system";
import type { BaseTheme } from "@/theme";
import { omit } from "@/utils/omit";
import { Box, type BoxProps } from "./box";

const DEFAULT_TAG = "div";

type OwnProps = FlexSystem;

export type FlexProps<E extends ElementType> = BoxProps<E> & OwnProps;

/**
 * The Flex component is a primitive that exposes useful properties for faster prototyping of flex layouts
 */
export function Flex<E extends ElementType = typeof DEFAULT_TAG>(props: FlexProps<E>): ReactElement | null {
  return (
    <Box
      label="flex"
      {...omit(props, ...flexPropKeys)}
      css={(theme: BaseTheme) => combineResponsiveValues(...createFlex(props, theme))}
    />
  );
}
