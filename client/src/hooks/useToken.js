import { useState } from "react";
import { verifyToken } from "../api/auth";

export default function useToken() {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const [token, setToken] = useState(getToken());

  /**
   * Determine if the current token is a valid token
   * @returns an Object of {user, verified}
   */
  const tokenIsValid = async () => {
    if (!token) return false;
    const { user, verified } = await verifyToken({ token });
    return { user, verified };
  };

  const saveToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  return {
    setToken: saveToken,
    token,
    tokenIsValid,
  };
}
