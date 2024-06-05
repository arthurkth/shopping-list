import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import Button from "../components/Button";
import { describe } from "vitest";

describe("App Component Tests", () => {
  it("should render the addItem input", () => {
    const { container } = render(<App />);
    const element = container.querySelector(".addItem__input");

    expect(element).toBeInTheDocument();
  });

  it("should render the AddItem button", () => {
    render(<Button onClick={() => {}}>Adicionar Item</Button>);
    screen.getByText("Adicionar Item");
  });

  it("should call onClick prop on click", () => {
    const onClick = vitest.fn();

    render(<Button onClick={onClick}>Adicionar Item</Button>);
    const button = screen.getByText("Adicionar Item");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
