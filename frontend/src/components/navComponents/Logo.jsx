import logo from "/fivicons/favicon-96x96.png?url";

function Logo() {
  return (
    <div className="flex w-1/3 md:pl-2 md:pt-2 top-5 left-5 justify-center md:justify-start">
      <div className="w-16 h-16">
        <img
          src="/logo.png"
          alt="logo"
          className="w-full h-full object-contain overflow-hidden rounded-xl"
        />
      </div>
    </div>
  );
}

export default Logo;
