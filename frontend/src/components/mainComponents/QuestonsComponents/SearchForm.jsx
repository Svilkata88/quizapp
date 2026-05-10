import IssueQuestionForm from "../../formsComponents/IssueQuestionForm";
import EditQuestionForm from "../../formsComponents/EditQuestionForm";
import { fetchOneQuestions, hideText, showText } from "../../../../utils.js";
import { useState, useEffect } from "react";
import { useUserContext } from "../../../hooks/userContext.jsx";

function SearchForm({ type, title, elementRef }) {
  const [searchValue, setSearchValue] = useState("");
  const [author, setAuthor] = useState(undefined);
  const [question, setQuestion] = useState(undefined);
  const { user } = useUserContext();
  const isAllowedToEddit = user.id === author?.id;

  useEffect(() => {
    setSearchValue("");
    setQuestion(undefined);
    setAuthor(undefined);
  }, [type]);

  function checkSearchValue(value) {
    if (
      !value ||
      value.trim() === "" ||
      isNaN(Number(value)) ||
      Number(value) <= 0
    ) {
      setQuestion(undefined);
      showText(
        elementRef,
        "Please provide question positive ID (N)",
        "text-red-500 font-bold bg-gray-300 p-2 rounded-md border border-red-500",
      );
      setTimeout(() => {
        hideText(elementRef);
      }, 2500);
      return null;
    }
    return Number(value);
  }

  const handleSearch = (inputValue, inputRef) => {
    const id = checkSearchValue(inputValue);
    if (id === null) return;

    fetchOneQuestions("http://localhost:8000/api/questions", id)
      .then((response) => {
        if (response.author.id !== user.id) {
          showText(
            inputRef,
            "You are not allowed to edit this question!",
            "text-red-500 font-bold bg-gray-300 p-2 rounded-md border border-red-500",
          );
          setTimeout(() => {
            hideText(inputRef);
            setSearchValue("");
          }, 2500);
          return;
        }
        setQuestion(response.question);
        setAuthor(response.author);
      })
      .catch(() => {
        showText(
          inputRef,
          "This question doesn't exist!",
          "text-red-500 font-bold bg-gray-300 p-2 rounded-md border border-red-500",
        );
        setTimeout(() => {
          hideText(inputRef);
        }, 2500);
        setSearchValue("");
        setQuestion(undefined);
        setAuthor(undefined);
      });
  };

  return (
    <div
      className="flex flex-col gap-1 items-center  bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 p-5 rounded-lg shadow-[var(--blue-shadow)] w-[1000px] hidden"
      ref={elementRef}
    >
      <h1>{title}</h1>
      <input
        type="text"
        placeholder="question id"
        className="border border-black bg-zinc-50 pl-2 p-1 rounded-md w-1/3"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="cursor-pointer p-1 bg-green-300 hover:bg-green-400 rounded-md w-1/3"
        onClick={() => handleSearch(searchValue, elementRef)}
      >
        Search
      </button>
      {type === "issue" && (
        <IssueQuestionForm
          question={question}
          setQuestion={setQuestion}
          setSearchValue={setSearchValue}
          author={author}
        />
      )}
      {type === "edit" && (
        <EditQuestionForm
          question={question}
          setQuestion={setQuestion}
          setSearchValue={setSearchValue}
          author={author}
        />
      )}
    </div>
  );
}

export default SearchForm;
