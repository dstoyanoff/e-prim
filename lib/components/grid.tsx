import type { ElementType, ReactElement } from "react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { createGrid, gridPropKeys, type GridSystem } from "@/system/grid-system";
import type { BaseTheme } from "@/theme";
import { omit } from "@/utils/omit";
import { Box, type BoxProps } from "./box";

const DEFAULT_TAG = "div";

type OwnProps = GridSystem;

export type GridProps<E extends ElementType> = BoxProps<E> & OwnProps;

/**
 * The grid component is a primitive that exposes useful properties for faster prototyping of grid layouts
 * NOTE! This component is in BETA and additional properties will be added in the future
 */
export function Grid<E extends ElementType = typeof DEFAULT_TAG>(props: GridProps<E>): ReactElement | null {
  return (
    <Box
      label="grid"
      {...omit(props, ...gridPropKeys)}
      css={(theme: BaseTheme) => combineResponsiveValues(...createGrid(props, theme))}
    />
  );
}
