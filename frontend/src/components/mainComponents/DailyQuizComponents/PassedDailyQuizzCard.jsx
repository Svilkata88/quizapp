function PassedDailyQuizzCard({ quiz }) {
  return (
    <div
      className="
      flex flex-col gap-1 md:gap-3
      min-w-32 max-w-44 h-48 md:min-w-44 md:max-w-62 min-h-56 lg:min-w-54 lg:max-w-74 flex-1
      text-xs md:text-sm
      bg-gradient-to-b from-zinc-100/80 to-zinc-500/90
      border border-gray-300 rounded-lg p-3
    "
    >
      <h3>
        Topic: <span className="font-semibold">{quiz.topic}</span>
      </h3>
      <p>
        Date: <span className="font-semibold">{quiz.for_date}</span>
      </p>
      <p>
        Players: <span className="font-semibold">{quiz.players_count}</span>
      </p>
      <p className="flex flex-col md:flex-row gap-1">
        <span className="bg-amber-300 mr-1 rounded-sm px-1">First Place:</span>
        <span className="font-semibold">
          {quiz.first_place_user_quiz
            ? quiz.first_place_user_quiz.username
            : "N/A"}
        </span>
      </p>
      <p className="flex flex-col md:flex-row gap-1">
        <span className="bg-blue-200 mr-1 rounded-sm px-1">Second Place:</span>
        <span className="font-semibold">
          {quiz.second_place_user_quiz
            ? quiz.second_place_user_quiz.username
            : "N/A"}
        </span>
      </p>
      <p className="flex flex-col md:flex-row gap-1">
        <span className="bg-yellow-600 mr-1 rounded-sm px-1">Third Place:</span>
        <span className="font-semibold">
          {quiz.third_place_user_quiz
            ? quiz.third_place_user_quiz.username
            : "N/A"}
        </span>
      </p>
    </div>
  );
}

export default PassedDailyQuizzCard;
