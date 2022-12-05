import { forwardRef } from "react";
import { Box, BoxProps } from "e-prim";

type ButtonProps = BoxProps<"button">;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Box as="button" ref={ref} {...props} label="button" />
));
