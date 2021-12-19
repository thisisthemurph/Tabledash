import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import ToggleDrawer from "../ToggleDrawer";

const makeNav = ({ isDarkMode, toggleTheme }) => ({
  heading: {
    icon: "🫒",
    text: "Tabledash",
    href: "/",
  },
  menu: {
    sections: [
      {
        heading: null,
        items: [
          {
            icon: <HomeIcon />,
            text: "Home",
            href: "/",
          },
          {
            icon: <DashboardIcon />,
            text: "Dashboard",
            href: "/dashboard",
          },
        ],
      },
    ],
    bottom: [
      {
        icon: <SettingsIcon />,
        text: "Settings",
        href: "/settings",
      },
      {
        icon: isDarkMode ? <LightModeIcon /> : <DarkModeIcon />,
        text: isDarkMode ? "Use Light Mode" : "Use Dark Mode",
        onClick: toggleTheme,
        isButton: true,
      },
    ],
  },
});

const NavSideBar = ({ isDarkMode, toggleTheme }) => {
  const nav = makeNav({ isDarkMode, toggleTheme });
  return <ToggleDrawer direction="left" nav={nav} />;
};

export default NavSideBar;
