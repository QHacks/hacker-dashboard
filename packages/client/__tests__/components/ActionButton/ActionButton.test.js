import React from "react";
import { shallow } from "enzyme";

import ActionButton from "../../../components/ActionButton/ActionButton";

describe("ActionButton", () => {
  it("renders correctly", () => {
    expect(shallow(<ActionButton />)).toMatchSnapshot();
  });
});
