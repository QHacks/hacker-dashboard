import React from "react";
import Route from "../../../components/utils/Route";
import { shallow } from "enzyme";

describe("Route", () => {
  it("renders correctly", () => {
    expect(shallow(<Route />)).toMatchSnapshot();
  });
});
