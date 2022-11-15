import { FC } from "react";
import { Box, BoxProps } from "./box";

export const DEFAULT_ICON_SIZE = 24;

export type BaseIconProps = BoxProps<"svg"> & {
  /**
   * Overall size of the icon (square)
   * @default @see {@link DEFAULT_ICON_SIZE}
   */
  size?: number;

  /**
   * Allows overriding the viewBox size of the SVG for non-standard icons
   * @default @see {@link DEFAULT_ICON_SIZE}
   */
  viewBoxSize?: number;
};

export type IconProps = Omit<BaseIconProps, "viewBoxSize">;

export const BaseIcon: FC<BaseIconProps> = ({
  size = DEFAULT_ICON_SIZE,
  color,
  viewBoxSize = DEFAULT_ICON_SIZE,
  ...props
}) => (
  <Box
    as="svg"
    width={size}
    height={size}
    viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
    {...props}
  />
);
