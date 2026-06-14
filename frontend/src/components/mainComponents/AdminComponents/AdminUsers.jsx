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
        useState(res);
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
    <div>
      <h2>All users</h2>
      <ul className="max-h-[60vh] overflow-y-auto space-y-1 pb-10">
        {users?.map((user) => (
          <li
            key={user?.id}
            className="w-full flex items-center justify-between px-3 py-2 rounded-md shadow-sm"
          >
            <Link
              to={`/${user?.id}`}
              className="flex w-full min-w-0 transition-all hover:text-sky-700 hover:font-semibold"
            >
              <span className="truncate min-w-0">{user?.username}</span>
            </Link>
          </li>
        ))}
      </ul>
      {/* gradient overlay INSIDE scroll container */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-400 to-transparent" />
    </div>
  );
}

export default AdminUsers;
