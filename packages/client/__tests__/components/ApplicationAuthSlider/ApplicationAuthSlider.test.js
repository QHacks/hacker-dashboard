import React from "react";
import ApplicationAuthSlider from "../../../components/ApplicationAuthSlider/ApplicationAuthSlider";
import { shallow } from "enzyme";

describe("ApplicationAuthSlider", () => {
  it("renders correctly", () => {
    expect(shallow(<ApplicationAuthSlider />)).toMatchSnapshot();
  });
});
