import { useNavigate } from "react-router-dom";
import { showText, hideText, fetchTopFiveUsers } from "../../../../utils";
import { useEffect, useState, useRef } from "react";
import UserCard from "./UserCard";
import UserSkeletonCard from "./UserSkeletonCard";
import { useUserContext } from "../../../hooks/userContext";
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
    <div className="flex flex-col gap-5 md:flex-row justify-between mb-5 md:pt-10 px-10 min-h-[calc(100vh-124px)]">
      <div className="h-[250px] mb-5">
        <h1 className="text-center text-2xl font-bold text-gray-900 md:text-black">
          Welcome to the Quiz App
        </h1>
        <div
          ref={divRef}
          className="bg-gradient-to-b from-zinc-100/30 to-zinc-400/0 min-h-50 rounded-xl mt-5"
        >
          <button
            className="block cursor-pointer hover:scale-110 transition-transform mx-auto pt-10"
            onClick={() => navigate("/chose-difficulty")}
            onMouseEnter={() => {
              showText(
                divRef,
                "Lets Play... 🥸",
                "text-center text-lg mt-10 font-bold animate-slide-in ",
              );
            }}
            onMouseLeave={() => hideText(divRef)}
          >
            <img src="start.png" alt="start" />
          </button>
        </div>
      </div>

      <div className="mx-10 mb-10">
        <h3 className="text-2xl font-bold text-center text-sky-700 md:text-black mb-5">
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
