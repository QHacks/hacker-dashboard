import React from "react";
import Landing from "../../../components/Landing/Landing";
import { shallow } from "enzyme";

describe("Landing", () => {
  it("renders correctly", () => {
    expect(shallow(<Landing />)).toMatchSnapshot();
  });
});
