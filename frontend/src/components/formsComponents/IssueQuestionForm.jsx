import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createQuestionIssue, showText, hideText } from "../../../utils.js";

function IssueQuestionForm({ question, setQuestion, author, setSearchValue }) {
  const questionIssueContainer = useRef(null);
  const questionIssueForm = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    questionIssueForm.current.classList.remove("hidden");
  }, [question]);

  const handleIssueSubmit = (formData) => {
    const issue = formData.get("issueText");

    createQuestionIssue(question.id, issue).then((res) => {
      questionIssueForm.current.classList.add("hidden");

      showText(
        questionIssueContainer,
        `Issue for: "${question.text}" added successfully!`,
        "text-green-500 font-bold bg-gray-300 p-2 rounded-md border border-green-500",
      );
      setTimeout(() => {
        hideText(questionIssueContainer);
        setQuestion(undefined);
        setSearchValue("");
      }, 3500);
    });
  };

  return (
    <div
      className={`flex flex-col gap-2 ${question ? "block" : "hidden"} w-full`}
      ref={questionIssueContainer}
    >
      <div className="flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 w-full mt-10 p-5 rounded-lg shadow-[var(--blue-shadow)]">
        <h2>{question?.text.slice(0, 20) + "..."}</h2>
        <p>Author: {author?.username}</p>
      </div>

      <form
        action={handleIssueSubmit}
        className="flex flex-col gap-2"
        ref={questionIssueForm}
      >
        <textarea
          type="text"
          name="issueText"
          placeholder="what's wrong?"
          className="border border-black bg-zinc-50 pl-2 p-1 rounded-md "
        />
        <button className="p-1 bg-green-300 hover:bg-green-400 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}

export default IssueQuestionForm;
