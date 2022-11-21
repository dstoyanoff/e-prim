import { CSSPropertiesWithMultiValues } from "@emotion/serialize";
import { TBreakpoint } from "@/theme";

export type ResponsiveValue<T> = T | Partial<Record<keyof TBreakpoint, T>>;
export type CssProperties = CSSPropertiesWithMultiValues;
