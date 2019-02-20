import React from "react";
import MobileApplicationAuthSlider from "../../../components/ApplicationAuthSlider/MobileApplicationAuthSlider";
import { shallow } from "enzyme";

describe("ApplicationAuthSlider", () => {
  it("renders correctly", () => {
    expect(
      shallow(<MobileApplicationAuthSlider items={["TEST"]} />)
    ).toMatchSnapshot();
  });
});
