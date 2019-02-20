import React from "react";
import ValidationError from "../../../components/ValidationError/ValidationError";
import { shallow } from "enzyme";

describe("ValidationError", () => {
  it("renders correctly", () => {
    expect(shallow(<ValidationError />)).toMatchSnapshot();
  });
});
