import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  /* Not logged in */

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  /* Role not allowed */

  if (allowedRoles && role && !allowedRoles.includes(role)) {

    if (role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    if (role === "trainer") {
      return <Navigate to="/trainer/dashboard" replace />;
    }

    if (role === "member") {
      return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;