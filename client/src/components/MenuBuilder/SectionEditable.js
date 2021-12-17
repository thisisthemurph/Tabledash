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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import KebabIcon from "@mui/icons-material/MoreVert";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [canAddNewItem, setCanAddNewItem] = useState(false);
  const [itemEditIndex, setItemEditIndex] = useState(-1);
  const sectionOpen = Boolean(anchorEl);

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

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
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

      <Grid container spacing={2} className="section">
        <Grid item xs={10.5}>
          <TextField
            fullWidth
            label="Section Title"
            variant="outlined"
            value={name}
            onChange={(e) => handleUpdateSection("name", e)}
          />
        </Grid>

        <Grid item xs={1.5} alignContent="center" justify="center">
          <IconButton
            aria-controls="section-menu"
            aria-haspopup="true"
            aria-expanded={sectionOpen ? "true" : undefined}
            onClick={handleMenuClick}
          >
            <KebabIcon />
          </IconButton>

          <SectionOptionsMenu
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            sectionIndex={sectionIndex}
            handleSectionOpen={sectionOpen}
            handleSectionClose={closeSection}
            handleDeleteSection={() => setDeleteAlertOpen(true)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Section Description"
            variant="outlined"
            value={description}
            multiline
            rows={2}
            onChange={(e) => handleUpdateSection("description", e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
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
        </Stack>
      </Grid>

      <Grid container spacking={2} className="section">
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => handleAddItem(e, sectionIndex)}
            disabled={!canAddNewItem}
          >
            Add New Item
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const SectionOptionsMenu = ({
  anchorEl,
  onClose,
  sectionIndex,
  handleSectionOpen,
  handleSectionClose,
  handleDeleteSection,
}) => {
  return (
    <Menu
      id="section-menu"
      anchorEl={anchorEl}
      open={handleSectionOpen}
      onClose={onClose}
      MenuListProps={{
        "aria-labelledby": "item-menu-button",
      }}
    >
      <MenuItem onClick={handleSectionClose}>
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>
        <ListItemText>Close</ListItemText>
      </MenuItem>
      <MenuItem onClick={(e) => handleDeleteSection(e, sectionIndex)}>
        <ListItemIcon>
          <DeleteIcon color="error" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default SectionEditable;
