import { useContext, useState } from "react";
import {
  Paper,
  IconButton,
  TextField,
  ButtonGroup,
  Button,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";

import { MenuContext, SectionContext } from "./MenuBuilderContext";
import { ConfirmationDialog } from "../AlertDialog";

const ItemEditable = ({
  itemIndex,
  sectionIndex,
  name,
  description,
  price,
}) => {
  const { menu, setMenu } = useContext(MenuContext);
  const { setItemEditIndex } = useContext(SectionContext);
  const [deleteItemAlertOpen, setDeleteItemAlertOpen] = useState(false);

  const handleUpdateItem = (key, value) => {
    if (key === "price") {
      value = Math.floor(value * 100);
    }

    setMenu({
      ...menu,
      sections: menu.sections.map((section, sectionIdx) => {
        if (sectionIdx !== sectionIndex) return section;
        return {
          ...section,
          items: section.items.map((item, itemIdx) => {
            if (itemIdx !== itemIndex) return item;
            return { ...item, [key]: value };
          }),
        };
      }),
    });
  };

  const handleDeleteItem = (e) => {
    e.preventDefault();
    setMenu({
      ...menu,
      sections: menu.sections.map((section, sectionIdx) => {
        if (sectionIdx !== sectionIndex) return section;
        return {
          ...section,
          items: section.items.filter((_, itemIdx) => itemIdx !== itemIndex),
        };
      }),
    });
  };

  return (
    <Paper
      elevation={4}
      className="section menubuilder__item menubuilder__item--open"
    >
      <ConfirmationDialog
        title="Deleting item..."
        body={`Are you sure you would like to delete "${name}". It will not be possible to undo this action.`}
        open={deleteItemAlertOpen}
        handleClose={() => setDeleteItemAlertOpen(false)}
        onConfirm={(e) => handleDeleteItem(e)}
        confirmBtnText="Delete"
        rejectBtnText="Cancel"
      />

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <ButtonGroup>
            <Button color="secondary">
              <ArrowUpwardIcon />
            </Button>
            <Button color="secondary">
              <ArrowDownwardIcon />
            </Button>
            <Button color="error" onClick={() => setDeleteItemAlertOpen(true)}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>

          <IconButton onClick={() => setItemEditIndex(-1)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            required
            label="Item Name"
            variant="outlined"
            value={name}
            onChange={(e) => handleUpdateItem("name", e.target.value)}
          />

          <TextField
            fullWidth
            required
            label="Price (£)"
            type="number"
            value={price}
            onChange={(e) => handleUpdateItem("price", e.target.value)}
          />
        </Stack>

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={2}
          value={description}
          onChange={(e) => handleUpdateItem("description", e.target.value)}
        />
      </Stack>
    </Paper>
  );
};

export default ItemEditable;
