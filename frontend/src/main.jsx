import { createRoot } from "react-dom/client";
import { UserProvider } from "./hooks/userContext.jsx";
import "./index.css";
import { App } from "./App.jsx";
import { BgProvider } from "./hooks/useBG.jsx";
import { BrowserRouter } from "react-router-dom";
import { DifficultyProvider } from "./hooks/useDifficulty.jsx";
import { GameOverviewProvider } from "./hooks/useGameOverview.jsx";

const root = createRoot(document.getElementById("app"));

root.render(
  <UserProvider>
    <BgProvider>
      <DifficultyProvider>
        <GameOverviewProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </GameOverviewProvider>
      </DifficultyProvider>
    </BgProvider>
  </UserProvider>,
);
