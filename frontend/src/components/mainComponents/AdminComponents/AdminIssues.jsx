import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiFetchAllIssues } from "../../../../utils";
import Spinner from "../../others/Spinner";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function AdminIssues() {
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    setLoading(true);

    apiFetchAllIssues(`${BASE_URL}/api/questions/admin/all-issues/`)
      .then((res) => {
        setIssues(res);
      })
      .catch((err) => {
        console.error("Error fetching all issues:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section
      className={`relative ${issues ? "" : " hidden"} flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 mx-auto p-4 rounded-lg shadow-[var(--blue-shadow)] scrollable w-full xl:w-[1000px] max-h-150`}
    >
      <h2>All issues</h2>
      <ul className="max-h-[60vh] overflow-y-auto space-y-1 pb-10">
        {issues?.map((issue, index) => (
          <li
            key={issue?.id}
            className="w-full flex gap-3 items-start justify-between px-3 py-1 rounded-md shadow-sm"
          >
            <p className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full p-2 text-zinc-300 text-xs font-semibold">
              {index + 1}
            </p>
            <div className="flex flex-col gap-1 w-full">
              <Link
                //   to={`/admin/issues/${issue?.id}`}
                className="text-sm flex gap-2 justify-between items-center"
              >
                <span className=" text-gray-600">Problem: </span>
                <div className="text-sm">{issue?.description}</div>
              </Link>
              <div className="flex gap-2 text-sm text-zinc-500. min-w-20 ">
                <span className=" text-gray-600 ml-auto">Question: </span>
                <div className="text-sm text-end">{issue?.question_text}</div>
              </div>
              <div className="flex justify-between text-sm">
                <span className=" text-gray-600">Status: </span>
                <div>{issue?.decision ? issue?.decision : "Pending"}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* gradient overlay INSIDE scroll container */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-400 to-transparent" />
    </section>
  );
}

export default AdminIssues;
