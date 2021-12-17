import { IconButton, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ItemNonEditable = ({ name, description, price, activateEditMode }) => {
  return (
    <Grid container spacing={0} className="section">
      <Grid item xs={11}>
        <h3>{name}</h3>
      </Grid>

      <Grid item xs={1}>
        <IconButton onClick={activateEditMode}>
          <EditIcon />
        </IconButton>
      </Grid>

      <Grid item xs={12}>
        <p>{description}</p>
      </Grid>

      <Grid item xs={12}>
        <p style={{ fontWeight: "bold" }}>{price}</p>
      </Grid>
    </Grid>
  );
};

export default ItemNonEditable;
