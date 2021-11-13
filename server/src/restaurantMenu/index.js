import RestaurantModel from "../database/models/retaurantSchema.js";
import makeMenuList from "./menuList.js";
import makeMenuEndpointHandler from "./menuEndpoint.js";

const menuList = makeMenuList({ RestaurantModel });
const menuEndpointHandler = makeMenuEndpointHandler({ menuList });

export default menuEndpointHandler;
