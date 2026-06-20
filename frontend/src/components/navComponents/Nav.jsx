import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";

function Nav() {
  const { isAuthenticated } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserContext();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="w-1/3 flex items-center justify-center">
      {user && user.staff ? (
        <NavLink to="/admin" className="nav nav-hover text-center">
          Admin Dashboard
        </NavLink>
      ) : (
        <div className="flex flex-col gap-1 md:flex-row justify-center items-center">
          <div className="w-16 h-16 md:hidden" onClick={toggleMenu}>
            <img src="/burgermenu.png" alt="burger" />
          </div>
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } md:flex md:flex-row items-center justify-between gap-3 text-xl mt-5 md:mt-0`}
          >
            <NavLink to="/" className="nav nav-hover">
              Home
            </NavLink>

            <NavLink to="/info" className="nav nav-hover">
              Info
            </NavLink>

            <NavLink to="/profile" className="nav nav-hover">
              Profile
            </NavLink>

            {user && (
              <NavLink to="/questions" className="nav nav-hover">
                Questions
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
