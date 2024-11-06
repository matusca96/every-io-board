import { render, screen } from "@testing-library/react";

import { App } from "./app";

it("renders page correctly", () => {
  render(<App />);

  expect(screen.getByText(/Every.io/)).toBeInTheDocument();
});
