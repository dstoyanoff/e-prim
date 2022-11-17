import { useTheme } from "@emotion/react";
import { PaletteKey } from "../theme";
import { getValueFromKey } from "../utils/dot-object";

export const useColorByKey = (key: PaletteKey | undefined): string | undefined => {
  const { palette } = useTheme();

  return getValueFromKey<string>(key, palette);
};
