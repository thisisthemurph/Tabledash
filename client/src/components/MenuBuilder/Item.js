import { Box } from "@mui/system";
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

  const itemContainerStyles = {};

  if (editMode) {
    return (
      <Box
        sx={{ ...itemContainerStyles, background: "lightgray" }}
        className="section"
      >
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
      </Box>
    );
  }

  return (
    <Box sx={{ ...itemContainerStyles, borderBottom: "solid 1px lightgray" }}>
      <ItemNonEditable
        itemIndex={itemIndex}
        sectionIndex={sectionIndex}
        name={name || "Add a name for this item"}
        description={description || "No description."}
        price={price || "-"}
        activateEditMode={activateEditMode}
        deleteItem={deleteItem}
      />
    </Box>
  );
};

export default Item;
