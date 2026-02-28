function Icon({ img, isHidden }) {
  return (
    <div
      className={
        "h-7 hover:scale-120 transition-transform cursor-pointer " +
        (isHidden ? "hidden" : "")
      }
    >
      <img src={img} alt={img.split(".")[0]} className="w-[100%] h-[100%]" />
    </div>
  );
}

export default Icon;
