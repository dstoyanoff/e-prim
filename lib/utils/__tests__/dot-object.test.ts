import { getValueFromKey } from "../dot-object";

const testObject = {
  someProp: {
    someVal: "value",
  },
  someProp2: {
    someSubProp: {
      someOtherSubProp: {
        someVal: "value",
      },
    },
  },
};

describe("dot object", () => {
  describe("getValueFromKey", () => {
    test("should return undefined if no key", () => expect(getValueFromKey(undefined, {})).toEqual(undefined));

    test("should return value 1-level deep", () =>
      expect(getValueFromKey("someProp.someVal", testObject)).toEqual("value"));

    test("should return value 1-level deep", () =>
      expect(getValueFromKey("someProp2.someSubProp.someOtherSubProp.someVal", testObject)).toEqual("value"));

    test("should return undefined if the key does not exist", () =>
      expect(getValueFromKey("invalidKey", testObject)).toEqual(undefined));
  });
});
