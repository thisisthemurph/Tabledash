import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header section">
      <h1>Tabledash</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
};

export default Header;
