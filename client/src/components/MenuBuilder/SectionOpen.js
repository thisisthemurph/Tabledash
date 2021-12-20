import { useContext, useEffect, useState } from "react";
import { Button, IconButton, TextField, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import Item from "./Item";
import { ConfirmationDialog } from "../AlertDialog";
import { SectionContext, ItemContext } from "./MenuBuilderContext";

const SectionEditable = ({ sectionIndex, name, description, items }) => {
  const [canAddNewItem, setCanAddNewItem] = useState(false);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const {
    handleCloseSection,
    itemEditIndex,
    handleUpdateSection,
    handleDeleteSection,
    handleAddItem,
  } = useContext(SectionContext);

  /**
   * Determines if the given item object is valid
   * @param {Object[]} item the item Object to be validated
   * @param {String} item.name the name of the item
   * @param {String} item.description the item description
   * @param {Number} item.price the item price
   * @returns true if valid, else false
   */
  const validateItem = ({ name, description, price }) => {
    if (name.length < 3) return false;
    if (description.length > 160) return false;
    if (isNaN(price)) return false;
    if (!isNaN(price) && price < 0) return false;

    return true;
  };

  useEffect(() => {
    setCanAddNewItem(items.every((item) => validateItem({ ...item }) === true));
  }, [JSON.stringify(items)]);

  return (
    <>
      <ConfirmationDialog
        title="Deleting section"
        body="Are you sure you want to delete this section? This cannot be undone!"
        open={deleteAlertOpen}
        handleClose={() => setDeleteAlertOpen(false)}
        onConfirm={handleDeleteSection}
        rejectBtnText="Cancel"
        confirmBtnText="Delete"
      />

      <Stack className="section" spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => setDeleteAlertOpen(true)}
            color="error"
          >
            <DeleteIcon />
          </Button>
          <IconButton onClick={handleCloseSection}>
            <ExpandLessIcon />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          label="Section Title"
          variant="outlined"
          value={name}
          onChange={(e) => handleUpdateSection("name", e.target.value)}
        />

        <TextField
          fullWidth
          label="Section Description"
          variant="outlined"
          value={description}
          multiline
          rows={2}
          onChange={(e) => handleUpdateSection("description", e.target.value)}
        />

        <Stack direction="column" spacing={2}>
          {items.map((item, idx) => (
            <ItemContext.Provider key={idx} value={{}}>
              <Item
                key={idx}
                itemIndex={idx}
                sectionIndex={sectionIndex}
                name={item.name}
                description={item.description}
                price={item.price > 0 ? item.price / 100 : item.price}
                editMode={itemEditIndex === idx}
              />
            </ItemContext.Provider>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleAddItem(e, sectionIndex)}
            disabled={!canAddNewItem}
          >
            Add New Item
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default SectionEditable;
