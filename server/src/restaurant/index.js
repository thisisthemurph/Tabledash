import User from "../database/models/User.js";
import RestaurantModel from "../database/models/Restaurant.js";
import makeRestaurantList from "./restaurantList.js";
import makeRestaurantEndpointHandler from "./restaurantEndpoint.js";

const restaurantList = makeRestaurantList({ User, RestaurantModel });
const restaurantEndpointHandler = makeRestaurantEndpointHandler({
  restaurantList,
});

export default restaurantEndpointHandler;
