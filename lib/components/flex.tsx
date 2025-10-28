import type { ElementType } from "react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { createFlex, flexPropKeys, type FlexSystem } from "@/system/flex-system";
import type { BaseTheme } from "@/theme";
import { omit } from "@/utils/omit";
import { Box, type BoxProps } from "./box";

const DEFAULT_TAG = "div" as const;

type OwnProps = FlexSystem;

export type FlexProps<E extends ElementType> = BoxProps<E> & OwnProps;

export function Flex<E extends ElementType = typeof DEFAULT_TAG>({ as, ...props }: FlexProps<E>) {
  return (
    // @ts-expect-error https://github.com/emotion-js/emotion/issues/3245
    <Box
      as={as || DEFAULT_TAG}
      label="flex"
      {...(omit(props, ...flexPropKeys) as BoxProps<E>)}
      css={(theme: BaseTheme) => combineResponsiveValues(...createFlex(props, theme))}
    />
  );
}
