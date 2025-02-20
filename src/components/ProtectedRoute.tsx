import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ROUTES from "../constants/routes";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

interface DecodedToken {
  role: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken
    ? jwtDecode<DecodedToken>(auth.accessToken)
    : null;

  const role = decoded?.role || "";

  console.log("Role: ", role);
  console.log("Allowed Roles: ", allowedRoles);
  console.log("Email: ", auth?.email);

  return role === "admin" || allowedRoles.includes(role) || 1 === 1 ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
