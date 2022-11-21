import { ComponentProps, ElementType, forwardRef, ReactElement, Ref } from "react";
import { combineResponsiveValues } from "@/system/combine-responsive-values";
import { createCssProps, cssPropsKeys, CssPropsSystem } from "@/system/css-props-system";
import { createMargins, marginsPropKeys, MarginSystem } from "@/system/margin-system";
import { createPaddings, paddingsPropKeys, PaddingSystem } from "@/system/padding-system";
import { BaseTheme } from "@/theme/types";
import { omit } from "@/utils/omit";

const DEFAULT_TAG = "div";

type OwnProps<E extends ElementType = ElementType> = MarginSystem &
  PaddingSystem &
  CssPropsSystem & {
    /**
     * This is the tag that would be rendered in the DOM. The Box properties will be inferred based on the tag.
     */
    as?: E;

    /**
     * Label is a system prop that's used to change the class-name generator so it's easier to find nodes in the DOM when investigating
     */
    label?: string;
  };

export type BoxProps<E extends ElementType> = OwnProps<E> & Omit<ComponentProps<E>, keyof OwnProps>;

export const Box: <E extends ElementType = typeof DEFAULT_TAG>(props: BoxProps<E>) => ReactElement | null = forwardRef(
  ({ label, ...props }: OwnProps, ref: Ref<Element>) => {
    const Element = props.as || DEFAULT_TAG;
    const clickable = "onClick" in props;

    return (
      <Element
        ref={ref}
        {...omit(props, ...marginsPropKeys, ...paddingsPropKeys, ...cssPropsKeys)}
        css={(theme: BaseTheme) => ({
          label,
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
        as={undefined}
      />
    );
  },
);
