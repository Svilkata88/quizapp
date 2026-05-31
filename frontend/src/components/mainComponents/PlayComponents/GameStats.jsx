import { formatTime } from "../../../../utils.js";

function GameStats({ points, time }) {
  return (
    <section className="flex flex-col gap-2 border border-gray-300 rounded-xl w-[200px] h-[150px] mx-auto bg-gradient-to-b from-zinc-300 to-zinc-500 p-3 shadow-[0px_0px_13px_4px_rgba(52,115,138,1)] absolute bottom-4 left-4 md:bottom-auto md:left-auto md:top-6 md:right-4 mt-20">
      <div className="flex gap-2 text-xl font-bold flex items-center">
        <div className="w-15 h-15">
          <img src="/points.png" alt="points" />
        </div>
        <p className="text-5xl py-2 bg-gradient-to-r from-sky-200 to-sky-400 text-transparent bg-clip-text">
          {points}
        </p>
      </div>
      <div className="flex gap-4 text-xl font-bold flex items-center">
        <div className="w-12 h-12 ml-1">
          <img src="/timer.png" alt="timer" />
        </div>
        <p className="text-2xl py-2 bg-gradient-to-r from-sky-200 to-sky-400 text-transparent bg-clip-text">
          {formatTime(time)}
        </p>
      </div>
    </section>
  );
}

export default GameStats;
