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

  const getClasses = () => {
    let baseClasses =
      "mb-2 rounded-lg w-1/3 p-3 cursor-pointer border-black border rounded-2xl transition-all duration-300 ease-in-out";

    if (isAnswered) {
      baseClasses += correct ? " bg-green-500" : " bg-red-500";
    } else if (isHovered) {
      // Hover styles will be applied via inline styles
    } else {
      baseClasses += " bg-gray-100";
    }

    return baseClasses;
  };

  const getHoverStyles = () => {
    if (isHovered && !isAnswered) {
      return {
        background: "var(--main-blue)",
      };
    }
    return {};
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
      className={getClasses()}
      style={getHoverStyles()}
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
