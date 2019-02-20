import React from "react";
import Alert from "../../../components/Alert/Alert";
import { shallow } from "enzyme";

describe("Alert", () => {
  it("renders correctly", () => {
    expect(shallow(<Alert type="TEST" />)).toMatchSnapshot();
  });
});
