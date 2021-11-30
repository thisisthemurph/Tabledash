import RestaurantModel from "../database/models/RetaurantSchema.js";
import makeRestaurantList from "./restaurantList.js";
import makeRestaurantEndpointHandler from "./restaurantEndpoint.js";

const restaurantList = makeRestaurantList({ RestaurantModel });
const restaurantEndpointHandler = makeRestaurantEndpointHandler({
  restaurantList,
});

export default restaurantEndpointHandler;
