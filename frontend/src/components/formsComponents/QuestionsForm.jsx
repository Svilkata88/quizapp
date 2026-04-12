import { useNavigate } from "react-router-dom";
import { createQuestion } from "../../../utils.js";
import { useUserContext } from "../../hooks/userContext.jsx";

function QuestionsForm() {
  const { user } = useUserContext();
  const Navigate = useNavigate();

  const handleQuestionForm = (formData) => {
    const question_text = formData.get("question_text");
    const correct_answer = formData.get("correct_answer");
    const option_one = formData.get("option_one");
    const option_two = formData.get("option_two");
    const option_three = formData.get("option_three");
    const info = formData.get("info");
    const userId = user.id;

    const body = {
      question_text,
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
        if (res.ok) {
          Navigate("/questions");
        }
      })
      .catch((err) => {
        console.error("Question creation failed:", err);
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
        />
        <input
          type="text"
          name="correct_answer"
          placeholder="your correct answer"
          className="bg-zinc-50 p-1 pl-3"
        />
        <input
          type="text"
          name="option_one"
          placeholder="your wrong answer 1"
          className="bg-zinc-50 p-1 pl-3"
        />
        <input
          type="text"
          name="option_two"
          placeholder="your wrong answer 2"
          className="bg-zinc-50 p-1 pl-3"
        />
        <input
          type="text"
          name="option_three"
          placeholder="your wrong answer 3"
          className="bg-zinc-50 p-1 pl-3"
        />
        <textarea
          type="text"
          name="info"
          placeholder="question information"
          className="bg-zinc-50 p-1 pl-3"
        />
        <button className="bg-green-300 w-1/3 self-center mt-2 cursor-pointer rounded-lg hover:bg-green-400 transition-colors duration-300">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default QuestionsForm;
