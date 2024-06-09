import { fireEvent, render, screen } from "@testing-library/react";

export function addItemToList() {
  const input = screen.getByTestId("addItemInput");

  fireEvent.change(input, { target: { value: "Mock Item" } });

  const button = screen.getByText(/click me/i);

  fireEvent.click(button);

  const newItem = screen.getByText("Mock Item");
  expect(newItem).toBeInTheDocument();
  return newItem;
}
