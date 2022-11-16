import { mockTheme } from "../../utils/mock-theme";
import { mediaDown, mediaUp, spacing } from "../theme-functions";

describe("theme-functions", () => {
  describe("mediaDown", () => {
    test("should build max-width query", () =>
      expect(mediaDown("md", mockTheme.breakpoint)).toEqual(`@media (max-width: 500px)`));
  });

  describe("mediaUp", () => {
    test("should build min-width query", () =>
      expect(mediaUp("xs", mockTheme.breakpoint)).toEqual("@media (min-width: 0px)"));
  });

  describe("spacing", () => {
    test("should return single value - raw", () => expect(spacing(mockTheme.spacingValue, "10%")).toEqual("10%"));

    test("should return single value - px", () => expect(spacing(mockTheme.spacingValue, 10)).toEqual("40px"));

    test("should return multiple values - raw", () =>
      expect(spacing(mockTheme.spacingValue, "10%", "20%")).toEqual("10% 20%"));

    test("should return multiple values - px", () =>
      expect(spacing(mockTheme.spacingValue, 10, 20)).toEqual("40px 80px"));

    test("should return mixed values", () =>
      expect(spacing(mockTheme.spacingValue, "10px", 4, "10%", 8)).toEqual("10px 16px 10% 32px"));
  });
});
