import { useState, useEffect, useRef } from "react";
import { apiEditQuestion, showText, hideText } from "../../../utils.js";
import FormButton from "../buttons/FormButton.jsx";
import ErrorMessage from "./errorMessage.jsx";

function EditQuestionForm({ question, setQuestion, author, setSearchValue }) {
  const questionEditContainer = useRef(null);
  const questionEditForm = useRef(null);
  const [questionText, setQuestionText] = useState(question?.text || "");
  const [correctAnswer, setCorrectAnswer] = useState(
    question?.correct_answer?.text || "",
  );
  const [optionOne, setOptionOne] = useState(
    question?.answers?.[0]?.text || "",
  );
  const [optionTwo, setOptionTwo] = useState(
    question?.answers?.[1]?.text || "",
  );
  const [optionThree, setOptionThree] = useState(
    question?.answers?.[2]?.text || "",
  );
  const [info, setInfo] = useState(question?.info || "");
  const [errors, setErrors] = useState(null);
  const wrongAnswers = question?.answers.filter(
    (answer) => answer.id !== question?.correct_answer?.id,
  );

  useEffect(() => {
    questionEditForm.current.classList.remove("hidden");
    setQuestionText(question?.text || "");
    setCorrectAnswer(question?.correct_answer?.text || "");
    setOptionOne(wrongAnswers?.[0]?.text || "");
    setOptionTwo(wrongAnswers?.[1]?.text || "");
    setOptionThree(wrongAnswers?.[2]?.text || "");
    setInfo(question?.info || "");
  }, [question]);

  function validate(data, type) {
    if (!data) return false;

    if (type === "text") {
      return data.trim().length > 0;
    }
  }

  const isFormValid =
    validate(questionText, "text") &&
    validate(correctAnswer, "text") &&
    validate(optionOne, "text") &&
    validate(optionTwo, "text") &&
    validate(optionThree, "text") &&
    validate(info, "text") &&
    correctAnswer !== optionOne &&
    correctAnswer !== optionTwo &&
    correctAnswer !== optionThree &&
    optionOne !== optionTwo &&
    optionOne !== optionThree &&
    optionTwo !== optionThree;

  const handleQuestionForm = (formData) => {
    // think how to change only the eddited fields for better performance

    apiEditQuestion(
      "http://localhost:8000/api/questions/edit/" + question.id + "/",
      formData,
    )
      .then((res) => {
        console.log(`Question: "${question.text}" updated successfully!`);
        questionEditForm.current.classList.add("hidden");

        showText(
          questionEditContainer,
          `Question: "${question.text}" updated successfully!`,
          "text-green-500 font-bold bg-gray-300 p-2 rounded-md border border-green-500",
        );
        setTimeout(() => {
          hideText(questionEditContainer);

          setQuestionText("");
          setCorrectAnswer("");
          setOptionOne("");
          setOptionTwo("");
          setOptionThree("");
          setInfo("");
          setSearchValue("");

          setQuestion(undefined);
        }, 3500);
      })
      .catch((err) => {
        const formattedErrors = {};

        Object.entries(err).forEach(([key, value]) => {
          formattedErrors[key] = Array.isArray(value) ? value[0] : value;
        });

        setErrors(formattedErrors);
      });
  };

  return (
    <div
      className={`flex flex-col gap-2 ${question ? "block" : "hidden"} w-full`}
      ref={questionEditContainer}
    >
      <div
        className="bg-transparent flex flex-col min-h-[571px] items-center"
        ref={questionEditForm}
      >
        <form
          action={handleQuestionForm}
          className="flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 w-full mt-10 p-5 rounded-lg shadow-[var(--blue-shadow)]"
        >
          <h2 className="text-center text-gray-600">Edit a question</h2>
          <p className="text-center text-gray-600">
            Author: {author?.username}
          </p>
          <textarea
            type="text"
            name="question_text"
            placeholder="your question"
            className="bg-zinc-50 p-1 pl-3 h-[100px]"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <label>Correct Answer</label>
          <input
            type="text"
            name="correct_answer"
            placeholder="your correct answer"
            className="bg-zinc-50 p-1 pl-3"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          />
          <label>Option 1</label>
          <input
            type="text"
            name="option_one"
            placeholder="your wrong answer 1"
            className="bg-zinc-50 p-1 pl-3"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
          />
          <label>Option 2</label>
          <input
            type="text"
            name="option_two"
            placeholder="your wrong answer 2"
            className="bg-zinc-50 p-1 pl-3"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
          />
          <label>Option 3</label>
          <input
            type="text"
            name="option_three"
            placeholder="your wrong answer 3"
            className="bg-zinc-50 p-1 pl-3"
            value={optionThree}
            onChange={(e) => setOptionThree(e.target.value)}
          />
          <label>Additional Information </label>
          <textarea
            type="text"
            name="info"
            placeholder="question information"
            className="bg-zinc-50 p-1 pl-3 h-[100px]"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />

          <FormButton text="Confirm" disabled={!isFormValid} />

          <div className="flex flex-col gap-2 mt-2">
            {errors &&
              Object.entries(errors).map((error, index) => (
                <ErrorMessage key={index} error={error} />
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditQuestionForm;
