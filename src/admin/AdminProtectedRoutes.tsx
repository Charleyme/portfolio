import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
