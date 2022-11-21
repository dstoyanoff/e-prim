/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { wrapper } from "@/utils/mock-theme";
import { Box } from "../box";

describe("box", () => {
  test("should render box", () => {
    expect(
      render(
        <Box
          color="neutral.4"
          background="primary.normal"
          typography="body.3"
          width={500}
          height="50%"
          p={5}
          grow={1}
          onClick={console.log}
          shadow="xl"
        >
          child
        </Box>,
        {
          wrapper,
        },
      ).container,
    ).toMatchSnapshot();
  });
});
