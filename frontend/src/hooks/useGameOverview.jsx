import { createContext, useContext, useState } from "react";

const GameOverviewContext = createContext({
  difficulty: "easy",
  setDifficulty: () => {},
});

export const GameOverviewProvider = ({ children }) => {
  const [pointsOverview, setPointsOverview] = useState(0);
  const [timeOverview, setTimeOverview] = useState(0);
  const [correctlyAnsweredCountOverview, setCorrectlyAnsweredCountOverview] =
    useState(0);
  const [difficultyOverview, setDifficultyOverview] = useState("easy");

  const value = {
    pointsOverview,
    setPointsOverview,
    timeOverview,
    setTimeOverview,
    correctlyAnsweredCountOverview,
    setCorrectlyAnsweredCountOverview,
    difficultyOverview,
    setDifficultyOverview,
  };

  return (
    <GameOverviewContext.Provider value={value}>
      {children}
    </GameOverviewContext.Provider>
  );
};

export const useGameOverviewContext = () => {
  const data = useContext(GameOverviewContext);
  return data;
};
