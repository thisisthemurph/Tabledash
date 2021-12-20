import ItemOpen from "./ItemOpen";
import ItemClosed from "./ItemClosed";

const Item = ({
  itemIndex,
  sectionIndex,
  name,
  description,
  price,
  editMode,
}) => {
  if (editMode) {
    return (
      <ItemOpen
        itemIndex={itemIndex}
        sectionIndex={sectionIndex}
        name={name}
        description={description}
        price={price}
      />
    );
  }

  return (
    <ItemClosed
      itemIndex={itemIndex}
      sectionIndex={sectionIndex}
      name={name}
      description={description}
      price={price}
    />
  );
};

export default Item;
