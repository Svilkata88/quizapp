import { useEffect, useState } from "react";
import { fetchOwnQuestions } from "../../../../utils";
import { useUserContext } from "../../../hooks/userContext";
import { Link } from "react-router-dom";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function QestionsList({ elementRef, type }) {
  const [questions, setQuestions] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    fetchOwnQuestions(`${BASE_URL}/api/questions/list_own_questions/`)
      .then((res) => {
        setQuestions(res);
      })
      .catch((err) => {
        console.error("Error fetching own questions:", err);
      });
  }, []);

  if (!questions) {
    return <Spinner />;
  }

  return !questions ? (
    <Spinner />
  ) : (
    <div
      className="flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 p-4 rounded-lg shadow-[var(--blue-shadow)] scrollable w-full xl:w-[1000px] max-h-150 hidden"
      ref={elementRef}
    >
      <h2 className="text-2xl font-bold mb-4">
        {questions && questions.length > 0
          ? `${user?.username}'s Questions`
          : "Still no added questions!"}
      </h2>
      <div className="relative">
        <ul className="max-h-[60vh] overflow-y-auto space-y-1 pb-10">
          {questions?.map((question) => (
            <li
              key={question.id}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md shadow-sm"
            >
              <Link
                to={`/questions/${question.id}`}
                className="flex w-full min-w-0 transition-all hover:text-sky-700 hover:font-semibold"
              >
                <span className="truncate min-w-0">{question.text}</span>
              </Link>
              <div className="w-8 h-8 relative">
                <img src="fullStarRating.png" alt="full star rating" />
                <p className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                  {question.rating}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* gradient overlay INSIDE scroll container */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-400 to-transparent" />
      </div>
    </div>
  );
}

export default QestionsList;
