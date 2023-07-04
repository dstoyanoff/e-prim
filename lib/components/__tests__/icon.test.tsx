/**
 * @jest-environment jsdom
 */

import { FC } from "react";
import { render } from "@testing-library/react";
import { wrapper } from "@/utils/mock-theme";
import { BaseIcon, IconProps } from "../icon";

const ArrowIcon: FC<IconProps> = props => (
  <BaseIcon {...props}>
    <path d="M4 12H20M20 12L12 4M20 12L12 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </BaseIcon>
);

describe("icon", () => {
  test("should render icon", () =>
    expect(
      render(<ArrowIcon color="neutral.4" size={32} />, {
        wrapper,
      }).container,
    ).toMatchSnapshot());

  test("should render with default size and custom viewbox", () => expect(
    render(
      <ArrowIcon viewBoxSize={32} />, {wrapper}
    ).container
  ).toMatchSnapshot())
});
