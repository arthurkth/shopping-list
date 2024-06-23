import { useEffect, useState } from "react";
import Button from "../Button/";
import { nanoid } from "nanoid";
import Pagination from "../Pagination";

function ShoppingList() {
  function loadStorageList() {
    const list = localStorage.getItem("list");
    if (list !== null) {
      return JSON.parse(list);
    }
  }

  const [list, setList] = useState(loadStorageList() || []);
  const [paginatedList, setPaginatedList] = useState([]);
  const [listItem, setListItem] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [modal, setModal] = useState({
    id: "",
    name: "",
    purchased: false,
  });
  useEffect(() => {
    const storageList = localStorage.getItem("list");
    if (storageList !== null) {
      setList(JSON.parse(storageList));
    }
    paginate();
  }, []);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
    paginate();
  }, [list]);

  useEffect(() => {
    paginate();
  }, [page]);

  function paginate() {
    const start = (page - 1) * limit;
    const end = start + limit;
    setPaginatedList(list.slice(start, end));
  }

  function addItem() {
    if (listItem !== "") {
      setList((prevItems) => {
        return [
          ...prevItems,
          { id: nanoid(), name: listItem, purchased: false },
        ];
      });
      setListItem("");
    }
    return false;
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

  function showModal(item) {
    setModalIsOpen(!modalIsOpen);
    setModal(item);
  }

  function updateListItem() {
    setList((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === modal.id) {
          return modal;
        }
        return item;
      });
    });
    setModalIsOpen(false);
  }

  function nextPage() {
    if (hasMorePages()) {
      setPage((prevValue) => prevValue + 1);
    }
  }

  function previousPage() {
    setPage((prevValue) => prevValue - 1);
  }

  function hasMorePages() {
    const totalPages = Math.ceil(list.length / limit);
    return page < totalPages;
  }

  function hasPreviousPage() {
    return page > 1;
  }
  return (
    <div>
      <input
        data-testid="addItemInput"
        type="text"
        value={listItem}
        autoFocus
        onChange={({ target }) => setListItem(target.value)}
      />
      <Button onClick={addItem}>Adicionar</Button>
      <div data-testid="item-list">
        {paginatedList.length > 0 ? (
          paginatedList.map((item, index) => (
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
                onClick={() => showModal(item)}
                dataTestId={`button-edit-${item.id}`}
              >
                Editar
              </Button>
            </div>
          ))
        ) : (
          <p>Não há itens para exibir</p>
        )}
        {paginatedList.length > 0 && (
          <Pagination
            hasPreviousPage={hasPreviousPage}
            hasMorePages={hasMorePages}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        )}
      </div>
      <dialog open={modalIsOpen}>
        <p>Editar</p>
        <label htmlFor="newItemValue">Novo valor</label>
        <input
          id="newItemValue"
          type="text"
          value={modal ? modal.name : ""}
          onChange={({ target }) =>
            setModal({
              id: modal.id,
              name: target.value,
              purchased: modal.purchased,
            })
          }
        />
        <button onClick={updateListItem}>OK</button>
      </dialog>
    </div>
  );
}

export default ShoppingList;
