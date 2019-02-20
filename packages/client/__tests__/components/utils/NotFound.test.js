import React from "react";
import NotFound from "../../../components/utils/NotFound";
import { shallow } from "enzyme";

describe("NotFound", () => {
  it("renders correctly", () => {
    expect(shallow(<NotFound />)).toMatchSnapshot();
  });
});
