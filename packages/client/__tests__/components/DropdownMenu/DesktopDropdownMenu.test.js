import React from "react";
import DesktopDropdownMenu from "../../../components/DropdownMenu/DesktopDropdownMenu";
import { shallow } from "enzyme";

describe("DesktopDropdownMenu", () => {
  it("renders correctly", () => {
    expect(shallow(<DesktopDropdownMenu />)).toMatchSnapshot();
  });
});
