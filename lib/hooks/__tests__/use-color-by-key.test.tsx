/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react";
import { useColorByKey } from "../use-color-by-key";

jest.mock("@emotion/react", () => ({
  useTheme: () => ({
    palette: {
      primary: {
        normal: "#123456",
      },
    },
  }),
}));

describe("useColorByKey", () => {
  test("should resolve color from the theme by key", () => {
    const hook = renderHook(() => useColorByKey("primary.normal"));

    expect(hook.result.current).toEqual("#123456");
  });
});
