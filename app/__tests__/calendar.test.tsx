import { render, screen } from "@testing-library/react";
import Index from "../routes/index";
import { DateTime } from "luxon";

it("should show month", () => {
  render(<Index />);

  expect(screen.getByText(DateTime.now().get("monthLong"))).toBeInTheDocument();
});
