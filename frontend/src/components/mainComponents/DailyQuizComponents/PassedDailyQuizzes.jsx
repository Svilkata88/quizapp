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
      flex flex-col gap-1 
      bg-gradient-to-b from-zinc-100 to-zinc-400 
      mt-10 p-4 pt-0 mx-auto
      rounded-lg 
      overflow-hidden overflow-y-auto
      shadow-[var(--blue-shadow)] 
      w-[90vw]
      max-h-[50vh] md:max-h-120 2xl:max-h-140
      "
    >
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
  );
}

export default PassedDailyQuizzes;
