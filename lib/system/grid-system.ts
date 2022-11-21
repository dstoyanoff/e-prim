import { BaseTheme, SpacingUnit } from "@/theme/types";
import { pxOrRaw } from "@/utils/px-or-raw";
import { getAllPropKeys } from "./get-all-prop-keys";
import { responsiveCssValueFactory } from "./responsive-css-value-factory";
import { CssProperties, ResponsiveValue } from "./types";

export const createGrid = (props: GridSystem, theme: BaseTheme): CssProperties[] => {
  const { spacing } = theme;
  const { columns, gap } = props;

  const responsive = responsiveCssValueFactory(theme);

  return [
    { display: "grid" },
    responsive("gap", gap, value => spacing(value as SpacingUnit)),

    responsive("gridTemplateColumns", columns, value => {
      const [columnsCount, size = "1fr"] = value as [number, string | number | (string | number)[]];

      if (Array.isArray(size)) {
        return size.map(i => pxOrRaw(i)).join(" ");
      }

      return `repeat(${columnsCount}, ${pxOrRaw(size)})`;
    }),
  ];
};

export const gridPropKeys = getAllPropKeys<GridSystem>({
  gap: true,
  columns: true,
});

export type GridSystem = {
  /**
   * Adds a gap between the elements. Either a string or a unit is allowed
   */
  gap?: ResponsiveValue<SpacingUnit>;

  /**
   * Columns configuration as an array
   * The first value is the number of columns that are rendered
   * The second value configures their sizes. Can be configured in 3 ways:
   * number - applies the number to all columns in pixels
   * string - applies the value to all columns without modifications
   * array - applies the given values using the above logic, but without repeat
   * @default 1fr
   */
  columns?: ResponsiveValue<[number, (string | number | (string | number)[])?]>;
};
