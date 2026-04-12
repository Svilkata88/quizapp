function ErrorMessage({ error }) {
  return (
    <div className="flex items-center gap-2 border border-red-500 p-2 rounded mb-2">
      <div className="h-10 w-10 flex items-center justify-center flex-shrink-0">
        <img
          src="/errorInfo.png"
          alt="errorInfo"
          className="h-8 w-8 object-contain"
        />
      </div>
      <div className="text-red-400">
        <span className="text-red-600 text-semibold ">{error[0]}</span>:{" "}
        {error[1]}
      </div>
    </div>
  );
}

export default ErrorMessage;
