import React from "react";
import Login from "../../../components/Landing/Login";
import { shallow } from "enzyme";

describe("Login", () => {
  it("renders correctly", () => {
    expect(shallow(<Login />)).toMatchSnapshot();
  });
});
