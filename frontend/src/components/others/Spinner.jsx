export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <div className="w-10 h-10 lg:w-16 lg:h-16">
        <img src="/Spinner.svg" alt="spinner" />
      </div>
    </div>
  );
}
