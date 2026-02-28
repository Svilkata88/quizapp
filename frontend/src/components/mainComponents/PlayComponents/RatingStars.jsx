import { useEffect, useState } from "react";
import { createRating } from "../../../../utils.js";

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
    <div className="flex gap-2">
      <div className={"ml-8 h-7 flex gap-2 " + (isHidden ? "hidden" : "")}>
        {indexes.map((i) => {
          return (
            <img
              key={i}
              src={starIndex >= i ? fullStar : emptyStar}
              alt={emptyStar.split(".")[0]}
              className="w-[100%] h-[100%]"
              onClick={() => setStarIndex(i)}
            />
          );
        })}
        <button
          className="bg-amber-300 p-1 text-sm rounded-sm hover:scale-120 transition-transform cursor-pointer w-[100%] h-[100%]"
          onClick={() => {
            createRating(questionId, starIndex).then((data) => {
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
    </div>
  );
}

export default RatingStars;
