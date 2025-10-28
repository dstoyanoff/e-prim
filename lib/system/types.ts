import { type CSSPropertiesWithMultiValues } from "@emotion/serialize";
import { type TBreakpoint } from "@/theme";

export type ResponsiveValue<T> = T | Partial<Record<keyof TBreakpoint, T>>;
export type CssProperties = CSSPropertiesWithMultiValues;
