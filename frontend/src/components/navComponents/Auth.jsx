import { NavLink } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext.jsx";
import { useState } from "react";

function Auth() {
  const { user, isAuthenticated } = useUserContext();
  // const imageUrl = user?.image ? `http://localhost:8000${user.image}` : null;
  const imageUrl = user?.image ? `${user.image}` : null;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex gap-2 md:justify-end mx-4 items-center text-lg md:w-1/3 md:ml-auto">
      {isAuthenticated ? (
        <div className="flex flex-col md:flex-row gap-1 md:border border-gray-300 md:rounded-full items-center">
          <div
            className="rounded-full w-16 h-16 md:h-10 md:w-10 p-1 overflow-hidden flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              src={imageUrl}
              alt="user"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <span className="hidden md:block px-3 rounded-md">
            {user ? user.username : "Anonymus User"}
          </span>
          <NavLink
            className={`nav nav-hover hover:rounded-2xl ${isMenuOpen ? "block" : "hidden"} md:block`}
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
