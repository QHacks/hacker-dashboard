import React from "react";
import App from "../../../components/App/App";
import { shallow } from "enzyme";

describe("App", () => {
  it("renders correctly", () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });
});
