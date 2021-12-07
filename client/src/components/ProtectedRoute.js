import { useEffect } from "react";
import { useNavigate } from "react-router";

import useToken from "../hooks/useToken";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { tokenIsValid } = useToken();

  useEffect(() => {
    (async () => {
      const validToken = await tokenIsValid();
      if (!validToken) navigate("/login");
    })();
  }, [tokenIsValid, navigate]);

  return children;
};

export default ProtectedRoute;
