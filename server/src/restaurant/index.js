import RestaurantModel from "../database/models/retaurantSchema.js";
import makeRestaurantList from "./restaurantList.js";
import makeRestaurantEndpointHandler from "./restaurantEndpoint.js";

const restaurantList = makeRestaurantList({ RestaurantModel });
const restaurantEndpointHandler = makeRestaurantEndpointHandler({
  restaurantList,
});

export default restaurantEndpointHandler;
