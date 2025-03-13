import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("authToken");

  if (loading) return <div>Loading...</div>;

  return user || token ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
