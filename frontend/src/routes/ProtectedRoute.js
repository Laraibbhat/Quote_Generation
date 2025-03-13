import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("authToken");
  if (loading) return <div>Loading...</div>; // Prevent flashing

  return user || token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
