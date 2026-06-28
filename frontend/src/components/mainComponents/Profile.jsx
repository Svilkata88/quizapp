import { useUserContext } from "../../hooks/userContext";
import { useRef, useState } from "react";
import { apiEditUser } from "../../../utils";
import Cookies from "js-cookie";
import { formatTime } from "../../../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const DEFAULT_COL =
  "bg-gradient-to-b from-zinc-300 to-zinc-500 rounded-md p-1 border border-gray-400 cursor-pointer";
const LIGHT_PINC =
  "bg-gradient-to-r from-pink-800 to-pink-500 rounded-md p-1 border border-gray-400 cursor-pointer";
const PURPLE =
  "bg-gradient-to-r from-purple-800 to-purple-500 rounded-md p-1 border border-gray-400 cursor-pointer";
const LIGHT_BLUE =
  "bg-gradient-to-r from-blue-800 to-blue-500 rounded-md p-1 border border-gray-400 cursor-pointer";
const RED =
  "bg-gradient-to-r from-red-800 to-red-500 rounded-md p-1 border border-gray-400 cursor-pointer";
const GRAY =
  "bg-gradient-to-r from-gray-800 to-gray-500 rounded-md p-1 border border-gray-400 cursor-pointer";
const LIGHT_GRAY =
  "bg-gradient-to-r from-gray-500 to-gray-300 rounded-md p-1 border border-gray-400 cursor-pointer";
const GRASS_GREEN =
  "bg-gradient-to-r from-green-600 to-green-300 rounded-md p-1 border border-gray-400 cursor-pointer";
const ORANGE =
  "bg-gradient-to-r from-amber-800 to-amber-500 rounded-md p-1 border border-gray-400 cursor-pointer";

function Profile() {
  const { user, setUser } = useUserContext();
  const [isColorsOpen, setIsColorsOpen] = useState(false);
  const [cardBG, setCardBG] = useState(
    localStorage.getItem("cardBG") || DEFAULT_COL,
  );
  const imageUrl = user.image ? `${user.image}` : null;
  const fileInputRef = useRef(null);
  const usernameRef = useRef(null);
  const userInputRef = useRef(null);
  const editButtonsBoxRef = useRef(null);
  const eidtBtnRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const hideShowBtns = () => {
    usernameRef.current.classList.toggle("hidden");
    userInputRef.current.classList.toggle("hidden");
    eidtBtnRef.current.classList.toggle("hidden");
    editButtonsBoxRef.current.classList.toggle("hidden");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    handleProfileChange(formData);
    hideShowBtns();
  };

  function handleProfileChange(formData) {
    const hasChanges = Array.from(formData.entries()).some(([key, value]) => {
      if (key === "image") {
        return value instanceof File && value.size > 0;
      }
      return value !== user[key];
    });

    if (!hasChanges) return;

    apiEditUser(`${BASE_URL}/api/users/profile/edit/${user.id}`, formData)
      .then((res) => {
        if (res) {
          setUser({ ...res });
          Cookies.set("user", JSON.stringify(res), { path: "/" });
          hideShowBtns();
        }
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  }

  return (
    <div className="main-children-wrapper">
      <section
        className={`${cardBG} flex flex-col md:flex-row items-center gap-5 lg:gap-20 border border-gray-300 !rounded-3xl lg:h-[40vh] lg:w-[800px] mx-4 md:mx-auto mt-20 p-6 shadow-[0px_0px_13px_4px_rgba(52,115,138,1)]`}
      >
        <div className="h-40 w-40 md:h-68 md:w-68 lg:h-88 lg:w-88 relative box-border border-2 border-gray-400 rounded-full bg-zinc-400">
          <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-white">
            <img
              src={imageUrl}
              alt="profile-pic"
              className="h-full w-full object-cover rounded-full"
            />
          </div>

          <input
            type="file"
            name="image"
            ref={fileInputRef}
            hidden
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleClick}
            className="w-15 h-15 absolute bottom-0 right-0 md:bottom-5 md:right-6 lg:bottom-4 lg:right-9 hover:scale-110 transition-transform duration-300 bg-white p-2 rounded-full border-2 border-gray-300 flex items-center justify-center"
          >
            <img src="/imageUpload.png" alt="imageUpload" />
          </button>
        </div>

        <div className="flex gap-2 flex-col justify-start mt-4">
          <div className="flex gap-2 items-center mb-5 lg:mb-10">
            <h1
              className="lg:text-4xl xl:text-4xl"
              ref={usernameRef}
            >{`${user.username}\'s Profile`}</h1>

            <form
              action={handleProfileChange}
              className="hidden flex gap-1 items-center"
              ref={userInputRef}
            >
              <input
                type="text"
                name="username"
                placeholder={user.username}
                className="bg-zinc-100 p-1 pl-3 rounded-sm"
              />

              <div className="flex gap-1 hidden" ref={editButtonsBoxRef}>
                <button
                  className="w-8 h-8 cursor-pointer hover:scale-120 transition-transform duration-300 bg-white p-1 rounded-full border-2 border-gray-300 flex items-center justify-center"
                  type="submit"
                >
                  <img src="/ok.png" alt="edit" />
                </button>
                <button
                  className="w-8 h-8 cursor-pointer hover:scale-120 transition-transform duration-300 bg-white p-1 rounded-full border-2 border-gray-300 flex items-center justify-center"
                  type="button"
                  onClick={hideShowBtns}
                >
                  <img src="/close.png" alt="edit" />
                </button>
              </div>
            </form>
            <button
              className="w-8 h-8 cursor-pointer hover:scale-120 transition-transform duration-300"
              onClick={hideShowBtns}
              ref={eidtBtnRef}
            >
              <img src="/edit.png" alt="edit" />
            </button>
          </div>

          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex gap-2 items-center h-8">
              <img src="/xp.png" alt="xp" className="w-8 h-8 object-contain" />
              <h2>Xp: {user.xp}</h2>
            </div>
            <div className="flex gap-2 items-center h-8">
              <img
                src="/points.png"
                alt="points"
                className="w-8 h-8 object-contain"
              />
              <h2>points: {user.points}</h2>
            </div>
            <div className="flex gap-2 items-center h-8">
              <img
                src="/question.png"
                alt="question"
                className="w-8 h-6 object-contain"
              />
              <h2>added questions: {user?.addedQuestions}</h2>
            </div>
            <div className="flex gap-2 items-center h-8">
              <img
                src="/profileTimer.png"
                alt="timer"
                className="w-8 h-6 object-contain"
              />
              <h2>Time Played: {formatTime(user.time_played)}s</h2>
            </div>
            <div>
              <div className="relative ml-1">
                <div
                  className="flex gap-2 text-md items-center p-2 bg-zinc-200 w-36 h-6 cursor-pointer rounded-full hover:scale-105 transition-transform duration-300 ease-in-out"
                  onClick={() => setIsColorsOpen(!isColorsOpen)}
                >
                  <img
                    src={`${isColorsOpen ? "./arrup.png" : "./arrdown.png"}`}
                    alt="arrow"
                    className="w-6 h-6"
                  />
                  <p>Card theme</p>
                </div>
                <ul
                  className={`absolute top-6 grid grid-cols-3 gap-1 text-zinc-300 text-xs bg-zinc-950/10 p-2 rounded-lg mt-2 ${isColorsOpen ? "" : "hidden"}`}
                >
                  <li
                    className={LIGHT_PINC}
                    onClick={() => {
                      setCardBG(LIGHT_PINC);
                      localStorage.setItem("cardBG", LIGHT_PINC);
                    }}
                  >
                    Light Pink
                  </li>
                  <li
                    className={PURPLE}
                    onClick={() => {
                      setCardBG(PURPLE);
                      localStorage.setItem("cardBG", PURPLE);
                    }}
                  >
                    Purple
                  </li>
                  <li
                    className={LIGHT_BLUE}
                    onClick={() => {
                      setCardBG(LIGHT_BLUE);
                      localStorage.setItem("cardBG", LIGHT_BLUE);
                    }}
                  >
                    Light Blue
                  </li>
                  <li
                    className={RED}
                    onClick={() => {
                      setCardBG(RED);
                      localStorage.setItem("cardBG", RED);
                    }}
                  >
                    Red
                  </li>
                  <li
                    className={GRAY}
                    onClick={() => {
                      setCardBG(GRAY);
                      localStorage.setItem("cardBG", GRAY);
                    }}
                  >
                    Gray
                  </li>
                  <li
                    className={LIGHT_GRAY}
                    onClick={() => {
                      setCardBG(LIGHT_GRAY);
                      localStorage.setItem("cardBG", LIGHT_GRAY);
                    }}
                  >
                    Light Gray
                  </li>
                  <li
                    className={GRASS_GREEN}
                    onClick={() => {
                      setCardBG(GRASS_GREEN);
                      localStorage.setItem("cardBG", GRASS_GREEN);
                    }}
                  >
                    Grass Green
                  </li>
                  <li
                    className={ORANGE}
                    onClick={() => {
                      setCardBG(ORANGE);
                      localStorage.setItem("cardBG", ORANGE);
                    }}
                  >
                    Orange
                  </li>
                  <li
                    className={DEFAULT_COL}
                    onClick={() => {
                      setCardBG(DEFAULT_COL);
                      localStorage.setItem("cardBG", DEFAULT_COL);
                    }}
                  >
                    Default
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
