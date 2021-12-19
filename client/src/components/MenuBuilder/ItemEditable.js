import { useState } from "react";
import {
  Paper,
  IconButton,
  TextField,
  Grid,
  ButtonGroup,
  Button,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";

import BooleanAlert from "../BooleanAlert";

const ItemEditable = ({
  itemIndex,
  sectionIndex,
  name,
  description,
  price,
  deleteItem,
  handleClose,
  handleUpdateItem,
}) => {
  const [deleteItemAlertOpen, setDeleteItemAlertOpen] = useState(false);

  return (
    <Paper elevation={4} className="section">
      <BooleanAlert
        title="Deleting item..."
        body={`Are you sure you would like to delete "${name}". It will not be possible to undo this action.`}
        open={deleteItemAlertOpen}
        handleClose={() => setDeleteItemAlertOpen(false)}
        onConfirm={(e) => deleteItem(e, sectionIndex, itemIndex)}
        noValue="Cancel"
        yesValue="Delete"
      />

      <Stack spacing={2}>
        <Stack direction="row" justifyContent="space-between">
          <ButtonGroup>
            <Button>
              <ArrowUpwardIcon />
            </Button>
            <Button>
              <ArrowDownwardIcon />
            </Button>
            <Button color="error" onClick={() => setDeleteItemAlertOpen(true)}>
              <DeleteIcon />
            </Button>
          </ButtonGroup>

          <IconButton onClick={handleClose}>
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
            onChange={(e) => handleUpdateItem(e, "name")}
          />

          <TextField
            fullWidth
            required
            label="Price (£)"
            type="number"
            value={price}
            onChangeCapture={(e) => handleUpdateItem(e, "price")}
          />
        </Stack>

        <TextField
          fullWidth
          label="Description"
          multiline
          rows={2}
          value={description}
          onChangeCapture={(e) => handleUpdateItem(e, "description")}
        />
      </Stack>
    </Paper>
  );
};

export default ItemEditable;
