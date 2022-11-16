import { omit } from "../omit";

describe("omit", () => {
  test("should omit keys from the object", () =>
    expect(
      omit(
        {
          key1: "value1",
          key2: "value2",
          key3: "value3",
          key4: "value4",
        },
        "key1",
        "key2",
      ),
    ).toEqual({
      key3: "value3",
      key4: "value4",
    }));
});
