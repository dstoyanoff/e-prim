import { combineResponsiveValues } from "../combine-responsive-values";

describe("combineResponsiveValues", () => {
  test("should combine responsive values in complete object", () => {
    const result = combineResponsiveValues(
      { display: "flex" },
      {
        "@media (min-width: 0px)": { flexDirection: "column" },
        "@media (min-width: 500px)": { flexDirection: "row" },
      },
      {
        "@media (min-width: 0px)": { gap: "8px" },
        "@media (min-width: 500px)": { gap: "16px" },
      },
      { margin: "10px" },
      { marginTop: "12px" },
      { marginTop: "10%" },
    );

    expect(result).toEqual({
      "display": "flex",
      "@media (min-width: 0px)": {
        flexDirection: "column",
        gap: "8px",
      },
      "@media (min-width: 500px)": {
        flexDirection: "row",
        gap: "16px",
      },
      "margin": "10px",
      "marginTop": "10%",
    });
  });
});
