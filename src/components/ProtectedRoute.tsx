import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ROUTES from "../constants/routes";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  interface DecodedToken {
    email: string;
    role: string;
  }

  const decoded: DecodedToken | undefined = auth?.accessToken
    ? jwtDecode<DecodedToken>(auth.accessToken)
    : undefined;

  const role = decoded?.role ?? "";
  console.log("Decoded:", decoded);
  console.log("Allowed Roles:", allowedRoles);

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to={ROUTES.UNAUTHORIZED} state={{ from: location }} replace />
  ) : (
    <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
