/**
 * @jest-environment jsdom
 */

import { renderHook } from "@testing-library/react";
import { setMedia } from "mock-match-media";
import { wrapper } from "@/utils/mock-theme";
import { useMediaDown, useMediaUp } from "../use-media";

describe("useMediaUp", () => {
  test("should return true if the window width is more than the breakpoint value", async () => {
    setMedia({
      width: "600px",
      type: "screen",
      orientation: "landscape",
    });

    const hook = renderHook(() => useMediaUp("md"), { wrapper });

    expect(hook.result.current).toEqual(true);
  });

  test("should return false if the window width is less than the breakpoint value", async () => {
    setMedia({
      width: "400px",
      type: "screen",
      orientation: "landscape",
    });

    const hook = renderHook(() => useMediaUp("md"), { wrapper });

    expect(hook.result.current).toEqual(false);
  });
});

describe("useMediaDown", () => {
  test("should return true if the window width is less than the breakpoint value", async () => {
    setMedia({
      width: "400px",
      type: "screen",
      orientation: "landscape",
    });

    const hook = renderHook(() => useMediaDown("md"), { wrapper });

    expect(hook.result.current).toEqual(true);
  });

  test("should return false if the window width is less than the breakpoint value", async () => {
    setMedia({
      width: "600px",
      type: "screen",
      orientation: "landscape",
    });

    const hook = renderHook(() => useMediaDown("md"), { wrapper });

    expect(hook.result.current).toEqual(false);
  });
});
