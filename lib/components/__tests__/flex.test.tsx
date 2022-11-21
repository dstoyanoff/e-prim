/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import { wrapper } from "@/utils/mock-theme";
import { Flex } from "../flex";

describe("flex", () => {
  test("should render flex", () => {
    expect(
      render(
        <Flex
          direction="column"
          gap={{ xs: 1, md: 4 }}
          color="neutral.4"
          background="primary.normal"
          typography="body.3"
          width={500}
          center
          height="50%"
          p={5}
          grow={1}
        >
          child
        </Flex>,
        {
          wrapper,
        },
      ).container,
    ).toMatchSnapshot();
  });
});
