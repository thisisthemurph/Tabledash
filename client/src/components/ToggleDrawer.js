import { Fragment, useState } from "react";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const ToggleDrawer = ({ position, nav }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "shift")) return;
    setIsOpen(open);
  };

  const makeNavigationList = ({ position, nav }) => (
    <Box
      sx={{ width: position === "top" || position === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      style={{ display: "relative" }}
    >
      {/* Present the header */}

      {nav.heading.text && (
        <ListItemButton
          key={nav.heading.text}
          component={nav.heading?.href ? "a" : undefined}
          href={nav.heading?.href || undefined}
          onClick={nav.heading?.onClick || undefined}
          sx={{ mb: 2 }}
        >
          <ListItemIcon>{nav.heading.icon}</ListItemIcon>
          <ListItemText
            sx={{ my: 0 }}
            primary={nav.heading.text}
            primaryTypographyProps={{
              fontSize: "1.75rem",
              fontWeight: "medium",
              letterSpacing: 0,
            }}
          >
            {nav.heading.text}
          </ListItemText>
        </ListItemButton>
      )}

      {/* The main aspects of the navigation */}

      {nav.menu.sections.map((section, idx) => {
        return (
          <>
            {section.heading ? (
              <ListItemButton
                component="a"
                href={section.heading.href}
                sx={{ mb: 2 }}
              >
                <ListItemIcon>{section.heading.icon}</ListItemIcon>
                <ListItemText
                  sx={{ my: 0 }}
                  primary={section.heading.text}
                  primaryTypographyProps={{
                    fontSize: "1.25rem",
                    fontWeight: "medium",
                    letterSpacing: 0,
                  }}
                >
                  {section.heading.text}
                </ListItemText>
              </ListItemButton>
            ) : null}
            <List key={idx.toString()}>
              {section.items.map((item) => (
                <ListItemButton
                  key={item.text}
                  component={item?.href ? "a" : undefined}
                  href={item?.href || undefined}
                  onClick={item?.onClick || undefined}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </ListItemButton>
              ))}
            </List>
            {idx < nav.menu.sections.length - 1 ? <Divider /> : null}
          </>
        );
      })}

      {/* The bottom items of the navigation */}

      <List
        key="NAV_BOTTOM"
        style={{ position: "absolute", bottom: 0, width: "100%" }}
      >
        {nav.menu.bottom.map((item) => (
          <ListItemButton
            key={item.text}
            component={item?.href ? "a" : undefined}
            href={item?.href || undefined}
            onClick={item?.onClick || undefined}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Fragment>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        />
      </IconButton>
      <Drawer anchor={position} open={isOpen} onClose={toggleDrawer(false)}>
        {makeNavigationList({ position, nav })}
      </Drawer>
    </Fragment>
  );
};

export default ToggleDrawer;
