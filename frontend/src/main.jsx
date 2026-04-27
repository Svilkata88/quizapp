import { createRoot } from "react-dom/client";
import { UserProvider } from "./hooks/userContext.jsx";
import "./index.css";
import { App } from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DifficultyProvider } from "./hooks/useDifficulty.jsx";

const root = createRoot(document.getElementById("app"));

root.render(
  <UserProvider>
    <DifficultyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DifficultyProvider>
  </UserProvider>,
);
