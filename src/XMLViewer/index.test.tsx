import React from "react";
import { render } from "@testing-library/react";
import XMLViewer from ".";

describe("Test Component", () => {
  it(`shows xml`, () => {
    const { container } = render(<XMLViewer xml="<notes></notes>" />);

    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent(/notes/);
  });
});
