import makeAuthList from "./authList.js";
import makeAuthEndpointHandler from "./authEndpoint.js";
import User from "../database/models/User.js";

const authList = makeAuthList({ User });
const authEndpointHandler = makeAuthEndpointHandler({ authList });

export default authEndpointHandler;
