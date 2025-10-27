import type { ComponentProps, ElementType, ReactElement, RefObject } from "react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { createCssProps, cssPropsKeys, type CssPropsSystem } from "@/system/css-props-system";
import { createMargins, marginsPropKeys, type MarginSystem } from "@/system/margin-system";
import { createPaddings, paddingsPropKeys, type PaddingSystem } from "@/system/padding-system";
import type { BaseTheme } from "@/theme/types";
import { omit } from "@/utils/omit";

const DEFAULT_TAG = "div";

type OwnProps<E extends ElementType> = MarginSystem &
  PaddingSystem &
  CssPropsSystem & {
    /**
     * This is the tag that would be rendered in the DOM. The Box properties will be inferred based on the tag.
     */
    as?: E;

    ref?: RefObject<E>;

    /**
     * Label is a system prop that's used to change the class-name generator so it's easier to find nodes in the DOM when investigating
     */
    label?: string;
  };

export type BoxProps<E extends ElementType> = OwnProps<E> & Omit<ComponentProps<E>, keyof OwnProps<E>>;

export function Box<E extends ElementType = typeof DEFAULT_TAG>({ label, ...props }: BoxProps<E>): ReactElement | null {
  const Element = (props.as || DEFAULT_TAG) as ElementType;
  const clickable = "onClick" in props;

  return (
    <Element
      ref={props.ref}
      {...omit(props, ...marginsPropKeys, ...paddingsPropKeys, ...cssPropsKeys)}
      css={(theme: BaseTheme) => ({
        label: label ?? "box",
        ...combineResponsiveValues(
          ...createCssProps(props, theme),
          ...createMargins(props, theme),
          ...createPaddings(props, theme),
        ),
        ...(clickable && {
          cursor: "pointer",
          userSelect: "none",
        }),
      })}
    />
  );
}
