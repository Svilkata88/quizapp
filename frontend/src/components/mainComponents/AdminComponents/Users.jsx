import { useState, useEffect } from "react";
import { fetchAllQuestions } from "../../../../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Users() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState();

  useEffect(() => {
    setLoading(true);

    fetchAllQuestions(`${BASE_URL}/api/questions/admin/all-questions/`)
      .then((res) => {
        setAllQuestions(res);
      })
      .catch((err) => {
        console.error("Error fetching all questions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>All users</h2>
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
  );
}

export default Users;
