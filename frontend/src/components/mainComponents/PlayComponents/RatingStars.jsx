import { useEffect, useState } from "react";
import { createRating } from "../../../../utils.js";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function RatingStars({
  emptyStar,
  fullStar,
  isHidden,
  setIsHidden,
  questionId,
  setRating,
}) {
  const [starIndex, setStarIndex] = useState(0);
  const indexes = [1, 2, 3, 4, 5];

  useEffect(() => {
    setIsHidden(true);
  }, []);
  // implement rerender of the component when rating is submitted, so that the user can see the new rating without refreshing the page

  return (
    <div
      className={`flex gap-2 items-center relative left-1/2 top-1/2 -translate-x-1/2 ${
        isHidden ? "hidden" : "mb-2"
      }`}
    >
      <div className="flex gap-1 justify-center items-center">
        {indexes.map((i) => {
          return (
            <img
              key={i}
              src={starIndex >= i ? fullStar : emptyStar}
              alt={emptyStar.split(".")[0]}
              className="w-6 h-6"
              onClick={() => setStarIndex(i)}
            />
          );
        })}
      </div>
      <button
        className="bg-amber-300 px-2 py-auto text-sm rounded-lg hover:scale-110 transition-transform cursor-pointer w-auto h-6"
        onClick={() => {
          createRating(
            `${BASE_URL}/api/questions/create-rating/`,
            questionId,
            starIndex,
          ).then((data) => {
            console.log("Rating submitted successfully");
            setRating(data.rating);
          });
          setIsHidden(true);
          setStarIndex(0);
        }}
      >
        Rate!
      </button>
    </div>
  );
}

export default RatingStars;
