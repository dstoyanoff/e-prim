/**
 * @jest-environment jsdom
 */

import { useTheme } from "@emotion/react";
import { renderHook } from "@testing-library/react";
import { mockTheme, wrapper } from "../../utils/mock-theme";

describe("theme provider", () => {
  test("should inject theme", () => {
    const result = renderHook(() => useTheme(), {
      wrapper,
    });

    expect(result.result.current.palette).toEqual(mockTheme.palette);

    expect(result.result.current.mediaDown("md")).toEqual("@media (max-width: 500px)");
    expect(result.result.current.mediaUp("md")).toEqual("@media (min-width: 500px)");
    expect(result.result.current.spacing(4)).toEqual("16px");
    expect(result.result.current.transparentColor("neutral.1", 10)).toEqual("#f5f5f51a");
  });
});
