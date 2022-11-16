import { singleOrMulti } from "../array-utils";

describe("array utils", () => {
  describe("singleOrMulti", () => {
    test("should return the same array", () => expect(singleOrMulti([1, 2])).toEqual([1, 2]));

    test("should convert single item to array of 1", () => expect(singleOrMulti(1)).toEqual([1]));
  });
});
