import { Link } from "react-router-dom";
import Spinner from "../../others/Spinner";
import { useState, useEffect, useRef } from "react";
import { fetchAllQuestions } from "../../../../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminQuestions() {
  const [loading, setLoading] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const inputRef = useRef(null);

  const questions =
    filteredQuestions.length > 0 ? filteredQuestions : allQuestions;

  const handleSearch = () => {
    const value = inputRef.current.value;
    if (allQuestions.length === 0) return;

    const filtered = allQuestions.filter((question) =>
      question.text.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredQuestions(filtered);
  };

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

  return loading ? (
    <Spinner />
  ) : (
    <section
      className={`relative ${questions ? "" : " hidden"} flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-5 md:mt-10 mx-auto p-4 rounded-lg shadow-[var(--blue-shadow)] scrollable w-full xl:w-[1000px] max-h-150`}
    >
      <div className="flex flex-col gap-2 justify-between items-start px-2 w-full">
        <div className="flex justify-between items-center gap-3 w-full">
          <h2 className="text-base flex-1">All questions</h2>
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
                onClick={() => {
                  setFilteredQuestions([]);
                  inputRef.current.value = "";
                }}
              >
                <img src="/close.png" alt="close" />
              </div>
            </div>
            <div
              className="w-8 h-8 hover:scale-110 transition-transform cursor-pointer"
              onClick={() => handleSearch()}
            >
              <img src="/search.png" alt="search" />
            </div>
          </div>
        </div>
        <section className="flex w-full gap-1 items-center text-sm text-gray-500">
          <h5 className="font-medium text-gray-500">Status:</h5>
          <button
            className={`px-2 h-4 text-xs text-black text-center rounded-full flex-shrink-0 bg-zinc-100 border border-gray-500 cursor-pointer hover:scale-110 transition-transform`}
            onClick={() => setFilteredQuestions([])}
          >
            All
          </button>
          <button
            className={`p-1 h-4 w-4 rounded-full flex-shrink-0 bg-green-500 border border-gray-500 cursor-pointer hover:scale-110 transition-transform`}
            onClick={() =>
              setFilteredQuestions(
                allQuestions.filter((q) => q.status === "confirmed"),
              )
            }
          ></button>
          <button
            className={`p-1 h-4 w-4 rounded-full flex-shrink-0 bg-amber-500 border border-gray-500 cursor-pointer hover:scale-110 transition-transform`}
            onClick={() =>
              setFilteredQuestions(
                allQuestions.filter((q) => q.status === "pending"),
              )
            }
          ></button>
          <button
            className={`p-1 h-4 w-4 rounded-full flex-shrink-0 bg-red-500 border border-gray-500 cursor-pointer hover:scale-110 transition-transform`}
            onClick={() =>
              setFilteredQuestions(
                allQuestions.filter((q) => q.status === "rejected"),
              )
            }
          ></button>
          <Link
            to="/admin/questions/categories"
            className="flex gap-1 ml-auto px-2 h-4 text-xs text-black text-center rounded-full flex-shrink-0 bg-zinc-100 border border-gray-500 cursor-pointer hover:scale-110 transition-transform"
          >
            Categories
            <div className="h-4 ml-1">
              <img src="/arrowRightGreen.png" alt="" className="h-full" />
            </div>
          </Link>
        </section>
      </div>
      <ul className="max-h-[60vh] overflow-y-auto space-y-1 pb-10">
        {questions?.map((question) => (
          <li
            key={question.id}
            className="flex flex-1 gap-2 items-center justify-between px-3 py-2 rounded-md shadow-sm"
          >
            <div
              className={`p-1 rounded-full flex-shrink-0 ${
                question?.status === "confirmed"
                  ? "bg-green-500"
                  : question?.status === "pending"
                    ? "bg-amber-500"
                    : "bg-red-600"
              } border border-gray-500`}
            />
            <Link
              to={`./${question.id}`}
              className="flex w-full min-w-0 transition-all hover:text-sky-700 hover:font-semibold"
            >
              <span className="truncate min-w-0 text-sm md:text-base">
                {question.text}
              </span>
            </Link>
            {/* Question's Author */}
            <div className="flex gap-2 min-w-15 md:min-w-25 justify-start text-xs truncate mr-2">
              <span className="text-gray-500 hidden md:block">author: </span>
              {question?.author.username}
            </div>
            {/* Question's Rating */}
            <div className="relative flex flex-shrink-0 w-6 h-6 lg:w-8 md:h-8">
              <img
                src="/fullStarRating.png"
                alt="full star rating"
                className="block w-full h-full object-contain"
              />
              <p className="absolute inset-0 z-10 flex items-center justify-center text-xs font-bold leading-none">
                {question.rating}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {/* gradient overlay INSIDE scroll container */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-400 to-transparent" />
    </section>
  );
}

export default AdminQuestions;
