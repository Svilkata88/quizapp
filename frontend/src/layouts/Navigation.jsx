import Nav from "../components/navComponents/Nav.jsx";
import Auth from "../components/navComponents/Auth.jsx";
import Info from "../components/navComponents/Info.jsx";

function Navigation() {
  return (
    <div className="flex items-start justify-between bg-gradient-to-b from-zinc-100 to-zinc-150 pt-5 md:pt-0">
      <Info />
      <Nav />
      <Auth />
    </div>
  );
}

export default Navigation;
