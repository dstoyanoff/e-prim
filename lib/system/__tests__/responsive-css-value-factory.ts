import { mockTheme } from "../../utils/mock-theme";
import { responsiveCssValueFactory, ValueTransformer } from "../responsive-css-value-factory";

describe("responsiveCssValueFactory", () => {
  const responsive = responsiveCssValueFactory(mockTheme);

  test("should return an empty object if the value is null", () => expect(responsive("marginTop", null)).toEqual({}));

  test("should return an empty object if the value is undefined", () =>
    expect(responsive("marginTop", undefined)).toEqual({}));

  test("should return an empty object if the value transformer returns null", () =>
    expect(responsive("marginTop", 1, _ => null as never)).toEqual({}));

  test("should return an empty object if the value transformer returns undefined", () =>
    expect(responsive("marginTop", 1, _ => undefined as never)).toEqual({}));

  test("should return plain value for non-responsive properties", () =>
    expect(responsive("marginTop", "8px")).toEqual({
      marginTop: "8px",
    }));

  test("should return plain value with transformer for non-responsive properties", () => {
    const transformer: ValueTransformer<"borderRadius", string> = value => (value === "circle" ? "50%" : value);

    expect(responsive("borderRadius", "circle", transformer)).toEqual({
      borderRadius: "50%",
    });
  });

  test("should return a media query value", () =>
    expect(responsive("marginTop", { xs: "8px", md: "16px" })).toEqual({
      "@media (min-width: 0px)": {
        marginTop: "8px",
      },
      "@media (min-width: 500px)": {
        marginTop: "16px",
      },
    }));

  test("should return a media query value with transformer", () => {
    const transformer: ValueTransformer<"borderRadius", string> = value => {
      if (value === "small") {
        return 4;
      }

      if (value === "big") {
        return 6;
      }

      return 0;
    };

    expect(responsive("borderRadius", { xs: "small", md: "big" }, transformer)).toEqual({
      "@media (min-width: 0px)": {
        borderRadius: 4,
      },
      "@media (min-width: 500px)": {
        borderRadius: 6,
      },
    });
  });
});
