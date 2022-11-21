import { ResponsiveValue } from "@/system/types";
import { isResponsiveValue } from "../is-responsive-value";

const breakpoints = {
  xs: 0,
  md: 600,
};

describe("isResponsiveValue", () => {
  test.each([10, "value1", null, undefined])(
    "given a value of %p, should return false",
    (value: ResponsiveValue<unknown>) => expect(isResponsiveValue(value, breakpoints)).toEqual(false),
  );

  test("should return false if the value is object, but containing the breakpoints", () =>
    expect(
      isResponsiveValue(
        {
          someVal: 500,
        },
        breakpoints,
      ),
    ).toEqual(false));

  test("should return true if there is a partial match", () =>
    expect(
      isResponsiveValue(
        {
          xs: "valueXs",
          invalidProp: "valueInvalid",
        } as never,
        breakpoints,
      ),
    ).toEqual(true));

  test("should return true if there is a match", () =>
    expect(
      isResponsiveValue(
        {
          xs: "valueXs",
          md: "valueMd",
        },
        breakpoints,
      ),
    ).toEqual(true));
});
