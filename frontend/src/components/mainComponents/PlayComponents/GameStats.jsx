import { formatTime } from "../../../../utils.js";
import { useNavigate } from "react-router-dom";

function GameStats({ points, time, handleReset }) {
  const navigate = useNavigate();

  return (
    <section className="flex gap-2 justify-between border border-gray-300 rounded-4xl w-full md:w-3/4 xl:w-1/3 bg-gradient-to-b from-zinc-400/70 to-zinc-600/70 p-1  shadow-[0px_0px_13px_4px_rgba(52,115,138,1)] md:bottom-auto md:left-auto md:top-6 md:right-4 mt-2">
      <div className="flex gap-1 text-xl font-bold flex items-center border border-gray-300 rounded-4xl px-3 bg-gradient-to-b from-zinc-300 to-zinc-500">
        <div className="w-10 h-10">
          <img src="/points.png" alt="points" />
        </div>
        <p className="text-3xl py-2 bg-gradient-to-r from-sky-200 to-sky-400 text-transparent bg-clip-text">
          {points}
        </p>
      </div>
      <div className="flex flex-1 gap-2 text-xl w-40 lg:w-50  font-bold flex items-center justify-center   border border-gray-300 rounded-4xl px-3 bg-gradient-to-b from-zinc-300 to-zinc-500">
        <div className="w-8 h-8 ml-1">
          <img src="/timer.png" alt="timer" />
        </div>
        <p className="text-2xl py-2 bg-gradient-to-r from-sky-200 to-sky-400 text-transparent bg-clip-text">
          {formatTime(time)}
        </p>
      </div>
      {/* Restart Btn */}
      <button
        className="bg-blue-500 hover:bg-blue-500/70 text-white font-bold py-2 px-4 rounded-4xl"
        onClick={() => {
          handleReset();
          navigate("/game-overview");
        }}
      >
        Restart
      </button>
    </section>
  );
}

export default GameStats;
