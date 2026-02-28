import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { apiLogoutUser } from "../../utils.js";

const UserContext = createContext({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(Cookies.get("user") || null));
  const [access, setAccess] = useState("");
  let refresh = undefined;

  // functions to manage user state

  const login = (data) => {
    setUser(data.user);
    setAccess(data.access);
    Cookies.set("seed", data.seed, { path: "/" });
    Cookies.set("user", JSON.stringify(data.user), { path: "/" });
    Cookies.set("access", data.access, { path: "/" });
    refresh = data.refresh;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("seed");
    Cookies.remove("user");
    Cookies.remove("access");
    apiLogoutUser();
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    refresh,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const data = useContext(UserContext);
  return data;
};
