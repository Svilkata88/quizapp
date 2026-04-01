import { useState, useEffect } from "react";

function Answer({
  text,
  correct,
  disabled,
  setDisabled,
  setPoints,
  qIndex,
  setQIndex,
}) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsAnswered(false);
    setIsHovered(false);
  }, [qIndex]);

  const getColor = () => {
    if (isAnswered) {
      return correct ? "#22c55e" : "#ef4444";
    }
    if (isHovered) {
      return "#14b8a6";
    }
    return "#e5e7eb";
  };

  const handleClick = () => {
    setIsAnswered(true);
    setDisabled(true);

    setTimeout(() => {
      setPoints((prev) => (correct ? prev + 1 : prev));
      setQIndex((prev) => (correct ? prev + 1 : prev));
      setDisabled(correct ? false : true);
    }, 1000);
  };

  return (
    <button
      style={{
        backgroundColor: getColor(),
        transition: "background-color 0.2s ease",
      }}
      className="mb-2 rounded-lg w-1/3 p-3 cursor-pointer"
      onMouseEnter={() => !isAnswered && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Answer;
