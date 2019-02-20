import React from "react";
import DesktopMenuBar from "../../../components/MenuBar/DesktopMenuBar";
import { shallow } from "enzyme";

describe("DesktopMenuBar", () => {
  it("renders correctly", () => {
    expect(shallow(<DesktopMenuBar />)).toMatchSnapshot();
  });
});
