import React from "react";
import MobileMenuBar from "../../../components/MenuBar/MobileMenuBar";
import { shallow } from "enzyme";

describe("MobileMenuBar", () => {
  it("renders correctly", () => {
    expect(shallow(<MobileMenuBar />)).toMatchSnapshot();
  });
});
