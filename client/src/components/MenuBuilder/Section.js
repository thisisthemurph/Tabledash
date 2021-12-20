import { useContext, useState } from "react";

import { NotificationDialog } from "../AlertDialog";
import SectionOpen from "./SectionOpen";
import SectionClosed from "./SectionClosed";
import { MenuContext, SectionContext, initialItem } from "./MenuBuilderContext";

const Section = ({ sectionIndex, name, description, items }) => {
  const [editModeItemIndex, setEditModeItemIndex] = useState(-1);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { menu, setMenu, activeSectionIndex, setActiveSectionIndex } =
    useContext(MenuContext);

  const handleUpdateSection = (key, value) => {
    setMenu({
      ...menu,
      sections: menu.sections.map((section, idx) => {
        return idx === sectionIndex ? { ...section, [key]: value } : section;
      }),
    });
  };

  const handleDeleteSection = (e) => {
    e.preventDefault();

    if (menu.sections.length === 1) {
      setShowDeleteConfirmation(true);
      return;
    }

    setMenu({
      ...menu,
      sections: menu.sections.filter((_, idx) => idx !== sectionIndex),
    });
  };

  const handleOpenSection = (e) => {
    e.preventDefault();
    setActiveSectionIndex(sectionIndex);
  };

  const handleCloseSection = (e) => {
    e.preventDefault();
    setActiveSectionIndex(-1);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    setMenu({
      ...menu,
      sections: menu.sections.map((section, idx) => {
        if (idx !== sectionIndex) return section;
        return { ...section, items: [...section.items, initialItem] };
      }),
    });
  };

  const openSectionContext = {
    handleCloseSection,
    itemEditIndex: editModeItemIndex,
    setItemEditIndex: setEditModeItemIndex,
    handleUpdateSection,
    handleDeleteSection,
    handleAddItem,
  };

  const closedSectionContext = {
    handleOpenSection,
  };

  if (activeSectionIndex === sectionIndex) {
    return (
      <SectionContext.Provider value={openSectionContext}>
        <NotificationDialog
          title="Cannot Delete Section"
          body="There must be at least one section in the menu."
          handleClose={() => setShowDeleteConfirmation(false)}
          open={showDeleteConfirmation}
        />
        <SectionOpen
          sectionIndex={sectionIndex}
          name={name}
          description={description}
          items={items}
        />
      </SectionContext.Provider>
    );
  }

  return (
    <SectionContext.Provider value={closedSectionContext}>
      <SectionClosed name={name} description={description} />
    </SectionContext.Provider>
  );
};

export default Section;
