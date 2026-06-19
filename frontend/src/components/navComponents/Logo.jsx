import logo from "/fivicons/favicon-96x96.png?url";

function Logo() {
  return (
    <div className="flex w-1/3 md:pl-2 md:pt-2 top-5 left-5 ml-4 justify-start">
      <div className="w-16 h-16">
        <img
          src="/quizzy-logo.svg"
          alt="logo"
          className="w-full h-full object-contain overflow-hidden rounded-xl"
        />
      </div>
    </div>
  );
}

export default Logo;
