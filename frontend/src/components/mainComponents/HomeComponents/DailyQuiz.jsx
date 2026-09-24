import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCategories as fetchDailyTopoic } from "../../../../utils";
import SmallElementSpinner from "../../others/SmallElementSpinner.jsx";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function DailyQuiz() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dailyTopic, setDailyTopic] = useState("");
  const [is_played, setIsPlayed] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchDailyTopoic(`${BASE_URL}/api/daily_quiz/daily-topic/`)
      .then((data) => {
        setDailyTopic(data.daily_topic);
        setIsPlayed(data.is_played);
      })
      .catch((err) => {
        console.error("Please login to see daily topic!", err);
        setDailyTopic("Please login to see daily topic!");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dailyTopic]);

  return (
    <section className="text-gray-900 md:text-black dark:text-stone-300 bg-gradient-to-b from-zinc-200/30 to-zinc-400/0 min-h-70 lg:w-[300px] rounded-xl mt-5 mx-auto pt-2">
      <div
        className={`${is_played ? "text-red-500 bg-red-300" : "text-green-800 bg-green-300"} w-fit text-xs font-semibold ${loading ? "bg-transparent" : "px-2 py-1"} rounded-4xl mx-auto mt-2`}
      >
        {loading ? (
          <div className="relative h-6 mx-auto">
            <SmallElementSpinner />
          </div>
        ) : is_played ? (
          "Completed"
        ) : (
          "Active"
        )}
      </div>
      <h1 className="text-center text-2xl font-bold mt-1 md:mt-0 pt-2">
        Daily quizz!
      </h1>
      <div className="flex mt-2 px-2 text-center mx-auto w-fit">
        <div className="">Today topic is </div>
        <div className="relative ml-2">
          {loading ? (
            <div className="ml-10">
              <SmallElementSpinner />
            </div>
          ) : (
            <span className="font-semibold text-amber-200">{dailyTopic}</span>
          )}
        </div>
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
      <div className="flex gap-2 justify-center mx-auto mt-10">
        <button
          className={`min-w-20 bg-green-300 hover:bg-green-500 px-2 py-1 rounded-4xl cursor-pointer text-black font-bold transition-colors ${is_played ? "text-gray-500 bg-gray-300 cursor-not-allowed" : ""}`}
          onClick={() => {
            navigate("/daily-quiz");
          }}
          disabled={is_played}
        >
          Start
        </button>
        <button
          className={`flex items-center bg-amber-200 hover:bg-amber-300 px-2 py-1 pl-5 rounded-4xl cursor-pointer text-black font-bold transition-colors`}
          onClick={() => navigate("/passed-daily-quizzes")}
        >
          <p>Passed quizzes</p>
          <div className="w-4 h-5 inline-block mr-1 ml-2">
            <img src="/arrowRightGreen.png" alt="" className="h-full" />
          </div>
        </button>
      </div>
    </section>
  );
}

export default DailyQuiz;
