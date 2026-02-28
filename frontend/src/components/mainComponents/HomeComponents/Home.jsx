import { useNavigate } from "react-router-dom";
import { showText, hideText, fetchTopFiveUsers } from "../../../../utils";
import { useEffect, useState, useRef } from "react";
import UserCard from "./UserCard";

function Home() {
  const navigate = useNavigate();
  const divRef = useRef(null);
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
    fetchTopFiveUsers().then((data) => {
      setTopFive(data);
    });
  }, []);

  return (
    <div className="flex gap-5 justify-between pt-10 px-10 bg-gradient-to-b from-zinc-100 to-zinc-500 min-h-[571px]">
      <div className="h-[250px] mb-10">
        <h1 className="text-center text-2xl font-bold">
          Welcome to the Quiz App
        </h1>
        <div ref={divRef}>
          <button
            className="block cursor-pointer hover:scale-110 transition-transform mx-auto pt-10"
            onClick={() => navigate("/play")}
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

      <div className="mx-10">
        <h3 className="text-xl font-bold text-center">Top 5 players</h3>
        <ul className="flex flex-col mt-4 flex gap-2">
          {topFive.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
