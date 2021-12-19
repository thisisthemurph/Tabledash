import { useEffect, useState } from "react";

import {
  Button,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Stack,
  ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import KebabIcon from "@mui/icons-material/MoreVert";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Item from "./Item";
import BooleanAlert from "../BooleanAlert";

const SectionEditable = ({
  sectionIndex,
  name,
  description,
  items,
  closeSection,
  updateSection,
  deleteSection,
  addItem,
  updateItem,
  deleteItem,
}) => {
  const [canAddNewItem, setCanAddNewItem] = useState(false);
  const [itemEditIndex, setItemEditIndex] = useState(-1);
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  const validate = ({ name, description, price }) => {
    if (name.length < 3) return false;
    if (description.length > 160) return false;
    if (isNaN(price)) return false;
    if (!isNaN(price) && price < 0) return false;

    return true;
  };

  useEffect(() => {
    setCanAddNewItem(items.every((item) => validate({ ...item }) === true));
  }, [JSON.stringify(items)]);

  const handleUpdateSection = (key, e) => {
    updateSection(sectionIndex, key, e.target.value);
  };

  const handleAddItem = (e, sectionIndex) => {
    setCanAddNewItem(false);
    setItemEditIndex(items.length);
    addItem(e, sectionIndex);
  };

  const handleSetEditingItem = (e, itemIndex) => {
    e.preventDefault();
    setItemEditIndex(itemIndex);
  };

  const handleCloseAllItems = (e) => {
    handleSetEditingItem(e, -1);
  };

  return (
    <>
      <BooleanAlert
        title="Deleting section"
        body="Are you sure you want to delete this section? This cannot be undone!"
        open={deleteAlertOpen}
        handleClose={() => setDeleteAlertOpen(false)}
        onConfirm={(e) => deleteSection(e, sectionIndex)}
        noValue="Cancel"
        yesValue="Delete"
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
          <IconButton onClick={closeSection}>
            <ExpandLessIcon />
          </IconButton>
        </Stack>

        <TextField
          fullWidth
          label="Section Title"
          variant="outlined"
          value={name}
          onChange={(e) => handleUpdateSection("name", e)}
        />

        <TextField
          fullWidth
          label="Section Description"
          variant="outlined"
          value={description}
          multiline
          rows={2}
          onChange={(e) => handleUpdateSection("description", e)}
        />

        <Stack direction="column" spacing={2}>
          {items.map((item, idx) => (
            <Item
              key={idx}
              itemIndex={idx}
              sectionIndex={sectionIndex}
              name={item.name}
              description={item.description}
              price={item.price > 0 ? item.price / 100 : item.price}
              editMode={itemEditIndex === idx}
              activateEditMode={(e) => handleSetEditingItem(e, idx)}
              updateItem={updateItem}
              deleteItem={deleteItem}
              closeItem={handleCloseAllItems}
            />
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
