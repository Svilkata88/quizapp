import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneQuestions } from "../../../../utils";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function QuestionDetail() {
  const [question, setQuestion] = useState(null);
  const [author, setAuthor] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchOneQuestions(`${BASE_URL}/api/questions`, id)
      .then((res) => {
        setQuestion(res.question);
        setAuthor(res.author);
      })
      .catch((err) => {
        console.error("Error fetching question:", err);
      });
  }, [id]);

  return !author || !question ? (
    <Spinner />
  ) : (
    <div className="flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 p-3 md:p-5 rounded-lg shadow-[var(--blue-shadow)] lg:w-[800px] mx-4 lg:mx-auto min-h-150">
      <div className="flex gap-2 items-center justify-center border-b border-gray-300 pb-5">
        <div className="w-14 float-left">
          <img src="/question.png" alt="question" className="w-full min-w-8" />
        </div>
        <h1 className="text-justify text-base md:text-md lg:text-xl font-semibold">
          {question?.text}
        </h1>
      </div>
      <p className="text-center text-gray-600">Author: {author?.username}</p>
      <section className="flex gap-10 items-center justify-center pb-5 mt-10">
        <div className="w-10 h-10 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
          <p className="text-center text-xs text-gray-600">id</p>
          <img src="/id.png" alt="id" />
          <p className="text-2xl">{question?.id}</p>
        </div>
        <div className="w-10 h-10 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
          <p className="text-center text-xs text-gray-600">rating</p>
          <img src="/fullStarRating.png" alt="full star rating" />
          <p className="text-2xl">{question?.rating}</p>
        </div>
        <div className="w-10 h-10 lg:w-16 lg:h-16 flex flex-col items-center justify-center">
          <p className="text-center text-xs text-gray-600">difficulty</p>
          <img src="/difficulty.png" alt="difficulty" />
          <p className="text-lg lg:text-2xl">{question?.difficulty}</p>
        </div>
      </section>
      <div className="my-5 mx-3 lg:mx-20">
        <div className="flex flex-col items-center justify-center float-left mb-2 mr-2">
          <img
            src="/info.png"
            alt="info"
            className={question?.info ? "w-15" : "w-6"}
          />
        </div>
        <p className="xl:text-lg text-justify">
          {question?.info ? question.info : "No additional info."}
        </p>
      </div>
      <div className="flex flex-col items-center mx-20">
        <h2 className="mb-2">Answers:</h2>
        <ul>
          {question?.answers?.map((answer, index) => (
            <li key={answer.id ?? index} className="flex gap-2 mb-1">
              <p className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full p-1 text-zinc-300">
                {index + 1}
              </p>
              <p className="xl:text-lg">{answer.text}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col items-center mx-20 mt-5 mb-5">
        <h2 className="mb-2">Correct answer:</h2>
        <div className="flex gap-2">
          <img
            src="/ok.png"
            alt="ok check"
            className="w-6 h-6 bg-gray-600 rounded-full p-1"
          />
          <p className="xl:text-lg">{question?.correct_answer?.text}</p>
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
