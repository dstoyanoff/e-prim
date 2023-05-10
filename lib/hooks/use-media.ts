import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { TBreakpoint } from "@/theme";

const useMatchMedia = (breakpoint: keyof TBreakpoint, queryPrefix: string) => {
  const [isMatch, setIsMatch] = useState(false);
  const { breakpoint: themeBreakpoint } = useTheme();

  const query = `(${queryPrefix}: ${themeBreakpoint[breakpoint]}px)`;

  const calculate = useCallback(() => setIsMatch(window.matchMedia(query).matches), [query]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      calculate();
    });

    observer.observe(document.body);

    return () => {
      observer.unobserve(document.body);
    };
  }, [calculate]);

  return isMatch;
}

export const useMediaUp = (breakpoint: keyof TBreakpoint) => useMatchMedia(breakpoint, "min-width");

export const useMediaDown = (breakpoint: keyof TBreakpoint) => useMatchMedia(breakpoint, "max-width");
