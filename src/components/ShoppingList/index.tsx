import { useEffect, useState } from "react";
import Button from "../Button/";
import { nanoid } from "nanoid";

function ShoppingList() {
  function loadStorageList() {
    const list = localStorage.getItem("list");
    if (list !== null) {
      return JSON.parse(list);
    }
  }

  const [list, setList] = useState(loadStorageList() || []);
  const [listItem, setListItem] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    const storageList = localStorage.getItem("list");
    if (storageList !== null) {
      setList(JSON.parse(storageList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  function addItem() {
    setList((prevItems) => {
      return [...prevItems, { id: nanoid(), name: listItem, purchased: false }];
    });
  }

  function removeItem(id: string) {
    setList((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  }

  function toggleItemPurchased(id: number, isPurchased: boolean) {
    setList((prevItems) => {
      return prevItems.filter((item) => {
        if (item.id === id) {
          item.purchased = !isPurchased;
          return item;
        }
        return item;
      });
    });
  }

  return (
    <div>
      <input
        data-testid="addItemInput"
        type="text"
        value={listItem}
        onChange={({ target }) => setListItem(target.value)}
      />
      <Button onClick={addItem}>Click me</Button>
      <div data-testid="item-list">
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index}>
              <p data-testid={item.id}>{item.name}</p>
              <Button
                onClick={() => removeItem(item.id)}
                dataTestId={`button-${item.id}`}
              >
                Remover
              </Button>
              <Button
                onClick={() => toggleItemPurchased(item.id, item.purchased)}
                dataTestId={`button-toggle-${item.id}`}
              >
                {item.purchased ? "Comprado" : "Não Comprado"}
              </Button>
              <Button
                onClick={() => setModalIsOpen(!modalIsOpen)}
                dataTestId={`button-edit-${item.id}`}
              >
                Editar
              </Button>
              <dialog open={modalIsOpen}>
                <p>Editar</p>
                <form method="dialog">
                  <label htmlFor="">Novo valor</label>
                  <input type="text" />
                  <button>OK</button>
                </form>
              </dialog>
            </div>
          ))
        ) : (
          <p>Não há itens para exibir</p>
        )}
      </div>
    </div>
  );
}

export default ShoppingList;
