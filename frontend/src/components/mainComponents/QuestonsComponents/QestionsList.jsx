import { useEffect, useState, useRef } from "react";
import { fetchOwnQuestions } from "../../../../utils";
import { useUserContext } from "../../../hooks/userContext";
import { Link } from "react-router-dom";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function QestionsList({ elementRef, type }) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();
  const inputRef = useRef();

  const questions =
    filteredQuestions.length > 0 ? filteredQuestions : allQuestions;

  useEffect(() => {
    setLoading(true);

    fetchOwnQuestions(`${BASE_URL}/api/questions/list_own_questions/`)
      .then((res) => {
        setAllQuestions(res);
      })
      .catch((err) => {
        console.error("Error fetching own questions:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const hanndleSearch = () => {
    const value = inputRef.current.value;
    if (allQuestions.length === 0) return;

    const filtered = allQuestions.filter((question) =>
      question.text.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredQuestions(filtered);
  };

  const clearFilter = () => {
    const value = inputRef.current.value;
    if (!value) return;
    inputRef.current.value = "";
    setFilteredQuestions([]);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div
      className="flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 p-4 rounded-lg shadow-[var(--blue-shadow)] scrollable w-full xl:max-w-[1000px] max-h-130 md:max-h-120 lg:max-h-160"
      ref={elementRef}
    >
      {/* ДА се имплементира search с натискане на enter  */}
      {/* Title and search section */}
      <section className="flex items-center gap-1 justify-between mb-4">
        <h2 className="text-xs md:text-xl font-bold max-w-[30%] md:max-w-none">
          {questions?.length === 0
            ? "Still no added questions!"
            : `${user?.username}'s Questions`}
        </h2>
        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex relative bg-zinc-100 text-zinc-700 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-black-500 rounded-xl px-2 md:px-3 py-1 w-44 lg:w-64 transition-colors duration-200 focus:ring-offset-0 focus:ring-offset-transparent">
            <input
              type="text"
              ref={inputRef}
              placeholder="Search questions..."
              className="placeholder:text-zinc-500 text-sm md:text-base focus:outline-none w-32 lg:w-52 bg-transparent"
            />
            <div
              className="w-6 h-6 hover:scale-110 transition-transform cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={() => clearFilter()}
            >
              <img src="close.png" alt="close" />
            </div>
          </div>
          <div
            className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer"
            onClick={hanndleSearch}
          >
            <img src="search.png" alt="search" />
          </div>
        </div>
      </section>

      {/* Questions list section */}
      <section className="relative">
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
        <div className="pointer-events-none absolute -bottom-5 -left-4 -right-4 h-28 bg-gradient-to-t from-stone-700 to-transparent" />
      </section>
    </div>
  );
}

export default QestionsList;
