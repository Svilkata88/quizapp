import { Outlet } from "react-router-dom";
import { useBGContext } from "../hooks/useBG";
import Navigation from "./Navigation";
import Footer from "./Footer";

function Main() {
  const { bg } = useBGContext();
  return (
    <div
      className="flex flex-col bg-cover bg-no-repeat bg-center font-roboto bg-fixed h-screen overflow-y-auto"
      style={{ backgroundImage: bg }}
    >
      <Navigation />
      <section className="mb-auto flex flex-col flex-1">{<Outlet />}</section>
      <Footer />
    </div>
  );
}

export default Main;
