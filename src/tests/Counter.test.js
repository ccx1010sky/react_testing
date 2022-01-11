import Counter from "../components/Counter";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("Counter", () => {
  let container;

  beforeEach(() => {
    container = shallow(<Counter />);
  });

  it("should start the counter at zero", () => {
    const counter = container.find("#counter");
    expect(counter.text()).toEqual("0");
  });

  it("should increment counter on click", () => {
    container.find("#button-up").simulate("click");
    const counter = container.find("#counter");
    expect(counter.text()).toEqual("1");
  });

  it("should decrement counter on click", () => {
    container.find("#button-down").simulate("click");
    const counter = container.find("#counter");
    expect(counter.text()).toEqual("-1");
  });
});
