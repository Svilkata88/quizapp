import { useEffect } from "react";

function QuestionInfo({ isHidden, setIsHidden, questionId }) {
  useEffect(() => {
    setIsHidden(true);
  }, []);

  return (
    <div
      className={`${
        "h-7 px-2 rounded-lg bg-gray-100 border border-black transition-all duration-300 ease-in-out" +
        (isHidden ? " hidden" : " mb-2")
      }`}
    >
      Question ID: {questionId}
    </div>
  );
}

export default QuestionInfo;
