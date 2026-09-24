import { useState, useEffect } from "react";
import PassedDailyQuizzCard from "./PassedDailyQuizzCard.jsx";
import Spinner from "../../others/Spinner.jsx";
import { fetchDailyQuizSummary } from "../../../../utils.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function PassedDailyQuizzes() {
  const [loading, setLoading] = useState(false);
  const [passedDailyQuizzes, setPassedDailyQuizzes] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetchDailyQuizSummary(`${BASE_URL}/api/daily_quiz/daily_quiz_summary/`)
      .then((data) => {
        if (!data) {
          return;
        }
        setPassedDailyQuizzes(data.summary);
      })
      .catch((error) => {
        console.error("Error fetching daily quiz summary:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div
      className="
      flex gap-1 flex-wrap justify-start items-center gap-2 md:gap-4 lg:gap-6
      bg-gray-900/70
      p-5 md:p-8 lg:p-12 mx-auto
      rounded-lg 
      overflow-hidden overflow-y-auto
      shadow-[var(--blue-shadow)] 
      w-[90vw] 
  
      "
    >
      {/* TO FIX ALL DISPLAY SIZES STYLING */}
      <h2 className="text-center text-xl font-bold mb-3 text-gray-200 w-full">
        Passed Daily Quizzes
      </h2>
      <div className="flex flex-wrap gap-4 md:gap-7 items-center w-full p-1">
        {passedDailyQuizzes.length !== 0 ? (
          passedDailyQuizzes.map((quizSummary) => (
            <PassedDailyQuizzCard key={quizSummary.id} quiz={quizSummary} />
          ))
        ) : (
          <h2 className="text-center text-lg font-semibold text-gray-700 mt-4">
            No passed daily quizzes found.
          </h2>
        )}
      </div>
    </div>
  );
}

export default PassedDailyQuizzes;
