import { useContext } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <ProtectedRoute>
      <div className="section">
        <h1>Dashboard</h1>
        <p>You can only see this if you are logged in.</p>
        <pre>The user: {JSON.stringify(user, null, 2)}</pre>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
