function UserCard({ user }) {
  return (
    <div className="flex items-center gap-3 h-18 w-45 bg-gradient-to-b from-zinc-100 to-zinc-400 rounded-lg p-3 shadow-[0px_0px_13px_4px_rgba(52,115,138,1)] ">
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
