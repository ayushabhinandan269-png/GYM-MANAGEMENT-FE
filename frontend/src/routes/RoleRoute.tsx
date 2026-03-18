import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleRoute = ({ children, allowedRoles }: Props) => {

  const user = useSelector((state: any) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;