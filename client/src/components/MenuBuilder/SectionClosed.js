import { useContext } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { SectionContext } from "./MenuBuilderContext";

const SectionNonEditable = ({ name, description }) => {
  const { handleOpenSection } = useContext(SectionContext);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">{name}</Typography>
        <IconButton onClick={handleOpenSection}>
          <ExpandMoreIcon fontSize="large" />
        </IconButton>
      </Stack>
      <Typography variant="subtitle1">{description}</Typography>
    </>
  );
};

export default SectionNonEditable;
