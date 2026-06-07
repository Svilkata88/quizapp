export default function SmallElementSpinner() {
  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-white/30 z-10 rounded-full p-1">
      <div className="w-8 h-8">
        <img src="/Spinner.svg" alt="spinner" />
      </div>
    </div>
  );
}
