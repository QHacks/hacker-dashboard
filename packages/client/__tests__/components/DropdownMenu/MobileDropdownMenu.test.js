import React from "react";
import MobileDropdownMenu from "../../../components/DropdownMenu/MobileDropdownMenu";
import { shallow } from "enzyme";

describe("MobileDropdownMenu", () => {
  it("renders correctly", () => {
    expect(shallow(<MobileDropdownMenu />)).toMatchSnapshot();
  });
});
