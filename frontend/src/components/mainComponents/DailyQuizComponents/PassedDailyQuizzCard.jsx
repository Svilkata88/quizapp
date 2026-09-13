function PassedDailyQuizzCard({ quiz }) {
  console.log(quiz);
  return (
    <div
      className="
    flex flex-col gap-1
    "
    >
      <h3>{quiz.topic.name}</h3>
      <p>Date: {quiz.for_date}</p>
      <p>Players: {quiz.players_count}</p>
      <p>First Place: {quiz.first_place_user_quiz.name}</p>
      <p>Second Place: {quiz.second_place_user_quiz.name}</p>
      <p>Third Place: {quiz.third_place_user_quiz.name}</p>
    </div>
  );
}

export default PassedDailyQuizzCard;
