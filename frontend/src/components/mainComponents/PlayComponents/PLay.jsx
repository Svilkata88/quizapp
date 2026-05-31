import Answer from "./../QuestonsComponents/Answer.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  fetchQuestions,
  updateQuestions,
  apiEditUser,
  hideText,
  showText,
} from "../../../../utils.js";
import Spinner from "../../others/Spinner.jsx";
import RatingStars from "../PlayComponents/RatingStars.jsx";
import Cookies from "js-cookie";
import { useUserContext } from "../../../hooks/userContext.jsx";
import NoQuestions from "./NoQuestions.jsx";
import { useDifficultyContext } from "../../../hooks/useDifficulty.jsx";
import GameStats from "./GameStats.jsx";
import { useTimer } from "../../../hooks/useTimer.jsx";
import { useGameOverviewContext } from "../../../hooks/useGameOverview.jsx";

function Questions() {
  const { user, login, isAuthenticated } = useUserContext();
  const {
    setPointsOverview,
    setTimeOverview,
    setCorrectlyAnsweredCountOverview,
    setDifficultyOverview,
  } = useGameOverviewContext();
  const { logout } = useUserContext();
  const { difficulty } = useDifficultyContext();
  const { time, start, reset } = useTimer();

  const divRef = useRef(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [qIndex, setQIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);
  const [answeredCorrectly, setAnsweredCorrectly] = useState([]);
  const question = questions ? questions[qIndex] : {};
  const [rating, setRating] = useState(question?.rating || 0);
  const [isHidden, setIsHidden] = useState(true);
  const [page, setPage] = useState(query.get("page") || 1);

  const roundedRating = (Math.round(rating * 10) / 10 || 0).toFixed(1);
  const navigate = useNavigate();

  const handleReset = () => {
    let newPoints;

    if (points <= 5) newPoints = user.points + points;
    else if (5 < points <= 10) newPoints = user.points + points + 2;
    else if (10 < points <= 15) newPoints = user.points + points + 5;
    else newPoints = user.points + points + 15;

    let xp = Math.floor(newPoints / 10);

    // update all answswered questions with +1 to their answered_questions property and +1 to the one answered wrong
    updateQuestions("http://localhost:8000/api/questions/update-questions/", {
      answeredCorrectly: answeredCorrectly,
      answeredWrong: questions[qIndex]?.id,
    }).catch((err) => {
      console.error("Failed to update questions: ", err);
    });

    // update user points and xp
    apiEditUser(`http://localhost:8000/api/users/profile/edit/${user.id}`, {
      points: newPoints,
      xp: user.xp !== xp ? xp : user.xp,
      time_played: parseInt(time),
    })
      .then((res) => {
        if (res && res.points) {
          setPointsOverview(points);
          setTimeOverview(time);
          setCorrectlyAnsweredCountOverview(answeredCorrectly.length);
          setDifficultyOverview(difficulty);

          login({
            user: res,
            access: Cookies.get("access"),
            seed: Cookies.get("seed"),
          });
        }
      })
      .catch((err) => {
        console.error("User update failed:", err);
      })
      .finally(() => {
        setAnsweredCorrectly([]);
      });

    const seed = fetchQuestions(
      "http://localhost:8000/api/questions/reset",
      page,
    );
    seed.then((res) => {
      Cookies.set("seed", res.seed);
      if (page === 1) {
        setLoading(true);
        fetchQuestions("http://localhost:8000/api/questions", page).then(
          (res) => {
            setQuestions(res.results);
            setLoading(false);
          },
        );
      } else setPage(1);
      setDisabled(false);
      setQIndex(0);
      setPoints(0);
    });

    console.log("Reset successful!");
  };

  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    const data = fetchQuestions(
      "http://localhost:8000/api/questions",
      page,
      difficulty,
    );
    data
      .then((res) => {
        setQuestions(res.results);
        setLoading(false);
        start();
      })
      .catch((e) => {
        if (e.detail === "Invalid page.") {
          handleReset();
          navigate("/");
        } else {
          logout();
          reset();
          navigate("/auth/login");
        }
      });
  }, [page]);

  useEffect(() => {
    if (qIndex === questions.length - 1) {
      setPage((prev) => prev + 1);
      setQIndex(0);
    }
  }, [qIndex]);

  useEffect(() => {
    if (question) {
      setRating(question.rating);
    }
  }, [question?.id]);

  return loading ? (
    <Spinner />
  ) : questions.length > 1 ? (
    <div className="bg-transparent p-2 md:p-10 flex-1 relative">
      {/* Question Section */}
      <section
        ref={divRef}
        className="flex flex-col md:flex-row items-center gap-2 mb-2 md:mb-8"
      >
        <h2 className="font-bold text-md md:text-xl">{question?.text}</h2>

        <div className="flex gap-2">
          <div
            className="h-12 hover:scale-120 transition-transform cursor-pointer"
            onMouseEnter={() =>
              showText(
                divRef,
                `Question ID: ${question?.id}`,
                "text-lg font-mono ",
              )
            }
            onMouseLeave={() => hideText(divRef)}
          >
            <img src="info.png" alt="info" className="w-[100%] h-[100%]" />
          </div>

          <div
            className="h-12 hover:scale-120 transition-transform cursor-pointer flex gap-1 relative"
            onClick={() => setIsHidden(!isHidden)}
          >
            <img src="star.png" alt="info" className="w-[100%] h-[100%]" />
            <p className="absolute inset-0 flex items-center justify-center tex-[6px] font-bold">
              {roundedRating}
            </p>
          </div>
        </div>

        <RatingStars
          emptyStar="emptyStarRating.png"
          fullStar="fullStarRating.png"
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          questionId={question?.id}
          setRating={setRating}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
        />
      </section>

      {/* Answers Section */}
      <section className="flex flex-col gap-2">
        {/* to be done with map */}
        <Answer
          text={question?.answers[0]?.text}
          correct={question?.correct_answer.text === question?.answers[0]?.text}
          disabled={disabled}
          setDisabled={setDisabled}
          setPoints={setPoints}
          qIndex={qIndex}
          setQIndex={setQIndex}
          setPage={setPage}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
        />
        <Answer
          text={question?.answers[1]?.text}
          correct={question?.correct_answer.text === question?.answers[1]?.text}
          disabled={disabled}
          setDisabled={setDisabled}
          setPoints={setPoints}
          qIndex={qIndex}
          setQIndex={setQIndex}
          setPage={setPage}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
        />
        <Answer
          text={question?.answers[2]?.text}
          correct={question?.correct_answer.text === question?.answers[2]?.text}
          disabled={disabled}
          setDisabled={setDisabled}
          setPoints={setPoints}
          qIndex={qIndex}
          setQIndex={setQIndex}
          setPage={setPage}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
        />
        <Answer
          text={question?.answers[3]?.text}
          correct={question?.correct_answer.text === question?.answers[3]?.text}
          disabled={disabled}
          setDisabled={setDisabled}
          setPoints={setPoints}
          qIndex={qIndex}
          setQIndex={setQIndex}
          setPage={setPage}
          setAnsweredCorrectly={setAnsweredCorrectly}
          qID={question?.id}
        />
        {question?.info && (
          <div className="bg-gray-100 p-3 border-black border rounded-2xl rounded-tl-none mt-10 w-1/2">
            {question.info}
          </div>
        )}
      </section>

      {/* Points Indicator */}
      <GameStats points={points} time={time} />

      {/* Restart Btn */}
      <button
        className="absolute bottom-6 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          handleReset();
          navigate("/game-overview");
        }}
      >
        Restart
      </button>
    </div>
  ) : (
    <NoQuestions />
  );
}

export default Questions;
