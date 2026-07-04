import { createContext, useContext, useState } from "react";

const BGContext = createContext({
  bg: "url('/homebg.jpg')",
  setBg: () => {},
});

export const BgProvider = ({ children }) => {
  const [bg, setBg] = useState("url('/homebg.jpg')");

  const value = {
    bg,
    setBg,
  };

  return <BGContext.Provider value={value}>{children}</BGContext.Provider>;
};

export const useBGContext = () => {
  const data = useContext(BGContext);
  return data;
};
