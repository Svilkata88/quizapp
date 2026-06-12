import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/userContext";

export default function AdminRedirectRoute() {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user && user.staff) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
}
