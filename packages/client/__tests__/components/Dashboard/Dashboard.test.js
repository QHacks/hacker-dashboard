import React from "react";
import Dashboard from "../../../components/Dashboard/Dashboard";
import { shallow } from "enzyme";

describe("Dashboard", () => {
  it("renders correctly", () => {
    expect(shallow(<Dashboard location={{}} />)).toMatchSnapshot();
  });
});
