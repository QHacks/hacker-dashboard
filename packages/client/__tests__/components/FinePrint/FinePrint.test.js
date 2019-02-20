import React from "react";
import FinePrint from "../../../components/FinePrint/FinePrint";
import { shallow } from "enzyme";

describe("FinePrint", () => {
  it("renders correctly", () => {
    expect(shallow(<FinePrint />)).toMatchSnapshot();
  });
});
