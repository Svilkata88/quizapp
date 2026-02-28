import { useState } from "react";

function Answer({
  text,
  correct,
  disabled,
  setDisabled,
  setPoints,
  setQIndex,
}) {
  const [bgColor, setBgColor] = useState("bg-gray-100 hover:bg-teal-500");

  return (
    <button
      className={`${bgColor} mb-2 rounded-lg w-1/3 p-3 cursor-pointer`}
      onClick={() => {
        setBgColor(
          correct
            ? "bg-green-500 hover:bg-green-600"
            : disabled
              ? "bg-gray-100"
              : "bg-red-500 hover:bg-red-600",
        );
        setDisabled(true);
        // да се направи вс функции да рънват само при коректен отговор
        setTimeout(() => {
          setPoints((prev) => (correct ? prev + 1 : prev));
          setQIndex((prev) => (correct ? prev + 1 : prev)); // дасе направи фетч на следващите 10в ако този е последен
          setBgColor("bg-gray-100");
          setDisabled(correct ? false : true);
        }, 2000);
      }}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Answer;
