import React from "react";
import UpdatePassword from "../../../components/Landing/UpdatePassword";
import { shallow } from "enzyme";

describe("UpdatePassword", () => {
  it("renders correctly", () => {
    expect(shallow(<UpdatePassword />)).toMatchSnapshot();
  });
});
