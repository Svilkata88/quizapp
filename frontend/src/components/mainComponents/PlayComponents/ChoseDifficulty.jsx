import { useNavigate } from "react-router-dom";
import { useDifficultyContext } from "../../../hooks/useDifficulty";

function ChoseDifficulty() {
  const navigate = useNavigate();
  const { difficulty, setDifficulty } = useDifficultyContext();
  return (
    <div className="absolute inset-0 h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black backdrop-blur-md opacity-30 "></div>
      <div className="chose-difficulty-container ">
        <section className="text-center">
          <p>Choose Difficulty:</p>
          <select
            className="mt-2 px-4 py-1 rounded"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </section>
        <section>
          <button
            className="mt-5 bg-green-300 hover:bg-green-400  px-4 py-2 rounded cursor-pointer text-black font-bold transition-colors"
            onClick={() => navigate("/play")}
          >
            Start Quiz
          </button>
        </section>
        <button>
          <img
            src="close.png"
            alt="close"
            className="absolute top-4 right-5 cursor-pointer hover:scale-110 transition-transform h-6 w-6"
            onClick={() => navigate("/")}
          />
        </button>
      </div>
    </div>
  );
}

export default ChoseDifficulty;
