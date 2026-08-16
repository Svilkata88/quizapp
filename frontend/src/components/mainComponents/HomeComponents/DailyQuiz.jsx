import React from "react";

function DailyQuiz() {
  return (
    <section className="text-gray-900 md:text-black dark:text-stone-300 bg-gradient-to-b from-zinc-200/30 to-zinc-400/0 min-h-70 lg:w-[300px] rounded-xl mt-5 mx-auto">
      <h1 className="text-center text-2xl font-bold mt-1 md:mt-0 p-5">
        Daily quizz!
      </h1>
      <div className="mt-2 ml-2 text-center">
        Today topic is <span className="font-semibold">Polictics</span>
      </div>
      <div className="flex gap-2 justify-between mx-6 mt-6">
        <div className="w-12 h-12 text-center">
          <img src="/medalFirst.png" alt="First place" />
          15 xp
        </div>
        <div className="w-12 h-12 text-center">
          <img src="/medalSecond.png" alt="First place" />
          10 xp
        </div>
        <div className="w-12 h-12 text-center">
          <img src="/medalThird.png" alt="First place" />5 xp
        </div>
      </div>
      <button
        className="mt-10 block w-fit mx-auto min-w-20 bg-green-300 hover:bg-green-500 px-2 py-1 rounded-4xl cursor-pointer text-black font-bold transition-colors"
        onClick={() => navigate("/")}
      >
        Start
      </button>
    </section>
  );
}

export default DailyQuiz;
