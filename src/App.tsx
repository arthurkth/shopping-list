import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import ShoppingListItem from "./components/ShoppingListItem";
import { nanoid } from "nanoid";

function App() {
  const [item, setItem] = useState("");
  const [shoppingList, setShoppingList] = useState([
    {
      id: nanoid(),
      name: "item",
      purchased: false,
    },
  ]);
  const [modalActive, setModalActive] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: "",
    name: "",
    purchased: false,
  });
  const handleAddItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (item != "") {
      setShoppingList((prevItems) => {
        return [
          ...prevItems,
          {
            id: nanoid(),
            name: item,
            purchased: false,
          },
        ];
      });
    }
    setItem("");
  };

  const togglePurchased = (item_id: string) => {
    setShoppingList((prevItems) => {
      const updatedList = prevItems.map((item) => {
        if (item.id === item_id) {
          return { ...item, purchased: !item.purchased };
        }
        return item;
      });
      return updatedList;
    });
  };

  const deleteItem = (item_id: string) => {
    setShoppingList((prevItems) => {
      return prevItems.filter((item) => item.id !== item_id);
    });
    setModalActive(false);
  };

  const editItem = (item_id: string) => {
    const itemToEdit = shoppingList.find((item) => item.id === item_id);
    if (itemToEdit) {
      setCurrentItem(itemToEdit);
      setModalActive(true);
    }
  };

  const setNewCurrentItemData = (name: string) => {
    setCurrentItem({
      id: currentItem.id,
      name: name,
      purchased: currentItem.purchased,
    });
  };

  const updateItem = () => {
    setShoppingList((prevItems) => {
      const updatedList = prevItems.map((item) => {
        if (item.id === currentItem.id) {
          return currentItem;
        }
        return item;
      });
      return updatedList;
    });

    setCurrentItem({ id: "", name: "", purchased: false });
    setModalActive(false);
  };
  return (
    <div>
      <form action="">
        <input
          type="text"
          value={item}
          onChange={({ target }) => setItem(target.value)}
        />
        <Button onClick={handleAddItem}>Adicionar Item</Button>
      </form>
      <div>
        <h2>Lista de Compras</h2>
        {shoppingList.length > 0 ? (
          shoppingList.map((item) => (
            <ShoppingListItem
              itemName={item.name}
              purchased={item.purchased}
              key={item.id}
              togglePurchased={() => {
                togglePurchased(item.id);
              }}
              deleteItem={() => deleteItem(item.id)}
              editItem={() => {
                editItem(item.id);
              }}
            />
          ))
        ) : (
          <p>Não há itens a exibir</p>
        )}
      </div>

      <div className={`modal ${modalActive ? "active" : ""}`}>
        <input
          type="text"
          value={currentItem.name}
          onChange={({ target }) => {
            setNewCurrentItemData(target.value);
          }}
        />
        <Button onClick={updateItem}>Confirmar</Button>
      </div>
    </div>
  );
}

export default App;