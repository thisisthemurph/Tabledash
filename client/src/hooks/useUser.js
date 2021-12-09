import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

import useToken from "./useToken";

export default function useUser() {
  const { user } = useContext(UserContext);
  const { tokenIsValid } = useToken();

  const getUser = async () => {
    if (user) return user;
    const { user: verifiedUser, verified } = await tokenIsValid();

    return verified ? verifiedUser : null;
  };

  const [userState, setUserState] = useState(getUser());

  const saveUser = (user) => {
    setUserState(user);
  };

  return {
    user: userState,
    setUser: saveUser,
  };
}
