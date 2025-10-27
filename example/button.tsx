import { Ref } from "react";
import { Box, BoxProps } from "e-prim";

type ButtonProps = BoxProps<"button"> & {
  ref?: Ref<HTMLButtonElement>;
};

export const Button = ({ ref, ...props }: ButtonProps) => <Box as="button" ref={ref} {...props} label="button" />;
