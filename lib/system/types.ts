import { TBreakpoint } from "../theme";

export type ResponsiveValue<T> = T | Partial<Record<keyof TBreakpoint, T>>;
