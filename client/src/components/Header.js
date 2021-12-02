import { Link, useNavigate } from "react-router-dom";

import { logout } from "../api/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/login");
  };

  return (
    <header className="header section">
      <h1>Tabledash</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/logout" onClick={handleLogout}>
          Logout
        </Link>
      </nav>
    </header>
  );
};

export default Header;
