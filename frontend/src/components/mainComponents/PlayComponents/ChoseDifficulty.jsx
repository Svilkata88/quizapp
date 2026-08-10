import { useNavigate } from "react-router-dom";
import { useDifficultyContext } from "../../../hooks/useDifficulty";

function ChoseDifficulty() {
  const navigate = useNavigate();
  const { difficulty, setDifficulty } = useDifficultyContext();
  return (
    <section className="flex items-center h-full px-4">
      <div className="absolute inset-0 bg-black backdrop-blur-md opacity-30"></div>
      <div className="chose-difficulty-container">
        <section className="text-center">
          <p className="dark:text-stone-300">Choose Difficulty:</p>
          <select
            className="appearance-none mt-2 px-3 py-2 rounded-4xl min-w-28"
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
            className="mt-4 min-w-28 bg-lime-200 hover:bg-green-400 px-4 py-2 rounded-4xl cursor-pointer text-black font-bold transition-colors"
            onClick={() => navigate("/play")}
          >
            Start Quiz
          </button>
        </section>
        <button>
          <img
            src="close.png"
            alt="close"
            className="absolute top-3 right-5 cursor-pointer hover:scale-110 transition-transform h-6 w-6"
            onClick={() => navigate("/")}
          />
        </button>
      </div>
    </section>
  );
}

export default ChoseDifficulty;
