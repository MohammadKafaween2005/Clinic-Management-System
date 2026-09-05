import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/Login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/Login" replace />;
  }

  return children;
}
