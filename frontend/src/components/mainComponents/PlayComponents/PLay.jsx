import Answer from "./../QuestonsComponents/Answer.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  fetchQuestions,
  apiEditUser,
  hideText,
  showText,
} from "../../../../utils.js";
import Spinner from "../../others/Spinner.jsx";
import RatingStars from "../PlayComponents/RatingStars.jsx";
import Cookies from "js-cookie";
import { useUserContext } from "../../../hooks/userContext.jsx";
import NoQuestions from "./NoQuestions.jsx";

function Questions() {
  const { user, login } = useUserContext();
  const [qIndex, setQIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  const question = questions ? questions[qIndex] : {};
  const [rating, setRating] = useState(question?.rating || 0);
  const roundedRating = (Math.round(rating * 10) / 10 || 0).toFixed(1);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const [isHidden, setIsHidden] = useState(true);
  const [page, setPage] = useState(query.get("page") || 1);
  const divRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useUserContext();

  const handleReset = () => {
    let newPoints;

    if (points <= 5) newPoints = user.points + points;
    else if (5 < points <= 10) newPoints = user.points += points + 2;
    else if (10 < points <= 15) newPoints = user.points += points + 5;
    else newPoints = user.points += points + 15;

    let xp = Math.floor(newPoints / 10);

    apiEditUser(`http://localhost:8000/api/users/profile/edit/${user.id}`, {
      points: newPoints,
      xp: user.xp !== xp ? xp : user.xp,
    })
      .then((res) => {
        if (res && res.points) {
          login({
            user: res,
            access: Cookies.get("access"),
            seed: Cookies.get("seed"),
          });
          console.log("reset successful. New points: ", res.points);
        }
      })
      .catch((err) => {
        console.error("User update failed:", err);
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
  };

  useEffect(() => {
    setLoading(true);
    const data = fetchQuestions("http://localhost:8000/api/questions", page);
    data
      .then((res) => {
        setQuestions(res.results);
        setLoading(false);
      })
      .catch(() => {
        logout();
        navigate("/auth/login");
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
  }, [question?.rating]);

  return loading ? (
    <Spinner />
  ) : questions.length > 1 ? (
    <div className="bg-gradient-to-b from-zinc-100 to-cyan-400 p-10 flex-1 relative">
      <section ref={divRef} className="flex items-center gap-2 mb-8">
        <h2 className="text-xl font-bold ">{question?.text}</h2>
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
        <RatingStars
          emptyStar="emptyStarRating.png"
          fullStar="fullStarRating.png"
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          questionId={question?.id}
          setRating={setRating}
        />
      </section>
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
        />
      </section>
      <div className="flex gap-2 mt-4 text-xl  font-bold absolute top-6 right-4">
        <img src="/points-64.png" alt="points" />
        <p className="text-5xl py-2 bg-gradient-to-b from-stone-400 to-teal-800 text-transparent bg-clip-text">
          {points}
        </p>
      </div>
      <button
        className="absolute bottom-6 right-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleReset}
      >
        Restart
      </button>
    </div>
  ) : (
    <NoQuestions />
  );
}

export default Questions;
