import UserModel from "../database/models/User.js";
import makeUserList from "./userList.js";
import makeUserEndpointHandler from "./userEndpoint.js";

const userList = makeUserList({ UserModel });
const userEndpointHandler = makeUserEndpointHandler({ userList });

export default userEndpointHandler;
