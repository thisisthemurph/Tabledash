import { IconButton, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SectionNonEditable = ({ name, description, handleOpenSection }) => {
  return (
    <Stack className="section">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">{name}</Typography>
        <IconButton onClick={handleOpenSection}>
          <ExpandMoreIcon />
        </IconButton>
      </Stack>
      <Typography variant="subtitle1">{description}</Typography>
    </Stack>
  );
};

export default SectionNonEditable;
