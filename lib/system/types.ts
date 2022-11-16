import { TBreakpoint } from "../theme";
import { CSSPropertiesWithMultiValues } from "@emotion/serialize";

export type ResponsiveValue<T> = T | Partial<Record<keyof TBreakpoint, T>>;
export type CssProperties = CSSPropertiesWithMultiValues;
