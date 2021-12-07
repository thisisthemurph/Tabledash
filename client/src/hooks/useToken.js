import { useState } from "react";
import { verifyToken } from "../api/auth";

export default function useToken() {
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const [token, setToken] = useState(getToken());

  const tokenIsValid = async () => {
    if (!token) return false;
    return await verifyToken({ token });
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
