import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOneQuestions } from "../../../../utils";
import { apiEditQuestion } from "../../../../utils";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminQuestionDetails() {
  const [question, setQuestion] = useState(null);
  const [qText, setQtext] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [infoText, setInfoText] = useState("");
  const [author, setAuthor] = useState(null);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const QUESTION_URL = `/api/questions/admin/all-questions`;

  useEffect(() => {
    fetchOneQuestions(`${BASE_URL}${QUESTION_URL}`, id)
      .then((res) => {
        setQuestion(res.question);
        setAuthor(res.author.username);
        setStatus(res.question.status);
        setQtext(res.question.text);
        setAnswers(res.question.answers);
        setCorrectAnswer(res.question.correct_answer.text);
        setInfoText(res.question.info);
      })
      .catch((err) => {
        console.error("Error fetching question:", err);
      });
  }, [id]);

  function validate(data, type) {
    if (!data) return false;

    if (type === "text") {
      return data.trim().length > 0;
    }
  }

  const checkingAnswers = answers.slice();
  checkingAnswers?.pop(correctAnswer);
  const isFormValid =
    validate(question?.text, "text") &&
    validate(correctAnswer, "text") &&
    validate(checkingAnswers[0]?.text, "text") &&
    validate(checkingAnswers[1]?.text, "text") &&
    validate(checkingAnswers[2]?.text, "text") &&
    validate(infoText, "text") &&
    correctAnswer !== checkingAnswers[0] &&
    correctAnswer !== checkingAnswers[1] &&
    correctAnswer !== checkingAnswers[2] &&
    checkingAnswers[0] !== checkingAnswers[1] &&
    checkingAnswers[1] !== checkingAnswers[2] &&
    checkingAnswers[0] !== checkingAnswers[2];

  const handleSubmit = (formData) => {
    console.log(Array.from(formData.entries()));
    // console.log(question);

    apiEditQuestion(`${BASE_URL}/api/questions/edit/${id}/`, formData)
      .then((res) => {
        console.log(`Question: "${question.text}" updated successfully!`);

        showText(
          questionEditContainer,
          `Question: "${question.text}" updated successfully!`,
          "text-green-500 font-bold bg-gray-300 p-2 rounded-md border border-green-500",
        );
        // setTimeout(() => {
        //   hideText(questionEditContainer);

        //   setQtext("");
        //   setCorrectAnswer("");
        //   setOptionOne("");
        //   setOptionTwo("");
        //   setOptionThree("");
        //   setInfoText("");
        // }, 3500);
      })
      .catch((err) => {
        // const formattedErrors = {};

        // Object.entries(err).forEach(([key, value]) => {
        //   formattedErrors[key] = Array.isArray(value) ? value[0] : value;
        // });

        // setErrors(formattedErrors);
        console.log(err);
      });
  };

  return !author || !question ? (
    <Spinner />
  ) : (
    <form
      className="flex flex-col gap-2 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 p-3 md:p-4 rounded-lg shadow-[var(--blue-shadow)] lg:w-[800px] lg:mx-auto min-h-130 lg:min-h-150"
      action={handleSubmit}
    >
      {/* Question Section */}
      <div className="relative border-b border-gray-300 pb-5 mx-2">
        {/* Icon */}
        <div className="absolute -left-2 -top-2 w-8 flex items-start">
          <img src="/question.png" className="w-full" />
        </div>

        {/* Textarea */}
        <textarea
          name="question_text"
          className="w-full h-[120px] bg-zinc-100 rounded-lg p-4 md:p-6 resize-none"
          value={qText}
          onChange={(e) => setQtext(e.target.value)}
        />
      </div>
      <div className="flex gap-3 justify-center items-start">
        <div className="flex flex-col gap-1 justify-center items-center">
          <label htmlFor="statusInput" className="text-gray-500">
            Author:
          </label>
          <input
            name="author"
            className="text-black bg-zinc-100 rounded-lg font-semibold w-25 text-center"
            id="authorInput"
            value={author ?? ""}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <span className="text-gray-500 text-center">Status:</span>
          <div className="flex flex-col flex-wrap gap-1 justify-center">
            {["confirmed", "pending", "rejected"].map((statusOption) => (
              <label
                key={statusOption}
                className="flex items-center gap-1 text-black bg-zinc-100 rounded-lg px-2 py-1 cursor-pointer w-30"
              >
                <input
                  name="status"
                  type="radio"
                  value={statusOption}
                  checked={status === statusOption}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <span className="capitalize">{statusOption}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      {/* Icons Section */}
      <section className="flex gap-5 items-center justify-around mx:2 md:mx-16 pb-5 mt-8">
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
      <div className="my-2 mx-2 mt-4 md:mx-16">
        <div className="relative border-b border-gray-300 pb-5">
          {/* Icon */}
          <div className="absolute -left-4 -top-7 w-12 flex items-start">
            <img src="/info.png" className="w-full" />
          </div>

          {/* Textarea */}
          <textarea
            name="info"
            className="w-full h-[300px] bg-zinc-100 rounded-lg p-2 pt-4 md:p-6 text-justify resize-none"
            value={infoText || ""}
            onChange={(e) => setInfoText(e.target.value)}
          />
        </div>
      </div>
      {/* Answers Section */}
      <div className="flex flex-col items-center mx-auto md:mx-16 md:mt-2 lg:mt-10">
        <h2 className="mb-2">Answers:</h2>
        <ul className="flex gap-1 md:gap-3 flex-col">
          {question?.answers?.map((answer, index) => (
            <li
              key={answer.id ?? index}
              className="flex gap-1 md:gap-3 items-center"
            >
              <p className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full p-1 text-zinc-300">
                <span>{index + 1}</span>
              </p>
              <input
                name={
                  index === 0 && answers[index].text !== correctAnswer
                    ? "option_one"
                    : index === 1 && answers[index].text !== correctAnswer
                      ? "option_two"
                      : index === 2 && answers[index].text !== correctAnswer
                        ? "option_three"
                        : ""
                }
                type="text"
                value={answers[index].text || ""}
                onChange={(e) =>
                  setAnswers((prev) =>
                    prev.map((a, i) => (i === index ? e.target.value : a)),
                  )
                }
                className="bg-zinc-100 pl-1 rounded-lg"
              />
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
          <input
            name="correct_answer"
            type="text"
            value={correctAnswer || ""}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="bg-zinc-100 pl-1 rounded-lg"
          />
        </div>
      </div>
      <button>submit</button>
    </form>
  );
}

export default AdminQuestionDetails;
