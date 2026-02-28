import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useUserContext();

  useEffect(() => {
    logout();
    navigate("/auth/login");
  }, []);

  return null;
}

export default Logout;
