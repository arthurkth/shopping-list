import { useEffect, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import { nanoid } from "nanoid";

function App() {
  function loadStorageList() {
    const list = localStorage.getItem("list");
    if (list !== null) {
      return JSON.parse(list);
    }
  }

  const [list, setList] = useState(loadStorageList() || []);
  const [listItem, setListItem] = useState("");

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
      return [...prevItems, { id: nanoid(), name: listItem }];
    });
  }

  function removeItem(id: string) {
    setList((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
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
            </div>
          ))
        ) : (
          <p>Não há itens para exibir</p>
        )}
      </div>
    </div>
  );
}

export default App;
