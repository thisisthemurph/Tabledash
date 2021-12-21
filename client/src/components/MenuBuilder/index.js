import { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

import Section from "./Section";
import { MenuContext, initialMenu, initialSection } from "./MenuBuilderContext";
import useStyles from "../../hooks/useStyles";

const tempMenu = {
  name: "Tiffins Takeaway",
  description: "A chippy just around the corner.",
  sections: [
    {
      name: "Traditional Menu",
      description: "The traditional chippy stuff",
      items: [
        {
          name: "Fish and Chips",
          description: "A large battered cod and chips.",
          price: 949,
        },
        {
          name: "Sausage and Chips",
          description: "A large sausage and chips",
          price: 649,
        },
        {
          name: "Pie and Chips",
          description: "A large pie and chips",
          price: 549,
        },
      ],
    },
    {
      name: "Drinks",
      description: "The drinks menu.",
      items: [
        {
          name: "Coke",
          description: "",
          price: 199,
        },
        {
          name: "Fanta",
          description: "",
          price: 199,
        },
        {
          name: "Homemade Lemonade",
          description: "",
          price: 250,
        },
      ],
    },
  ],
};

const MenuBuilder = () => {
  const [menu, setMenu] = useState(tempMenu || initialMenu);
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);
  const classes = useStyles();

  const handleAddSection = (e) => {
    e.preventDefault();
    setMenu({ ...menu, sections: [...menu.sections, initialSection] });
    setActiveSectionIndex(menu.sections.length);
  };

  const updateMenuInfo = (key, e) => {
    setMenu({ ...menu, [key]: e.target.value });
  };

  const menuContext = {
    menu,
    setMenu,
    activeSectionIndex,
    setActiveSectionIndex,
  };

  return (
    <Box component="form">
      <Stack className={classes.container} direction="column" spacing={2}>
        <h2>Menu Builder</h2>

        <TextField
          label="Menu Title"
          variant="outlined"
          value={menu.name}
          onChange={(e) => updateMenuInfo("name", e)}
        />

        <TextField
          label="Menu Description"
          variant="outlined"
          multiline
          rows={3}
          value={menu.description}
          onChange={(e) => updateMenuInfo("description", e)}
        />
      </Stack>

      <MenuContext.Provider value={menuContext}>
        <Stack direction="column" spacing={2}>
          {menu.sections.map((section, idx) => (
            <Section
              key={idx}
              sectionIndex={idx}
              name={section.name}
              description={section.description}
              items={section.items}
            />
          ))}
        </Stack>
      </MenuContext.Provider>

      <Stack direction="row" className={classes.container}>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={handleAddSection}
        >
          Add New Section
        </Button>
      </Stack>
    </Box>
  );
};

export default MenuBuilder;
