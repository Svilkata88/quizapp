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
    <nav className="w-1/3 flex flex-col md:flex-row justify-start md:justify-center items-center">
      <div className="w-16 h-16 md:hidden" onClick={toggleMenu}>
        <img src="/burgermenu.png" alt="burger" />
      </div>
      <ul
        className={`flex flex-col md:flex-row items-center justify-center gap-1 text-xl ${isOpen ? "flex" : "hidden"} md:flex`}
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
        {user && !user.staff && (
          <NavLink to="/questions" className="nav nav-hover">
            Questions
          </NavLink>
        )}
        {user && user.staff && (
          <NavLink to="/admin" className="nav nav-hover">
            Admin
          </NavLink>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
