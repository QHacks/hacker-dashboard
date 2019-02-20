import React from "react";
import ForgotPassword from "../../../components/Landing/ForgotPassword";
import { shallow } from "enzyme";

describe("ForgotPassword", () => {
  it("renders correctly", () => {
    expect(shallow(<ForgotPassword />)).toMatchSnapshot();
  });
});
