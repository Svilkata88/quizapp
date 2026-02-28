import Nav from "../components/navComponents/Nav.jsx";
import Auth from "../components/navComponents/Auth.jsx";
import Info from "../components/navComponents/Info.jsx";

function Navigation() {
  return (
    <div className="flex items-center bg-zinc-100">
      <Info />
      <Nav />
      <Auth />
    </div>
  );
}

export default Navigation;
