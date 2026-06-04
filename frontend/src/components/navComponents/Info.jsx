import React from "react";

function Info() {
  return (
    <div className="flex flex-col items-center bg-transparent p-2 md:p-10 flex-1 relative">
      <div className="bg-gray-100 w-full lg:w-2/3 xl:w-1/2 p-3 border-black border rounded-2xl rounded-tl-none mt-10 w-1/2">
        <h2>What is quizzy? </h2>
        <br />
        Quizzy is a game where you can test your knowledge on various topics.
        You can play against your friends or against the computer. You can also
        create your own questions and share them with the other players. The
        game is simple, you have to answer the questions correctly to earn
        points. Playing you earcn points and with the points you earn xp which
        rank you up in players ranking.
      </div>
      <div className="bg-gray-100 w-full lg:w-2/3 xl:w-1/2 p-3 border-black border rounded-2xl rounded-tl-none mt-10 w-1/2">
        <h2>Navigate</h2>

        <br />
      </div>
      <div className="bg-gray-100 w-full lg:w-2/3 xl:w-1/2 p-3 border-black border rounded-2xl rounded-tl-none mt-10 w-1/2">
        <h2>What you can do in the app? </h2>

        <br />
      </div>
    </div>
  );
}

export default Info;
