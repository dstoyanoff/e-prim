import { useTheme } from "@emotion/react";
import { colorByKey } from "../system/theme-functions";
import { PaletteKey } from "../theme";

export const useColorByKey = (key: PaletteKey | undefined): string | undefined => {
  const { palette } = useTheme();

  return colorByKey(key, palette);
};
