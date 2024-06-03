import Button from "./Button";

type ShoppingListItem = {
  itemName: string;
  purchased: boolean;
  togglePurchased: () => void;
  deleteItem: () => void;
  editItem: () => void;
};

const ShoppingListItem = ({
  itemName,
  purchased,
  togglePurchased,
  deleteItem,
  editItem,
}: ShoppingListItem) => {
  return (
    <div>
      <p>{itemName}</p>
      <Button onClick={togglePurchased}>
        {purchased ? "Comprado" : "Não Comprado"}
      </Button>
      <Button onClick={editItem} className="shopping__list__item__button--edit">
        Editar
      </Button>
      <Button
        onClick={deleteItem}
        className="shopping__list__item__button--delete"
      >
        Excluir
      </Button>
    </div>
  );
};

export default ShoppingListItem;
