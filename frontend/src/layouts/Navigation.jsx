import Nav from "../components/navComponents/Nav.jsx";
import Auth from "../components/navComponents/Auth.jsx";
import Logo from "../components/navComponents/Logo.jsx";

function Navigation() {
  return (
    <div className="flex items-centers justify-between bg-gradient-to-b from-zinc-100 to-zinc-150 pt-5 pb-5 md:pb-2 md:pt-5 md:pt-0">
      <Logo />
      <Nav />
      <Auth />
    </div>
  );
}

export default Navigation;
