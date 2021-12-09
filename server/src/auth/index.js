import makeAuthList from "./authList.js";
import makeAuthEndpointHandler from "./authEndpoint.js";
import UserModel from "../database/models/User.js";

const authList = makeAuthList({ UserModel });
const authEndpointHandler = makeAuthEndpointHandler({ authList });

export default authEndpointHandler;
