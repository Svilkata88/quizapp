function PassedDailyQuizzCard({ quiz }) {
  return (
    <div
      className="
    flex flex-col gap-1
    w-50  
    bg-gradient-to-b from-zinc-100 to-zinc-500
    border border-gray-300 rounded-lg p-4
    "
    >
      <h3>Topic: {quiz.topic}</h3>
      <p>Date: {quiz.for_date}</p>
      <p>Players: {quiz.players_count}</p>
      <p>
        First Place:{" "}
        {quiz.first_place_user_quiz
          ? quiz.first_place_user_quiz.username
          : "N/A"}
      </p>
      <p>
        Second Place:{" "}
        {quiz.second_place_user_quiz
          ? quiz.second_place_user_quiz.username
          : "N/A"}
      </p>
      <p>
        Third Place:{" "}
        {quiz.third_place_user_quiz
          ? quiz.third_place_user_quiz.username
          : "N/A"}
      </p>
    </div>
  );
}

export default PassedDailyQuizzCard;
