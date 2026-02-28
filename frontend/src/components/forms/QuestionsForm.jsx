import { createQuestion } from "../../../utils.js";
import { useUserContext } from "../../hooks/userContext.jsx";

function QuestionsForm() {
  const { user } = useUserContext();
  const handleQuestionForm = (formData) => {
    const question_text = formData.get("question_text");
    const correct_answer = formData.get("correct_answer");
    const option_one = formData.get("option_one");
    const option_two = formData.get("option_two");
    const option_three = formData.get("option_three");
    const userId = user.id;

    const body = {
      question_text,
      correct_answer,
      option_one,
      option_two,
      option_three,
      userId,
    };

    // console.log({
    //   question_text,
    //   correct_answer,
    //   option_one,
    //   option_two,
    //   option_three,
    // });
    const q = createQuestion(
      "http://localhost:8000/api/questions/create/",
      body,
    ).then((res) => console.log(res));
  };

  return (
    <div className="bg-zinc-100 flex flex-col min-h-[571px] items-center">
      <form
        action={handleQuestionForm}
        className="flex flex-col bg-zinc-200 w-1/3 gap-1 mt-10 p-2"
      >
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
        <button className="bg-green-300 w-1/3 self-center mt-2 cursor-pointer">
          Confirm
        </button>
      </form>
    </div>
  );
}

export default QuestionsForm;
