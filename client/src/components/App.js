import { useState } from "react";
import { useNavigate } from "react-router";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

import { login } from "../api/auth";
import { getRestaurantById } from "../api/restaurant";
import useUser from "../hooks/useUser";
import useToken from "../hooks/useToken";
import { UserContext } from "../context/UserContext";
import { RestaurantContext } from "../context/RestaurantContext";

import { createTheme, ThemeProvider } from "@mui/material";
import { pink } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: pink[200],
    },
    secondary: {
      main: pink[400],
    },
  },
});

function App() {
  const { user, setUser } = useUser();
  const { token, setToken } = useToken();
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();

  const performLogout = () => {
    setUser({});
    setToken(null);
    setIsAuthenticated(false);
    setRestaurant(null);
    localStorage.removeItem("token");
  };

  const performLogin = async ({ ...formValues }) => {
    const response = await login({ ...formValues });
    if (response.success) {
      const { user, token } = response;
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);

      // Fetch and set the restaurant for the logged in user

      const restaurantId = user.restaurant;
      if (restaurantId) {
        const { success, restaurant } = await getRestaurantById({
          restaurantId,
        });

        if (success) {
          setRestaurant(restaurant);
        }
      }

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

  const restaurantContext = {
    restaurant,
    setRestaurant,
  };

  return (
    <UserContext.Provider value={userContext}>
      <RestaurantContext.Provider value={restaurantContext}>
        <ThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </ThemeProvider>
      </RestaurantContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
