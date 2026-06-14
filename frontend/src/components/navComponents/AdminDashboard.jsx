import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      {/* Dashboard buttons  */}
      <section className="flex gap-3 justify-center mt-5 md:mt-2 p-2 md:w-3/4 lg:w-1/3 mx-auto bg-gradient-to-b from-zinc-100 to-zinc-400 lg:w-[1000px] bg-white rounded-lg shadow-[0px_7px_13px_4px_rgba(40,55,61,1)]">
        {/* Users Button */}
        <button
          className="hover:scale-110 transition-transform cursor-pointer"
          onClick={() => navigate("./users")}
        >
          <img src="/adminUser.png" alt="admin user" className="w-16 h-16" />
          Users
        </button>
        {/* Questions Button  */}
        <button
          className="hover:scale-110 transition-transform cursor-pointer"
          onClick={() => navigate("./questions")}
        >
          <img
            src="/questionsList.png"
            alt="list questions button"
            className="w-16 h-16"
          />
          questions
        </button>
        {/* Issues */}
        <button
          className="hover:scale-110 transition-transform cursor-pointer"
          onClick={() => navigate("./issues")}
        >
          <img src="/issue.png" alt="issue" className="w-16 h-16" />
          Issues
        </button>
      </section>
      <section className="flex flex-col gap-1 bg-gradient-to-b from-zinc-100 to-zinc-400 mt-10 p-4 rounded-lg shadow-[var(--blue-shadow)] scrollable w-full xl:w-[1000px] max-h-150">
        <Outlet />
      </section>
    </div>
  );
}

export default AdminDashboard;
