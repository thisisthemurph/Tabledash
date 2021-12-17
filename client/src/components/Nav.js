import { Button } from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const buttonStyling = {
  margin: "auto",
  width: "30%",
  marginBottom: 15,
};

const Nav = ({ closeNav }) => {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useContext(UserContext);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
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
              style={{ ...buttonStyling }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              href="/register"
              style={{ ...buttonStyling }}
            >
              Register
            </Button>
          </>
        )}

        {isAuthenticated && (
          // <Link
          //   className="button button-primary"
          //   to="/logout"
          //   onClick={handleLogout}
          // >
          //   Logout
          // </Link>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleLogout}
            style={{ ...buttonStyling }}
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Nav;
