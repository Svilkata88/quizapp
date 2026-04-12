function FormButton({ text, disabled = false }) {
  return (
    <button
      type="submit"
      className={`${!disabled ? "bg-green-300 hover:bg-green-400 cursor-pointer" : "bg-gray-300 cursor-not-allowed disabled:cursor-not-allowed"} p-1 rounded-sm transition-colors duration-300 self-center w-1/2 mt-2`}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default FormButton;
