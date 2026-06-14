import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetchOneUser } from "../../../../utils";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminUserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const USER_DETAILS_URL = `${BASE_URL}/api/users/profile/${id}`;

  useEffect(() => {
    setLoading(true);

    apiFetchOneUser(USER_DETAILS_URL)
      .then((res) => {
        setUser(res);
      })
      .catch((e) => console.log(e))
      .finally(setLoading(false));
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div>
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
      <section className="flex flex-col gap-2 px-3 py-2">
        <div className="flex gap-2 items-center">
          <img src="/mail.png" alt="mail" className="w-8 h-8 object-contain" />
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
      </section>
    </div>
  );
}

export default AdminUserDetails;

// api/users/profile/:id
