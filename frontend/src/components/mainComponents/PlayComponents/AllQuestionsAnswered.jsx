import { useNavigate } from "react-router-dom";
import { useGameOverviewContext } from "../../../hooks/useGameOverview.jsx";
import { formatTime } from "../../../../utils.js";

function AllQuestionsAnswered() {
  const navigate = useNavigate();
  const {
    pointsOverview,
    setPointsOverview,
    timeOverview,
    setTimeOverview,
    correctlyAnsweredCountOverview,
    setCorrectlyAnsweredCountOverview,
    difficultyOverview,
    setDifficultyOverview,
  } = useGameOverviewContext();

  return (
    <div className="absolute inset-0 h-screen flex items-center justify-center p-10">
      <div className="absolute inset-0 bg-black backdrop-blur-md opacity-30 "></div>
      <div className="game-overview-container h-[50%]">
        <section className="text-center">
          <h1 className="dark:text-stone-300 text-3xl/12 font-semibold px-3">
            You've answered all the questions. <br /> Good job!
          </h1>
          <section className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <img
                src="/points.png"
                alt="points"
                className="w-8 h-8 object-contain"
              />
              <p>
                <span className="font-semibold">{pointsOverview}</span> points
                earned
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img
                src="/profileTimer.png"
                alt="timer"
                className="w-8 h-6 object-contain"
              />
              <p>
                <span className="font-semibold">
                  {formatTime(timeOverview)}
                </span>{" "}
                seconds played
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img
                src="/question.png"
                alt="correctly answered"
                className="w-8 h-6 object-contain"
              />
              <p>
                <span className="font-semibold">
                  {correctlyAnsweredCountOverview}
                </span>{" "}
                correctly answered
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <img
                src="/difficulty.png"
                alt="difficulty"
                className="w-8 h-6 object-contain"
              />
              <p>
                <span className="font-semibold">{difficultyOverview}</span> mode
                played
              </p>
            </div>
          </section>
        </section>
        <button>
          <img
            src="/close.png"
            alt="close"
            className="absolute top-4 right-5 cursor-pointer hover:scale-110 transition-transform h-6 w-6"
            onClick={() => {
              setTimeOverview(0);
              setPointsOverview(0);
              setCorrectlyAnsweredCountOverview(0);
              setDifficultyOverview("easy");
              navigate("/");
            }}
          />
        </button>
        <button>
          <img
            src="/start.png"
            alt="start"
            className="absolute top-4 right-12 cursor-pointer hover:scale-110 transition-transform h-6 w-6"
            onClick={() => {
              navigate("/chose-difficulty");
            }}
          />
        </button>
      </div>
    </div>
  );
}

export default AllQuestionsAnswered;
