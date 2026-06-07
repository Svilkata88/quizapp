import React from "react";

function Info() {
  return (
    <div className="flex flex-col items-center bg-transparent p-2 md:p-10 flex-1 relative">
      <div className="bg-gray-100 w-full lg:w-2/3 xl:w-1/2 p-3 border-black border rounded-2xl rounded-tl-none mt-5 md:mt-10 w-1/2">
        <h2>What is quizzy? </h2>
        <br />
        <span className=" ml-2">Quizzy</span> is a game where you can test your
        knowledge on various topics. You can play against your friends or
        against the computer. You can also create your own questions and share
        them with the other players. The game is simple, you have to answer the
        questions correctly to earn points. Playing you earcn points and with
        the points you earn xp which rank you up in players ranking.
      </div>
      <div className="bg-gray-100 w-full lg:w-2/3 xl:w-1/2 p-3 border-black border rounded-2xl rounded-tl-none mt-5 md:mt-10 w-1/2">
        <h2>Navigate</h2>
        <br />
        <ul>
          <li className="mb-2">
            <span className="font-semibold ml-1">Home</span> - go to the home
            page, see the top rated players, start a new game.
          </li>
          <li className="mb-2">
            <span className="font-semibold ml-1">Info</span> - all the
            information about the app.
          </li>
          <li className="mb-2">
            <span className="font-semibold ml-1">Profile</span> - view your
            profile, stats, and game history. Change your profile picture and
            username.
          </li>
          <li className="mb-2">
            <span className="font-semibold ml-1">Questions</span> - questions
            management. You can create your own questions which first will be
            reviewed by the admin and then added to the game. You can also view
            all the questions you created and edit or delete them.
          </li>
        </ul>
      </div>
      <div className="bg-gray-100 w-full lg:w-2/3 xl:w-1/2 p-3 border-black border rounded-2xl rounded-tl-none mt-5 md:mt-10 w-1/2">
        <h2>What you can do in the app? </h2>
        <span className=" ml-2">Quizzy</span> turns your time in a fun and
        engaging experience of testing your knowledge and learning new things.
        You can challenge your friends to a quiz battle ( in development ),
        create your own questions and share them with the community ( in
        development ), and track your progress and ranking on the leaderboard.
        Whether you're a trivia enthusiast or just looking for a fun way to pass
        the time, Quizzy has something for everyone.
        <br />
      </div>
    </div>
  );
}

export default Info;
