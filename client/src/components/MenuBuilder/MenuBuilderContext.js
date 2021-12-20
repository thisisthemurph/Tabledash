import { createContext } from "react";

export const initialItem = {
  name: "",
  description: "",
  price: 0,
};

export const initialSection = {
  name: "",
  description: "",
  items: [initialItem],
};

export const initialMenu = {
  name: "",
  description: "",
  sections: [initialSection],
};

export const MenuContext = createContext({});
export const SectionContext = createContext({});
export const ItemContext = createContext({});
