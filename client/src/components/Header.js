import { Link, useNavigate } from "react-router-dom";

import { logout } from "../helper/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <h1 className="section">Tabledash</h1>
      <nav>
        <div className="nav__section">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
        <div className="nav__section">
          <Link className="button button-secondary" to="/login">
            Login
          </Link>
          <Link className="button button-primary" to="/register">
            Register
          </Link>
          <Link
            className="button button-secondary"
            to="/logout"
            onClick={handleLogout}
          >
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
