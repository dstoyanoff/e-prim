import { mockTheme } from "@/utils/mock-theme";
import { colorByKey, mediaDown, mediaUp, spacing, transparentColor } from "../theme-functions";

let mockColor: string | undefined;
jest.mock("../../utils/dot-object", () => ({
  getValueFromKey: () => mockColor,
}));

const warn = jest.spyOn(console, "warn").mockImplementation(() => {
  return;
});

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

    test("should return empty string if no values provided", () => expect(spacing(mockTheme.spacingValue)).toEqual(""));
  });

  describe("transparentColor", () => {
    test("should warn if the color key is not found", () => {
      mockColor = undefined;

      expect(transparentColor("neutral.0", 10, mockTheme.palette)).toBeUndefined();
    });

    test("should make hex value transparent", () => {
      mockColor = "#001122";

      expect(transparentColor("neutral.0", 10, mockTheme.palette)).toEqual("#0011221a");
    });

    test("should make rgb value transparent", () => {
      mockColor = "rgb(12, 24, 36)";

      expect(transparentColor("neutral.0", 10, mockTheme.palette)).toEqual("rgba(12, 24, 36, 0.1)");
    });

    test("should warn when making a rgb value transparent if it cannot be parsed", () => {
      mockColor = "rgb__";

      expect(transparentColor("neutral.0", 10, mockTheme.palette)).toEqual(mockColor);
      expect(warn).toHaveBeenCalledWith("Could not parse color rgb__ as a valid rgb color");
    });

    test("should make hsl value transparent", () => {
      mockColor = "hsl(10, 25%, 50%)";

      expect(transparentColor("neutral.0", 10, mockTheme.palette)).toEqual("hsla(10, 25%, 50%, 0.1)");
    });

    test("should warn when making a hsl value transparent if it cannot be parsed", () => {
      mockColor = "hsl__";

      expect(transparentColor("neutral.0", 10, mockTheme.palette)).toEqual(mockColor);
      expect(warn).toHaveBeenCalledWith("Could not parse color hsl__ as a valid hsl color");
    });

    test("should warn when value cannot be parsed as a valid color", () => {
      mockColor = "invalid";

      expect(transparentColor("neutral.0", 10, mockTheme.palette)).toEqual(mockColor);
      expect(warn).toHaveBeenCalledWith("Color invalid was not recognized as any valid type of color");
    });
  });
});

describe("color by key", () => {
  test("should return nothing if the color is not found", () => {
    mockColor = undefined;

    colorByKey("neutral.0", mockTheme.palette);

    expect(warn).toHaveBeenCalledWith("Could not find color by key neutral.0");
  });

  test("should return color", () => {
    mockColor = "#ffffff";
    expect(colorByKey("neutral.0", mockTheme.palette)).toEqual("#ffffff");
  });
});
