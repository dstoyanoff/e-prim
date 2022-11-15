import { IconProps } from "e-prim";
import { BaseIcon } from "e-prim";
import { FC } from "react";

export const ArrowIcon: FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path
      d="M4 12H20M20 12L12 4M20 12L12 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </BaseIcon>
);
