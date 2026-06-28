import { Routes, Route } from "react-router-dom";
import Main from "./layouts/Main.jsx";

import Play from "./components/mainComponents/PlayComponents/PLay.jsx";
import Profile from "./components/mainComponents/Profile.jsx";
import Questions from "./components/mainComponents/QuestonsComponents/Questions.jsx";
import QuestionDetail from "./components/mainComponents/QuestonsComponents/QuestionDetail.jsx";
import Register from "./components/navComponents/Register.jsx";
import Login from "./components/navComponents/Login.jsx";
import Logout from "./components/navComponents/Logout.jsx";
import EmailPasswordReset from "./components/navComponents/EmailPasswordReset.jsx";
import ProtectAdminRoute from "./layouts/ProtectAdminRoute.jsx";
import AdminRedirectRoute from "./layouts/AdminRedirectRoute.jsx";

import Home from "./components/mainComponents/HomeComponents/Home.jsx";
import Info from "./components/navComponents/Info.jsx";
import AdminUsers from "./components/mainComponents/AdminComponents/AdminUsers.jsx";
import AdminQuestions from "./components/mainComponents/AdminComponents/AdminQuestions.jsx";
import AdminQuestionDetails from "./components/mainComponents/AdminComponents/AdminQuestiondetails.jsx";
import AdminUserDetails from "./components/mainComponents/AdminComponents/AdminUserDetails.jsx";
import CreateQuestionsForm from "./components/formsComponents/CreateQuestionsForm.jsx";
import ChoseDifficulty from "./components/mainComponents/PlayComponents/ChoseDifficulty.jsx";
import GameOverview from "./components/mainComponents/PlayComponents/GameOverview.jsx";
import AdminDashboard from "./components/navComponents/AdminDashboard.jsx";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/chose-difficulty" element={<ChoseDifficulty />} />
        <Route path="/game-overview" element={<GameOverview />} />
        <Route path="/info" element={<Info />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/auth">
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="password-reset" element={<EmailPasswordReset />} />
        </Route>
        <Route element={<AdminRedirectRoute />}>
          <Route path="questions">
            <Route index element={<Questions />} />
            <Route path=":id" element={<QuestionDetail />} />
            <Route path="create" element={<CreateQuestionsForm />} />
          </Route>
        </Route>
        <Route element={<ProtectAdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}>
            <Route path="users">
              <Route index element={<AdminUsers />} />
              <Route path=":id" element={<AdminUserDetails />} />
            </Route>
            <Route path="questions">
              <Route index element={<AdminQuestions />} />
              <Route path=":id" element={<AdminQuestionDetails />} />
            </Route>
            <Route path="issues" />
            <Route path=":id" element={<AdminUserDetails />} />
          </Route>
          <Route />
        </Route>
      </Route>
    </Routes>
  );
}
