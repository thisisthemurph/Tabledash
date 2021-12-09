import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";

const Nav = () => {
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
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
      <div className="nav__section">
        {!isAuthenticated && (
          <>
            <Link className="button button-secondary" to="/login">
              Login
            </Link>
            <Link className="button button-primary" to="/register">
              Register
            </Link>
          </>
        )}

        {isAuthenticated && (
          <Link
            className="button button-secondary"
            to="/logout"
            onClick={handleLogout}
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
