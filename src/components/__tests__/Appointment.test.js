import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Application";

describe("Appointment", () => {

  afterEach(cleanup);

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("renders contains a key", () => {
    expect(<Appointment />).toHaveProperty('key');
  });

  it("does something else it is supposed to do", () => {
    // ...
  });

});