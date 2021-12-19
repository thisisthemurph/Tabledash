import { Button, useTheme } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import useStyles from "../hooks/useStyles";
import ThemeToggle from "./MenuBuilder/ThemeToggle";

const Nav = ({ closeNav, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useContext(UserContext);

  const theme = useTheme();
  const classes = useStyles(theme);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/login");
  };

  console.log(classes.root);

  return (
    <nav className="nav" style={{ position: "relative" }}>
      <div className="nav__section">
        <Link to="/" onClick={closeNav}>
          Home
        </Link>
        <Link to="/dashboard" onClick={closeNav}>
          Dashboard
        </Link>
      </div>
      <div className="nav__section">
        {!isAuthenticated && (
          <>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              href="/login"
              className={classes.navButton}
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              href="/register"
              className={classes.navButton}
            >
              Register
            </Button>
          </>
        )}

        {isAuthenticated && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            className={classes.navButton}
          >
            Logout
          </Button>
        )}

        <ThemeToggle isDarkMode={isDarkMode} handleOnClick={toggleTheme} />
      </div>
    </nav>
  );
};

export default Nav;
