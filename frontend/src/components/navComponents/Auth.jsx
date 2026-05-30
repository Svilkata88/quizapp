import { NavLink } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext.jsx";

function Auth() {
  const { user, isAuthenticated } = useUserContext();
  const imageUrl = user?.image ? `http://localhost:8000${user.image}` : null;

  return (
    <div className="flex gap-2 md:justify-end mx-4 text-lg md:w-1/3 md:ml-auto">
      {isAuthenticated ? (
        <div className="flex gap-1 border border-gray-300 rounded-full items-center">
          <div className="rounded-full w-16 h-16 md:h-10 md:w-10 p-1 overflow-hidden flex items-center justify-center">
            <img
              src={imageUrl}
              alt="user"
              className="md:h-8 md:w-8 object-cover rounded-full"
            />
          </div>
          <span className="hidden md:block px-3 rounded-md">
            {user ? user.username : "Anonymus User"}
          </span>
          <NavLink
            className="nav nav-hover hover:rounded-2xl hidden md:block"
            to="/auth/logout"
          >
            Logout
          </NavLink>
        </div>
      ) : (
        <div className="fhidden md:block lex gap-2 items-center">
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
