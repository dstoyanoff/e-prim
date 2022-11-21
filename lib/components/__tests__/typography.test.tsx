/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { wrapper } from "@/utils/mock-theme";
import { Typography } from "../typography";

describe("typography", () => {
  test("should render typography", () => {
    expect(
      render(
        <Typography
          variant="title.1"
          color="neutral.4"
          background="primary.normal"
          p={3}
          align="center"
          noWrap
          textOverflow="ellipsis"
        >
          child
        </Typography>,
        {
          wrapper,
        },
      ).container,
    ).toMatchSnapshot();
  });
});
