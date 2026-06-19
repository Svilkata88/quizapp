import { Link } from "react-router-dom";
import Spinner from "../../others/Spinner";
import { useState, useEffect } from "react";
import { apiFetchAllUsers } from "../../../../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminUsers() {
  const [loading, setLoading] = useState(false);
  const [users, serUsers] = useState();

  useEffect(() => {
    setLoading(true);

    apiFetchAllUsers(`${BASE_URL}/api/users/admin/all-users/`)
      .then((res) => {
        serUsers(res);
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
              className="flex gap-2 w-full min-w-0 transition-all hover:text-sky-700 hover:font-semibold"
            >
              <div className="rounded-full w-6 h-6 overflow-hidden">
                <img
                  src={user.image}
                  alt="user image"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="truncate min-w-0">{user?.username}</span>
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
