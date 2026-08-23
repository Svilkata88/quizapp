import { showText, hideText, fetchTopFiveUsers } from "../../../../utils";
import { useUserContext } from "../../../hooks/userContext";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserSkeletonCard from "./UserSkeletonCard";
import DailyQuiz from "./DailyQuiz";
import UserCard from "./UserCard";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function Home() {
  const navigate = useNavigate();
  const divRef = useRef(null);
  const [topFive, setTopFive] = useState([]);
  const { logout } = useUserContext();

  useEffect(() => {
    fetchTopFiveUsers(`${BASE_URL}/api/users/top-five/`)
      .then((data) => {
        setTopFive(data);
      })
      .catch((err) => {
        console.error("Failed to fetch top five users:", err);
        logout();
        navigate("/auth/login");
      });
  }, []);

  return (
    <div className="main-children-wrapper w-full gap-1 md:gap-10 md:justify-between">
      {/* Play section! */}
      <div className="mb-18 md:mb-0">
        {/* Start Quizzy game / Play section */}
        <div className="h-[200px] md:h-[250px] md:mb-0 lg:pl-auto mb-10 md:mb-0">
          <div
            ref={divRef}
            className="bg-gradient-to-b from-zinc-100/30 to-zinc-400/0 min-h-50 lg:w-[300px] rounded-xl mt-5 mx-auto"
          >
            <h1 className="text-center text-2xl font-bold text-gray-900 md:text-black dark:text-stone-300 mt-1 md:mt-0 pt-5">
              Start a game!
            </h1>
            <button
              className="block cursor-pointer hover:scale-110 transition-transform mx-auto pt-5"
              onClick={() => navigate("/chose-difficulty")}
              onMouseEnter={() => {
                showText(
                  divRef,
                  "Lets Play... 🥸",
                  "text-center text-lg mt-10 font-bold animate-slide-in dark:text-stone-300",
                );
              }}
              onMouseLeave={() => hideText(divRef)}
            >
              <img src="start.png" alt="start" />
            </button>
          </div>
        </div>

        {/* Daily quizz secttion */}
        <div className="h-[200px] md:h-[250px] md:mb-0 lg:pl-auto">
          <DailyQuiz />
        </div>
      </div>

      {/* Top 5 players */}
      <div className="mb-10 md:mb-0 md:mx-0">
        <h3 className="text-2xl font-bold text-center text-sky-700 md:text-black dark:text-stone-300 mb-5">
          Top 5 players
        </h3>
        <ul className="flex flex-col items-center mt-4 gap-2 relative">
          {topFive.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <UserSkeletonCard key={i} />
              ))
            : topFive.map((user) => <UserCard key={user.id} user={user} />)}
        </ul>
      </div>
    </div>
  );
}

export default Home;

// flex flex-col gap-5 md:flex-row justify-between mb-5 md:pt-10 px-10 min-h-[calc(100vh-124px)]
