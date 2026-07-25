import { createContext, useContext, useState } from "react";

const BgChoices = {
  CATBG:
    "https://res.cloudinary.com/dnnab4vv0/image/upload/v1784735162/Pngtree_3d_cat_as_video_game_15593467_vogekl.png",
  DOGBG: "/homebg.jpg",
};

const BGContext = createContext({
  bg: "url('/homebg.jpg')",
  setBg: () => {},
});

export const BgProvider = ({ children }) => {
  const [bg, setBg] = useState(
    localStorage.getItem("gameBG") || "url('/homebg.jpg')",
  );

  const value = {
    bg,
    setBg,
    BgChoices,
  };

  return <BGContext.Provider value={value}>{children}</BGContext.Provider>;
};

export const useBGContext = () => {
  const data = useContext(BGContext);
  return data;
};
