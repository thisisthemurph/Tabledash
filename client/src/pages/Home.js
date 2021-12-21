// import { Link } from "react-router-dom";
import MenuBuilder from "../components/MenuBuilder";
import useStyles from "../hooks/useStyles";

const Home = () => {
  const classes = useStyles();
  return (
    <div>
      <h1 className={classes.container}>Home Page</h1>
      <MenuBuilder />
    </div>
  );
};

export default Home;
