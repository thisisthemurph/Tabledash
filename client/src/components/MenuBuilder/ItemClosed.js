import { useContext } from "react";
import { IconButton, Grid, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { SectionContext } from "./MenuBuilderContext";

const ItemNonEditable = ({ itemIndex, name, description, price }) => {
  const { setItemEditIndex } = useContext(SectionContext);

  return (
    <Paper className="section">
      <Grid container>
        <Grid item xs={11}>
          <h3>{name}</h3>
        </Grid>

        <Grid item xs={1}>
          <IconButton onClick={() => setItemEditIndex(itemIndex)}>
            <EditIcon />
          </IconButton>
        </Grid>

        {description && (
          <Grid item xs={12}>
            <p>{description}</p>
          </Grid>
        )}

        <Grid item xs={12}>
          <p style={{ fontWeight: "bold" }}>
            £{!isNaN(price) ? price.toFixed(2) : price}
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ItemNonEditable;
