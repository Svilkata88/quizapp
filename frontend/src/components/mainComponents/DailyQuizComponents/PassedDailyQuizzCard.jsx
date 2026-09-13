function PassedDailyQuizzCard({ quiz }) {
  console.log(quiz);
  return (
    <div
      className="
    flex flex-col gap-1
    "
    >
      <h3>{quiz.topic}</h3>
      <p>Date: {quiz.for_date}</p>
      <p>Players: {quiz.players_count}</p>
      <p>First Place: {quiz.first_place_user_quiz}</p>
      <p>Second Place: {quiz.second_place_user_quiz}</p>
      <p>Third Place: {quiz.third_place_user_quiz}</p>
    </div>
  );
}

export default PassedDailyQuizzCard;
