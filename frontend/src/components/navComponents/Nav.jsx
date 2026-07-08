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
    <nav className="w-1/3 flex items-start md:items-center justify-center">
      {user && user.staff ? (
        <div className="flex flex-col gap-1 md:flex-row justify-center items-center bg-white md:bg-transparent p-[3px] md:p-0 rounded-2xl md:rounded-none">
          <NavLink
            to="/admin"
            className="nav-mobile nav nav-hover text-center mb-auto"
          >
            Admin Dashboard
          </NavLink>
        </div>
      ) : (
        <div className="flex flex-col gap-1 md:flex-row justify-center items-center">
          <div className="mb-auto w-16 h-16 md:hidden " onClick={toggleMenu}>
            <img src="/burgermenu.png" alt="burger" />
          </div>
          <div
            className={`${
              isOpen ? "flex" : "hidden"
            } md:flex md:flex-row items-center justify-between gap-2 md:gap-3 text-xl mt-5 md:mt-0`}
          >
            <div className="bg-white md:bg-transparent p-[3px] md:p-0 rounded-2xl md:rounded-none">
              <NavLink to="/" className="nav-mobile nav nav-hover">
                Home
              </NavLink>
            </div>

            <div className="bg-white md:bg-transparent p-[3px] md:p-0 rounded-2xl md:rounded-none">
              <NavLink to="/info" className="nav-mobile nav nav-hover">
                Info
              </NavLink>
            </div>

            <div className="bg-white md:bg-transparent p-[3px] md:p-0 rounded-2xl md:rounded-none">
              <NavLink to="/profile" className="nav-mobile nav nav-hover">
                Profile
              </NavLink>
            </div>

            {user && (
              <div className="bg-white md:bg-transparent p-[3px] md:p-0 rounded-2xl md:rounded-none">
                <NavLink to="/questions" className="nav-mobile nav nav-hover">
                  Questions
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Nav;
