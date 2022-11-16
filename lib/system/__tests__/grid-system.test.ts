import { mockTheme } from "../../utils/mock-theme";
import { createGrid } from "../grid-system";

describe("grid system", () => {
  describe("createGrid", () => {
    test("should build proper styles - non-responsive", () =>
      expect(
        createGrid(
          {
            columns: [2],
            gap: 2,
          },
          mockTheme,
        ),
      ).toEqual([{ display: "grid" }, { gap: "8px" }, { gridTemplateColumns: "repeat(2, 1fr)" }]));

    test("should build proper styles - responsive", () =>
      expect(
        createGrid(
          {
            columns: {
              xs: [2, [100, "20%"]],
              md: [1, "50%"],
            },
            gap: {
              xs: 2,
              md: "10px",
            },
          },
          mockTheme,
        ),
      ).toEqual([
        { display: "grid" },
        { "@media (min-width: 0px)": { gap: "8px" }, "@media (min-width: 500px)": { gap: "10px" } },
        {
          "@media (min-width: 0px)": { gridTemplateColumns: "100px 20%" },
          "@media (min-width: 500px)": { gridTemplateColumns: "repeat(1, 50%)" },
        },
      ]));
  });
});
