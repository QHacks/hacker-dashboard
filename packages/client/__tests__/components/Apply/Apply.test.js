import React from "react";
import Apply from "../../../components/Apply/Apply";
import { shallow } from "enzyme";

describe("Apply", () => {
  it("renders correctly", () => {
    expect(shallow(<Apply />)).toMatchSnapshot();
  });
});
