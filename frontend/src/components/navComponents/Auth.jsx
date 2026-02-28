import { NavLink } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext.jsx";

function Auth() {
  const { user, isAuthenticated } = useUserContext();

  return (
    <div className="flex gap-2 justify-end mx-4 text-lg w-1/3 ml-auto">
      {isAuthenticated ? (
        <div className="flex gap-1 border border-gray-300 rounded-lg">
          <img src="user.png" alt="user" className="w-10 h-10 text-m" />
          <span className=" px-3 pt-1 rounded-md">
            {user ? user.username : "Anonymus User"}
          </span>
          <NavLink className="nav nav-hover" to="/auth/logout">
            Logout
          </NavLink>
        </div>
      ) : (
        <div className="flex gap-2">
          <NavLink className="nav nav-hover" to="/auth/login">
            Login
          </NavLink>
          <NavLink className="nav nav-hover" to="/auth/register">
            Register
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Auth;
