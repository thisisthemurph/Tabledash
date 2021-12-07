import ProtectedRoute from "../components/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div className="section">
        <h1>Dashboard</h1>
        <p>You can only see this if you are logged in.</p>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
