import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="section">
      <h1>Home Page</h1>
      <Link to="/register">Sign up now...</Link>
    </div>
  );
};

export default Home;
