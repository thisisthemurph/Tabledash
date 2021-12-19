import ItemEditable from "./ItemEditable";
import ItemNonEditable from "./ItemNonEditable";

const Item = ({
  itemIndex,
  sectionIndex,
  name,
  description,
  price,
  editMode,
  closeItem,
  updateItem,
  deleteItem,
  activateEditMode,
}) => {
  const handleUpdateItem = (e, key) => {
    updateItem(sectionIndex, itemIndex, key, e.target.value);
  };

  if (editMode) {
    return (
      <ItemEditable
        itemIndex={itemIndex}
        sectionIndex={sectionIndex}
        name={name}
        description={description}
        price={price}
        deleteItem={deleteItem}
        handleClose={closeItem}
        handleUpdateItem={handleUpdateItem}
      />
    );
  }

  return (
    <ItemNonEditable
      itemIndex={itemIndex}
      sectionIndex={sectionIndex}
      name={name || "Add a name for this item"}
      description={description || "No description."}
      price={price || "-"}
      activateEditMode={activateEditMode}
      deleteItem={deleteItem}
    />
  );
};

export default Item;
