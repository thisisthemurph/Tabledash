import { Grid, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SectionNonEditable = ({ name, description, handleOpenSection }) => {
  return (
    <Grid container spacing={2} padding="1rem">
      <Grid item xs={10}>
        <h3>{name}</h3>
      </Grid>
      <Grid item xs={2}>
        <IconButton onClick={handleOpenSection}>
          <ExpandMoreIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <p>{description}</p>
      </Grid>
    </Grid>
  );
};

export default SectionNonEditable;
