import React from "react";

function AdminDashboard() {
  return (
    <div className="flex gap-3 justify-center mt-5 md:mt-2 p-2 md:w-3/4 lg:w-1/3 mx-auto bg-gradient-to-b from-zinc-100 to-zinc-400 lg:w-[1000px] bg-white rounded-lg shadow-[0px_7px_13px_4px_rgba(40,55,61,1)]">
      {/* Create question */}
      <button
        className="hover:scale-110 transition-transform cursor-pointer"
        onClick={() => {}}
      >
        <img src="adminUser.png" alt="admin user" className="w-16 h-16" />
        Users
      </button>
      {/* Report question */}
      <button
        className="hover:scale-110 transition-transform cursor-pointer"
        onClick={() => {}}
      >
        <img
          src="questionsList.png"
          alt="list questions button"
          className="w-16 h-16"
        />
        questions
      </button>
      {/* Edit question */}
      <button
        className="hover:scale-110 transition-transform cursor-pointer"
        onClick={() => {}}
      >
        <img src="issue.png" alt="issue" className="w-16 h-16" />
        Issues
      </button>
      {/* list questions */}
    </div>
  );
}

export default AdminDashboard;
