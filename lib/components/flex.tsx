import { ElementType, forwardRef, ReactElement, Ref } from "react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { createFlex, flexPropKeys, FlexSystem } from "@/system/flex-system";
import { omit } from "@/utils/omit";
import { Box, BoxProps } from "./box";

const DEFAULT_TAG = "div";

type OwnProps = FlexSystem;

export type FlexProps<E extends ElementType> = BoxProps<E> &
  OwnProps & {
    as?: E;
  };

/**
 * The Flex component is a primitive that exposes useful properties for faster prototyping of flex layouts
 */
export const Flex: <E extends ElementType = typeof DEFAULT_TAG>(props: FlexProps<E>) => ReactElement | null =
  forwardRef(<E extends ElementType = typeof DEFAULT_TAG>(props: FlexProps<E>, ref: Ref<FlexProps<E>["as"]>) => (
    <Box
      ref={ref}
      {...omit(props, ...flexPropKeys)}
      css={theme => combineResponsiveValues(...createFlex(props, theme))}
    />
  ));
