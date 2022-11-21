import { mockTheme } from "@/utils/mock-theme";
import { createMargins } from "../margin-system";

describe("margin system", () => {
  test("should build proper styles - non-responsive", () =>
    expect(
      createMargins(
        {
          mt: "12%",
          mr: 5,
          ml: 7,
          mb: "2vw",
          mx: "3vh",
          my: "5px",
          m: 1,
        },
        mockTheme,
      ),
    ).toEqual([
      { margin: "4px" },
      { marginTop: "5px" },
      { marginTop: "12%" },
      { marginRight: "3vh" },
      { marginRight: "20px" },
      { marginBottom: "5px" },
      { marginBottom: "2vw" },
      { marginLeft: "3vh" },
      { marginLeft: "28px" },
    ]));

  test("should build proper styles - responsive", () =>
    expect(
      createMargins(
        {
          mt: { xs: 10, md: "12%" },
          mr: { xs: 5, md: "1vw" },
          ml: { xs: 7, md: "1em" },
          mb: { xs: "2vw", md: "2rem" },
          mx: { xs: "3vh", md: "100%" },
          my: { xs: "5px", md: "-100%" },
          m: { xs: 1, md: "8px" },
        },
        mockTheme,
      ),
    ).toEqual([
      { "@media (min-width: 0px)": { margin: "4px" }, "@media (min-width: 500px)": { margin: "8px" } },
      { "@media (min-width: 0px)": { marginTop: "5px" }, "@media (min-width: 500px)": { marginTop: "-100%" } },
      { "@media (min-width: 0px)": { marginTop: "40px" }, "@media (min-width: 500px)": { marginTop: "12%" } },
      { "@media (min-width: 0px)": { marginRight: "3vh" }, "@media (min-width: 500px)": { marginRight: "100%" } },
      { "@media (min-width: 0px)": { marginRight: "20px" }, "@media (min-width: 500px)": { marginRight: "1vw" } },
      { "@media (min-width: 0px)": { marginBottom: "5px" }, "@media (min-width: 500px)": { marginBottom: "-100%" } },
      { "@media (min-width: 0px)": { marginBottom: "2vw" }, "@media (min-width: 500px)": { marginBottom: "2rem" } },
      { "@media (min-width: 0px)": { marginLeft: "3vh" }, "@media (min-width: 500px)": { marginLeft: "100%" } },
      { "@media (min-width: 0px)": { marginLeft: "28px" }, "@media (min-width: 500px)": { marginLeft: "1em" } },
    ]));
});
