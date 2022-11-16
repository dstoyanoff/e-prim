/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { wrapper } from "../../utils/mock-theme";
import { Grid } from "../grid";

describe("grid", () => {
  test("should render grid", () => {
    expect(
      render(
        <Grid
          gap={{ xs: 1, md: 3 }}
          columns={{
            xs: [1],
            md: [2, [100, "20%"]],
          }}
          p={3}
          width="100%"
        >
          <div>child1</div>
          <div>child2</div>
        </Grid>,
        {
          wrapper,
        },
      ).container,
    ).toMatchSnapshot();
  });
});
