import { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import { login } from "../api/auth";
import useUser from "../hooks/useUser";
import useToken from "../hooks/useToken";
import { UserContext } from "../context/UserContext";

function App() {
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const navigate = useNavigate();

  const performLogout = () => {
    setUser({});
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const performLogin = async ({ ...formValues }) => {
    const response = await login({ ...formValues });
    if (response.success) {
      const { user, token } = response;
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  };

  const userContext = {
    user,
    setUser,
    token,
    setToken,
    login: performLogin,
    logout: performLogout,
    isAuthenticated,
  };

  return (
    <UserContext.Provider value={userContext}>
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
