import Answer from "./../QuestonsComponents/Answer.jsx";
import Spinner from "../../others/Spinner.jsx";
import NoQuestions from "../../mainComponents/PlayComponents/NoQuestions.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import RatingStars from "../PlayComponents/RatingStars.jsx";
import { useUserContext } from "../../../hooks/userContext.jsx";
import GameStats from "../PlayComponents/GameStats.jsx";
import QuestionInfo from "../PlayComponents/QuestionInfo.jsx";
import { useTimer } from "../../../hooks/useTimer.jsx";
import { useGameOverviewContext } from "../../../hooks/useGameOverview.jsx";
import {
  fetchDailyQuestions,
  updateDailyQuiz,
  shuffleAnswers,
  updateQuestions,
  apiEditUser,
} from "../../../../utils.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function PlayDailyQuiz() {
  const { isAuthenticated, user, setUser } = useUserContext();
  const {
    setPointsOverview,
    setTimeOverview,
    setCorrectlyAnsweredCountOverview,
    setDifficultyOverview,
  } = useGameOverviewContext();
  const { logout } = useUserContext();
  const { time, start, stop, reset } = useTimer();

  const [qIndex, setQIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);
  const [wrongAnsweredQuestionId, setWrongAnsweredQuestionId] = useState(null);
  const question = questions ? questions[qIndex] : {};
  const [rating, setRating] = useState(question?.rating || 0);
  const [isInfoHidden, setInfoIsHidden] = useState(true);
  const [isStarsHidden, setStarsIsHidden] = useState(true);

  const roundedRating = (Math.round(rating * 10) / 10 || 0).toFixed(1);
  const navigate = useNavigate();
  const hasQuestion = qIndex < questions.length;

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    fetchDailyQuestions(`${BASE_URL}/api/daily_quiz/get_daily_questions`)
      .then((res) => {
        const questionsWithShuffledAnswers = res.map((question) => ({
          ...question,
          answers: shuffleAnswers(question.answers),
        }));

        setQuestions(questionsWithShuffledAnswers);
        setLoading(false);
        start();
      })
      .catch((e) => {
        if (e.error === "You have already played the daily quiz today.") {
          console.log(e.error);
          navigate("/");
          // inform user that game is refreshed because no more questions
        } else {
          logout();
          reset();
          navigate("/auth/login");
        }
      });
  }, []);

  const handleReset = () => {
    return updateDailyQuiz(`${BASE_URL}/api/daily_quiz/update_daily_quiz/`, {
      points_earned: points,
    })
      .then(() => {
        setPointsOverview(points);
        setTimeOverview(time);
        setCorrectlyAnsweredCountOverview(answeredCorrectly.length);
        setDifficultyOverview("Daily Quiz");
        reset();

        let newPoints;

        if (points <= 5) {
          newPoints = user.points + points;
        } else if (points <= 10) {
          newPoints = user.points + points + 2;
        } else if (points <= 15) {
          newPoints = user.points + points + 5;
        } else {
          newPoints = user.points + points + 15;
        }

        const xp = Math.floor(newPoints / 10);

        return apiEditUser(`${BASE_URL}/api/users/profile/edit/${user.id}`, {
          points: newPoints,
          xp: user.xp !== xp ? xp : user.xp,
          time_played: parseInt(time),
        })
          .then((res) => {
            if (res && res.points) {
              setUser({
                ...user,
                points: res.points,
                xp: res.xp,
              });
            }
          })
          .catch((err) => {
            console.error("User update failed:", err);
          });
      })
      .then(() => {
        return updateQuestions(`${BASE_URL}/api/questions/update-questions/`, {
          answeredCorrectly,
          answeredWrong: wrongAnsweredQuestionId,
        })
          .then(() => {
            setAnsweredCorrectly([]);
            setWrongAnsweredQuestionId(null);
            navigate("/game-overview");
          })
          .catch((err) => {
            console.error("Failed to update questions: ", err);
          });
      })
      .catch((error) => {
        console.error("Error completing daily quiz:", error);
      });
  };

  return loading ? (
    <Spinner />
  ) : hasQuestion ? (
    <div className="flex flex-col flex-1 bg-transparent p-2 md:p-10">
      {/* Question Section */}
      <section className="flex flex-col gap-2 items-center">
        {/* Question */}
        <h2 className="font-bold text-md md:text-xl text-stone-100 border border-gray-300 rounded-4xl w-full md:w-3/4 xl:w-1/3 bg-gradient-to-b from-zinc-400/70 to-zinc-600/70 p-1 shadow-[0px_0px_13px_4px_rgba(52,115,138,1)] pl-5 text-center">
          {question?.text}
        </h2>

        {/* Id and Stars Buttons */}
        <div className="flex gap-2">
          {/* Info Button */}
          <div
            className="h-12 hover:scale-120 transition-transform cursor-pointer"
            onClick={() => {
              if (!isStarsHidden) setStarsIsHidden(true);
              setInfoIsHidden(!isInfoHidden);
            }}
          >
            <img src="info.png" alt="info" className="w-[100%] h-[100%]" />
          </div>

          {/* Stars Button */}
          <div
            className="h-12 hover:scale-120 transition-transform cursor-pointer flex gap-1 relative"
            onClick={() => {
              if (!isInfoHidden) setInfoIsHidden(true);
              setStarsIsHidden(!isStarsHidden);
            }}
          >
            <img src="star.png" alt="info" className="w-[100%] h-[100%]" />
            <p className="absolute inset-0 flex items-center justify-center tex-[6px] font-bold">
              {roundedRating}
            </p>
          </div>
        </div>

        {/* Info and Stars Icons */}
        <div className="flex gap-2 justify-center items-center relative">
          <QuestionInfo
            isHidden={isInfoHidden}
            setIsHidden={setInfoIsHidden}
            questionId={question?.id}
          />

          <RatingStars
            emptyStar="emptyStarRating.png"
            fullStar="fullStarRating.png"
            isHidden={isStarsHidden}
            setIsHidden={setStarsIsHidden}
            questionId={question?.id}
            setRating={setRating}
            setAnsweredCorrectly={setAnsweredCorrectly}
            qID={question?.id}
          />
        </div>
      </section>

      {/* Answers Section */}
      <section className="flex flex-col gap-2 items-center flex-1">
        {/* to be done with map */}
        <Answer
          text={question?.answers[0]?.text}
          correct={question?.correct_answer.text === question?.answers[0]?.text}
          stopTimer={stop}
          disabled={disabled}
          setDisabled={setDisabled}
          setPoints={setPoints}
          qIndex={qIndex}
          setQIndex={setQIndex}
          setPage={1}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
          setWrongAnsweredQuestionId={setWrongAnsweredQuestionId}
        />
        <Answer
          text={question?.answers[1]?.text}
          correct={question?.correct_answer.text === question?.answers[1]?.text}
          stopTimer={stop}
          disabled={disabled}
          setDisabled={setDisabled}
          setPoints={setPoints}
          qIndex={qIndex}
          setQIndex={setQIndex}
          setPage={1}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
          setWrongAnsweredQuestionId={setWrongAnsweredQuestionId}
        />
        <Answer
          text={question?.answers[2]?.text}
          correct={question?.correct_answer.text === question?.answers[2]?.text}
          stopTimer={stop}
          disabled={disabled}
          setDisabled={setDisabled}
          setPoints={setPoints}
          qIndex={qIndex}
          setQIndex={setQIndex}
          setPage={1}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
          setWrongAnsweredQuestionId={setWrongAnsweredQuestionId}
        />
        <Answer
          text={question?.answers[3]?.text}
          correct={question?.correct_answer.id === question?.answers[3]?.id}
          stopTimer={stop}
          disabled={disabled}
          setDisabled={setDisabled}
          setPoints={setPoints}
          qIndex={qIndex}
          setQIndex={setQIndex}
          setPage={1}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
          setWrongAnsweredQuestionId={setWrongAnsweredQuestionId}
        />
        {question?.info &&
          disabled &&
          !answeredCorrectly.includes(question?.id) && (
            <div className="bg-gray-100 w-full md:w-1/2 lg:w-1/3 p-3 border-black border rounded-2xl rounded-tl-none mt-5 mb-5 w-1/2">
              {question.info}
            </div>
          )}
        {/* Points Indicator */}
        <GameStats points={points} time={time} handleReset={handleReset} />
      </section>
    </div>
  ) : (
    <NoQuestions />
  );
}

export default PlayDailyQuiz;
