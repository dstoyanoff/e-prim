import { mockTheme } from "@/utils/mock-theme";
import { createPaddings } from "../padding-system";

describe("padding system", () => {
  test("should build proper styles - non-responsive", () =>
    expect(
      createPaddings(
        {
          pt: "12%",
          pr: 5,
          pl: 7,
          pb: "2vw",
          px: "3vh",
          py: "5px",
          p: 1,
        },
        mockTheme,
      ),
    ).toEqual([
      { padding: "4px" },
      { paddingTop: "5px" },
      { paddingTop: "12%" },
      { paddingRight: "3vh" },
      { paddingRight: "20px" },
      { paddingBottom: "5px" },
      { paddingBottom: "2vw" },
      { paddingLeft: "3vh" },
      { paddingLeft: "28px" },
    ]));

  test("should build proper styles - responsive", () =>
    expect(
      createPaddings(
        {
          pt: { xs: 10, md: "12%" },
          pr: { xs: 5, md: "1vw" },
          pl: { xs: 7, md: "1em" },
          pb: { xs: "2vw", md: "2rem" },
          px: { xs: "3vh", md: "100%" },
          py: { xs: "5px", md: "-100%" },
          p: { xs: 1, md: "8px" },
        },
        mockTheme,
      ),
    ).toEqual([
      { "@media (min-width: 0px)": { padding: "4px" }, "@media (min-width: 500px)": { padding: "8px" } },
      { "@media (min-width: 0px)": { paddingTop: "5px" }, "@media (min-width: 500px)": { paddingTop: "-100%" } },
      { "@media (min-width: 0px)": { paddingTop: "40px" }, "@media (min-width: 500px)": { paddingTop: "12%" } },
      { "@media (min-width: 0px)": { paddingRight: "3vh" }, "@media (min-width: 500px)": { paddingRight: "100%" } },
      { "@media (min-width: 0px)": { paddingRight: "20px" }, "@media (min-width: 500px)": { paddingRight: "1vw" } },
      { "@media (min-width: 0px)": { paddingBottom: "5px" }, "@media (min-width: 500px)": { paddingBottom: "-100%" } },
      { "@media (min-width: 0px)": { paddingBottom: "2vw" }, "@media (min-width: 500px)": { paddingBottom: "2rem" } },
      { "@media (min-width: 0px)": { paddingLeft: "3vh" }, "@media (min-width: 500px)": { paddingLeft: "100%" } },
      { "@media (min-width: 0px)": { paddingLeft: "28px" }, "@media (min-width: 500px)": { paddingLeft: "1em" } },
    ]));
});
