import { useNavigate } from "react-router-dom";
import { useGameOverviewContext } from "../../../hooks/useGameOverview.jsx";
import { formatTime } from "../../../../utils.js";

function GameOverview() {
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
    <div className="absolute inset-0 h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black backdrop-blur-md opacity-30 "></div>
      <div className="chose-difficulty-container !h-70">
        <section className="text-center">
          <h2>Game Overview</h2>
        </section>
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
              <span className="font-semibold">{formatTime(timeOverview)}</span>{" "}
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
        <button>
          <img
            src="close.png"
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
      </div>
    </div>
  );
}

export default GameOverview;
