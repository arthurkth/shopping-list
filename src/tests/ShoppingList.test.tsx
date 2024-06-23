import { fireEvent, render, screen } from "@testing-library/react";
import ShoppingList from "../components/ShoppingList";
import { addItemToList } from "./util";

describe("ShoppingList Component Tests", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        store: {},
        getItem(key: number) {
          return this.store[key] || null;
        },
        setItem(key: number, value: string) {
          this.store[key] = value.toString();
        },
        clear() {
          this.store = {};
        },
      },
      writable: true,
    });

    window.localStorage.clear();
  });

  it("should render addItem input", () => {
    render(<ShoppingList />);
    const input = screen.getByTestId("addItemInput");

    expect(input).toBeInTheDocument();
  });

  it("should add an item to list", () => {
    render(<ShoppingList />);

    const input = screen.getByTestId("addItemInput");

    fireEvent.change(input, { target: { value: "New Item" } });

    const button = screen.getByText(/adicionar/i);

    fireEvent.click(button);

    const newItem = screen.getByText("New Item");
    expect(newItem).toBeInTheDocument();
  });

  it("should remove an item from list", () => {
    render(<ShoppingList />);
    const newItem = addItemToList();
    const itemId = newItem.getAttribute("data-testid");

    expect(newItem).toBeInTheDocument();

    const buttonRemove = screen.getByTestId(`button-${itemId}`);
    fireEvent.click(buttonRemove!);

    expect(newItem).not.toBeInTheDocument();
  });

  it("should toggle the purchased button value", () => {
    render(<ShoppingList />);

    const newItem = addItemToList();

    const itemId = newItem.getAttribute("data-testid");

    const buttonToggle = screen.getByTestId(`button-toggle-${itemId}`);

    buttonToggle.textContent = "Não Comprado";

    fireEvent.click(buttonToggle);

    expect(buttonToggle.textContent).toBe("Comprado");

    fireEvent.click(buttonToggle);

    expect(buttonToggle.textContent).toBe("Não Comprado");
  });

  it("should open modal on click to button edit", () => {
    render(<ShoppingList />);
    const newItem = addItemToList();

    const itemId = newItem.getAttribute("data-testid");

    const buttonEdit = screen.getByTestId(`button-edit-${itemId}`);

    fireEvent.click(buttonEdit);

    const modal = screen.queryByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  it("should update the item to the new value added in the modal", () => {
    render(<ShoppingList />);

    const newItem = addItemToList();
    const itemId = newItem.getAttribute("data-testid");

    const buttonEdit = screen.getByTestId(`button-edit-${itemId}`);
    fireEvent.click(buttonEdit);

    const modal = screen.queryByRole("dialog");
    expect(modal).toBeInTheDocument();

    const input = screen.getByLabelText("Novo valor") as HTMLInputElement;
    expect(input?.value).toBe("Mock Item");

    fireEvent.change(input!, { target: { value: "New Value" } });
    expect(input?.value).toBe("New Value");

    const modalButton = screen.getByText("OK");
    fireEvent.click(modalButton);

    const updatedItem = screen.getByText("New Value");
    expect(updatedItem).toBeInTheDocument();
  });
});
