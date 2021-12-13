import User from "../database/models/User.js";
import Restaurant from "../database/models/Restaurant.js";
import makeUserList from "./userList.js";
import makeUserEndpointHandler from "./userEndpoint.js";

const userList = makeUserList({ User, Restaurant });
const userEndpointHandler = makeUserEndpointHandler({ userList });

export default userEndpointHandler;
