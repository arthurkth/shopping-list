import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component Tests", () => {
  it("should render addItem input", () => {
    render(<App />);
    const input = screen.getByTestId("addItemInput");

    expect(input).toBeInTheDocument();
  });

  it("should add an item to list", () => {
    render(<App />);

    const input = screen.getByTestId("addItemInput");

    fireEvent.change(input, { target: { value: "New Item" } });

    const button = screen.getByText(/click me/i);

    fireEvent.click(button);

    const newItem = screen.getByText("New Item");
    expect(newItem).toBeInTheDocument();
  });

  it("should remove an item from list", () => {
    render(<App />);
    const input = screen.getByTestId("addItemInput");

    fireEvent.change(input, { target: { value: "New Item2" } });

    const button = screen.getByText(/click me/i);

    fireEvent.click(button);

    const newItem = screen.getByText("New Item2");
    const itemId = newItem.getAttribute("data-testid");

    expect(newItem).toBeInTheDocument();

    const buttonRemove = screen.getByTestId(`button-${itemId}`);
    fireEvent.click(buttonRemove!);

    expect(newItem).not.toBeInTheDocument();
  });
});
