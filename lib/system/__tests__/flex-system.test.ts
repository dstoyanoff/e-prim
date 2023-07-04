import { mockTheme } from "@/utils/mock-theme";
import { createFlex } from "../flex-system";

describe("flex system", () => {
  describe("createFlex", () => {
    test("should build proper styles - non-responsive", () =>
      expect(
        createFlex(
          {
            inline: false,
            align: "center",
            center: true,
            direction: "column",
            justify: "space-between",
            gap: 4,
          },
          mockTheme,
        ),
      ).toEqual([
        { display: "flex" },
        { flexDirection: "column" },
        { alignItems: "center" },
        {},
        { alignItems: "center" },
        { justifyContent: "space-between" },
        {},
        { justifyContent: "center" },
        { gap: "16px" },
      ]));

    test("should build proper styles - responsive", () =>
      expect(
        createFlex(
          {
            inline: {
              xs: false,
              md: true,
            },
            align: {
              xs: "left",
              md: "center",
            },
            direction: {
              xs: "row",
              md: "column",
            },
            centerCross: {
              xs: true,
              md: false,
            },
            centerMain: {
              xs: false,
              md: true,
            },
            gap: {
              xs: 4,
              md: "10px",
            },
            justify: { xs: "center", md: "space-between" },
          },
          mockTheme,
        ),
      ).toEqual([
        {
          "@media (min-width: 0px)": { display: "flex" },
          "@media (min-width: 500px)": { display: "inline-flex" },
        },
        {
          "@media (min-width: 0px)": { flexDirection: "row" },
          "@media (min-width: 500px)": { flexDirection: "column" },
        },
        { "@media (min-width: 0px)": { alignItems: "left" }, "@media (min-width: 500px)": { alignItems: "center" } },
        { "@media (min-width: 0px)": { alignItems: "center" } },
        {},
        {
          "@media (min-width: 0px)": { justifyContent: "center" },
          "@media (min-width: 500px)": { justifyContent: "space-between" },
        },
        { "@media (min-width: 500px)": { justifyContent: "center" } },
        {},
        { "@media (min-width: 0px)": { gap: "16px" }, "@media (min-width: 500px)": { gap: "10px" } },
      ]));
  });
});
