import { mockTheme } from "../../utils/mock-theme";
import { createCssProps } from "../css-props-system";

describe("css props system", () => {
  describe("createCssProps", () => {
    test("should build proper styles - non-responsive", () =>
      expect(
        createCssProps(
          {
            background: "primary.normal",
            border: true,
            height: 100,
            width: "100%",
            typography: "body.1",
            grow: 1,
          },
          mockTheme,
        ),
      ).toEqual([
        {},
        {},
        { width: "100%" },
        {},
        {},
        { height: 100 },
        {},
        {},
        {},
        { background: "#00659e" },
        { border: "1px solid #d8d7df" },
        {},
        {},
        {},
        {},
        {},
        {
          cursor: undefined,
          overflow: undefined,
          fontFamily: "Mulish",
          fontSize: 14,
          fontWeight: 400,
        },
        { flexGrow: 1 },
      ]));

    test("should build proper styles - responsive", () =>
      expect(
        createCssProps(
          {
            background: "neutral.4",
            border: "neutral.7",
            width: {
              xs: "100%",
              md: 300,
            },
            zIndex: "dropdown",
          },
          { ...mockTheme, border: undefined },
        ),
      ).toEqual([
        {},
        {},
        {
          "@media (min-width: 0px)": { width: "100%" },
          "@media (min-width: 500px)": { width: 300 },
        },
        {},
        {},
        {},
        {},
        {},
        {},
        { background: "#898896" },
        { border: "1px solid #27262c" },
        {},
        {},
        {},
        {},
        { zIndex: 100 },
        {
          cursor: undefined,
          overflow: undefined,
        },
        {},
      ]));
  });
});
