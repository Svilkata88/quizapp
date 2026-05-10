import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main.jsx";

import Play from "./components/mainComponents/PlayComponents/PLay.jsx";
import Profile from "./components/mainComponents/Profile.jsx";
import Questions from "./components/mainComponents/QuestonsComponents/Questions.jsx";
import QuestionDetail from "./components/mainComponents/QuestonsComponents/QuestionDetail.jsx";
import Register from "./components/navComponents/Register.jsx";
import Login from "./components/navComponents/Login.jsx";
import Logout from "./components/navComponents/Logout.jsx";

import Home from "./components/mainComponents/HomeComponents/Home.jsx";
import CreateQuestionsForm from "./components/formsComponents/CreateQuestionsForm.jsx";
import ChoseDifficulty from "./components/mainComponents/PlayComponents/ChoseDifficulty.jsx";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/chose-difficulty" element={<ChoseDifficulty />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="questions">
          <Route index element={<Questions />} />
          <Route path=":id" element={<QuestionDetail />} />
          <Route path="create" element={<CreateQuestionsForm />} />
        </Route>
      </Route>
    </Routes>
  );
}
