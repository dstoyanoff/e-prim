/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react";
import { wrapper } from "@/utils/mock-theme";
import { useColorByKey } from "../use-color-by-key";

describe("useColorByKey", () => {
  test("should resolve color from the theme by key", () => {
    const hook = renderHook(() => useColorByKey("primary.normal"), { wrapper });

    expect(hook.result.current).toEqual("#00659e");
  });
});
