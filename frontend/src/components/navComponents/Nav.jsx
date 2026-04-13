import { NavLink } from "react-router-dom";
import { useUserContext } from "../../hooks/userContext";

function Nav() {
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return null;
  }
  return (
    <nav className="w-1/3 flex justify-center">
      <ul className="flex gap-4 text-xl ">
        <NavLink to="/" className="nav nav-hover">
          Home
        </NavLink>
        <NavLink to="/profile" className="nav nav-hover">
          Profile
        </NavLink>
        <NavLink to="/questions" className="nav nav-hover">
          Questions
        </NavLink>
      </ul>
    </nav>
  );
}

export default Nav;
