import React from "react";
import ApplicationsClosed from "../../../components/Apply/ApplicationsClosed";
import { shallow } from "enzyme";

const wrapper = shallow(<ApplicationsClosed />);

describe("ApplicationsClosed", () => {
  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
