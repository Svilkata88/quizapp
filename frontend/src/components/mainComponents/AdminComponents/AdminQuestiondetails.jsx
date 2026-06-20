import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneQuestions } from "../../../../utils";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminQuestionDetails() {
  const [question, setQuestion] = useState(null);
  const [author, setAuthor] = useState(null);
  const { id } = useParams();
  const QUESTION_URL = `/api/questions/admin/all-questions`;
  console.log(question);

  useEffect(() => {
    fetchOneQuestions(`${BASE_URL}${QUESTION_URL}`, id)
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
    <div className="flex flex-col gap-2 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 p-3 md:p-4 rounded-lg shadow-[var(--blue-shadow)] lg:w-[800px] lg:mx-auto min-h-130 lg:min-h-150">
      {/* Question Section */}
      <div className="flex gap-3 items-center justify-center border-b border-gray-300 pb-5">
        <div className="flex items-center w-18 md:w-14 float-left">
          <img src="/question.png" alt="question" className="w-full h-full" />
        </div>
        <h2 className="text-center">{question?.text}</h2>
      </div>
      <p className="text-center text-gray-600">Author: {author?.username}</p>
      {/* Icons Section */}
      <section className="flex gap-5 items-center justify-around mx:4 md:mx-16 pb-5 mt-8">
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
      {/* Info Section */}
      <div className="my-2 mx:4 md:mx-16">
        <div className="float-left mr-2">
          <img
            src="/info.png"
            alt="info"
            className={question?.info ? "w-12" : "w-6"}
          />
        </div>
        <p className="text-base text-justify">
          {question?.info ? question.info : "No additional info."}
        </p>
      </div>
      {/* Answers Section */}
      <div className="flex flex-col items-center mx-auto md:mx-16 md:mt-2 lg:mt-10">
        <h2 className="mb-2">Answers:</h2>
        <ul className="flex gap-1 md:gap-5 flex-col md:flex-row">
          {question?.answers?.map((answer, index) => (
            <li key={answer.id ?? index} className="flex gap-1">
              <div className="">
                <p className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full p-1 text-zinc-300">
                  <span>{index + 1}</span>
                </p>
              </div>
              <p>{answer.text}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* Correct Answer Section */}
      <div className="flex flex-col items-center mx-auto md:mx-16 mt-5">
        <h2 className="mb-2">Correct answer:</h2>
        <div className="flex gap-2 justify-center">
          <img
            src="/ok.png"
            alt="ok check"
            className="w-6 h-6 bg-gray-600 rounded-full p-1"
          />
          <p>{question?.correct_answer?.text}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminQuestionDetails;
