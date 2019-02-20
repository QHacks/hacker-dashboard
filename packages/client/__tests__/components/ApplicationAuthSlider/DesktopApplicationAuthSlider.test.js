import React from "react";
import DesktopApplicationAuthSlider from "../../../components/ApplicationAuthSlider/DesktopApplicationAuthSlider";
import { shallow } from "enzyme";

describe("ApplicationAuthSlider", () => {
  it("renders correctly", () => {
    expect(
      shallow(<DesktopApplicationAuthSlider items={["TEST"]} />)
    ).toMatchSnapshot();
  });
});
