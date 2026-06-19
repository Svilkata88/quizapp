import React from "react";

function Info() {
  const toggleInfo = (e) => {
    const infoBox = e.currentTarget.parentElement;
    const arrow = e.currentTarget.querySelector("img");
    if (infoBox.classList.contains("h-14")) {
      infoBox.classList.remove("h-14");
      infoBox.classList.add("h-auto");
      arrow.classList.add("rotate-180");
    } else {
      infoBox.classList.remove("h-auto");
      infoBox.classList.add("h-14");
      arrow.classList.remove("rotate-180");
    }
  };

  return (
    <div className="main-children-wrapper relative">
      <section className="flex flex-col gap-2 items-center">
        <div className="relative overflow-hidden bg-gray-100 w-full lg:w-2/3 xl:w-1/2 h-14 p-3 border-black border rounded-2xl rounded-tl-none mt-3 md:mt-5 w-1/2">
          <h2 className="text-sm md:text-base font-semibold">
            What is Quizzy?{" "}
          </h2>
          <br />
          <div className="text-sm md:text-base">
            <span className=" ml-2">Quizzy</span> is a quiz game app that allows
            you to test your knowledge on various topics, compete with friends,
            and track your progress. With a wide range of questions and
            categories, Quizzy offers something for everyone, whether you're a
            trivia enthusiast or just looking for a fun way to pass the time.
          </div>
          <div className="absolute top-3 right-5 w-6 h-6" onClick={toggleInfo}>
            <img src="arrdown.png" alt="arrow down" />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gray-100 w-full lg:w-2/3 xl:w-1/2 h-14 p-3 border-black border rounded-2xl rounded-tl-none mt-3 md:mt-5 w-1/2">
          <h2 className="text-sm md:text-base font-semibold">
            How to Navigate
          </h2>
          <br />
          <ul className="text-sm md:text-base">
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
              reviewed by the admin and then added to the game. You can also
              view all the questions you created and edit or delete them.
            </li>
          </ul>
          <div className="absolute top-3 right-5 w-6 h-6" onClick={toggleInfo}>
            <img src="arrdown.png" alt="arrow down" />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gray-100 w-full lg:w-2/3 xl:w-1/2 h-14 p-3 border-black border rounded-2xl rounded-tl-none mt-3 md:mt-5 w-1/2">
          <h2 className="text-sm md:text-base font-semibold">
            What you can do in the app?{" "}
          </h2>
          <br />
          <div className="text-sm md:text-base">
            <span className=" ml-2">Quizzy</span> turns your time in a fun and
            engaging experience of testing your knowledge and learning new
            things. You can challenge your friends to a quiz battle ( in
            development ), create your own questions and share them with the
            community ( in development ) and track your progress and ranking on
            the leaderboard. Whether you're a trivia enthusiast or just looking
            for a fun way to pass the time, Quizzy has something for everyone.
          </div>
          <div className="absolute top-3 right-5 w-6 h-6" onClick={toggleInfo}>
            <img src="arrdown.png" alt="arrow down" />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gray-100 w-full lg:w-2/3 xl:w-1/2 h-14 p-3 border-black border rounded-2xl rounded-tl-none mt-3 md:mt-5 w-1/2">
          <h2 className="text-sm md:text-base font-semibold">
            If you have any questions?{" "}
          </h2>
          <br />
          <div className="text-sm md:text-base">
            <span className=" ml-2">You</span> can contact us vie email ( click
            the mail icon in the bottom right corner ), write your topic and
            your question.
          </div>
          <div className="absolute top-3 right-5 w-6 h-6" onClick={toggleInfo}>
            <img src="arrdown.png" alt="arrow down" />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gray-100 w-full lg:w-2/3 xl:w-1/2 h-14 p-3 border-black border rounded-2xl rounded-tl-none mt-3 md:mt-5 w-1/2">
          <h2 className="text-sm md:text-base font-semibold">
            How can earn points and experience (xp)?{" "}
          </h2>
          <br />
          <div className="mb-2 text-sm md:text-base">
            <span className=" ml-2">When</span> answer a question correctly you
            earn points for every question as follows:
          </div>
          <ul className="list-disc ml-10 text-sm md:text-base">
            <li className="mb-1">
              up to 5 correct questions in a row - 1 point for every question
            </li>
            <li className="mb-1">
              6 to 10 correct questions in a row - 1 point for every question
              plus 2 points bonus
            </li>
            <li className="mb-1">
              11 to 15 correct questions in a row - 1 point for every question
              plus 5 points bonus
            </li>
            <li className="mb-1">
              over 15 questions in a row - 1 point for every question plus 15
              points bonus
            </li>
          </ul>
          <div className="text-sm md:text-base">
            <span className=" ml-2">For</span> every 10 points you earn 1
            experience point (xp)
          </div>
          <div className="absolute top-3 right-5 w-6 h-6" onClick={toggleInfo}>
            <img src="arrdown.png" alt="arrow down" />
          </div>
        </div>
        <div className="relative overflow-hidden bg-gray-100 w-full lg:w-2/3 xl:w-1/2 h-14 p-3 border-black border rounded-2xl rounded-tl-none mt-3 md:mt-5 w-1/2">
          <h2 className="text-sm md:text-base max-w-[300px] md:max-w-none font-semibold">
            What if I see something wrong with any of the questions or
            answers?{" "}
          </h2>
          <br />
          <div className="text-sm md:text-md">
            <span className=" ml-2">You</span> Go to questions in the
            Navigation, click on Report, write the question ID and describe the
            issue.
          </div>
          <div className="absolute top-3 right-5 w-6 h-6" onClick={toggleInfo}>
            <img src="arrdown.png" alt="arrow down" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Info;
