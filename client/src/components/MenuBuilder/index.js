import { useState } from "react";

import { Stack, TextField, Button } from "@mui/material";
import { Box } from "@mui/system";

import Section from "./Section";

const initialItem = {
  name: "",
  description: "",
  price: 0,
};

const initialSection = {
  name: "",
  description: "",
  items: [initialItem],
};

const initialMenu = {
  name: "",
  description: "",
  sections: [initialSection],
};

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
          name: "Saussage and Chips",
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
  ],
};

const MenuBuilder = () => {
  const [menu, setMenu] = useState(tempMenu || initialMenu);
  const [activeSectionIndex, setActiveSectionIndex] = useState(-1);

  const handleAddItem = (e, sectionIndex) => {
    e.preventDefault();
    setMenu({
      ...menu,
      sections: menu.sections.map((section, idx) => {
        if (idx !== sectionIndex) return section;
        return { ...section, items: [...section.items, initialItem] };
      }),
    });
  };

  const handleUpdateItemInfo = (sectionIndex, itemIndex, key, value) => {
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

  const handleDeleteItem = (e, sectionIndex, itemIndex) => {
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

  const handleAddSection = (e) => {
    e.preventDefault();
    setMenu({ ...menu, sections: [...menu.sections, initialSection] });
    setActiveSectionIndex(menu.sections.length);
  };

  const handleActivateSection = (e, sectionIndex) => {
    e.preventDefault();
    setActiveSectionIndex(sectionIndex);
  };

  const handleUpdateSection = (sectionIndex, key, value) => {
    setMenu({
      ...menu,
      sections: menu.sections.map((section, idx) => {
        return idx === sectionIndex ? { ...section, [key]: value } : section;
      }),
    });
  };

  const handleDeleteSection = (e, index) => {
    e.preventDefault();

    if (menu.sections.length === 1) {
      alert("You must have at least one section in the menu.");
      return;
    }

    setMenu({
      ...menu,
      sections: menu.sections.filter((_, idx) => idx !== index),
    });
  };

  const updateMenuInfo = (key, e) => {
    setMenu({ ...menu, [key]: e.target.value });
  };

  return (
    <Box component="form" className="menubuilder">
      <Stack className="section" direction="column" spacing={2}>
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

      {/* <Stack className="menubuilder__sectionlist"> */}
      <Stack direction="column" spacing={2}>
        {menu.sections.map((section, idx) => (
          <Section
            key={idx}
            index={idx}
            name={section.name}
            description={section.description}
            items={section.items}
            isOpen={activeSectionIndex === idx}
            open={(e) => handleActivateSection(e, idx)}
            closeSection={(e) => setActiveSectionIndex(e, -1)}
            updateSection={handleUpdateSection}
            deleteSection={handleDeleteSection}
            addItem={handleAddItem}
            updateItem={handleUpdateItemInfo}
            deleteItem={handleDeleteItem}
          />
        ))}
      </Stack>
      <Button variant="contained" color="secondary" onClick={handleAddSection}>
        Add New Section
      </Button>
    </Box>
  );
};

export default MenuBuilder;
