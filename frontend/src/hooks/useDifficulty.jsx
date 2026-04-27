import { createContext, useContext, useState } from "react";

const DifficultyContext = createContext({
  difficulty: "easy",
  setDifficulty: () => {},
});

export const DifficultyProvider = ({ children }) => {
  const [difficulty, setDifficulty] = useState("easy");

  const value = {
    difficulty,
    setDifficulty,
  };

  return (
    <DifficultyContext.Provider value={value}>
      {children}
    </DifficultyContext.Provider>
  );
};

export const useDifficultyContext = () => {
  const data = useContext(DifficultyContext);
  return data;
};
