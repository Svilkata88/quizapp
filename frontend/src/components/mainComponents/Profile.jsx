import { useUserContext } from "../../hooks/userContext";
import { useRef, useState } from "react";
import { apiEditUser } from "../../../utils";

function Profile() {
  const { user, setUser } = useUserContext();
  const imageUrl = user.image ? `http://localhost:8000${user.image}` : null;
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
  };

  function handleProfileChange(formData) {
    const hasChanges = Array.from(formData.entries()).some(([key, value]) => {
      if (key === "image") {
        return value instanceof File && value.size > 0;
      }
      return value !== user[key];
    });

    if (!hasChanges) return;

    apiEditUser(
      `http://localhost:8000/api/users/profile/edit/${user.id}`,
      formData,
    )
      .then((res) => {
        if (res) {
          setUser({ ...res });
          hideShowBtns();
        }
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  }

  return (
    <div className="bg-gradient-to-b from-zinc-100 to-zinc-500 min-h-[calc(100vh-124px)]">
      <section className="flex gap-30 border border-gray-300 rounded-xl w-1/2 h-[50vh] mx-auto mt-20 bg-gradient-to-b from-zinc-100 to-zinc-400 p-10">
        <div className="h-100 relative border-2 border-gray-300 rounded-full">
          <div className="rounded-full h-100 w-100 overflow-hidden border-2 border-white">
            <img
              src={imageUrl}
              alt="profile-pic"
              className="h-full w-full object-cover"
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
            className="w-15 h-15 absolute bottom-5 right-10 hover:scale-110 transition-transform duration-300 bg-white p-2 rounded-full border-2 border-gray-300 flex items-center justify-center"
          >
            <img src="/imageUpload.png" alt="imageUpload" />
          </button>
        </div>

        <div className="flex gap-2 flex-col justify-start my-10">
          <div className="flex gap-2 items-center mb-10">
            <h1
              className=""
              ref={usernameRef}
            >{`${user.username}\'s Profile`}</h1>
            <form
              action={handleProfileChange}
              className="hidden flex gap-2 items-center"
              ref={userInputRef}
            >
              <input
                type="text"
                name="username"
                placeholder={user.username}
                className="bg-zinc-100 p-1 pl-3 rounded-sm"
              />

              <div className="flex gap-2 hidden" ref={editButtonsBoxRef}>
                <button
                  className="w-8 h-8 cursor-pointer hover:scale-120 transition-transform duration-300 bg-white p-1 rounded-full border-2 border-gray-300 flex items-center justify-center"
                  type="submit"
                >
                  <img src="/ok.png" alt="edit" />
                </button>
                <button
                  className="w-8 h-8 cursor-pointer hover:scale-120 transition-transform duration-300 bg-white p-1 rounded-full border-2 border-gray-300 flex items-center justify-center"
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
          <div className="flex flex-col gap-5">
            <h2>rank: {user.rank}</h2>
            <h2>points: {user.points}</h2>
            <h2>added questions: {user.addedQuestions}</h2>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
