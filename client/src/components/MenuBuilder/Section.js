import SectionEditable from "./SectionEditable";
import SectionNonEditable from "./SectionNonEditable";

const Section = ({
  index,
  name,
  description,
  items,
  isOpen,
  open,
  closeSection,
  updateSection,
  deleteSection,
  addItem,
  updateItem,
  deleteItem,
}) => {
  if (isOpen) {
    return (
      <SectionEditable
        sectionIndex={index}
        name={name}
        description={description}
        items={items}
        closeSection={closeSection}
        updateSection={updateSection}
        deleteSection={deleteSection}
        addItem={addItem}
        updateItem={updateItem}
        deleteItem={deleteItem}
      />
    );
  }

  return (
    <SectionNonEditable
      name={name}
      description={description}
      handleOpenSection={open}
    />
  );
};

export default Section;
