import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="flex justify-between items-center h-[50px] font-style: italic tracking-wider font-serif text-sm m-auto bg-gradient-to-t from-zinc-100 to-zinc-150 w-full text-center">
      <section className="w-1/3"></section>
      <section className="w-1/3">Game by: Svilen Ivanov</section>
      <ul className="flex gap-2 items-center justify-end w-1/3 mx-4">
        <li>
          <a
            href="https://www.facebook.com/svilen.ivanov.794"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 block"
          >
            <img
              src="/facebook.png"
              alt="facebook"
              className="w-full h-full object-contain"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/svilen-ivanov-31921398/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 block"
          >
            <img
              src="/linkedin.png"
              alt="linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full object-contain"
            />
          </a>
        </li>
        <li>
          <a href="https://github.com/Svilkata88" className="w-6 h-6 block">
            <img
              src="/github.png"
              alt="github"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full object-contain"
            />
          </a>
        </li>
        <li>
          <a href="mailto:ivanovsvilen88@gmail.com" className="w-6 h-6 block">
            <img
              src="/email.png"
              alt="email"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full object-contain"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
