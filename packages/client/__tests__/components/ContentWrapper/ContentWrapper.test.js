import React from "react";
import ContentWrapper from "../../../components/ContentWrapper/ContentWrapper";
import { shallow } from "enzyme";

describe("ContentWrapper", () => {
  it("renders correctly", () => {
    expect(shallow(<ContentWrapper />)).toMatchSnapshot();
  });
});
