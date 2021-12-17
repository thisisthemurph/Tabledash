import { useState } from "react";
import {
  Paper,
  IconButton,
  TextField,
  Grid,
  ButtonGroup,
  Button,
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

      <Grid container spacing={2}>
        <Grid item xs={10}>
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
        </Grid>

        <Grid item xs={2} align="center" justify="center">
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Grid>

        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Item Name"
            variant="outlined"
            value={name}
            onChange={(e) => handleUpdateItem(e, "name")}
          />
        </Grid>

        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChangeCapture={(e) => handleUpdateItem(e, "price")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={2}
            value={description}
            onChangeCapture={(e) => handleUpdateItem(e, "description")}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemEditable;
