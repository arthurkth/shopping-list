import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("Button Component Tests", () => {
  it("should render button", () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    const button = screen.getByText(/click me/i);

    expect(button).toBeInTheDocument();
  });

  it("should call onClick prop on click", () => {
    const onClick = vitest.fn();

    render(<Button onClick={onClick}>Adicionar Item</Button>);
    const button = screen.getByText("Adicionar Item");

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
