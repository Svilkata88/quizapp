import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../hooks/userContext";

export default function ProtectAdminRoute() {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (user && !user.staff) {
    return <Navigate to="/questions" replace />;
  }
  return <Outlet />;
}
