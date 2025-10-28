import type { ElementType, ReactElement, ComponentPropsWithRef, PropsWithChildren } from "react";
import { jsx } from "@emotion/react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { createCssProps, cssPropsKeys, type CssPropsSystem } from "@/system/css-props-system";
import { createMargins, marginsPropKeys, type MarginSystem } from "@/system/margin-system";
import { createPaddings, paddingsPropKeys, type PaddingSystem } from "@/system/padding-system";
import type { BaseTheme } from "@/theme";
import { omit } from "@/utils/omit";

const DEFAULT_TAG = "div" as const;

type OwnProps<E extends ElementType = ElementType> = MarginSystem &
  PaddingSystem &
  CssPropsSystem & {
    as?: E;
    label?: string;
  };

export type BoxProps<E extends ElementType = typeof DEFAULT_TAG> = OwnProps<E> &
  Omit<PropsWithChildren<ComponentPropsWithRef<E>>, keyof OwnProps<E> | "css">;

export function Box<E extends ElementType = typeof DEFAULT_TAG>({ as, label, ...props }: BoxProps<E>): ReactElement {
  const tag = (as || DEFAULT_TAG) as E;
  const clickable = "onClick" in props;

  return jsx(tag, {
    ...omit(props, ...marginsPropKeys, ...paddingsPropKeys, ...cssPropsKeys),
    css: (theme: BaseTheme) => ({
      label: label ?? "box",
      ...combineResponsiveValues(
        ...createCssProps(props, theme),
        ...createMargins(props, theme),
        ...createPaddings(props, theme),
      ),
      ...(clickable && { cursor: "pointer", userSelect: "none" }),
    }),
  });
}
