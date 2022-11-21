import { pxOrRaw } from "@/utils/px-or-raw";
import { createValue } from "../create-value";

describe("createValue", () => {
  test("should return an empty object if the value is null", () => expect(createValue("marginTop", null)).toEqual({}));

  test("should return an empty object if the value is undefined", () =>
    expect(createValue("marginTop", undefined)).toEqual({}));

  test("should return an empty object if the transformed value is null", () =>
    expect(createValue("marginTop", 1, () => null as never)).toEqual({}));

  test("should return an empty object if the transformed value is undefined", () =>
    expect(createValue("marginTop", 1, () => undefined as never)).toEqual({}));

  test("should return valid object - default transform", () =>
    expect(createValue("marginTop", "8px")).toEqual({
      marginTop: "8px",
    }));

  test("should return valid object - custom transform", () =>
    expect(createValue("marginTop", 10, value => pxOrRaw(value))).toEqual({
      marginTop: "10px",
    }));
});
