import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetchOneUser, apiDeleteUser } from "../../../../utils";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminUserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [redacting, setRedacting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const USER_DETAILS_URL = `${BASE_URL}/api/users/profile/${id}`;
  const USER_DELETE_URL = `${BASE_URL}/api/users/profile/delete/${id}`;

  useEffect(() => {
    setLoading(true);

    apiFetchOneUser(USER_DETAILS_URL)
      .then((res) => {
        setUser(res);
      })
      .catch((e) => console.log(e))
      .finally(setTimeout(() => setLoading(false), 300));
  }, []);

  const handleDeleteUser = () => {
    apiDeleteUser(USER_DELETE_URL)
      .then((res) => {
        navigate("/admin/users");
      })
      .catch((e) => console.log(e));
  };
  console.log(user);
  return loading ? (
    <Spinner />
  ) : (
    <section
      className={`relative flex flex-col gap-1 bg-gradient-to-b from-zinc-300 to-zinc-400 mt-10 mx-auto p-4 rounded-lg shadow-[var(--blue-shadow)] scrollable w-full xl:w-[1000px] max-h-150`}
    >
      {/* User Image and Username */}
      <section className="flex gap-2 items-center justify-between px-3">
        <div className="rounded-full w-15 h-15 overflow-hidden">
          <img
            src={user?.image}
            alt="user image"
            className="w-full h-full object-cover"
          />
        </div>
        <h2>{user?.username}</h2>
      </section>
      {/* User Details */}
      <section className="">
        {/* Icons and user details */}
        <div
          className={`${redacting ? "hidden" : ""} flex flex-col gap-2 px-4 py-2`}
        >
          <div className="flex gap-2 items-center">
            <img
              src="/mail.png"
              alt="mail"
              className="w-8 h-8 object-contain"
            />
            <p className="w-full flex items-center justify-between rounded-lg shadow-xs">
              Email: {user?.email}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <img src="/xp.png" alt="xp" className="w-8 h-8 object-contain" />
            <p className="w-full rounded-lg shadow-xs">Xp: {user?.xp}</p>
          </div>
          <div className="flex gap-2 items-center">
            <img
              src="/points.png"
              alt="points"
              className="w-8 h-8 object-contain"
            />
            <p className="w-full flex items-center justify-between rounded-lg shadow-xs">
              Points: {user?.points}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <img
              src="/timer.png"
              alt="timer"
              className="w-8 h-6 object-contain"
            />
            <p className="w-full flex items-center justify-between rounded-lg shadow-xs">
              Time played: {user?.time_played}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <img
              src="/question.png"
              alt="question"
              className="w-8 h-6 object-contain"
            />
            <p className="w-full flex items-center justify-between rounded-lg shadow-xs">
              Added questions: {user?.addedQuestions}
            </p>
          </div>
        </div>
        <form
          className={`${redacting ? "" : "hidden"} relative flex flex-col gap-2 px-4 py-2`}
        >
          <div className="flex gap-2 items-center">
            <img
              src="/mail.png"
              alt="mail"
              className="w-8 h-8 object-contain"
            />
            <input
              type="email"
              className="w-full flex items-center justify-between rounded-lg shadow-xs bg-zinc-200 px-2"
              placeholder="Email"
              value={user?.email}
            />
          </div>
          <div className="flex gap-2 items-center">
            <img src="/xp.png" alt="xp" className="w-8 h-8 object-contain" />
            <input
              type="text"
              className="w-full flex items-center justify-between rounded-lg shadow-xs bg-zinc-200 px-2"
              placeholder="Xp"
              value={user?.xp}
            />
          </div>
          <div className="flex gap-2 items-center">
            <img
              src="/points.png"
              alt="points"
              className="w-8 h-8 object-contain"
            />
            <input
              type="text"
              className="w-full flex items-center justify-between rounded-lg shadow-xs bg-zinc-200 px-2"
              placeholder="Points"
              value={user?.points}
            />
          </div>
          <div className="flex gap-2 items-center">
            <img
              src="/timer.png"
              alt="timer"
              className="w-8 h-6 object-contain"
            />
            <input
              type="text"
              className="w-full flex items-center justify-between rounded-lg shadow-xs bg-zinc-200 px-2"
              placeholder="Time played"
              value={user?.time_played}
            />
          </div>
          <div className="flex gap-2 items-center">
            <img
              src="/question.png"
              alt="question"
              className="w-8 h-6 object-contain"
            />
            <input
              type="text"
              className="w-full flex items-center justify-between rounded-lg shadow-xs bg-zinc-200 px-2"
              placeholder="Added questions"
              value={user?.addedQuestions}
            />
          </div>
          <button
            className="border border-gray-200 px-1 bg-gray-600 rounded-2xl cursor-pointer hover:scale-110 transition-transform duration-300 absolute right-2 top-2"
            onClick={() => setIsModalOpen(false)}
          >
            <img src="/close.png" alt="edit" className="w-4 h-5" />
          </button>
        </form>
      </section>
      {/* User Cards buttons */}
      <section className="flex gap-2 items-center justify-center">
        <button
          className="border border-gray-200 px-3 bg-gray-600 rounded-2xl cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => setIsModalOpen(true)}
        >
          <img src="/close.png" alt="edit" className="w-10 h-8" />
        </button>
        <button
          className="border border-gray-200 px-3 bg-gray-600 rounded-2xl cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => {
            setRedacting(true);
          }}
        >
          <img src="/edit.png" alt="edit" className="w-10 h-8" />
        </button>
      </section>
      {/* Modal */}
      <div
        className={`flex gap-3 justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-zinc-500/95 w-50 h-25 rounded-xl p-2 border border-gray-200 shadow-[var(--blue-shadow)]+${!isModalOpen ? " hidden" : ""}`}
      >
        <div className="bg-green-300 hover:bg-green-400 cursor-pointer px-3 py-1 rounded-lg">
          Back
        </div>

        {/* Delete button */}
        <button
          className="bg-red-300 hover:bg-red-400 cursor-pointer px-3 py-1 rounded-lg"
          onClick={handleDeleteUser}
        >
          Delete
        </button>

        {/* Close Modal */}
        <button
          className="border border-gray-200 px-1 bg-gray-600 rounded-2xl cursor-pointer hover:scale-110 transition-transform duration-300 absolute right-2 top-1"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <img src="/close.png" alt="edit" className="w-3 h-4" />
        </button>
      </div>
    </section>
  );
}

export default AdminUserDetails;

// api/users/profile/:id
