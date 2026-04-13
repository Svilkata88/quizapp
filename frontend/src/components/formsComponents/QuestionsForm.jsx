import { useNavigate } from "react-router-dom";
import { createQuestion } from "../../../utils.js";
import { useUserContext } from "../../hooks/userContext.jsx";
import { useState } from "react";
import FormButton from "../buttons/FormButton.jsx";
import ErrorMessage from "./errorMessage.jsx";

function QuestionsForm() {
  const { user } = useUserContext();
  const Navigate = useNavigate();
  const [questionText, setQuestionText] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  const [optionThree, setOptionThree] = useState("");
  const [info, setInfo] = useState("");
  const [errors, setErrors] = useState(null);

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

  function validate(data, type) {
    if (!data) return false;

    if (type === "text") {
      return data.trim().length > 0;
    }
  }

  const handleQuestionForm = (formData) => {
    const question_text = formData.get("question_text");
    const correct_answer = formData.get("correct_answer");
    const option_one = formData.get("option_one");
    const option_two = formData.get("option_two");
    const option_three = formData.get("option_three");
    const info = formData.get("info");
    const userId = user.id;

    const body = {
      text: question_text,
      correct_answer,
      option_one,
      option_two,
      option_three,
      info,
      userId,
    };

    const q = createQuestion(
      "http://localhost:8000/api/questions/create/",
      body,
    )
      .then((res) => {
        Navigate("/questions");
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
    <div className="bg-transparent flex flex-col min-h-[571px] items-center">
      <form
        action={handleQuestionForm}
        className="flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 w-1/3 mt-10 p-5 rounded-lg shadow-[var(--blue-shadow)]"
      >
        <h2 className="text-center text-gray-600">Create a question</h2>
        <textarea
          type="text"
          name="question_text"
          placeholder="your question"
          className="bg-zinc-50 p-1 pl-3 h-[150px]"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <input
          type="text"
          name="correct_answer"
          placeholder="your correct answer"
          className="bg-zinc-50 p-1 pl-3"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
        />
        <input
          type="text"
          name="option_one"
          placeholder="your wrong answer 1"
          className="bg-zinc-50 p-1 pl-3"
          value={optionOne}
          onChange={(e) => setOptionOne(e.target.value)}
        />
        <input
          type="text"
          name="option_two"
          placeholder="your wrong answer 2"
          className="bg-zinc-50 p-1 pl-3"
          value={optionTwo}
          onChange={(e) => setOptionTwo(e.target.value)}
        />
        <input
          type="text"
          name="option_three"
          placeholder="your wrong answer 3"
          className="bg-zinc-50 p-1 pl-3"
          value={optionThree}
          onChange={(e) => setOptionThree(e.target.value)}
        />
        <textarea
          type="text"
          name="info"
          placeholder="question information"
          className="bg-zinc-50 p-1 pl-3"
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
  );
}

export default QuestionsForm;
