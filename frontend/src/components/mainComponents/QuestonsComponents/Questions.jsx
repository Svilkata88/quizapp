import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import {
  fetchOneQuestions,
  hideText,
  showText,
  createQuestionIssue,
} from "../../../../utils.js";

function Questions() {
  const [question, setQuestion] = useState(undefined);
  const [author, setAuthor] = useState(undefined);
  const navigate = useNavigate();
  const searchInput = useRef(null);

  function searchQuestion() {
    const inputValue = Number(searchInput.current.querySelector("input").value);
    if (!inputValue || typeof inputValue !== "number") {
      setQuestion(undefined);
      showText(
        searchInput,
        "Please provide question ID (N)",
        "text-red-500 font-bold",
      );
      setTimeout(() => {
        hideText(searchInput);
      }, 2500);
      return;
    }

    const id = Number(inputValue);
    fetchOneQuestions("http://localhost:8000/api/questions", id).then(
      (response) => {
        setQuestion(response.question);
        setAuthor(response.author);
      },
    );
  }

  function handleIssueSubmit(formData) {
    const issue = formData.get("issueText");

    createQuestionIssue(question.id, issue).then((res) => {
      searchInput.current.classList.toggle("hidden");
      navigate("/questions");
    });
  }

  return (
    <div className="flex flex-col gap-2 bg-zinc-100 min-h-[571px] items-center">
      <div className="flex justify-center p-2 w-1/3 bg-zinc-100 w-[1000px] bg-white">
        <button
          className="hover:scale-110 transition-transform cursor-pointer"
          onClick={() => navigate("./create")}
        >
          <img src="addbtn.png" alt="add button" />
          create
        </button>
        <button
          className="hover:scale-110 transition-transform cursor-pointer"
          onClick={() => searchInput.current.classList.toggle("hidden")}
        >
          <img src="reportbtn.png" alt="report button" />
          report
        </button>
      </div>

      <div
        ref={searchInput}
        className="hidden flex flex-col gap-2 w-1/2 items-center"
      >
        <input
          type="text"
          placeholder="question id"
          className="border border-black bg-zinc-50 pl-2 p-1 rounded-md w-1/3"
        />
        <button
          className="cursor-pointer p-1 hover:bg-teal-500 rounded-md w-1/3"
          onClick={searchQuestion}
        >
          Search
        </button>
        <div
          className={`flex flex-col gap-2 ${question ? "block" : "hidden"} w-full`}
        >
          <h2>{question?.text.slice(0, 20) + "..."}</h2>
          <p>Author: {author?.username}</p>

          <form action={handleIssueSubmit} className="flex flex-col gap-2">
            <textarea
              type="text"
              name="issueText"
              placeholder="what's wrong?"
              className="border border-black bg-zinc-50 pl-2 p-1 rounded-md "
            />
            <button className="p-1 hover:bg-teal-500 rounded-md">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Questions;
