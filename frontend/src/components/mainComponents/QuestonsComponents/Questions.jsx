import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import SearchForm from "./SearchForm.jsx";

function Questions() {
  const navigate = useNavigate();
  // to be moved to SearchForm.jsx
  const issueQuestionSearch = useRef(null);
  const editQuestionSearch = useRef(null);

  return (
    <div className="flex flex-col gap-2 bg-transparent min-h-[calc(100vh-124px)] items-center">
      {/* Questions dashboard navigation */}
      <div className="flex justify-center p-2 w-1/3 bg-gradient-to-b from-zinc-100 to-zinc-400 w-[1000px] bg-white rounded-lg shadow-[0px_7px_13px_4px_rgba(40,55,61,1)]">
        {/* Create question */}
        <button
          className="hover:scale-110 transition-transform cursor-pointer"
          onClick={() => navigate("./create")}
        >
          <img src="addbtn.png" alt="add button" />
          create
        </button>
        {/* Report question */}
        <button
          className="hover:scale-110 transition-transform cursor-pointer"
          onClick={() => {
            if (!editQuestionSearch.current.classList.contains("hidden")) {
              editQuestionSearch.current.classList.add("hidden");
            }
            issueQuestionSearch.current.classList.toggle("hidden");
          }}
        >
          <img src="issue.png" alt="report button" className="w-16 h-16" />
          report
        </button>
        {/* Edit question */}
        <button
          className="hover:scale-110 transition-transform cursor-pointer"
          onClick={() => {
            if (!issueQuestionSearch.current.classList.contains("hidden")) {
              issueQuestionSearch.current.classList.add("hidden");
            }
            editQuestionSearch.current.classList.toggle("hidden");
          }}
        >
          <img src="editBtn.png" alt="edit button" className="w-16 h-16" />
          edit
        </button>
      </div>

      {/* Questions issue form and info */}
      <SearchForm
        elementRef={issueQuestionSearch}
        type={"issue"}
        title={"Report question"}
      />
      {/* Questions edit form and info */}
      <SearchForm
        elementRef={editQuestionSearch}
        type={"edit"}
        title={"Edit question"}
      />
    </div>
  );
}

export default Questions;
