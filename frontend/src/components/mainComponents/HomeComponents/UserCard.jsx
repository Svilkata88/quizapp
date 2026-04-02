function UserCard({ user }) {
  return (
    <div className="flex items-center gap-3 h-18 w-45 bg-radial-[at_50%_75%] from-sky-400 via-blue-500 to-gray-600 to-90% rounded-lg p-3 shadow-[0_0_20px_rgba(0,0,0,0.25)] shadow-indigo-500/50 ">
      <section>
        <div className="w-15 h-15 p-1 overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-300 rounded-full">
          <img
            src={
              user.image ? `http://localhost:8000${user.image}` : "/user.png"
            }
            alt="user profile"
            className="w-full h-full object-cover rounded-full "
          />
        </div>
      </section>
      <section>
        <h2 className="text-start font-serif text-sm text-zinc-800 font-bold">
          {user.username}
        </h2>
        <p className="text-start font-serif text-sm text-zinc-700">
          Xp: {user.xp}
        </p>
        <p className="text-start font-serif text-sm text-zinc-700">
          Points: {user.points}
        </p>
      </section>
    </div>
  );
}

export default UserCard;
