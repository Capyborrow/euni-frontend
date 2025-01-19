import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ROUTES from "../constants/routes";

interface ProtectedRouteProps {
  allowedRoles: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.roles?.some((role: number) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
