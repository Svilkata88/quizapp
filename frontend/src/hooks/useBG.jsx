import { createContext, useContext, useState } from "react";

const BgChoices = {
  CATBG:
    "https://res.cloudinary.com/dnnab4vv0/image/upload/v1784735162/Pngtree_3d_cat_as_video_game_15593467_vogekl.png",
  DOGBG: "/homebg.jpg",
  LAVAPLANETD:
    "https://res.cloudinary.com/dnnab4vv0/image/upload/v1785250628/2-d_nxlakw.jpg",
  LAVAPLANETM:
    "https://res.cloudinary.com/dnnab4vv0/image/upload/v1785250627/2-m_zlr8po.png",
  CAVEWORLDD:
    "https://res.cloudinary.com/dnnab4vv0/image/upload/v1785250628/1-d_g0ergt.jpg",
  CAVEWORLDM:
    "https://res.cloudinary.com/dnnab4vv0/image/upload/v1785250628/1-m_oezzyw.png",
};

const BGContext = createContext({
  bg: "url('/homebg.jpg')",
  setBg: () => {},
});

export const BgProvider = ({ children }) => {
  const [bg, setBg] = useState(
    localStorage.getItem("gameBG") || "url('/homebg.jpg')",
  );
  const [mode, setMode] = useState(
    localStorage.getItem("themeMode") || "light",
  );

  const value = {
    bg,
    setBg,
    mode,
    setMode,
    BgChoices,
  };

  return <BGContext.Provider value={value}>{children}</BGContext.Provider>;
};

export const useBGContext = () => {
  const data = useContext(BGContext);
  return data;
};
