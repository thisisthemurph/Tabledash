import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

import Nav from "./Nav";
import { Button, Stack } from "@mui/material";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = (e) => {
    e.preventDefault();
    setNavOpen(!navOpen);
  };

  return (
    <header className="header">
      <Stack direction="row" justifyContent="space-between">
        <h1 className="section">Tabledash</h1>
        <Button onClick={toggleNav}>
          <MenuIcon fontSize="large" />
        </Button>
      </Stack>
      {navOpen && <Nav closeNav={() => setNavOpen(false)} />}
    </header>
  );
};

export default Header;
