import { mockTheme } from "../../utils/mock-theme";
import { createTypography, getTypographyStyles } from "../typography-system";

describe("typography system", () => {
  describe("getTypographyStyles", () => {
    test("should return default styles if no variant is provided", () =>
      expect(getTypographyStyles(undefined, mockTheme.typography)).toEqual(mockTheme.typography.default));

    test("should merge default and variant styles - nested variant", () =>
      expect(getTypographyStyles("title.1", mockTheme.typography)).toEqual({
        fontFamily: mockTheme.typography.default.fontFamily,
        fontSize: mockTheme.typography.title[1].fontSize,
        fontWeight: mockTheme.typography.title[1].fontWeight,
      }));
  });

  describe("createTypography", () => {
    test("should build proper styles - non-responsive", () =>
      expect(
        createTypography(
          {
            align: "center",
            noWrap: false,
            textOverflow: "ellipsis",
            uppercase: false,
            variant: "default",
          },
          mockTheme,
        ),
      ).toEqual([
        { textAlign: "center" },
        {},
        {},
        { textOverflow: "ellipsis" },
        { fontFamily: "Mulish", fontSize: 12, fontWeight: 400 },
      ]));

    test("should build proper styles - responsive", () =>
      expect(
        createTypography(
          {
            align: "left",
            noWrap: true,
            textOverflow: "clip",
            uppercase: true,
            variant: "title.1",
          },
          mockTheme,
        ),
      ).toEqual([
        { textAlign: "left" },
        { textTransform: "uppercase" },
        { whiteSpace: "nowrap" },
        { textOverflow: "clip" },
        { fontFamily: "Mulish", fontSize: 24, fontWeight: 700 },
      ]));
  });
});
