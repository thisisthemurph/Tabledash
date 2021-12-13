import { useContext } from "react";
import CreateRestaurant from "../components/CreateRestaurant";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { restaurant } = user;

  return (
    <ProtectedRoute>
      <h1 className="section">Dashboard</h1>

      {!restaurant && <CreateRestaurant />}

      <pre>The user: {JSON.stringify(user, null, 2)}</pre>
    </ProtectedRoute>
  );
};

export default Dashboard;
