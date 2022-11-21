import { mockTheme } from "@/utils/mock-theme";
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
            shadow: "xl",
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
        { boxShadow: "0px 48px 80px -32px rgba(55, 56, 74, 0.12), 0px 64px 132px -20px rgba(55, 56, 74, 0.08)" },
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
            background: "transparent",
            border: "neutral.7",
            width: {
              xs: "100%",
              md: 300,
            },
            zIndex: "dropdown",
            shadow: {
              md: "xl",
            },
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
        { background: "transparent" },
        {
          "@media (min-width: 500px)": {
            boxShadow: "0px 48px 80px -32px rgba(55, 56, 74, 0.12), 0px 64px 132px -20px rgba(55, 56, 74, 0.08)",
          },
        },
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
