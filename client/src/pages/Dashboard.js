import { useContext } from "react";

// import MenuBuilder from "../components/MenuBuilder";
import CreateRestaurant from "../components/CreateRestaurant";
import ProtectedRoute from "../components/ProtectedRoute";
import { RestaurantContext } from "../context/RestaurantContext";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { restaurant } = useContext(RestaurantContext);
  const { restaurant: restaurantId } = user;

  return (
    <ProtectedRoute>
      <h1 className="section">Dashboard</h1>

      {!restaurantId && <CreateRestaurant />}

      {/* {!restaurant?.menus.length && <MenuBuilder />} */}

      <pre>The user: {JSON.stringify(user, null, 2)}</pre>
      <pre>The restaurant: {JSON.stringify(restaurant, null, 2)}</pre>
    </ProtectedRoute>
  );
};

export default Dashboard;
