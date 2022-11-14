import { ElementType, forwardRef, ReactElement, Ref } from "react";
import { combineResponsiveValues } from "../system/combine-responsive-values";
import { Box, BoxProps } from "./box";
import { omit } from "../utils/omit";
import { createGrid, gridPropKeys, GridSystem } from "../system/grid-system";

const DEFAULT_TAG = "div";

type OwnProps = GridSystem;

export type GridProps<E extends ElementType> = BoxProps<E> & OwnProps;

/**
 * The grid component is a primitive that exposes useful properties for faster prototyping of grid layouts
 * NOTE! This component is in BETA and additional properties will be added in the future
 */
export const Grid: <E extends ElementType = typeof DEFAULT_TAG>(props: GridProps<E>) => ReactElement | null =
  forwardRef(<E extends ElementType = typeof DEFAULT_TAG>(props: GridProps<E>, ref: Ref<GridProps<E>["as"]>) => {
    return (
      <Box
        ref={ref}
        {...omit(props, ...gridPropKeys)}
        css={theme => combineResponsiveValues(...createGrid(props, theme))}
      />
    );
  });
