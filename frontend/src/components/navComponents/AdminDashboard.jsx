import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      {/* Dashboard buttons  */}
      <section className="flex flex-1 gap-3 justify-center mt-5 md:mt-2 p-2 mx-auto bg-gradient-to-b from-zinc-100 to-zinc-400 lg:w-[800px] bg-white rounded-lg shadow-[0px_7px_13px_4px_rgba(40,55,61,1)]">
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
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
