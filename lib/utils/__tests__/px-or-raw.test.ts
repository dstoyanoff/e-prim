import { pxOrRaw } from "../px-or-raw";

describe("pxOrRaw", () => {
  test("should convert number to pixels", () => expect(pxOrRaw(10)).toEqual("10px"));

  test("should return raw value for strings", () => expect(pxOrRaw("50%")).toEqual("50%"));
});
