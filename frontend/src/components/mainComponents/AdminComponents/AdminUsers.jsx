import { Link } from "react-router-dom";
import Spinner from "../../others/Spinner";
import { useState, useEffect } from "react";
import { apiFetchAllUsers } from "../../../../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminUsers() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    apiFetchAllUsers(`${BASE_URL}/api/users/admin/all-users/`)
      .then((res) => {
        setUsers(res);
      })
      .catch((err) => {
        console.error("Error fetching all users:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section
      className={`relative ${users ? "" : " hidden"} flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 mx-auto p-4 rounded-lg shadow-[var(--blue-shadow)] scrollable w-full xl:w-[1000px] max-h-150`}
    >
      <h2>All users</h2>
      <ul className="max-h-[60vh] overflow-y-auto space-y-1 pb-10">
        {users?.map((user) => (
          <li
            key={user?.id}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md shadow-sm"
          >
            <Link
              to={`/admin/users/${user?.id}`}
              className="grid grid-cols-3 items-center w-full min-w-0 gap-3 transition-all hover:text-sky-700 hover:font-semibold"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full w-6 h-6 overflow-hidden flex-shrink-0">
                  <img
                    src={user.image}
                    alt="user image"
                    className="w-full h-full object-cover"
                  />
                </div>

                <span className="truncate min-w-25">{user?.username}</span>
              </div>

              <p
                className={`text-sm text-right ${user?.staff ? "text-lime-300" : "text-gray-600"} text-semibold`}
              >
                {user?.staff ? "staff" : "user"}
              </p>
              <div className="flex gap-1 text-sm text-gray-500 text-right ml-auto">
                <div>
                  <img src="/xp.png" alt="xp" className="w-5 h-5" />
                </div>
                <p>{user?.xp}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {/* gradient overlay INSIDE scroll container */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-400 to-transparent" />
    </section>
  );
}

export default AdminUsers;
