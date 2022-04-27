import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Application";

describe("Appointment", () => {

  afterEach(cleanup);

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("renders its `children` prop as text", () => {
    render(<Header />);
  });

  it("does something else it is supposed to do", () => {
    // ...
  });

});